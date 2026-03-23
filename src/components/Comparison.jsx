import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Comparison = () => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".compare-col", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const problems = [
    "Vendas dependentes de esforço humano e horário comercial",
    "Atendimento com gargalos (demora a responder, almoço, folga)",
    "Falta de padronização nas abordagens comerciais",
    "Esquecimento de follow-ups e leads caindo no esquecimento",
    "Nenhuma visibilidade sobre o ROI real de cada campanha"
  ];

  const solutions = [
    "Máquina de captação e atendimento 24h por dia",
    "Automações que vendem e nutrem enquanto você descansa",
    "Script IA validado e sempre 100% consistente",
    "CRM próprio: zero esquecimento, histórico completo de cada lead",
    "Dashboard de resultados com rastreamento ponta-a-ponta"
  ];

  return (
    <section id="comparison" ref={ref} className="py-32 px-4 md:px-16 container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-wide">O Problema <span className="text-textMuted">vs.</span> A Solução</h2>
        <p className="text-textMuted max-w-xl mx-auto mt-4 font-body">Pare de perder vendas e desgastar sua equipe. Automatize os processos mecânicos e ganhe escala real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="compare-col bg-surface/30 border border-red-500/20 rounded-3xl p-8 relative">
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-1 rounded-full text-xs font-mono uppercase tracking-widest">
            A Maioria das Empresas
          </div>
          <h3 className="font-heading text-3xl mb-6 text-red-400 tracking-wide">Processos Manuais</h3>
          <ul className="flex flex-col gap-5">
            {problems.map((p, i) => (
              <li key={i} className="flex gap-4 items-start">
                <AlertCircle className="text-red-500/70 shrink-0 mt-0.5" size={20} />
                <span className="text-textDefault/80 text-sm md:text-base">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="compare-col bg-primary/5 border border-primary/30 rounded-3xl p-8 relative shadow-glow">
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            O Padrão Growave
          </div>
          <h3 className="font-heading text-3xl mb-6 text-primary tracking-wide">Sistema Full-Stack</h3>
          <ul className="flex flex-col gap-5">
            {solutions.map((s, i) => (
              <li key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                <span className="text-white font-medium text-sm md:text-base">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
