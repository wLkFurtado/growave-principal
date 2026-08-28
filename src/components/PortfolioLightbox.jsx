import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function PortfolioLightbox({ videos, currentIndex, onClose, onNext, onPrev }) {
  // Prevenir scroll do body quando aberto
  useEffect(() => {
    if (currentIndex === null) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentIndex]);

  // Atalhos de teclado
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null || !videos || videos.length === 0) return null;

  const current = videos[currentIndex];

  // URLs ja vem prontas da camada de fontes (Cloudinary transformado ou Supabase direto)
  const videoUrl = current.fullUrl;
  const posterUrl = current.posterUrl || undefined;

  const isVertical = current.width && current.height ? current.height > current.width : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Controles do Topo */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <span className="text-white/70 font-mono text-sm">
          {currentIndex + 1} / {videos.length}
        </span>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
          title="Fechar"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navegação Esquerda */}
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-4 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all z-10"
          title="Anterior"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Player */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
        onClick={onClose}
      >
        <video
          key={current.key} // força remontar o player ao trocar de vídeo
          src={videoUrl}
          poster={posterUrl}
          controls
          autoPlay
          loop
          playsInline
          className={`object-contain rounded-xl shadow-2xl bg-black ${
            isVertical ? 'max-h-full w-auto max-w-full' : 'max-w-full h-auto max-h-full'
          }`}
          onClick={(e) => e.stopPropagation()} // previne fechar ao clicar no player
        />
      </div>

      {/* Navegação Direita */}
      {currentIndex < videos.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all z-10"
          title="Próximo"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}
