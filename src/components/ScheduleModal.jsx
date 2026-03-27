import { useEffect } from 'react';

/* eslint-disable react/prop-types */
const ScheduleModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Evitar dublicação do script
      const existingScript = document.getElementById('growave-survey-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://link.growave.com.br/js/form_embed.js';
        script.id = 'growave-survey-script';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      {/* Container do modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl overflow-y-auto border border-white/10 shadow-2xl">
        
        {/* Botão de Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] bg-black/50 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-white/20"
        >
          ✕
        </button>

        {/* Iframe */}
        <div className="p-4 md:p-8 pt-16 min-h-[600px] w-full">
          <iframe 
            src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD" 
            style={{ border: 'none', width: '100%', height: '100%', minHeight: '600px' }} 
            scrolling="yes" 
            id="4QmaMiKwGhzg6kpS0MJD" 
            title="survey"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
