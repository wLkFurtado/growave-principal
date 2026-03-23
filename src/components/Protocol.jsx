import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const cards = gsap.utils.toArray('.protocol-card');
    
    let ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
        });

        if (cards[i + 1]) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(10px)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      id: "01",
      tag: "10 dias",
      title: "Diagnóstico & Onboarding",
      desc: "Reunião de início para mapear seu histórico, metas, gargalos de venda e posicionamento. Auditoria completa do ecossistema digital e coleta de acessos e materiais de marca para sabermos exatamente onde estamos e para onde vamos.",
      graphic: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-48 h-48 border-[1px] border-primary rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
            <div className="w-32 h-32 border-[1px] border-white/30 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
          </div>
        </div>
      )
    },
    {
      id: "02",
      tag: "30 dias",
      title: "Implementação & Estrutura",
      desc: "Com todas as informações mapeadas, construímos a estratégia de tráfego, estruturamos o CRM, ativamos as automações de WhatsApp e produzimos os primeiros criativos, roteiros e anúncios de alto desempenho.",
      graphic: (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/30" />
          <div className="w-full h-[2px] bg-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/4 h-full bg-white shadow-glow animate-[ping_2s_linear_infinite]" />
          </div>
        </div>
      )
    },
    {
      id: "03",
      tag: "90-360 dias",
      title: "Performance & Escala Contínua",
      desc: "Fase de tração real. Escalamos o que funciona, testamos novas hipóteses e monitoramos cada indicador com dashboards em tempo real. Seu time recebe suporte constante para converter mais com os leads que chegam — sem deixar dinheiro na mesa.",
      graphic: (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-64 fill-transparent stroke-primary stroke-[2] drop-shadow-glow">
            <path d="M 0 25 L 20 25 L 30 10 L 45 40 L 60 5 L 75 35 L 85 25 L 100 25" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="protocol" ref={sectionRef} className="relative">
      <div className="text-center py-24 px-4">
        <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4">/ O Método</p>
        <h2 className="text-5xl md:text-7xl font-heading uppercase tracking-wide text-white">Como Funciona</h2>
        <p className="text-textMuted max-w-xl mx-auto mt-4 font-body">
          Mais que marketing, o seu negócio precisa de um processo de vendas e crescimento estruturado de ponta a ponta.
        </p>
      </div>

      {steps.map((step, idx) => (
        <div 
          key={idx} 
          className="protocol-card w-full h-screen sticky top-0 bg-background flex flex-col md:flex-row items-center justify-between p-8 md:p-24 border-t border-border"
        >
          <div className="md:w-1/2 flex flex-col gap-6 z-10">
            <div className="flex items-center gap-4">
              <span className="font-mono text-primary text-2xl">[{step.id}]</span>
              <span className="bg-primary/10 border border-primary/30 font-mono text-xs text-primary px-3 py-1 rounded-full uppercase tracking-widest">{step.tag}</span>
            </div>
            <h2 className="font-heading font-bold text-5xl md:text-6xl tracking-wide">{step.title}</h2>
            <p className="font-body text-textMuted text-lg max-w-md mt-2 leading-relaxed">
              {step.desc}
            </p>
          </div>
          
          <div className="md:w-1/2 h-64 md:h-full mt-12 md:mt-0 relative overflow-hidden rounded-3xl border border-border/30 bg-surface/30">
            {step.graphic}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Protocol;
