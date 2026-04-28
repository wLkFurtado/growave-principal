import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile, useIsTablet } from '../hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

const extraServices = [
  { title: 'Social Media', desc: 'Gestão completa de redes sociais com postagens diárias, design premium e engajamento focado no seu público.' },
  { title: 'Audiovisual & Filmagens', desc: 'Filmagem presencial cinematográfica, captação 4K, edição de vídeo profissional e reels com ganchos virais.' },
  { title: 'Google Ads & SEO', desc: 'Posicionamento no topo do Google quando os clientes procuram exatamente pela sua solução.' },
  { title: 'CRM Inteligente', desc: 'Nosso CRM próprio organiza e nutre seus leads com automações inteligentes e reativação automática de clientes inativos.' },
  { title: 'Landing Pages', desc: 'Desenvolvimento de páginas de alta velocidade e persuasão projetadas exclusivamente para receber tráfego pago.' },
  { title: 'Clínica com Rumo', desc: 'Método exclusivo da Growave desenhado para clínicas e médicos que querem lotar agendas particulares.' },
];

function MetricCard() {
  const cards = [
    { title: 'Leads Qualificados', value: '+180%', green: true },
    { title: 'CPA Otimizado', value: '-34%', green: false },
    { title: 'ROAS Global', value: '4.2x', green: false },
  ];
  const [top, setTop] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTop(p => (p + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);
  const ordered = [...cards.slice(top), ...cards.slice(0, top)];
  return (
    <div style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {ordered.map((c, i) => (
        <div key={c.title} style={{
          position: 'absolute', width: '80%',
          background: '#0e0e0e', border: '1px solid #222', borderRadius: 16, padding: '20px 24px',
          transform: `translateY(${i * 18}px) scale(${1 - i * 0.08})`,
          opacity: 1 - i * 0.3, zIndex: 10 - i,
          transition: 'all 700ms cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#A1A1AA', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Tráfego (Ads)</span>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: i === 0 ? '#4AFF5A' : '#222' }} />
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.04em', color: '#EAEAEA', textTransform: 'uppercase' }}>{c.title}</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 32, fontWeight: 700, color: c.green ? '#4AFF5A' : '#EAEAEA', marginTop: 6 }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}

function TerminalCard() {
  const lines = [
    '> CRM: Novo lead capturado via anúncio.',
    '> Segmentando perfil automaticamente...',
    '> Lead quente? Notificando equipe de vendas.',
    '> Cliente inativo detectado. Disparando reativação.',
    '> CRM Atualizado. Histórico completo registrado.',
  ];
  const [display, setDisplay] = useState('');
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    if (li >= lines.length) {
      const t = setTimeout(() => { setDisplay(''); setLi(0); setCi(0); }, 2000);
      return () => clearTimeout(t);
    }
    const line = lines[li];
    if (ci < line.length) {
      const t = setTimeout(() => { setDisplay(d => d + line[ci]); setCi(c => c + 1); }, Math.random() * 30 + 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setDisplay(d => d + '\n'); setLi(l => l + 1); setCi(0); }, 500);
      return () => clearTimeout(t);
    }
  }, [ci, li]);

  return (
    <div style={{ height: 200, background: '#000', borderRadius: 14, border: '1px solid #222', padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: 10, marginBottom: 10 }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#4AFF5A', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="pulse" style={{ width: 7, height: 7, background: '#4AFF5A', borderRadius: '50%', display: 'inline-block' }} /> IA CHATBOT
        </span>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#555' }}>CRM.SYS</span>
      </div>
      <pre style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#EAEAEA', whiteSpace: 'pre-wrap', flex: 1, overflow: 'hidden', lineHeight: 1.7 }}>
        {display}<span className="pulse" style={{ display: 'inline-block', width: 8, height: 14, background: '#4AFF5A', verticalAlign: 'middle', marginLeft: 2 }} />
      </pre>
    </div>
  );
}

function CircleCard() {
  return (
    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spin" style={{ width: 160, height: 160, border: '1px solid #4AFF5A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(74,255,90,0.10)' }}>
        <div className="spin-r" style={{ width: 100, height: 100, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 50, height: 50, border: '1px solid rgba(74,255,90,0.4)', borderRadius: '50%' }} />
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    gsap.from(ref.current.querySelector('.feat-heading'), {
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 1, ease: 'power3.out',
    });
    gsap.from(ref.current.querySelectorAll('.feat-main-card'), {
      scrollTrigger: { trigger: ref.current.querySelector('.feat-main-card'), start: 'top 82%' },
      y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
    });
    gsap.from(ref.current.querySelectorAll('.feat-small-card'), {
      scrollTrigger: { trigger: ref.current.querySelector('.feat-small-card'), start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
    });
  }, []);

  const mainCards = [
    { title: 'Escala de Tráfego', desc: 'Distribuímos seu orçamento cirurgicamente. Aplicamos gestão de anúncios avançada para otimizar conversões em tempo real.', graphic: <MetricCard /> },
    { title: 'CRM & Inteligência 24/7', desc: 'Nosso CRM próprio organiza todos os seus leads e dispara automações inteligentes no momento certo.', graphic: <TerminalCard /> },
    { title: 'Agendamento Inteligente', desc: 'Nosso CRM agenda leads de forma automática — cada contato no momento certo, sem deixar oportunidade escapar.', graphic: <CircleCard /> },
  ];

  return (
    <section id="soluções" ref={ref} style={{ padding: isMobile ? '72px 20px' : '100px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="feat-heading" style={{ marginBottom: 56 }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 16 }}>/ Ecossistema de Soluções</div>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1.05, maxWidth: 640 }}>
          Sistemas Interligados para uma Máquina de Vendas Imparável.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {mainCards.map((c, i) => (
          <div key={i} className="feat-main-card" style={{
            border: '1px solid #222', borderRadius: 32, padding: 32, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ marginBottom: 24 }}>{c.graphic}</div>
            <h4 style={{ fontFamily: 'Bebas Neue', fontSize: 28, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: 10 }}>{c.title}</h4>
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#A1A1AA', lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 20 }}>
        {extraServices.map((s, i) => (
          <div key={i} className="feat-small-card" style={{
            background: 'rgba(17,17,17,0.50)', border: '1px solid #222', borderRadius: 24, padding: 24,
            transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
            position: 'relative', overflow: 'hidden',
            ...(i === 5 ? { background: 'rgba(74,255,90,0.04)' } : {}),
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(74,255,90,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <span style={{ color: '#4AFF5A', fontSize: 16 }}>⊕</span>
            </div>
            <h5 style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', marginBottom: 8 }}>{s.title}</h5>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#A1A1AA', lineHeight: 1.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
