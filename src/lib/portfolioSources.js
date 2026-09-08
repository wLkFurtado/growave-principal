import { fetchWithTimeout } from './request.js';

// Busca os videos do portfolio em duas fontes e normaliza num formato unico.
//
// Cloudinary  -> reels curtos. Transcodifica, gera poster e da a listagem por tag.
// Supabase    -> pecas grandes que estouram o limite de upload do Cloudinary.
//                Serve o arquivo como esta, entao o mp4 precisa ja vir em H.264.

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUD_TAG = 'portfolio';

const SB_URL = import.meta.env.VITE_SUPABASE_URL;
const SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SB_BUCKET = import.meta.env.VITE_SUPABASE_VIDEO_BUCKET;

async function fetchCloudinary() {
  if (!CLOUD) return [];

  const res = await fetchWithTimeout(`https://res.cloudinary.com/${CLOUD}/video/list/${CLOUD_TAG}.json`);
  // 404 aqui significa "nenhum video com essa tag", nao erro de verdade
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Cloudinary respondeu ${res.status}`);

  const { resources = [] } = await res.json();

  return resources.map(r => ({
    key: `cld:${r.public_id}`,
    source: 'cloudinary',
    width: r.width,
    height: r.height,
    createdAt: r.created_at,
    // c_limit encaixa 9:16 e 16:9 sem distorcer
    posterUrl: `https://res.cloudinary.com/${CLOUD}/video/upload/c_limit,w_800,q_auto,f_auto/v${r.version}/${r.public_id}.jpg`,
    previewUrl: `https://res.cloudinary.com/${CLOUD}/video/upload/c_limit,w_640,h_640,q_auto/v${r.version}/${r.public_id}.mp4`,
    fullUrl: `https://res.cloudinary.com/${CLOUD}/video/upload/c_limit,w_1920,h_1280,q_auto/v${r.version}/${r.public_id}.mp4`,
  }));
}

async function fetchSupabase() {
  if (!SB_URL || !SB_KEY || !SB_BUCKET) return [];

  const files = [];
  const pageSize = 100;
  for (let offset = 0; ; offset += pageSize) {
    const res = await fetchWithTimeout(`${SB_URL}/storage/v1/object/list/${SB_BUCKET}`, {
      method: 'POST',
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix: '', limit: pageSize, offset, sortBy: { column: 'created_at', order: 'desc' } }),
    });
    if (!res.ok) throw new Error(`Supabase respondeu ${res.status}`);
    const page = await res.json();
    if (!Array.isArray(page)) throw new Error('Listagem de vídeos inválida');
    files.push(...page);
    if (page.length < pageSize) break;
  }

  const itens = files
    // Supabase serve o arquivo como esta, sem transcodificar. So aceitamos os
    // containers que tocam em todo navegador — .mov/HEVC quebra no Chrome e Firefox.
    .filter(f => f.metadata && ['video/mp4', 'video/webm'].includes(f.metadata.mimetype))
    .map(f => {
      const url = `${SB_URL}/storage/v1/object/public/${SB_BUCKET}/${encodeURIComponent(f.name)}`;
      return {
        key: `sb:${f.name}`,
        source: 'supabase',
        // o list nao devolve dimensoes; o card le do proprio video no loadedmetadata
        width: null,
        height: null,
        createdAt: f.created_at,
        posterUrl: null, // Supabase nao gera poster — o primeiro frame faz o papel
        previewUrl: url,
        fullUrl: url,
      };
    });

  return itens;
}

export async function fetchPortfolioVideos(onProgress) {
  const collected = [];
  const publish = items => {
    collected.push(...items);
    onProgress?.([...collected]);
    return items;
  };
  // allSettled: uma fonte fora do ar nao pode derrubar a outra
  const results = await Promise.allSettled([fetchCloudinary().then(publish), fetchSupabase().then(publish)]);

  const videos = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
  const errors = results.filter(r => r.status === 'rejected').map(r => r.reason.message);

  // Keep published order stable while a visitor has a video open.
  videos.splice(0, videos.length, ...collected);

  return { videos, errors };
}
