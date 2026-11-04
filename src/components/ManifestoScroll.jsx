import { useEffect, useRef, useState } from 'react';

const MANIFESTO_TOKENS = [
  { text: 'Crescer', accent: false },
  { text: 'não', accent: false },
  { text: 'é', accent: false },
  { text: 'postar', accent: false },
  { text: 'no', accent: false },
  { text: 'escuro.', accent: false },
  { text: 'É', accent: false },
  { text: 'unir', accent: false },
  { text: 'direção', accent: true },
  { text: 'estratégica,', accent: true },
  { text: 'imagem', accent: false },
  { text: 'que', accent: false },
  { text: 'impõe', accent: false },
  { text: 'autoridade', accent: true },
  { text: 'e', accent: false },
  { text: 'uma', accent: false },
  { text: 'operação', accent: true },
  { text: 'comercial', accent: true },
  { text: 'que', accent: false },
  { text: 'responde', accent: false },
  { text: 'no', accent: false },
  { text: 'segundo', accent: true },
  { text: 'em', accent: false },
  { text: 'que', accent: false },
  { text: 'o', accent: false },
  { text: 'cliente', accent: false },
  { text: 'decide', accent: false },
  { text: 'agir.', accent: true },
];

const CHAPTERS = [
  {
    num: '01',
    tag: 'DIREÇÃO',
    title: 'Posicionamento claro',
    desc: 'Diagnóstico do momento da empresa antes de gastar um centavo em mídia.',
    threshold: 0.08,
  },
  {
    num: '02',
    tag: 'IMAGEM',
    title: 'Cinema comercial',
    desc: 'Captação, roteiro e edição que seguram a atenção nos primeiros segundos.',
    threshold: 0.34,
  },
  {
    num: '03',
    tag: 'TRAÇÃO',
    title: 'Demanda qualificada',
    desc: 'Tráfego pago no Meta e Google calibrado por intenção real de compra.',
    threshold: 0.58,
  },
  {
    num: '04',
    tag: 'SISTEMA',
    title: 'Atendimento em segundos',
    desc: 'CRM e automação no WhatsApp para nenhum lead esfriar sem resposta.',
    threshold: 0.80,
  },
];

export default function ManifestoScroll() {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      const id = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(id);
    }

    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      const raw = -rect.top / scrollable;
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const wordProgress = Math.min(1, progress * 1.12);
  const percentLabel = String(Math.round(progress * 100)).padStart(3, '0');

  return (
    <section
      id="manifesto"
      ref={wrapRef}
      className="manifesto-scroll-wrap"
      aria-label="Manifesto Growave"
    >
      <div className="manifesto-sticky">
        {/* HUD Superior estilo Viewfinder */}
        <div className="manifesto-hud-top">
          <div className="manifesto-hud-left">
            <span className="manifesto-bracket">┌</span>
            <span className="eyebrow" style={{ marginBottom: 0 }}>00 / MANIFESTO · VISÃO DE CAMPO</span>
          </div>

          <div className="manifesto-hud-progress" aria-hidden="true">
            <span className="manifesto-hud-code">LEITURA [ {percentLabel}% ]</span>
            <div className="manifesto-hud-bar">
              <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
            </div>
          </div>

          <div className="manifesto-hud-right" aria-hidden="true">
            <span>GW // ESTUDIO + PERFORMANCE</span>
            <span className="manifesto-bracket">┐</span>
          </div>
        </div>

        {/* Frase central que acende palavra por palavra conforme o scroll */}
        <div className="manifesto-body">
          <p className="manifesto-statement">
            {MANIFESTO_TOKENS.map((token, idx) => {
              const threshold = idx / MANIFESTO_TOKENS.length;
              const isLit = wordProgress >= threshold;
              return (
                <span
                  key={idx}
                  className={`manifesto-word${token.accent ? ' is-accent' : ''}${isLit ? ' is-lit' : ''}`}
                >
                  {token.text}{' '}
                </span>
              );
            })}
          </p>
        </div>

        {/* 4 Capítulos na base que sobem e acendem conforme os marcos do scroll */}
        <div className="manifesto-chapters">
          {CHAPTERS.map(chapter => {
            const active = progress >= chapter.threshold;
            return (
              <article
                key={chapter.num}
                className={`manifesto-chapter${active ? ' is-active' : ''}`}
              >
                <div className="manifesto-chapter-top">
                  <span className="manifesto-chapter-num">{chapter.num}</span>
                  <span className="manifesto-chapter-tag">{chapter.tag}</span>
                </div>
                <h3>{chapter.title}</h3>
                <p>{chapter.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

