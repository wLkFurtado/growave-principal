import { useEffect } from 'react';

export default function ScheduleModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    if (document.querySelector('script[src="https://link.growave.com.br/js/form_embed.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://link.growave.com.br/js/form_embed.js';
    document.body.appendChild(script);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{
        maxWidth: 600, width: '95%', padding: '40px 32px 32px',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, background: 'none',
          border: 'none', color: '#555', fontSize: 22, cursor: 'pointer', lineHeight: 1,
        }}>×</button>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 12 }}>/ Agendar Consultoria</div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 36, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: 24 }}>Vamos Conversar?</h2>
        <iframe
          src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD"
          id="4QmaMiKwGhzg6kpS0MJD"
          title="survey"
          scrolling="no"
          style={{ border: 'none', width: '100%', minHeight: 480, display: 'block' }}
        />
      </div>
    </div>
  );
}
