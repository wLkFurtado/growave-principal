export default function ScheduleModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#555', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>×</button>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 16 }}>/ Agendar Consultoria</div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 40, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: 8 }}>Vamos Conversar?</h2>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#A1A1AA', marginBottom: 28, lineHeight: 1.6 }}>
          Entre em contato para sua consultoria gratuita. Te respondemos em menos de 24h.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {['Seu nome', 'E-mail profissional', 'WhatsApp'].map(placeholder => (
            <input key={placeholder} placeholder={placeholder} style={{
              background: '#0a0a0a', border: '1px solid #222', borderRadius: 12, padding: '14px 18px',
              fontFamily: 'Inter', fontSize: 14, color: '#EAEAEA', outline: 'none', width: '100%',
            }}
              onFocus={e => e.target.style.borderColor = '#4AFF5A'}
              onBlur={e => e.target.style.borderColor = '#222'}
            />
          ))}
        </div>
        <button className="ibtn" style={{
          width: '100%', background: '#4AFF5A', color: '#050505', fontFamily: 'Bebas Neue',
          fontSize: 20, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '16px',
          borderRadius: 9999, boxShadow: '0 0 40px rgba(74,255,90,0.25)',
        }}>
          <span>Enviar Solicitação</span>
        </button>
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#555', letterSpacing: '0.12em' }}>
          SEM COMPROMISSO · 100% GRATUITO
        </div>
      </div>
    </div>
  );
}
