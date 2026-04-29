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
        background: isMobile ? '#111' : 'rgba(0,0,0,0.75)',
        backdropFilter: isMobile ? 'none' : 'blur(6px)',
        overflowY: 'auto',
        display: 'flex', justifyContent: 'center',
        padding: isMobile ? '0' : '40px 16px',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobile ? '100%' : 560,
          height: isMobile ? '100dvh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Botão fechar fixo no topo */}
        <div style={{
          flexShrink: 0, height: 48,
          background: isMobile ? '#111' : 'transparent',
          display: 'flex', alignItems: 'center',
          justifyContent: isMobile ? 'flex-end' : 'flex-end',
          padding: '0 16px',
          borderRadius: isMobile ? 0 : '16px 16px 0 0',
        }}>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', fontSize: 18, cursor: 'pointer',
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Iframe ocupa o restante */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <iframe
            src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD"
            id="4QmaMiKwGhzg6kpS0MJD"
            title="survey"
            scrolling="yes"
            style={{
              border: 'none', display: 'block',
              width: '100%', height: '100%',
              minHeight: isMobile ? 0 : 600,
            }}
          />
        </div>
      </div>
    </div>
  );
}
