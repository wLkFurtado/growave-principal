import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function PortfolioVideoCard({ video, onOpen }) {
  const videoRef = useRef(null);
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

  const handleEnter = () => {
    if (!previewSrc) {
      setPreviewSrc(video.previewUrl);
      return; // o autoPlay cuida do play assim que carregar
    }
    videoRef.current?.play().catch(() => {}); // play() rejeita se o mouse sair antes de carregar
  };

  const handleLeave = () => {
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
    <div
      className="relative w-full h-full group cursor-pointer bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#4ade80]/40 transition-colors duration-300"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onOpen}
    >
      {usaPosterProprio ? (
        <video
          src={`${video.previewUrl}#t=0.1`} // #t força o browser a pintar o primeiro frame
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={lerDimensoes}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            previewReady ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <img
          src={video.posterUrl}
          alt="Peça do portfólio Growave"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            previewReady ? 'opacity-0' : 'opacity-100'
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
          autoPlay
          preload="none"
          onLoadedMetadata={lerDimensoes}
          onPlaying={() => setPreviewReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-[#4ade80] group-hover:border-[#4ade80] group-hover:scale-110">
          <Play size={22} className="text-white group-hover:text-black fill-current ml-0.5 transition-colors" />
        </div>
      </div>

      {width && height && (
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[10px] tracking-widest uppercase">
            {isVertical ? 'Reels 9:16' : 'Wide 16:9'}
          </span>
        </div>
      )}
    </div>
  );
}
