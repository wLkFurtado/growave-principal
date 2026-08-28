import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useBreakpoint';
import { fetchPortfolioVideos } from '../lib/portfolioSources';
import PortfolioVideoCard from './PortfolioVideoCard';
import PortfolioLightbox from './PortfolioLightbox';

export default function PortfolioSection() {
  const isMobile = useIsMobile();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let ativo = true;
    fetchPortfolioVideos()
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

  // Sem videos e sem carregar, a secao some em vez de deixar um buraco na home
  if (!loading && videos.length === 0) return null;

  return (
    <section
      id="portfólio"
      style={{ padding: isMobile ? '72px 20px' : '100px 40px', maxWidth: 1200, margin: '0 auto' }}
    >
      <div style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 16 }}>
          / Portfólio Audiovisual
        </div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1.05, maxWidth: 640 }}>
          Conteúdo que Para o Scroll e Vende.
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#A1A1AA', lineHeight: 1.7, maxWidth: 560, marginTop: 18 }}>
          Produções que a Growave criou para marcas reais. Passe o mouse para pré-visualizar, clique para assistir.
        </p>
      </div>

      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-5 animate-pulse"
              style={{ background: 'rgba(17,17,17,0.50)', border: '1px solid #222', borderRadius: 24, aspectRatio: i % 3 === 0 ? '16 / 9' : '9 / 16' }}
            />
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-5">
          {videos.map((video, index) => (
            <PortfolioVideoCard
              key={video.key}
              video={video}
              onOpen={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      )}

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
