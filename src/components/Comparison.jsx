import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  'Vendas dependentes de esforço humano e horário comercial',
  'Atendimento com gargalos (demora a responder, almoço, folga)',
  'Falta de padronização nas abordagens comerciais',
  'Esquecimento de follow-ups e leads caindo no esquecimento',
  'Nenhuma visibilidade sobre o ROI real de cada campanha',
];
const solutions = [
  'Máquina de captação e atendimento 24h por dia',
  'Automações que vendem e nutrem enquanto você descansa',
  'Script IA validado e sempre 100% consistente',
  'CRM próprio: zero esquecimento, histórico completo de cada lead',
  'Dashboard de resultados com rastreamento ponta-a-ponta',
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
          <p className="eyebrow">CONTRASTE OPERACIONAL</p>
          <h2>O Problema <span>vs. A Solução.</span></h2>
        </div>
        <p>Pare de perder vendas e desgastar sua equipe. Automatize os processos mecânicos e ganhe escala real.</p>
      </div>

      <div className="comparison-grid">
        <article className="compare-col compare-manual">
          <span className="compare-badge compare-badge-manual">A Maioria das Empresas</span>
          <h3>Processos Manuais</h3>
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
          <span className="compare-badge compare-badge-growave">O Padrão Growave</span>
          <h3>Sistema Full-Stack</h3>
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

