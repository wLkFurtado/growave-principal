import { useEffect, useRef, useState } from 'react';
import { Megaphone, Bot, MessageSquare, FileText, PhoneCall, Headset, CalendarCheck, Handshake, Database, Zap } from 'lucide-react';

// Conector reto: uma linha de 1px com gradiente, cópia borrada atrás e pulso viajante
function Linha({ ativo }) {
  return (
    <div className={`flow-line${ativo ? ' is-active' : ''}`} aria-hidden="true">
      <span className="flow-line-glow" />
      <span className="flow-line-core" />
      <span className="flow-line-pulse" />
    </div>
  );
}

// Ramificação SVG com trilha base + trilha energética animada
function Ramo({ n, sentido, ativo }) {
  const centro = 50;
  const pontos = Array.from({ length: n }, (_, i) => +(((i + 0.5) / n) * 100).toFixed(2));
  const curvas = pontos.map(p => sentido === 'saida'
    ? `M${centro},0 C${centro},50 ${p},50 ${p},100`
    : `M${p},0 C${p},50 ${centro},50 ${centro},100`);

  return (
    <svg
      className={`flow-branch${ativo ? ' is-active' : ''}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {curvas.map(d => (
        <g key={d}>
          <path className="flow-branch-base" d={d} />
          <path className="flow-branch-dash" d={d} />
        </g>
      ))}
    </svg>
  );
}

function No({ icone: Icone, titulo, detalhe, variante = '', ativo = false, onHover }) {
  return (
    <div
      className={`flow-node ${variante}${ativo ? ' is-active' : ''}`}
      onPointerEnter={onHover}
    >
      <div className="flow-node-top">
        {Icone && <Icone size={17} strokeWidth={1.6} aria-hidden="true" />}
        <span>{titulo}</span>
      </div>
      {detalhe && <span className="flow-node-detail">{detalhe}</span>}
    </div>
  );
}

const etapas = [
  {
    titulo: 'GROWAVE', variante: 'flow-node-brand',
    ramo: [
      { icone: Database, titulo: 'CRM', detalhe: 'BASE DE CONTATOS' },
      { icone: Zap, titulo: 'Automações', detalhe: 'RODANDO 24/7' },
    ],
  },
  { icone: Megaphone, titulo: 'O contato chega', detalhe: 'ANÚNCIO · SITE · INSTAGRAM' },
  {
    icone: Bot, titulo: 'Resposta automática', detalhe: 'EM SEGUNDOS, A QUALQUER HORA',
    ramo: [
      { icone: MessageSquare, titulo: 'WhatsApp' },
      { icone: FileText, titulo: 'Formulário' },
      { icone: PhoneCall, titulo: 'Ligação' },
    ],
  },
  { icone: Headset, titulo: 'Atendimento com histórico', detalhe: 'SUA EQUIPE SABE O PRÓXIMO PASSO' },
  { icone: CalendarCheck, titulo: 'Agendamento', detalhe: 'CONFIRMAÇÃO E LEMBRETE' },
  { icone: Handshake, titulo: 'Cliente fechado', detalhe: 'SEM LEAD ESQUECIDO NO CAMINHO', variante: 'flow-node-end' },
];

export default function AutomationFlow() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % etapas.length);
    }, 1700);
    return () => clearInterval(timer);
  }, [inView, paused]);

  return (
    <div
      ref={containerRef}
      className="flow"
      role="img"
      aria-label="Fluxo da operação Growave: o contato chega por anúncio, site ou Instagram, recebe resposta automática por WhatsApp, formulário ou ligação, segue para atendimento com histórico no CRM, agendamento com confirmação e lembrete, e termina em cliente fechado."
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {etapas.map((etapa, i) => {
        const isStepActive = activeStep === i;
        return (
          <div key={etapa.titulo} className={`flow-step${isStepActive ? ' is-step-active' : ''}`}>
            <No
              {...etapa}
              ativo={isStepActive}
              onHover={() => setActiveStep(i)}
            />

            {etapa.ramo && (
              <>
                <Ramo n={etapa.ramo.length} sentido="saida" ativo={isStepActive} />
                <div className="flow-row" style={{ '--cols': etapa.ramo.length }}>
                  {etapa.ramo.map(lado => (
                    <No
                      key={lado.titulo}
                      {...lado}
                      variante="flow-node-side"
                      ativo={isStepActive}
                      onHover={() => setActiveStep(i)}
                    />
                  ))}
                </div>
                <Ramo n={etapa.ramo.length} sentido="entrada" ativo={isStepActive} />
              </>
            )}

            {!etapa.ramo && i < etapas.length - 1 && <Linha ativo={isStepActive} />}
          </div>
        );
      })}
    </div>
  );
}

