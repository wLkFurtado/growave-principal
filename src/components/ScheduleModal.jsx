import { useEffect } from 'react';

export default function ScheduleModal({ isOpen, onClose }) {
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
        padding: '40px 16px',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 560 }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.5)', border: 'none',
          color: '#fff', fontSize: 18, cursor: 'pointer',
          width: 30, height: 30, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
        }}>×</button>
        <iframe
          src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD"
          id="4QmaMiKwGhzg6kpS0MJD"
          title="survey"
          scrolling="no"
          style={{ border: 'none', width: '100%', display: 'block', minHeight: 600 }}
        />
      </div>
    </div>
  );
}
