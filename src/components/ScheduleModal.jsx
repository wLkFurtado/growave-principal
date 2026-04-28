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
