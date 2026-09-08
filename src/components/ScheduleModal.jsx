import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
export default function ScheduleModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    if (!document.querySelector('script[src="https://link.growave.com.br/js/form_embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://link.growave.com.br/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [isOpen]);
  return <dialog ref={dialogRef} className="schedule-dialog" aria-label="Agendar consultoria" onCancel={onClose} onClick={e => { if (e.target === dialogRef.current) { const r = e.target.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }}>
    {isOpen && <><button className="schedule-close" aria-label="Fechar agendamento" onClick={onClose}><X size={20} /></button>
      <iframe src="https://link.growave.com.br/widget/survey/4QmaMiKwGhzg6kpS0MJD" id="4QmaMiKwGhzg6kpS0MJD" title="Formulário de agendamento de consultoria" style={{ border: 0, width: '100%', minHeight: 600, display: 'block' }} />
      </>}
  </dialog>;
}
