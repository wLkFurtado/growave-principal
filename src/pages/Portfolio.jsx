import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clapperboard, Video } from 'lucide-react';
import { fetchPortfolioVideos } from '../lib/portfolioSources';
import PortfolioGrid from '../components/PortfolioGrid';
import PortfolioLightbox from '../components/PortfolioLightbox';
import Footer from '../components/Footer';
import ScheduleModal from '../components/ScheduleModal';
import ShineButton from '../components/ui/ShineButton';

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
    <div className="min-h-screen font-body text-white relative selection:bg-[#4aff5a]/30 selection:text-white">
      <header className="site-header">
        <nav className="site-nav" aria-label="Navegação do portfólio">
          <Link to="/" className="action-text" title="Voltar para a home">
            <ArrowLeft size={17} /> Início
          </Link>
          <Link to="/" aria-label="Growave — início">
            <img src="/logo-horizontal.png" alt="Growave" width="140" height="40" />
          </Link>
          <ShineButton className="nav-contact" onClick={() => setIsModalOpen(true)}>
            Vamos conversar <ArrowUpRight size={17} />
          </ShineButton>
        </nav>
      </header>

      <main className="pt-36 pb-24 px-6 md:px-10 max-w-[1320px] mx-auto min-h-[80vh]">
        <div className="mb-14 pt-6 hero-enter">
          <p className="eyebrow flex items-center gap-2">
            <Clapperboard size={14} /> PORTFÓLIO AUDIOVISUAL
          </p>

          <h1
            className="mt-4 mb-5 uppercase"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(56px, 8vw, 108px)', lineHeight: 0.96 }}
          >
            Nosso <span style={{ color: 'var(--green)' }}>Trabalho.</span>
          </h1>

          <p className="text-[#a5aaa5] text-sm md:text-base max-w-xl leading-relaxed">
            Produções audiovisuais que a Growave criou para marcas que precisavam parar o scroll. Passe o mouse para pré-visualizar, clique para assistir.
          </p>

          <div className="mt-5 flex items-center gap-4 text-[#949b94] font-mono text-[10px] tracking-widest uppercase flex-wrap">
            <span>{videos.length} {videos.length === 1 ? 'produção' : 'produções'}</span>
            <span>•</span>
            <span>Clique para assistir</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#101410] border border-[#252b25] animate-pulse rounded-2xl w-full"
                style={{ aspectRatio: i % 3 === 0 ? '16 / 9' : '9 / 16' }}
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-[#101410] rounded-2xl border border-red-500/20">
            <Video className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <p className="text-red-400 text-lg px-4 max-w-2xl mx-auto">{error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20 bg-[#101410] rounded-2xl border border-[#252b25]">
            <Video className="mx-auto h-12 w-12 text-white/20 mb-4" />
            <p className="text-white/60 text-lg">Nenhum vídeo no portfólio ainda.</p>
          </div>
        ) : (
          <>
            <PortfolioGrid videos={visibleVideos} onOpen={openLightbox} />

            {visibleCount < videos.length && (
              <div className="mt-16 text-center">
                <ShineButton
                  onClick={loadMore}
                  className="action-primary"
                >
                  Carregar mais vídeos <ArrowUpRight size={18} />
                </ShineButton>
              </div>
            )}
          </>
        )}

        {!loading && !error && videos.length > 0 && (
          <section className="contact-section px-0 pt-20 pb-0">
            <div className="contact-panel">
              <p className="eyebrow">VAMOS CONVERSAR</p>
              <h2>Quer conteúdo assim para a <span>sua marca?</span></h2>
              <div className="contact-bottom">
                <p>Tráfego, automação e audiovisual na mesma operação. Agende uma conversa e monte o plano da sua marca.</p>
                <ShineButton className="action-dark" onClick={() => setIsModalOpen(true)}>
                  Agendar conversa <ArrowUpRight size={20} />
                </ShineButton>
              </div>
            </div>
          </section>
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

