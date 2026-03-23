import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-elem", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container}
      className="relative w-full h-[100dvh] flex items-center justify-center text-center px-4 md:px-8 overflow-hidden pt-20"
    >
      <div className="absolute inset-0 w-full h-full z-[-2]">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop" 
          alt="Tech Dark Background" 
          className="w-full h-full object-cover object-center opacity-30" 
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-background via-background/60 to-background/30 z-[-1]" />

      {/* Large faded logo watermark - decorative */}
      <div className="absolute right-[-5%] md:right-[5%] top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
        <img 
          src="/logo.png" 
          alt="" 
          aria-hidden="true"
          className="w-[420px] md:w-[560px] lg:w-[680px] opacity-[0.06] object-contain" 
          style={{ filter: 'grayscale(30%) blur(0.5px)' }}
        />
      </div>

      <div className="max-w-5xl flex flex-col items-center gap-6">
        <div className="hero-elem bg-surface/80 border border-border px-4 py-2 rounded-full mb-2 backdrop-blur-md inline-block">
          <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            O Protocolo Growave
          </span>
        </div>

        <h1 className="hero-elem text-6xl md:text-8xl lg:text-[8rem] font-heading text-textDefault leading-[0.85] tracking-wide uppercase">
          Transforme seu <br className="hidden md:block"/>
          <span className="text-primary text-7xl md:text-9xl lg:text-[9rem]">Negócio</span>.
        </h1>
        
        <p className="hero-elem text-textMuted font-body text-lg md:text-xl max-w-2xl mt-4">
          Estratégias personalizadas e tecnologias avançadas de marketing (Tráfego de Precisão, Automação 24/7 e Audiovisual Premium) para escalar vendas e atrair clientes qualificados em qualquer nicho.
        </p>

        <div className="hero-elem mt-8">
          <button className="interactive-btn group bg-primary text-background font-body font-bold px-10 py-5 rounded-full text-lg shadow-glow-strong">
            <span className="interactive-btn-content flex items-center gap-3">
              Agendar Consultoria Gratuita
              <span className="block transition-transform duration-300 group-hover:translate-x-2">→</span>
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hero-elem">
        <span className="font-mono text-xs tracking-widest uppercase">Role para Descobrir</span>
      </div>
    </section>
  );
};

export default Hero;
