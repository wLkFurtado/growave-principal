import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      tag: '10 dias',
      title: 'Diagnóstico & Onboarding',
      desc: 'Reunião de início para mapear seu histórico, metas, gargalos de venda e posicionamento. Auditoria completa do ecossistema digital e coleta de acessos e materiais de marca para sabermos exatamente onde estamos e para onde vamos.',
      graphic: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-48 h-48 border-[1px] border-primary rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
            <div className="w-32 h-32 border-[1px] border-white/30 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
          </div>
        </div>
      ),
    },
    {
      id: '02',
      tag: '30 dias',
      title: 'Implementação & Estrutura',
      desc: 'Com todas as informações mapeadas, construímos a estratégia de tráfego, estruturamos o CRM, ativamos as automações de WhatsApp e produzimos os primeiros criativos, roteiros e anúncios de alto desempenho.',
      graphic: (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 relative px-8">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20" />
          <div className="w-full h-[2px] bg-primary relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-1/4 h-full bg-white shadow-glow animate-[ping_2s_linear_infinite]" />
          </div>
        </div>
      ),
    },
    {
      id: '03',
      tag: '90-360 dias',
      title: 'Performance & Escala Contínua',
      desc: 'Fase de tração real. Escalamos o que funciona, testamos novas hipóteses e monitoramos cada indicador com dashboards em tempo real. Seu time recebe suporte constante para converter mais com os leads que chegam — sem deixar dinheiro na mesa.',
      graphic: (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 100 50" className="w-64 fill-transparent stroke-primary stroke-[2]" style={{ filter: 'drop-shadow(0 0 8px rgba(74,255,90,0.5))' }}>
            <path d="M 0 25 L 20 25 L 30 10 L 45 40 L 60 5 L 75 35 L 85 25 L 100 25" />
          </svg>
        </div>
      ),
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    let ctx = gsap.context(() => {
      // Calcula a distância total de scroll horizontal
      const getScrollAmount = () => -(track.scrollWidth - track.offsetWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // end proporcional ao número de cards
          end: () => `+=${Math.abs(getScrollAmount()) + window.innerWidth * 0.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Atualiza o step ativo com base no progresso do scrub
            const idx = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            setActiveStep(idx);
          },
        },
      });

      return () => tween.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="protocol"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-background"
    >
      {/* Header fixo dentro da seção pinada */}
      <div className="absolute top-0 left-0 w-full z-20 pt-10 pb-6 px-8 md:px-20 flex items-end justify-between pointer-events-none">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-1">/ O Método</p>
          <h2 className="text-4xl md:text-5xl font-heading uppercase tracking-wide text-white leading-none">
            Como Funciona
          </h2>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className="font-mono text-[10px] tracking-widest transition-colors duration-300"
                style={{ color: i === activeStep ? '#4AFF5A' : '#555' }}
              >
                {s.id}
              </span>
              <div
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === activeStep ? '28px' : '8px',
                  height: '8px',
                  backgroundColor: i === activeStep ? '#4AFF5A' : '#333',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hint de scroll lateral */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 opacity-40 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted">Role para avançar</span>
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <path d="M0 6h24M19 1l6 5-6 5" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Track horizontal — este é o elemento que se move */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center will-change-transform"
        style={{ paddingTop: '120px', paddingBottom: '60px' }}
      >
        {/* Padding inicial para o primeiro card não ficar colado na esquerda */}
        <div className="shrink-0 w-[8vw] md:w-[10vw]" />

        {steps.map((step, idx) => (
          <div
            key={idx}
            className="protocol-card shrink-0 mr-6 md:mr-10"
            style={{ width: 'min(85vw, 780px)' }}
          >
            <div
              className="h-full rounded-3xl border flex flex-col md:flex-row overflow-hidden transition-all duration-700"
              style={{
                background: 'rgba(17,17,17,0.7)',
                borderColor: idx === activeStep ? 'rgba(74,255,90,0.35)' : 'rgba(34,34,34,0.8)',
                boxShadow: idx === activeStep ? '0 0 40px rgba(74,255,90,0.08)' : 'none',
                minHeight: '420px',
              }}
            >
              {/* Texto */}
              <div className="flex flex-col justify-center gap-5 p-10 md:p-14 md:w-[55%]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-primary text-xl">[{step.id}]</span>
                  <span
                    className="bg-primary/10 border border-primary/30 font-mono text-[10px] text-primary px-3 py-1 rounded-full uppercase tracking-widest"
                  >
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-4xl md:text-5xl tracking-wide leading-tight">
                  {step.title}
                </h3>
                <p className="font-body text-textMuted text-base leading-relaxed max-w-sm">
                  {step.desc}
                </p>
              </div>

              {/* Gráfico */}
              <div
                className="md:w-[45%] flex-1 relative overflow-hidden"
                style={{
                  background: 'rgba(5,5,5,0.8)',
                  borderLeft: '1px solid rgba(34,34,34,0.6)',
                }}
              >
                <div className="absolute inset-0">
                  {step.graphic}
                </div>
                {/* Número grande decorativo */}
                <div
                  className="absolute bottom-4 right-6 font-heading text-[8rem] leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(74,255,90,0.04)' }}
                >
                  {step.id}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Padding final */}
        <div className="shrink-0 w-[8vw] md:w-[10vw]" />
      </div>
    </section>
  );
};

export default Protocol;
