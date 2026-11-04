import { organization, schemasFor, siteUrl } from '../content/sitePages.js';
export function pageMetadata(page) {
  return { title: page.title, description: page.description, canonical: siteUrl + page.path, schemas: schemasFor(page) };
}
export const homeMetadata = {
  title: 'Growave | Agência de Marketing Digital, Tráfego Pago e Automação',
  description: 'Agência de marketing digital em Cabo Frio, RJ: tráfego pago, social media, audiovisual, sites, Google Meu Negócio e CRM. Atendimento em todo o Brasil.',
  canonical: `${siteUrl}/`, schemas: [organization],
};
export function serializeSchema(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
export function escapeHtml(value) { return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
export function withMetadata(html, meta) {
  let output = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`)
    .replace(/<script\b(?=[^>]*\btype="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/g, '')
    .replace('</head>', `<script id="page-schema" type="application/ld+json">${serializeSchema(meta.schemas)}</script>\n</head>`);
  for (const [attribute, key, value] of [
    ['name', 'description', meta.description], ['property', 'og:title', meta.title], ['property', 'og:description', meta.description],
    ['property', 'og:url', meta.canonical], ['name', 'twitter:title', meta.title], ['name', 'twitter:description', meta.description], ['name', 'twitter:url', meta.canonical],
  ]) output = output.replace(new RegExp(`<meta ${attribute}="${key}"[^>]*>`), `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  return output;
}
