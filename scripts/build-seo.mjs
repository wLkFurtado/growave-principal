import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { pages, siteUrl } from '../src/content/sitePages.js';
import { withMetadata, homeMetadata, pageMetadata } from '../src/lib/seo.js';

const renderFile = resolve('scripts/.seo-render.mjs');
await build({ entryPoints: ['src/pages/ContentPage.jsx'], bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', outfile: renderFile });
try {
  const { default: ContentPage } = await import(pathToFileURL(renderFile));
  const original = await readFile('dist/index.html', 'utf8');
  await writeFile('dist/index.html', withMetadata(original, homeMetadata));
  // Static content pages need no client runtime; their links and FAQ work without JS.
  const template = original.replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, '').replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, '');
  for (const page of pages) {
    const html = withMetadata(template, pageMetadata(page)).replace('<div id="root"></div>', `<div id="root">${renderToStaticMarkup(React.createElement(ContentPage, { page }))}</div>`);
    const file = `dist${page.path}.html`;
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  const notFound = withMetadata(template, { title: 'Página não encontrada | Growave', description: 'Este endereço não existe. Volte ao início da Growave.', canonical: `${siteUrl}/404`, schemas: [] })
    .replace('</head>', '<meta name="robots" content="noindex, follow" /></head>')
    .replace('<div id="root"></div>', '<main class="not-found"><p class="eyebrow">404</p><h1>Vamos encontrar a direção?</h1><p>Essa página não existe ou mudou de endereço.</p><a class="action-primary" href="/">Voltar ao início</a></main>');
  await writeFile('dist/404.html', notFound);
  const paths = ['/', '/portfolio', '/crm', ...pages.map(page => page.path)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile('dist/sitemap.xml', sitemap);
  console.log(`SEO: ${pages.length} páginas HTML, 404 e sitemap gerados.`);
} finally { await unlink(renderFile); }
