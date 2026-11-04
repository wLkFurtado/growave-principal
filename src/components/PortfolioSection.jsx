import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { fetchPortfolioVideos } from '../lib/portfolioSources';
import PortfolioVideoCard from './PortfolioVideoCard';
import PortfolioLightbox from './PortfolioLightbox';

function PortfolioConveyor({ videos, onOpen }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    vel: -0.45,
    dragging: false,
    hovering: false,
    startX: 0,
    lastX: 0,
    moved: 0,
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !videos.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = null;
    const step = () => {
      const st = stateRef.current;
      const halfWidth = track.scrollWidth / 2;

      if (!st.dragging) {
        const targetAuto = st.hovering ? 0 : -0.45;
        st.vel += (targetAuto - st.vel) * 0.06;
        st.x += st.vel;
      }

      if (halfWidth > 0) {
        if (st.x <= -halfWidth) st.x += halfWidth;
        if (st.x > 0) st.x -= halfWidth;
      }

      track.style.transform = `translate3d(${st.x.toFixed(2)}px, 0, 0)`;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [videos.length]);

  const onPointerDown = e => {
    if (e.button !== undefined && e.button !== 0) return;
    const st = stateRef.current;
    st.dragging = true;
    st.startX = e.clientX;
    st.lastX = e.clientX;
    st.moved = 0;
    viewportRef.current?.classList.add('is-dragging');
  };

  const onPointerMove = e => {
    const st = stateRef.current;
    if (!st.dragging) return;
    const dx = e.clientX - st.lastX;
    st.lastX = e.clientX;
    st.moved += Math.abs(dx);
    st.x += dx;
    st.vel = dx * 0.85;
  };

  const endDrag = () => {
    const st = stateRef.current;
    if (!st.dragging) return;
    st.dragging = false;
    viewportRef.current?.classList.remove('is-dragging');
  };

  const items = videos.slice(0, 10);
  if (!items.length) return null;
  const loopItems = [...items, ...items];

  return (
    <div className="portfolio-conveyor-wrap">
      <div className="portfolio-conveyor-bar">
        <span className="portfolio-conveyor-tag">
          <i className="gw-status-led" /> ESTEIRA CINEMA · 24 FPS · FLUXO CONTÍNUO
        </span>
        <span className="portfolio-conveyor-hint">
          <MoveHorizontal size={14} /> Arraste para os lados com o mouse ou toque
        </span>
      </div>
      <div
        ref={viewportRef}
        className="portfolio-conveyor-viewport"
        onMouseEnter={() => { stateRef.current.hovering = true; }}
        onMouseLeave={() => { stateRef.current.hovering = false; endDrag(); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={trackRef} className="portfolio-conveyor-track">
          {loopItems.map((video, idx) => {
            const realIndex = idx % items.length;
            const deitado = video.width && video.height ? video.width > video.height : false;
            return (
              <div
                key={`${video.key}-${idx}`}
                className={`portfolio-conveyor-item${deitado ? ' is-wide' : ' is-vertical'}`}
              >
                <PortfolioVideoCard
                  video={video}
                  onOpen={() => {
                    if (stateRef.current.moved < 8) onOpen(realIndex);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
        <p>Alguns dos vídeos que produzimos para marcas que precisavam parar o scroll. Arraste a esteira ou selecione um para assistir.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{ background: '#101410', border: '1px solid var(--line)', borderRadius: 18, height: 360 }}
            />
          ))}
        </div>
      ) : videos.length ? (
        <PortfolioConveyor videos={videos} onOpen={setLightboxIndex} />
      ) : (
        <p className="portfolio-empty">Nosso portfólio está temporariamente indisponível. Fale com a gente para conhecer os projetos.</p>
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
