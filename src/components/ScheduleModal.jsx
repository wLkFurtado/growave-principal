import { useEffect } from 'react';
import { useIsMobile } from '../hooks/useBreakpoint';

export default function ScheduleModal({ isOpen, onClose }) {
  const isMobile = useIsMobile();

  // Pré-carrega o script assim que o componente monta (não espera o modal abrir)
  useEffect(() => {
    if (document.querySelector('script[src="https://link.growave.com.br/js/form_embed.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://link.growave.com.br/js/form_embed.js';
    document.body.appendChild(script);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: isMobile ? '100%' : '95%',
          maxWidth: 600,
          maxHeight: isMobile ? '90dvh' : '85dvh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: isMobile ? '20px 20px 0 0' : 16,
          overflow: 'hidden',
          ...(isMobile && {
            position: 'fixed', bottom: 0, left: 0, right: 0,
          }),
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: 10, right: 14, background: 'rgba(0,0,0,0.4)',
          border: 'none', color: '#ccc', fontSize: 22, cursor: 'pointer',
          lineHeight: 1, zIndex: 10, borderRadius: '50%',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>×</button>
        <iframe
          src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD"
          id="4QmaMiKwGhzg6kpS0MJD"
          title="survey"
          scrolling="yes"
          style={{
            border: 'none',
            width: '100%',
            flex: 1,
            minHeight: isMobile ? 0 : 520,
            height: isMobile ? '90dvh' : 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
