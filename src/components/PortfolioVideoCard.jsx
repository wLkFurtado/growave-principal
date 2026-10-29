import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function PortfolioVideoCard({ video, onOpen }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const interacting = useRef(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '180px' });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // O src do preview so e atribuido no primeiro hover — evita baixar todos os videos no load.
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewReady, setPreviewReady] = useState(false);
  // Videos do Supabase nao trazem dimensao na listagem; lemos do proprio arquivo.
  const [measured, setMeasured] = useState(null);

  const width = video.width || measured?.width;
  const height = video.height || measured?.height;
  const isVertical = width && height ? height > width : false;

  // Sem poster (Supabase), o proprio primeiro frame do video faz o papel da capa.
  const usaPosterProprio = !video.posterUrl;
  const isBuffering = hovering && previewSrc && !previewReady;

  const handleEnter = () => {
    interacting.current = true;
    setHovering(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!previewSrc) {
      setPreviewSrc(video.previewUrl);
      return; // onCanPlay inicia somente se a interação continuar ativa
    }
    videoRef.current?.play().catch(() => {}); // play() rejeita se o mouse sair antes de carregar
  };

  const handleLeave = () => {
    interacting.current = false;
    setHovering(false);
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const lerDimensoes = (e) => {
    const el = e.currentTarget;
    if (el.videoWidth) setMeasured({ width: el.videoWidth, height: el.videoHeight });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      aria-label="Assistir vídeo do portfólio"
      className={`portfolio-video-card relative w-full h-full group cursor-pointer bg-[#101410] rounded-2xl overflow-hidden border border-[#252b25] hover:border-[#4aff5a]/50 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-[0.97]'
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onClick={onOpen}
    >
      {usaPosterProprio ? (
        <video
          src={visible ? `${video.previewUrl}#t=0.1` : undefined}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={lerDimensoes}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            previewReady && hovering ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <img
          src={video.posterUrl}
          alt="Peça do portfólio Growave"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            previewReady && hovering ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {previewSrc && (
        <video
          ref={videoRef}
          src={previewSrc}
          muted
          loop
          playsInline
          onCanPlay={() => { if (interacting.current) videoRef.current?.play().catch(() => {}); }}
          preload="none"
          onLoadedMetadata={lerDimensoes}
          onPlaying={() => setPreviewReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-14 h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#4aff5a] group-hover:border-[#4aff5a] group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(74,255,90,0.45)] ${
            isBuffering ? 'animate-pulse' : ''
          }`}
        >
          <Play size={22} className="text-white group-hover:text-[#071007] fill-current ml-0.5 transition-colors" />
        </div>
      </div>

      {previewReady && hovering && (
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#4aff5a]/40 text-[#4aff5a] font-mono text-[9px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4aff5a] animate-ping" />
            Preview
          </span>
        </div>
      )}

      {width && height && (
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-white/85 font-mono text-[10px] tracking-widest uppercase">
            {isVertical ? 'Reels 9:16' : 'Wide 16:9'}
          </span>
        </div>
      )}
    </button>
  );
}

