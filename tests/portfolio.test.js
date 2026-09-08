import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fetchWithTimeout } from '../src/lib/request.js';

const bundle = await build({ entryPoints: ['src/lib/portfolioSources.js'], bundle: true, write: false, format: 'esm', define: {
  'import.meta.env.VITE_CLOUDINARY_CLOUD_NAME': '"test-cloud"',
  'import.meta.env.VITE_SUPABASE_URL': '"https://storage.test"',
  'import.meta.env.VITE_SUPABASE_ANON_KEY': '"public-test-key"',
  'import.meta.env.VITE_SUPABASE_VIDEO_BUCKET': '"portfolio"',
} });
const { fetchPortfolioVideos } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const response = data => ({ ok: true, status: 200, json: async () => data });
const file = i => ({ name: `${i}.mp4`, metadata: { mimetype: 'video/mp4' }, created_at: '2026-01-01' });

test('pagination retrieves videos beyond the first 100 entries', async t => {
  const offsets = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url.includes('cloudinary')) return response({ resources: [] });
    const { offset } = JSON.parse(options.body);
    offsets.push(offset);
    return response(offset === 0 ? Array.from({ length: 100 }, (_, i) => file(i)) : [file(100)]);
  });
  const { videos, errors } = await fetchPortfolioVideos();
  assert.equal(videos.length, 101);
  assert.deepEqual(offsets, [0, 100]);
  assert.deepEqual(errors, []);
});

test('publishes the available source without waiting for the slow one', async t => {
  let resolveStorage;
  const pending = new Promise(resolve => { resolveStorage = resolve; });
  t.mock.method(globalThis, 'fetch', async url => url.includes('cloudinary')
    ? response({ resources: [{ public_id: 'first', version: 1, width: 100, height: 100 }] }) : pending);
  let first;
  const progress = new Promise(resolve => { first = resolve; });
  const completed = fetchPortfolioVideos(items => { if (items.length) first(items); });
  assert.equal((await progress)[0].key, 'cld:first');
  resolveStorage(response([file(1)]));
  assert.deepEqual((await completed).videos.map(v => v.key), ['cld:first', 'sb:1.mp4']);
});

test('a failed source preserves results from the other source', async t => {
  t.mock.method(globalThis, 'fetch', async url => {
    if (url.includes('cloudinary')) throw new Error('Source unavailable');
    return response([file(7)]);
  });
  const result = await fetchPortfolioVideos();
  assert.equal(result.videos[0].key, 'sb:7.mp4');
  assert.deepEqual(result.errors, ['Source unavailable']);
});

test('a stalled request is aborted at the timeout', async t => {
  t.mock.method(globalThis, 'fetch', (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  }));
  await assert.rejects(fetchWithTimeout('https://test.invalid', {}, 10), { name: 'AbortError' });
});
