import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCounter } from '../hooks/useBreakpoint';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

function AnimatedStat({ num, suffix, title, sub, tag }) {
  const [count, ref] = useCounter(num, 1600);
  const progress = num > 0 ? Math.min(100, Math.round((count / num) * 100)) : 100;

  return (
    <SpotlightCard ref={ref} className="stat-item stat-card">
      <div className="stat-card-top">
        <span className="eyebrow">{tag}</span>
        <span className="stat-live-dot" aria-hidden="true" />
      </div>
      <div className="stat-number">
        {count}<span>{suffix}</span>
      </div>
      <div className="stat-bar" aria-hidden="true">
        <span className="stat-bar-fill" style={{ '--stat-progress': `${progress}%` }} />
      </div>
      <div className="stat-title">{title}</div>
      <p className="stat-sub">{sub}</p>
    </SpotlightCard>
  );
}

export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(ref.current.querySelectorAll('.stat-item'), {
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        y: 34,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
      });
    });
    return () => motion.revert();
  }, []);

  return (
    <section ref={ref} className="stats-section" aria-label="Indicadores da Growave">
      <div className="stats-grid">
        <div className="stat-item stat-intro">
          <p className="eyebrow">TRAÇÃO REAL</p>
          <div className="stat-heading">
            Números<br /><span>Que Falam.</span>
          </div>
          <p className="stat-lead">
            Resultados que refletem o compromisso e o avanço contínuo da Growave em operações reais.
          </p>
        </div>
        <AnimatedStat
          tag="ALCANCE NACIONAL"
          num={40}
          suffix="+"
          title="Empresas Escaladas"
          sub="Negócios e marcas transformadas com tráfego, audiovisual e CRM em todo o Brasil."
        />
        <AnimatedStat
          tag="MATURIDADE DE CAMPO"
          num={6}
          suffix=" Anos"
          title="De Experiência"
          sub="Tração real, engenharia de vendas e marketing orientado a oportunidades comerciais."
        />
      </div>
    </section>
  );
}

