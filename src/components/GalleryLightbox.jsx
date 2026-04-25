import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useEffect } from 'react';

export default function GalleryLightbox({ images, currentIndex, onClose, onNext, onPrev }) {
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

  if (currentIndex === null || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  // URL para imagem original otimizada
  const imageUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/v${currentImage.version}/${currentImage.public_id}.${currentImage.format}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `secco-em-casa-${currentImage.public_id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao fazer download', error);
      // Fallback
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Controles do Topo */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <span className="text-white/70 font-mono text-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="flex gap-4">
          <button 
            onClick={handleDownload}
            className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
            title="Baixar foto"
          >
            <Download size={24} />
          </button>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
            title="Fechar"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Navegação Esquerda */}
      <button 
        onClick={onPrev}
        className="absolute left-4 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all z-10"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Imagem */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={onClose}>
        <img 
          src={imageUrl} 
          alt="Foto da Galeria" 
          className="max-w-full max-h-full object-contain select-none"
          onClick={(e) => e.stopPropagation()} // Previne fechar ao clicar na imagem
        />
      </div>

      {/* Navegação Direita */}
      <button 
        onClick={onNext}
        className="absolute right-4 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all z-10"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
