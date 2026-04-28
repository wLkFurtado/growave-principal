import { useIsMobile, useIsTablet } from '../hooks/useBreakpoint';

export default function Footer() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  return (
    <footer style={{
      background: '#030303', borderTop: '1px solid #222',
      borderRadius: isMobile ? '2rem 2rem 0 0' : '4rem 4rem 0 0',
      padding: isMobile ? '56px 24px 40px' : '80px 64px 48px', marginTop: 32,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr', gap: isMobile ? 40 : 48, marginBottom: 48 }}>
        <div>
          <img src="/logo-horizontal.png" alt="Growave" style={{ height: 44, objectFit: 'contain', marginBottom: 20 }} />
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#A1A1AA', maxWidth: 320, lineHeight: 1.7, marginBottom: 28 }}>
            Uma agência de Full-Service focada na Tríade do Crescimento: Tráfego, Automação e Audiovisual.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(17,17,17,0.50)', border: '1px solid #222', borderRadius: 9999, padding: '8px 16px' }}>
            <span className="pulse" style={{ width: 10, height: 10, background: '#4AFF5A', borderRadius: '50%', boxShadow: '0 0 8px rgba(74,255,90,0.6)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A1A1AA' }}>SYSTEM OPERATIONAL</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: '#EAEAEA', letterSpacing: '0.06em', marginBottom: 4 }}>Serviços</h4>
          {['Performance Ads', 'Integração CRM', 'Produção de Vídeo', 'Landing Pages'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'Inter', fontSize: 13, color: '#A1A1AA', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => e.target.style.color = '#4AFF5A'}
              onMouseLeave={e => e.target.style.color = '#A1A1AA'}
            >{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h4 style={{ fontFamily: 'Bebas Neue', fontSize: 20, color: '#EAEAEA', letterSpacing: '0.06em', marginBottom: 4 }}>Contato</h4>
          {['contato@growave.com.br', '+55 22 98161-1733'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'Inter', fontSize: 13, color: '#A1A1AA', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => e.target.style.color = '#4AFF5A'}
              onMouseLeave={e => e.target.style.color = '#A1A1AA'}
            >{l}</a>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {['in', 'ig'].map(s => (
              <div key={s} style={{
                width: 40, height: 40, borderRadius: '50%', border: '1px solid #222',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter', fontSize: 12, color: '#A1A1AA', cursor: 'pointer',
                transition: 'border-color 200ms, color 200ms',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#4AFF5A'; e.currentTarget.style.color = '#4AFF5A'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#A1A1AA'; }}
              >{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', borderTop: '1px solid #222', paddingTop: 28, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 16 : 0 }}>
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#A1A1AA' }}>© {new Date().getFullYear()} Growave. Todos os direitos reservados.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Política de Privacidade', 'Termos de Uso'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'Inter', fontSize: 12, color: '#A1A1AA', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => e.target.style.color = '#EAEAEA'}
              onMouseLeave={e => e.target.style.color = '#A1A1AA'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
