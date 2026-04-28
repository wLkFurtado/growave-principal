import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ openModal }) {
  const wrapRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const showAnim = gsap.from(wrapRef.current, {
      yPercent: -150, paused: true, duration: 0.3, ease: 'power2.out',
    }).progress(1);

    const st1 = ScrollTrigger.create({
      start: 'top -120px', end: 99999,
      onUpdate: self => self.direction === -1 ? showAnim.play() : showAnim.reverse(),
    });
    const st2 = ScrollTrigger.create({
      start: 'top -50px', end: 99999,
      onToggle: self => setScrolled(self.isActive),
    });
    return () => { st1.kill(); st2.kill(); };
  }, []);

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', top: 16, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', padding: '0 16px', zIndex: 100,
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', maxWidth: 1200, padding: '8px 20px 8px 16px',
        borderRadius: 9999,
        background: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(17,17,17,0.30)',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 500ms ease',
      }}>
        <img src="/logo-horizontal.png" alt="Growave"
          style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        {!isMobile && (
          <div style={{ display: 'flex', gap: 32, fontFamily: 'Inter', fontSize: 13, fontWeight: 600 }}>
            {['Soluções', 'Método', 'Estratégia'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                style={{ color: '#EAEAEA', textDecoration: 'none', transition: 'color 200ms' }}
                onMouseEnter={e => e.target.style.color = '#4AFF5A'}
                onMouseLeave={e => e.target.style.color = '#EAEAEA'}
              >{l}</a>
            ))}
          </div>
        )}
        <button className="ibtn" onClick={openModal} style={{
          background: '#4AFF5A', color: '#050505', fontFamily: 'Inter',
          fontWeight: 700, fontSize: 13, padding: '10px 22px', borderRadius: 9999,
        }}>
          <span>Agendar Consultoria</span>
        </button>
      </nav>
    </div>
  );
}
