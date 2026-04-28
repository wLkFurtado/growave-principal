import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', tag: '10 dias', title: 'Diagnóstico & Onboarding', desc: 'Reunião de início para mapear seu histórico, metas, gargalos de venda e posicionamento. Auditoria completa do ecossistema digital e coleta de materiais de marca.' },
  { id: '02', tag: '30 dias', title: 'Implementação & Estrutura', desc: 'Com todas as informações mapeadas, construímos a estratégia de tráfego, estruturamos o CRM, ativamos as automações e produzimos os primeiros criativos e anúncios.' },
  { id: '03', tag: '90–360 dias', title: 'Performance & Escala Contínua', desc: 'Fase de tração real. Escalamos o que funciona, testamos novas hipóteses e monitoramos cada indicador com dashboards em tempo real.' },
];

const GraphicCircle = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <div className="spin" style={{ width: 120, height: 120, border: '1px solid #4AFF5A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(74,255,90,0.15)' }}>
      <div className="spin-r" style={{ width: 76, height: 76, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 36, height: 36, border: '1px solid rgba(74,255,90,0.4)', borderRadius: '50%' }} />
      </div>
    </div>
  </div>
);

const GraphicBar = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 40px' }}>
    <div style={{ width: '100%', height: 3, background: '#4AFF5A', borderRadius: 9999, position: 'relative', overflow: 'hidden', boxShadow: '0 0 12px rgba(74,255,90,0.4)' }}>
      <div className="ping-bar" style={{ position: 'absolute', top: 0, width: '28%', height: '100%', background: 'white', borderRadius: 9999, boxShadow: '0 0 16px rgba(255,255,255,0.9)' }} />
    </div>
  </div>
);

const GraphicSparkline = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <svg viewBox="0 0 100 50" style={{ width: 220, fill: 'transparent', stroke: '#4AFF5A', strokeWidth: 2, filter: 'drop-shadow(0 0 8px rgba(74,255,90,0.5))' }}>
      <path d="M 0 25 L 20 25 L 30 10 L 45 40 L 60 5 L 75 35 L 85 25 L 100 25" />
    </svg>
  </div>
);

const graphics = [<GraphicCircle />, <GraphicBar />, <GraphicSparkline />];

export default function Protocol() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;

    const getScrollAmt = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmt,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmt()) + window.innerWidth * 0.5}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          setActiveStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
        },
      },
    });

    return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill(); };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="estratégia" style={{ padding: '72px 0', background: '#050505' }}>
        <div style={{ padding: '0 20px', marginBottom: 32 }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 12 }}>/ O Método</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 40, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1 }}>Como Funciona</h2>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 20 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ height: 6, borderRadius: 9999, background: i === activeStep ? '#4AFF5A' : '#2a2a2a', transition: 'all 400ms', width: i === activeStep ? 24 : 6 }} />
          ))}
        </div>

        {/* Horizontal snap scroll */}
        <div
          onScroll={e => {
            const idx = Math.round(e.currentTarget.scrollLeft / (e.currentTarget.offsetWidth - 40));
            setActiveStep(Math.min(steps.length - 1, Math.max(0, idx)));
          }}
          style={{
            display: 'flex', overflowX: 'scroll', gap: 16,
            scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
            padding: '4px 20px 24px',
          }}
        >
          {steps.map((step, idx) => (
            <div key={idx} style={{
              flexShrink: 0, width: 'calc(100vw - 56px)',
              scrollSnapAlign: 'start',
              border: `1px solid ${idx === activeStep ? 'rgba(74,255,90,0.35)' : 'rgba(34,34,34,0.8)'}`,
              borderRadius: 28, background: 'rgba(17,17,17,0.70)', overflow: 'hidden',
              transition: 'border-color 400ms',
            }}>
              <div style={{ padding: '28px 24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 15, color: '#4AFF5A' }}>[{step.id}]</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, background: 'rgba(74,255,90,0.10)', border: '1px solid rgba(74,255,90,0.30)', color: '#4AFF5A', padding: '3px 10px', borderRadius: 9999, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{step.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 28, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1.1, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#A1A1AA', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
              <div style={{ height: 130, background: 'rgba(5,5,5,0.8)', borderTop: '1px solid rgba(34,34,34,0.6)', position: 'relative', overflow: 'hidden' }}>
                {graphics[idx]}
                <div style={{ position: 'absolute', bottom: 4, right: 12, fontFamily: 'Bebas Neue', fontSize: 72, lineHeight: 1, color: 'rgba(74,255,90,0.04)', userSelect: 'none' }}>{step.id}</div>
              </div>
            </div>
          ))}
          {/* Trailing spacer so last card snaps correctly */}
          <div style={{ flexShrink: 0, width: 4 }} />
        </div>

        <div className="bounce" style={{ textAlign: 'center', opacity: 0.35 }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A1A1AA' }}>Deslize para avançar →</span>
        </div>
      </section>
    );
  }

  return (
    <section id="estratégia" ref={sectionRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#050505' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
        padding: '40px 64px 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        pointerEvents: 'none',
      }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 10 }}>/ O Método</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(36px,5vw,60px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1 }}>Como Funciona</h2>
        </div>
        <div style={{ display: 'flex', gap: 12, pointerEvents: 'auto' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em', color: i === activeStep ? '#4AFF5A' : '#444', transition: 'color 400ms' }}>{s.id}</span>
              <div style={{ height: 8, borderRadius: 9999, background: i === activeStep ? '#4AFF5A' : '#2a2a2a', transition: 'all 500ms', width: i === activeStep ? 28 : 8 }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.4, pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A1A1AA' }}>Role para avançar</span>
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <path d="M0 6h24M19 1l6 5-6 5" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div ref={trackRef} style={{
        position: 'absolute', top: 0, left: 0, height: '100%',
        display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 60,
        willChange: 'transform',
      }}>
        <div style={{ flexShrink: 0, width: '10vw' }} />
        {steps.map((step, idx) => (
          <div key={idx} style={{ flexShrink: 0, marginRight: 24, width: 'min(85vw, 760px)' }}>
            <div style={{
              height: '100%', minHeight: 420,
              border: `1px solid ${idx === activeStep ? 'rgba(74,255,90,0.35)' : 'rgba(34,34,34,0.8)'}`,
              borderRadius: 40, background: 'rgba(17,17,17,0.70)', overflow: 'hidden',
              display: 'flex', flexDirection: 'row',
              boxShadow: idx === activeStep ? '0 0 40px rgba(74,255,90,0.08)' : 'none',
              transition: 'border-color 700ms, box-shadow 700ms',
            }}>
              <div style={{ flex: '0 0 55%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 18, color: '#4AFF5A' }}>[{step.id}]</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, background: 'rgba(74,255,90,0.10)', border: '1px solid rgba(74,255,90,0.30)', color: '#4AFF5A', padding: '3px 10px', borderRadius: 9999, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{step.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1.1 }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: 15, color: '#A1A1AA', lineHeight: 1.75, maxWidth: 340 }}>{step.desc}</p>
              </div>
              <div style={{ flex: '0 0 45%', position: 'relative', background: 'rgba(5,5,5,0.8)', borderLeft: '1px solid rgba(34,34,34,0.6)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0 }}>{graphics[idx]}</div>
                <div style={{ position: 'absolute', bottom: 8, right: 16, fontFamily: 'Bebas Neue', fontSize: 'clamp(80px,10vw,120px)', lineHeight: 1, color: 'rgba(74,255,90,0.04)', userSelect: 'none', pointerEvents: 'none' }}>{step.id}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ flexShrink: 0, width: '10vw' }} />
      </div>
    </section>
  );
}
