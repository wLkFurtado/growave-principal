import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchPortfolioVideos } from '../lib/portfolioSources';
import PortfolioGrid from './PortfolioGrid';
import PortfolioLightbox from './PortfolioLightbox';

export default function PortfolioSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let ativo = true;
    fetchPortfolioVideos(items => { if (ativo && items.length) { setVideos(items); setLoading(false); } })
      .then(({ videos: encontrados }) => { if (ativo) setVideos(encontrados); })
      .catch(() => { /* a home nao mostra erro de portfolio — a secao apenas nao aparece */ })
      .finally(() => { if (ativo) setLoading(false); });
    return () => { ativo = false; };
  }, []);

  const nextVideo = () => {
    if (lightboxIndex !== null && lightboxIndex < videos.length - 1) setLightboxIndex(lightboxIndex + 1);
  };
  const prevVideo = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
  };

  return (
    <section id="portfólio" className="portfolio-home-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / PORTFÓLIO AUDIOVISUAL</p>
          <h2>Histórias que merecem<br /><span>ser vistas.</span></h2>
        </div>
        <p>Um olhar sobre o que criamos para marcas que precisam parar o scroll. Passe o mouse para pré-visualizar ou selecione para assistir.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{ background: '#101410', border: '1px solid var(--line)', borderRadius: 18, aspectRatio: i % 3 === 0 ? '16 / 9' : '9 / 16' }}
            />
          ))}
        </div>
      ) : (
        videos.length ? <PortfolioGrid videos={videos.slice(0, 6)} onOpen={setLightboxIndex} /> : <p className="portfolio-empty">Nosso portfólio está temporariamente indisponível. Fale com a gente para conhecer os projetos.</p>
      )}

      <Link className="action-text portfolio-link" to="/portfolio">Explorar portfólio completo <ArrowUpRight size={19} /></Link>
      <PortfolioLightbox
        videos={videos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={nextVideo}
        onPrev={prevVideo}
      />
    </section>
  );
}

