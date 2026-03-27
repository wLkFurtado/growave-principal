import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* eslint-disable react/prop-types */
const Navbar = ({ openModal }) => {
  const wrapperRef = useRef(null);
  const innerNavRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const showAnim = gsap.from(wrapperRef.current, { 
        yPercent: -150,
        paused: true,
        duration: 0.3,
        ease: "power2.out"
      }).progress(1);

      ScrollTrigger.create({
        start: "top -150px",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
      });

      ScrollTrigger.create({
        start: 'top -50px',
        end: 99999,
        toggleClass: {
          className: '!bg-background/80 !backdrop-blur-xl border-white/10 shadow-lg',
          targets: innerNavRef.current
        }
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="fixed top-4 left-0 w-full z-[100] flex justify-center px-4">
      <nav 
        ref={innerNavRef}
        className="flex items-center justify-between w-full max-w-7xl px-6 py-2 rounded-full border border-white/5 bg-background/20 backdrop-blur-md transition-all duration-500 ease-out"
      >
        <div className="flex items-center">
          <img 
            src="/logo-horizontal.png" 
            alt="Growave" 
            className="object-contain" 
            style={{ height: '75px', width: '145px' }}  /* ~1.4x scale */
          />
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-body text-sm font-semibold tracking-wide">
          <a href="#features" className="text-textDefault transition-colors hover:text-primary">Soluções</a>
          <a href="#comparison" className="text-textDefault transition-colors hover:text-primary">Método</a>
          <a href="#protocol" className="text-textDefault transition-colors hover:text-primary">Estratégia</a>
        </div>

        <button onClick={openModal} className="interactive-btn bg-primary text-background font-body font-bold text-sm px-6 py-3 rounded-full hover:shadow-glow">
          <span className="interactive-btn-content">Agendar Consultoria</span>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
