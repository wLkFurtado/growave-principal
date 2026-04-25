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
  
  // URL para imagem exibida na tela (tamanho limitado a 1920px para carregar super rápido, qualidade 80)
  const displayUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_1920,q_80,f_auto/v${currentImage.version}/${currentImage.public_id}.${currentImage.format}`;
  
  // URL original para download em alta resolução
  const downloadUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/v${currentImage.version}/${currentImage.public_id}.${currentImage.format}`;

  // Preparar URLs para pré-carregamento (imagem anterior e próxima)
  const prevImgData = currentIndex > 0 ? images[currentIndex - 1] : null;
  const nextImgData = currentIndex < images.length - 1 ? images[currentIndex + 1] : null;
  
  const preloadPrevUrl = prevImgData ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_1920,q_80,f_auto/v${prevImgData.version}/${prevImgData.public_id}.${prevImgData.format}` : null;
  const preloadNextUrl = nextImgData ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_1920,q_80,f_auto/v${nextImgData.version}/${nextImgData.public_id}.${nextImgData.format}` : null;

  const handleDownload = async () => {
    try {
      const response = await fetch(downloadUrl);
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
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Imagens ocultas para pré-carregamento nativo do navegador */}
      {preloadPrevUrl && <link rel="preload" as="image" href={preloadPrevUrl} />}
      {preloadNextUrl && <link rel="preload" as="image" href={preloadNextUrl} />}
      
      {/* Controles do Topo */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <span className="text-white/70 font-mono text-sm">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="flex gap-4">
          <button 
            onClick={handleDownload}
            className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
            title="Baixar foto em alta resolução"
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
          key={currentImage.public_id} // Força recarregar a tag img se mudar, ótimo para animações futuras e evita bugs de src antigo
          src={displayUrl} 
          alt="Foto da Galeria" 
          className="max-w-full max-h-full object-contain select-none shadow-2xl"
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
