import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  'Contato que chega à noite ou no fim de semana fica sem resposta',
  'WhatsApp lotado: o cliente cansa de esperar e procura outro',
  'Cada pessoa da equipe atende de um jeito diferente',
  'Orçamento enviado sem follow-up, e a venda esfria',
  'Investimento em anúncio sem saber o que ele trouxe',
];
const solutions = [
  'Resposta automática em segundos, a qualquer hora',
  'Todas as conversas num só lugar, com histórico',
  'Roteiro de atendimento padronizado, com apoio de IA',
  'Follow-up automático: nenhum orçamento esquecido',
  'Relatórios que mostram o que cada campanha trouxe',
];

export default function Comparison() {
  const ref = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(ref.current.querySelectorAll('.compare-col'), {
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        y: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: 'power2.out',
      });
      gsap.from(ref.current.querySelectorAll('.compare-item'), {
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
        x: -14,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        delay: 0.2,
        ease: 'power2.out',
      });
    });
    return () => motion.revert();
  }, []);

  return (
    <section id="método" ref={ref} className="comparison-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ONDE AS VENDAS SE PERDEM</p>
          <h2>Atrair é só metade.<br /><span>A outra é não perder a venda.</span></h2>
        </div>
        <p>Se algum desses problemas acontece na sua empresa, você está perdendo vendas que já pagou para conseguir.</p>
      </div>

      <div className="comparison-grid">
        <article className="compare-col compare-manual">
          <span className="compare-badge compare-badge-manual">Sem processo</span>
          <h3>Atendimento no improviso</h3>
          <ul className="compare-list">
            {problems.map((p, i) => (
              <li
                key={p}
                className={`compare-item${hoveredRow === i ? ' is-highlighted' : ''}`}
                onPointerEnter={() => setHoveredRow(i)}
                onPointerLeave={() => setHoveredRow(null)}
              >
                <span className="compare-icon compare-icon-manual" aria-hidden="true">
                  <X size={14} strokeWidth={2.2} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </article>

        <SpotlightCard className="compare-col compare-growave">
          <span className="compare-badge compare-badge-growave">Com a Growave</span>
          <h3>Operação conectada</h3>
          <ul className="compare-list">
            {solutions.map((s, i) => (
              <li
                key={s}
                className={`compare-item${hoveredRow === i ? ' is-highlighted' : ''}`}
                onPointerEnter={() => setHoveredRow(i)}
                onPointerLeave={() => setHoveredRow(null)}
              >
                <span className="compare-icon compare-icon-growave" aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </div>
    </section>
  );
}

