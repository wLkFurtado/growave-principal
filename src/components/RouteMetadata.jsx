import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pages, siteUrl } from '../content/sitePages';
import { homeMetadata, pageMetadata, serializeSchema } from '../lib/seo';
export default function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const page = pages.find(page => page.path === path);
    const known = ['/', '/portfolio', '/secco-em-casa', '/crm'].includes(path);
    const meta = page ? pageMetadata(page) : path === '/' ? homeMetadata : {
      title: path === '/portfolio' ? 'Portfólio Audiovisual | Growave' : path === '/secco-em-casa' ? 'Galeria Secco em Casa | Growave' : path === '/crm' ? 'CRM | Growave' : 'Página não encontrada | Growave',
      description: path === '/portfolio' ? 'Conheça as produções audiovisuais da Growave.' : homeMetadata.description,
      canonical: siteUrl + path, schemas: [],
    };
    document.title = meta.title;
    const set = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value);
    set('link[rel="canonical"]', 'href', meta.canonical);
    for (const [key, value] of [['description', meta.description], ['og:title', meta.title], ['og:description', meta.description], ['og:url', meta.canonical], ['twitter:title', meta.title], ['twitter:description', meta.description], ['twitter:url', meta.canonical]]) {
      set(`meta[${key.startsWith('og:') ? 'property' : 'name'}="${key}"]`, 'content', value);
    }
    let schema = document.querySelector('#page-schema');
    if (!schema) { schema = document.createElement('script'); schema.type = 'application/ld+json'; schema.id = 'page-schema'; document.head.appendChild(schema); }
    schema.textContent = serializeSchema(meta.schemas);
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots); }
    robots.content = page || known ? 'index, follow' : 'noindex, follow';
  }, [pathname]);
  return null;
}
