import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import AutomationFlow from './AutomationFlow';
import SpotlightCard from './ui/SpotlightCard';

gsap.registerPlugin(ScrollTrigger);

const ganhos = [
  ['Nenhum contato sem resposta', 'O lead recebe retorno em segundos, mesmo fora do horário comercial.'],
  ['Sua equipe sabe o próximo passo', 'O histórico fica no mesmo lugar, sem perguntar de novo o que o cliente já contou.'],
  ['Do interesse até a agenda', 'Confirmação e lembrete automáticos para reduzir falta e remarcação.'],
];

export default function FlowSection({ openModal }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(sectionRef.current.querySelectorAll('.flow-gain-item'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        x: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
      });
      gsap.from(sectionRef.current.querySelector('.flow-section-diagram'), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
      });
    });
    return () => motion.revert();
  }, []);

  return (
    <section ref={sectionRef} id="operação" className="flow-section">
      <div className="flow-section-copy">
        <p className="eyebrow">02 / A OPERAÇÃO POR DENTRO</p>
        <h2>Do primeiro contato<br /><span>ao cliente fechado.</span></h2>
        <p className="flow-section-lead">Qualquer caminho que o cliente tome passa pelo mesmo CRM. É isso que faz anúncio, site, WhatsApp e agenda funcionarem como uma coisa só, e não como cinco ferramentas separadas.</p>
        <dl className="flow-gains">
          {ganhos.map(([titulo, texto]) => (
            <div key={titulo} className="flow-gain-item">
              <dt>{titulo}</dt>
              <dd>{texto}</dd>
            </div>
          ))}
        </dl>
        <button className="action-text" onClick={openModal}>Quero esse fluxo rodando <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>

      <SpotlightCard className="flow-section-diagram">
        <AutomationFlow />
      </SpotlightCard>
    </section>
  );
}

