import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '../hooks/useBreakpoint';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  'Vendas dependentes de esforço humano e horário comercial',
  'Atendimento com gargalos (demora a responder, almoço, folga)',
  'Falta de padronização nas abordagens comerciais',
  'Esquecimento de follow-ups e leads caindo no esquecimento',
  'Nenhuma visibilidade sobre o ROI real de cada campanha',
];
const solutions = [
  'Máquina de captação e atendimento 24h por dia',
  'Automações que vendem e nutrem enquanto você descansa',
  'Script IA validado e sempre 100% consistente',
  'CRM próprio: zero esquecimento, histórico completo de cada lead',
  'Dashboard de resultados com rastreamento ponta-a-ponta',
];

export default function Comparison() {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.compare-col'), {
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      y: 60, opacity: 0, duration: 1, stagger: 0.25, ease: 'power2.out',
    });
  }, []);

  return (
    <section id="método" ref={ref} style={{ padding: isMobile ? '72px 20px' : '100px 40px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'Bebas Neue', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#EAEAEA', lineHeight: 1 }}>
          O Problema <span style={{ color: '#A1A1AA' }}>vs.</span> A Solução
        </h2>
        <p style={{ fontFamily: 'Inter', color: '#A1A1AA', fontSize: 15, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
          Pare de perder vendas e desgastar sua equipe. Automatize os processos mecânicos e ganhe escala real.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
        <div className="compare-col" style={{ background: 'rgba(17,17,17,0.30)', border: '1px solid rgba(239,68,68,0.20)', borderRadius: 32, padding: 36, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, right: 24, transform: 'translateY(-50%)',
            background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.30)',
            color: 'rgba(239,68,68,0.9)', padding: '4px 14px', borderRadius: 9999,
            fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>A Maioria das Empresas</div>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 30, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.9)', marginBottom: 24 }}>Processos Manuais</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {problems.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: 'rgba(239,68,68,0.7)', flexShrink: 0, marginTop: 2, fontSize: 16 }}>✕</span>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(234,234,234,0.8)', lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="compare-col" style={{ background: 'rgba(74,255,90,0.04)', border: '1px solid rgba(74,255,90,0.30)', borderRadius: 32, padding: 36, position: 'relative', boxShadow: '0 0 40px rgba(74,255,90,0.08)' }}>
          <div style={{
            position: 'absolute', top: 0, right: 24, transform: 'translateY(-50%)',
            background: '#4AFF5A', color: '#050505', padding: '4px 14px', borderRadius: 9999,
            fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>O Padrão Growave</div>
          <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 30, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#4AFF5A', marginBottom: 24 }}>Sistema Full-Stack</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {solutions.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: '#4AFF5A', flexShrink: 0, marginTop: 2, fontSize: 16 }}>✓</span>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#EAEAEA', fontWeight: 500, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
