import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ openModal }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = sectionRef.current;

    gsap.to(bgRef.current, {
      yPercent: 30, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
    });
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        yPercent: 15, xPercent: 5, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
    gsap.to(contentRef.current, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
    });

    if (!isMobile) {
      const onMouse = e => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 2;
        const cy = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(bgRef.current,      { x: cx * -20, y: cy * -20, duration: 1.5, ease: 'power2.out' });
        if (logoRef.current) gsap.to(logoRef.current, { x: cx * 30, y: cy * 10, duration: 1.2, ease: 'power2.out' });
        gsap.to(contentRef.current, { x: cx * 8,   y: cy * 6,   duration: 1.8, ease: 'power2.out' });
      };
      section.addEventListener('mousemove', onMouse);
      return () => section.removeEventListener('mousemove', onMouse);
    }
  }, [isMobile]);

  return (
    <section ref={sectionRef} style={{
      position: 'relative', minHeight: '100dvh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: isMobile ? '100px 20px 60px' : '120px 20px 80px', overflow: 'hidden',
    }}>
      {/* BG image layer */}
      <div ref={bgRef} style={{ position: 'absolute', inset: '-10%', zIndex: -2, willChange: 'transform' }}>
        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop"
          alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.10 }} />
      </div>

      {/* Animated grid background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2, overflow: 'hidden', background: '#050505' }}>
        <div style={{
          position: 'absolute', width: '200%', height: '200%', top: '-50%', left: '-50%',
          backgroundImage: 'linear-gradient(to right, rgba(74,255,90,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,255,90,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(600px) rotateX(18deg)',
          animation: 'moveGrid 20s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(74,255,90,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: -1,
        background: 'linear-gradient(to top, #050505 25%, rgba(5,5,5,0.45) 65%, rgba(5,5,5,0.10))',
      }} />

      {/* Logo watermark */}
      {!isMobile && (
        <div ref={logoRef} style={{
          position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
          zIndex: 0, pointerEvents: 'none', userSelect: 'none', willChange: 'transform',
        }}>
          <img src="/logo.png" alt="" aria-hidden="true"
            style={{ width: 520, opacity: 0.06, filter: 'grayscale(30%) blur(0.5px)', objectFit: 'contain' }} />
        </div>
      )}

      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', bottom: '15%', left: '8%', zIndex: 0, pointerEvents: 'none',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,255,90,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '12%', zIndex: 0, pointerEvents: 'none',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,255,90,0.04) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      {/* Content */}
      <div ref={contentRef} style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1, willChange: 'transform' }}>
        <div className="fade-in-up" style={{ animationDelay: '0s',
          background: 'rgba(17,17,17,0.80)', border: '1px solid #222',
          padding: '8px 18px', borderRadius: 9999, backdropFilter: 'blur(12px)',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <span className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4AFF5A', display: 'inline-block' }} />
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A' }}>
            O Protocolo Growave
          </span>
        </div>

        <h1 className="fade-in-up" style={{
          animationDelay: '0.1s', fontFamily: 'Bebas Neue', fontSize: 'clamp(64px, 12vw, 130px)',
          lineHeight: 0.9, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA',
        }}>
          Transforme seu<br />
          <span style={{ color: '#4AFF5A', fontSize: 'clamp(72px, 13vw, 148px)' }}>Negócio.</span>
        </h1>

        <p className="fade-in-up" style={{
          animationDelay: '0.2s', fontFamily: 'Inter', fontSize: 18, color: '#A1A1AA',
          maxWidth: 620, lineHeight: 1.7, marginTop: 8,
        }}>
          Estratégias personalizadas e tecnologias avançadas de marketing — Tráfego de Precisão, Automação 24/7 e Audiovisual Premium — para escalar vendas e atrair clientes qualificados.
        </p>

        <div className="fade-in-up" style={{ animationDelay: '0.3s', marginTop: 16 }}>
          <button className="ibtn" onClick={openModal} style={{
            background: '#4AFF5A', color: '#050505', fontFamily: 'Inter',
            fontWeight: 700, fontSize: isMobile ? 15 : 17, padding: isMobile ? '16px 28px' : '18px 40px', borderRadius: 9999,
            boxShadow: '0 0 40px rgba(74,255,90,0.30)',
            display: 'inline-flex', alignItems: 'center', gap: 12,
            width: isMobile ? '100%' : 'auto', justifyContent: 'center',
          }}>
            <span>Agendar Consultoria Gratuita</span>
            <span style={{ transition: 'transform 300ms', display: 'inline-block' }}>→</span>
          </button>
        </div>

        <div className="bounce" style={{ marginTop: 32, opacity: 0.45 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A1A1AA' }}>
            Role para Descobrir
          </span>
        </div>
      </div>
    </section>
  );
}
