import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-24 border-y border-border bg-[#030303] relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        <div className="stat-item flex flex-col gap-2">
          <h2 className="font-heading text-5xl md:text-7xl text-primary leading-none uppercase tracking-wide">Números <br/> Que Falam</h2>
          <p className="text-textMuted font-body text-sm mt-2 max-w-xs mx-auto md:mx-0">
            Resultados que refletem o compromisso e o avanço contínuo da Growave e de nossos parceiros de negócios.
          </p>
        </div>

        <div className="stat-item flex flex-col justify-center border-l-0 md:border-l border-border md:pl-12">
          <span className="font-heading text-7xl md:text-8xl text-white">40+</span>
          <h3 className="font-heading text-xl text-primary tracking-wide uppercase mt-2">Empresas Escaladas</h3>
          <p className="text-textMuted font-body text-sm mt-1">Negócios e marcas transformadas em todo o Brasil.</p>
        </div>

        <div className="stat-item flex flex-col justify-center border-l-0 md:border-l border-border md:pl-12">
          <span className="font-heading text-7xl md:text-8xl text-white">4 <span className="text-4xl">Anos</span></span>
          <h3 className="font-heading text-xl text-primary tracking-wide uppercase mt-2">De Experiência</h3>
          <p className="text-textMuted font-body text-sm mt-1">Tração real, engenharia de vendas e marketing de resultados.</p>
        </div>

      </div>
    </section>
  );
};

export default Stats;
