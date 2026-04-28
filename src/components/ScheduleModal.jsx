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
    <div className="modal-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: '95%', maxWidth: 600, position: 'relative' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: -40, right: 0, background: 'none',
          border: 'none', color: '#A1A1AA', fontSize: 28, cursor: 'pointer', lineHeight: 1, zIndex: 10,
        }}>×</button>
        <iframe
          src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD"
          id="4QmaMiKwGhzg6kpS0MJD"
          title="survey"
          scrolling="no"
          style={{ border: 'none', width: '100%', minHeight: 520, display: 'block' }}
        />
      </div>
    </div>
  );
}
