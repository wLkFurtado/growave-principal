import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, Camera } from 'lucide-react';
import GalleryLightbox from '../components/GalleryLightbox';
import Footer from '../components/Footer';

export default function SeccoEmCasaGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Paginação no client
  const [visibleCount, setVisibleCount] = useState(30);
  
  // Estado do Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const tag = 'secco';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      // Cloudinary Client-Side List API
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Não foi possível carregar as fotos. Verifique se a TAG "secco" foi adicionada às fotos (mesmo que já estejam na pasta) e se o "Resource list" está liberado no Cloudinary.');
      }

      const data = await response.json();
      setImages(data.resources || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 30);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const visibleImages = images.slice(0, visibleCount);

  return (
    <div className="bg-black min-h-screen font-body text-white relative selection:bg-[#4ade80]/30 selection:text-white">
      {/* Navbar Minimalista para a Galeria */}
      <nav className="fixed w-full z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-[#4ade80] transition-colors group">
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
            <Camera size={16} /> GALERIA DE FOTOS
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            FOTOS <span className="text-[#4ade80]">SECCO EM CASA</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
            Confira os melhores momentos do SECCO EM CASA! Clique nas fotos para ampliar e baixe suas favoritas.
          </p>

          <div className="flex items-center justify-center gap-3 md:gap-6 text-white/40 text-sm md:text-base font-medium flex-wrap">
            <span>{images.length} fotos</span>
            <span className="hidden md:inline">•</span>
            <span>Clique para ampliar</span>
            <span className="hidden md:inline">•</span>
            <span>Download gratuito</span>
          </div>
        </div>

        {loading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`bg-white/5 animate-pulse rounded-2xl w-full ${i % 2 === 0 ? 'h-64' : 'h-96'}`}></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-red-500/20">
            <ImageIcon className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <p className="text-red-400 text-lg px-4">{error}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <ImageIcon className="mx-auto h-12 w-12 text-white/20 mb-4" />
            <p className="text-white/60 text-lg">Nenhuma foto encontrada com a tag "{tag}".</p>
          </div>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {visibleImages.map((img, index) => {
                // Removemos o 'h_400' e 'c_fill' para manter a proporção original e criar o efeito masonry verdadeiro
                const thumbUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_600,q_auto,f_auto/v${img.version}/${img.public_id}.${img.format}`;
                
                return (
                  <div 
                    key={img.public_id} 
                    className="break-inside-avoid relative group cursor-pointer bg-white/5 rounded-2xl overflow-hidden"
                    onClick={() => openLightbox(index)}
                  >
                    <img 
                      src={thumbUrl} 
                      alt="Foto do Evento" 
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>

            {visibleCount < images.length && (
              <div className="mt-16 text-center">
                <button 
                  onClick={loadMore}
                  className="px-8 py-4 bg-white/10 hover:bg-[#4ade80] text-white hover:text-black rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,222,128,0.3)]"
                >
                  Carregar mais fotos
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <GalleryLightbox 
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
}
