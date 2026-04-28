import { useIsMobile } from '../hooks/useBreakpoint';

export default function Pricing({ openModal }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '60px 20px 80px' : '80px 40px 100px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{
        background: '#111', border: '1px solid rgba(74,255,90,0.20)', borderRadius: isMobile ? 28 : 40,
        padding: isMobile ? '48px 28px' : '72px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden',
        transition: 'transform 300ms, box-shadow 300ms, border-color 300ms',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)'; e.currentTarget.style.borderColor = 'rgba(74,255,90,0.50)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(74,255,90,0.12)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(74,255,90,0.20)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{
          position: 'absolute', top: 0, right: 32,
          background: 'rgba(74,255,90,0.10)', border: '1px solid rgba(74,255,90,0.30)',
          color: '#4AFF5A', padding: '4px 14px', borderRadius: '0 0 12px 12px',
          fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>Exclusivo</div>

        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 72, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 28, filter: 'drop-shadow(0 0 15px rgba(74,255,90,0.25))' }}>Investimento</h2>

        <p style={{ fontFamily: 'Inter', fontSize: 18, color: 'rgba(234,234,234,0.9)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 48px' }}>
          Entendemos que <strong style={{ color: '#4AFF5A' }}>cada negócio é único.</strong> É por isso que não temos uma tabela fixa de preços. Quero garantir que você <strong style={{ color: '#4AFF5A' }}>pague pelo que realmente precisa</strong>, sem surpresas ou custos extras.
        </p>

        <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 40, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 20 }}>
          Mas, calma! Te darei uma consultoria gratuita
        </h3>

        <p style={{ fontFamily: 'Inter', fontSize: 16, color: '#A1A1AA', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
          Antes de falarmos de números, <strong style={{ color: '#4AFF5A' }}>quero conhecer a fundo a sua empresa.</strong> Ofereço um encontro inicial sem custos para explorarmos suas metas.
        </p>

        <button className="ibtn" onClick={openModal} style={{
          background: '#4AFF5A', color: '#050505', fontFamily: 'Bebas Neue',
          fontSize: 22, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '20px 52px', borderRadius: 9999,
          display: 'inline-flex', alignItems: 'center', gap: 12,
        }}>
          <span>Agendar Reunião de Diagnóstico</span>
          <span>→</span>
        </button>
      </div>
    </section>
  );
}
