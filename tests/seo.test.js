import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pages, organization, siteUrl } from '../src/content/sitePages.js';
import { serializeSchema } from '../src/lib/seo.js';

test('each content page ships readable HTML, unique metadata and matching structured FAQ', async () => {
  const titles = new Set();
  for (const page of pages) {
    const html = await readFile(`dist${page.path}.html`, 'utf8');
    assert.match(html, /<h1>/);
    assert.ok(html.includes(page.heading), page.path);
    assert.ok(html.includes(`<link rel="canonical" href="${siteUrl}${page.path}"`));
    assert.ok(html.includes(`<title>${page.title}</title>`));
    assert.ok(!titles.has(page.title));
    titles.add(page.title);
    assert.doesNotMatch(html, /<script[^>]+type="module"/);
    const schema = JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema.filter(item => item['@id'] === organization['@id']).length, 1);
    const faq = schema.find(item => item['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, page.faq.length);
    for (const question of faq.mainEntity) assert.ok(html.includes(question.name));
    assert.match(html, /1407042581379008/); // preserve the pre-existing Meta Pixel
  }
});

test('sitemap includes every content page and excludes obsolete or unknown URLs', async () => {
  const xml = await readFile('dist/sitemap.xml', 'utf8');
  for (const page of pages) assert.ok(xml.includes(`<loc>${siteUrl}${page.path}</loc>`));
  assert.doesNotMatch(xml, /cgi-bin|\/404|\.html<\/loc>/);
});

test('deployment only rewrites known app routes and has a static noindex error page', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(config.framework, null); // disable the Vite SPA fallback supplied by a framework preset
  assert.equal(config.cleanUrls, true);
  assert.deepEqual(config.rewrites.map(rule => rule.source).sort(), ['/portfolio', '/secco-em-casa']);
  const html = await readFile('dist/404.html', 'utf8');
  assert.match(html, /noindex, follow/);
  assert.doesNotMatch(html, /Sua próxima/);
});

test('search crawler is explicitly allowed and schema serialization cannot close its script', async () => {
  const robots = await readFile('public/robots.txt', 'utf8');
  assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
  assert.ok(!serializeSchema({ text: '</script><script>alert(1)</script>' }).includes('<'));
});
