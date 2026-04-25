import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Philosophy = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="philosophy" 
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-[#020202] text-textDefault overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2620&auto=format&fit=crop" 
          alt="Abstract Texture" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 container mx-auto px-8 md:px-16 max-w-5xl flex flex-col gap-24">
        
        <div className="reveal-text">
          <p className="text-textMuted font-mono text-sm uppercase tracking-widest mb-4">
            [ O padrão genérico ]
          </p>
          <p className="font-body text-xl md:text-2xl text-textDefault/70">
            A maioria das agências vende <span className="underline decoration-border underline-offset-4">seguidores, alcance e &ldquo;presença digital&rdquo;</span> — e manda relatório de vaidade no fim do mês.
          </p>
          <p className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] mt-6 text-primary leading-none tracking-wide uppercase">
            Nós entregamos <br/> Receita.
          </p>
        </div>

        <div className="reveal-text">
          <p className="text-textMuted font-mono text-sm uppercase tracking-widest mb-4">
            [ O gargalo real ]
          </p>
          <p className="font-body text-xl md:text-2xl text-textDefault/70">
            A maioria das empresas não tem problema de geração de leads. <span className="underline decoration-border underline-offset-4">Tem problema de conversão e de processo de vendas.</span>
          </p>
          <p className="font-heading italic text-5xl md:text-7xl lg:text-[6rem] mt-6 text-white leading-none tracking-wide uppercase">
            Nós construímos a <br/> <span className="text-primary">Máquina Completa.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
