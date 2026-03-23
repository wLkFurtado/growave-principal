import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PainSection = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".pain-line", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const questions = [
    "Você tem um parceiro de marketing que você verdadeiramente confia, admira o trabalho e que te entrega resultados mensuráveis?",
    "Você tem clareza dos seus indicadores de crescimento? Sabe exatamente quais engrenagens mexer pra vender mais?",
    "Você cobra leads no WhatsApp, esquece de fazer follow-up e perde oportunidades que custaram caro para atrair?",
    "Você não tem um processo de vendas claro e replicável — depende do humor e do esforço individual do seu time?",
    "Você investe em anúncios mas não sabe exatamente qual campanha gerou qual venda?",
  ];

  return (
    <section ref={ref} className="py-32 px-4 md:px-16 container mx-auto max-w-5xl">
      <div className="mb-14">
        <p className="text-sm font-mono uppercase tracking-widest text-primary mb-4">/ O Diagnóstico Inicial</p>
        <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-wide text-white">
          Olhe para o seu <br /> negócio hoje.
        </h2>
        <p className="text-textMuted mt-4 text-lg max-w-2xl font-body">
          Responda honestamente às perguntas abaixo. Se qualquer uma delas causar desconforto, você já sabe o que precisa mudar.
        </p>
      </div>

      <ul className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <li key={i} className="pain-line flex items-start gap-5 border border-border/40 rounded-2xl p-6 bg-surface/30 hover:border-primary/30 transition-colors">
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center">
              <X size={14} className="text-red-500" />
            </div>
            <p className="font-body text-textDefault/90 text-base md:text-lg leading-relaxed">{q}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 bg-primary/5 border border-primary/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-glow">
        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">A Conclusão</p>
          <h3 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-white">
            Existe um método para que seu negócio nunca pare de crescer.
          </h3>
          <p className="text-textMuted mt-3 font-body">
            Se você não seguí-lo, você tende a continuar patinando enquanto concorrentes menos qualificados avançam.
          </p>
        </div>
        <button className="interactive-btn shrink-0 bg-primary text-background font-body font-bold px-8 py-4 rounded-full text-base shadow-glow-strong group">
          <span className="interactive-btn-content flex items-center gap-2">
            Quero o Diagnóstico
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default PainSection;
