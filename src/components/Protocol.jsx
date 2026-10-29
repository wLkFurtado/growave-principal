import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Layers, TrendingUp, ArrowUpRight } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', icon: Search, tag: 'DIAGNÓSTICO', title: 'Primeiro, entendemos.', desc: 'Mergulhamos no seu negócio, identificamos oportunidades e alinhamos objetivos. Toda boa estratégia começa com as perguntas certas.' },
  { id: '02', icon: Layers, tag: 'IMPLEMENTAÇÃO', title: 'Depois, conectamos.', desc: 'Tráfego, CRM, automações e conteúdo passam a trabalhar juntos. Cada entrega tem uma função no crescimento da sua marca.' },
  { id: '03', icon: TrendingUp, tag: 'EVOLUÇÃO', title: 'E seguimos evoluindo.', desc: 'Analisamos os resultados, testamos novas ideias e aprimoramos a estratégia. Crescimento é um trabalho contínuo.' },
];

export default function Protocol() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const bars = sectionRef.current?.querySelectorAll('.process-progress-fill');
      if (bars?.length) {
        gsap.fromTo(
          bars,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.75,
            stagger: 0.25,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
          }
        );
      }
    });
    return () => motion.revert();
  }, []);

  return (
    <section ref={sectionRef} className="process-section" id="estratégia">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / COMO ACONTECE</p>
          <h2>Uma direção clara.<br /><span>Cada passo conectado.</span></h2>
        </div>
        <p>Da primeira conversa à próxima conquista, você acompanha o caminho.</p>
      </div>
      <div className="process-grid">
        {steps.map(({ id, icon: Icon, tag, title, desc }) => (
          <SpotlightCard className="process-card" key={id}>
            <span
              className="process-progress-track"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'block',
                height: '2px',
                maxHeight: '2px',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <span
                className="process-progress-fill"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  maxHeight: '2px',
                }}
              />
            </span>
            <div className="process-top">
              <span>{id}</span>
              <Icon size={26} strokeWidth={1.4} />
            </div>
            <p className="eyebrow">{tag}</p>
            <h3>{title}</h3>
            <p>{desc}</p>
            <ArrowUpRight className="process-arrow" size={22} />
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

