import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clapperboard, Video } from 'lucide-react';
import { fetchPortfolioVideos } from '../lib/portfolioSources';
import PortfolioGrid from '../components/PortfolioGrid';
import PortfolioLightbox from '../components/PortfolioLightbox';
import Footer from '../components/Footer';
import ScheduleModal from '../components/ScheduleModal';

const PAGE_SIZE = 24;

export default function Portfolio() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Paginação no client
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Estado do Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Modal de contato — esta pagina e usada como apresentacao para clientes
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    const fetchVideos = async () => {
    try {
      setLoading(true);
      const { videos: encontrados, errors } = await fetchPortfolioVideos(items => { if (active && items.length) { setVideos(items); setLoading(false); } });
      if (!active) return;

      setVideos(encontrados);
      // So mostra erro se NENHUMA fonte respondeu — uma fonte fora do ar nao vira tela de erro
      if (encontrados.length === 0 && errors.length > 0) {
        setError(`Não foi possível carregar os vídeos. ${errors.join(' | ')}`);
      }
    } catch (err) {
      if (active) setError(err.message);
    } finally {
      if (active) setLoading(false);
    }
  };

    fetchVideos();
    return () => { active = false; };
  }, []);

  const loadMore = () => setVisibleCount(prev => prev + PAGE_SIZE);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextVideo = () => {
    if (lightboxIndex !== null && lightboxIndex < videos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevVideo = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const visibleVideos = videos.slice(0, visibleCount);

  return (
    <div className="bg-black min-h-screen font-body text-white relative selection:bg-[#4ade80]/30 selection:text-white">
      {/* Navbar Minimalista */}
      <nav className="fixed w-full z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-[#4ade80] transition-colors group" title="Voltar para a home">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex justify-center flex-1">
          <img
            src="/logo-horizontal.png"
            alt="Growave"
            className="object-contain"
            style={{ height: '160px', width: 'auto', maxHeight: '12vh' }}
          />
        </div>
        {/* Placeholder para balancear o header */}
        <div className="w-6"></div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-8 max-w-[1400px] mx-auto min-h-[80vh]">
        <div className="mb-16 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ade80]/30 text-[#4ade80] bg-[#4ade80]/5 text-sm font-semibold tracking-widest mb-8">
            <Clapperboard size={16} /> PORTFÓLIO
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            NOSSO <span className="text-[#4ade80]">TRABALHO</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
            Produções audiovisuais que a Growave criou para marcas que precisavam parar o scroll. Passe o mouse para pré-visualizar, clique para assistir.
          </p>

          <div className="flex items-center justify-center gap-3 md:gap-6 text-white/40 text-sm md:text-base font-medium flex-wrap">
            <span>{videos.length} {videos.length === 1 ? 'produção' : 'produções'}</span>
            <span className="hidden md:inline">•</span>
            <span>Clique para assistir</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 animate-pulse rounded-2xl w-full"
                style={{ aspectRatio: i % 3 === 0 ? '16 / 9' : '9 / 16' }}
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-red-500/20">
            <Video className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <p className="text-red-400 text-lg px-4 max-w-2xl mx-auto">{error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <Video className="mx-auto h-12 w-12 text-white/20 mb-4" />
            <p className="text-white/60 text-lg">Nenhum vídeo no portfólio ainda.</p>
          </div>
        ) : (
          <>
            <PortfolioGrid videos={visibleVideos} onOpen={openLightbox} />

            {visibleCount < videos.length && (
              <div className="mt-16 text-center">
                <button
                  onClick={loadMore}
                  className="px-8 py-4 bg-white/10 hover:bg-[#4ade80] text-white hover:text-black rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,222,128,0.3)]"
                >
                  Carregar mais vídeos
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && videos.length > 0 && (
          <div style={{
            marginTop: 96, padding: '56px 32px', textAlign: 'center',
            background: 'rgba(74,255,90,0.04)', border: '1px solid rgba(74,255,90,0.20)', borderRadius: 32,
          }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 16 }}>
              / Vamos conversar
            </div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1.05, maxWidth: 620, margin: '0 auto 16px' }}>
              Quer conteúdo assim para a sua marca?
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#A1A1AA', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' }}>
              Tráfego, automação e audiovisual na mesma operação. Agende uma conversa e monte o plano da sua marca.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#4AFF5A', color: '#050505', fontFamily: 'Inter', fontWeight: 700,
                fontSize: 14, padding: '14px 32px', borderRadius: 9999, border: 'none', cursor: 'pointer',
                transition: 'transform 200ms, box-shadow 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(74,255,90,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Agendar conversa
            </button>
          </div>
        )}
      </main>

      <Footer />

      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <PortfolioLightbox
        videos={videos}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextVideo}
        onPrev={prevVideo}
      />
    </div>
  );
}
