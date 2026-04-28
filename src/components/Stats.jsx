import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile, useIsTablet, useCounter } from '../hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

function AnimatedStat({ num, suffix, title, sub }) {
  const [count, ref] = useCounter(num, 1600);
  const isMobile = useIsMobile();
  return (
    <div ref={ref} className="stat-item" style={{
      borderLeft: isMobile ? 'none' : '1px solid #222',
      borderTop: isMobile ? '1px solid #222' : 'none',
      paddingLeft: isMobile ? 0 : 48,
      paddingTop: isMobile ? 32 : 0,
    }}>
      <div style={{ fontFamily: 'Bebas Neue', fontSize: 80, color: '#EAEAEA', lineHeight: 1, letterSpacing: '0.04em' }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: '#4AFF5A', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 8 }}>{title}</div>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#A1A1AA', marginTop: 6, lineHeight: 1.6 }}>{sub}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.stat-item'), {
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
    });
  }, []);

  return (
    <section ref={ref} style={{
      background: '#030303', borderTop: '1px solid #222', borderBottom: '1px solid #222',
      padding: isMobile ? '60px 24px' : '80px 40px',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto', display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 40 : 0,
      }}>
        <div className="stat-item" style={{ paddingRight: 48 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 64, color: '#4AFF5A', lineHeight: 1, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Números<br />Que Falam
          </div>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#A1A1AA', marginTop: 12, lineHeight: 1.6, maxWidth: 260 }}>
            Resultados que refletem o compromisso e o avanço contínuo da Growave.
          </p>
        </div>
        <AnimatedStat num={40} suffix="+" title="Empresas Escaladas" sub="Negócios e marcas transformadas em todo o Brasil." />
        <AnimatedStat num={6} suffix=" Anos" title="De Experiência" sub="Tração real, engenharia de vendas e marketing de resultados." />
      </div>
    </section>
  );
}
