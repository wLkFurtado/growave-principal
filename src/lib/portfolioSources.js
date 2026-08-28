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

  const res = await fetch(`https://res.cloudinary.com/${CLOUD}/video/list/${CLOUD_TAG}.json`);
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

  const res = await fetch(`${SB_URL}/storage/v1/object/list/${SB_BUCKET}`, {
    method: 'POST',
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prefix: '', limit: 100, sortBy: { column: 'created_at', order: 'desc' } }),
  });
  if (!res.ok) throw new Error(`Supabase respondeu ${res.status}`);

  const files = await res.json();

  return files
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
}

export async function fetchPortfolioVideos() {
  // allSettled: uma fonte fora do ar nao pode derrubar a outra
  const results = await Promise.allSettled([fetchCloudinary(), fetchSupabase()]);

  const videos = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
  const errors = results.filter(r => r.status === 'rejected').map(r => r.reason.message);

  videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return { videos, errors };
}
