import { useEffect } from 'react';
import { useIsMobile } from '../hooks/useBreakpoint';

export default function ScheduleModal({ isOpen, onClose }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (document.querySelector('script[src="https://link.growave.com.br/js/form_embed.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://link.growave.com.br/js/form_embed.js';
    document.body.appendChild(script);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        overflowY: 'auto',
        display: 'flex', justifyContent: 'center',
        padding: isMobile ? '0' : '40px 16px',
        alignItems: isMobile ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobile ? '100%' : 560,
          height: isMobile ? '82dvh' : 'auto',
          maxHeight: isMobile ? '82dvh' : 'none',
          borderRadius: isMobile ? '20px 20px 0 0' : 16,
          overflow: isMobile ? 'hidden' : 'visible',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Barra de arraste + botão fechar — mobile */}
        {isMobile && (
          <div style={{
            flexShrink: 0, height: 44, background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '20px 20px 0 0', position: 'relative',
          }}>
            <div style={{ width: 36, height: 4, background: '#444', borderRadius: 9999 }} />
            <button onClick={onClose} style={{
              position: 'absolute', right: 14,
              background: 'none', border: 'none', color: '#888',
              fontSize: 22, cursor: 'pointer', lineHeight: 1,
            }}>×</button>
          </div>
        )}

        {/* Iframe com scroll interno no mobile */}
        <div style={{ flex: 1, overflowY: isMobile ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch', position: 'relative' }}>
          {!isMobile && (
            <button onClick={onClose} style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(0,0,0,0.5)', border: 'none',
              color: '#fff', fontSize: 18, cursor: 'pointer',
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}>×</button>
          )}
          <iframe
            src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD"
            id="4QmaMiKwGhzg6kpS0MJD"
            title="survey"
            scrolling={isMobile ? 'yes' : 'no'}
            style={{ border: 'none', width: '100%', display: 'block', minHeight: isMobile ? '100%' : 600 }}
          />
        </div>
      </div>
    </div>
  );
}
