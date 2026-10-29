import { useEffect, useRef } from 'react';
import { TrendingUp, Zap, Clapperboard } from 'lucide-react';

export default function HeroWaveStage() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0.5, y: 0.45, targetX: 0.5, targetY: 0.45, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = null;
    let inView = true;
    let time = 0;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const ptr = pointerRef.current;
      ptr.x += (ptr.targetX - ptr.x) * 0.08;
      ptr.y += (ptr.targetY - ptr.y) * 0.08;

      const px = ptr.x * width;
      const py = ptr.y * height;

      // Brilho atmosférico reativo ao cursor no fundo do canvas
      const radial = ctx.createRadialGradient(px, py, 10, px, py, Math.max(width, height) * 0.55);
      radial.addColorStop(0, ptr.active ? 'rgba(74, 255, 90, 0.16)' : 'rgba(74, 255, 90, 0.08)');
      radial.addColorStop(0.5, 'rgba(22, 58, 32, 0.06)');
      radial.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // 8 linhas de onda topográficas que reagem à posição do mouse
      const lines = 8;
      const stepX = 8;
      for (let i = 0; i < lines; i++) {
        const ratio = i / (lines - 1);
        const baseY = height * (0.18 + ratio * 0.66);
        const alpha = 0.06 + Math.sin(ratio * Math.PI) * (ptr.active ? 0.2 : 0.12);

        ctx.beginPath();
        for (let x = 0; x <= width; x += stepX) {
          const dx = x - px;
          const dy = baseY - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 210);
          const pull = influence * influence * (ptr.active ? 26 : 10) * Math.sin(dist * 0.04 - time * 2.2);

          const wave1 = Math.sin(x * 0.013 + time * 1.3 + i * 0.55) * 9;
          const wave2 = Math.cos(x * 0.007 - time * 0.85 + i * 0.9) * 6;
          const y = baseY + wave1 + wave2 + pull;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(74, 255, 90, ${alpha.toFixed(3)})`;
        ctx.lineWidth = i === 3 || i === 4 ? 1.35 : 0.9;
        ctx.stroke();
      }

      if (!reducedMotion && inView) {
        time += 0.018;
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !reducedMotion) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(drawFrame);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(stage);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const handlePointerMove = event => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const el = event.currentTarget;
    const bounds = el.getBoundingClientRect();
    const normX = (event.clientX - bounds.left) / bounds.width;
    const normY = (event.clientY - bounds.top) / bounds.height;
    const x = normX - 0.5;
    const y = normY - 0.5;

    pointerRef.current.targetX = normX;
    pointerRef.current.targetY = normY;
    pointerRef.current.active = true;

    el.style.setProperty('--brand-x', `${(x * 9).toFixed(2)}deg`);
    el.style.setProperty('--brand-y', `${(-y * 9).toFixed(2)}deg`);
    el.style.setProperty('--brand-shift-x', `${(x * 24).toFixed(2)}px`);
    el.style.setProperty('--brand-shift-y', `${(y * 18).toFixed(2)}px`);
    el.style.setProperty('--hero-spot-x', `${(normX * 100).toFixed(1)}%`);
    el.style.setProperty('--hero-spot-y', `${(normY * 100).toFixed(1)}%`);
    el.dataset.interactive = 'true';
  };

  const handlePointerLeave = event => {
    const el = event.currentTarget;
    pointerRef.current.targetX = 0.5;
    pointerRef.current.targetY = 0.45;
    pointerRef.current.active = false;
    el.style.setProperty('--brand-x', '0deg');
    el.style.setProperty('--brand-y', '0deg');
    el.style.setProperty('--brand-shift-x', '0px');
    el.style.setProperty('--brand-shift-y', '0px');
    delete el.dataset.interactive;
  };

  return (
    <div
      ref={stageRef}
      className="hero-art hero-logo-art hero-enter"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Camada 1: Campo de ondas interativo em Canvas */}
      <canvas ref={canvasRef} className="hero-wave-canvas" />
      <span className="hero-art-aura" />

      {/* Camada 2: Logo 3D com feixes de energia vetoriais sincronizados */}
      <div className="brand-depth">
        <div className="brand-composition">
          <div className="brand-symbol-stage">
            <div className="brand-symbol-crop">
              <img src="/assets/growave-brand-hero.jpg" alt="" width="1600" height="1600" fetchPriority="high" />
            </div>

            {/* Feixes de luz e radar calibrados exatamente sobre a geometria da logo */}
            <svg className="brand-energy-svg" viewBox="0 0 310 200" fill="none">
              <defs>
                <linearGradient id="growaveBeam" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4aff5a" stopOpacity="0" />
                  <stop offset="50%" stopColor="#b0f58b" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <filter id="growaveGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Sonar nos dois pontos orbitais da marca */}
              <circle className="brand-sonar brand-sonar-tl" cx="35.6" cy="24.4" r="14" />
              <circle className="brand-sonar brand-sonar-tl brand-sonar-delay" cx="35.6" cy="24.4" r="14" />
              <circle className="brand-sonar brand-sonar-br" cx="274.4" cy="162.4" r="14" />
              <circle className="brand-sonar brand-sonar-br brand-sonar-delay" cx="274.4" cy="162.4" r="14" />

              {/* Pulso energético na haste inferior esquerda (chevron) */}
              <path
                className="brand-beam-path brand-beam-chevron"
                d="M34 144 L91.5 89.5 L164.3 162.4"
                stroke="url(#growaveBeam)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#growaveGlow)"
              />

              {/* Pulso energético principal subindo pela onda até a ponta da seta */}
              <path
                className="brand-beam-path brand-beam-main"
                d="M119.4 39.9 L189.1 106.6 L272.8 24.4"
                stroke="url(#growaveBeam)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#growaveGlow)"
              />

              {/* Brilho na ponta da seta (arrowhead) */}
              <path
                className="brand-beam-path brand-beam-head"
                d="M217 22.9 L272.8 24.4 L274.4 81.8"
                stroke="#d8ffbe"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#growaveGlow)"
              />

              {/* Ponto de ignição no ápice da seta */}
              <circle className="brand-apex-spark" cx="272.8" cy="24.4" r="5" />
            </svg>
          </div>

          <div className="brand-wordmark-crop">
            <img src="/assets/growave-brand-hero.jpg" alt="" width="1600" height="1600" />
          </div>
          <p className="brand-signature">ESTRATÉGIA EM MOVIMENTO.</p>
        </div>

        {/* Camada 3: Satélites 3D em órbita representando a operação viva */}
        <div className="hero-orbit-card hero-orbit-tl">
          <div className="hero-orbit-head">
            <span className="hero-orbit-icon"><TrendingUp size={13} /></span>
            <span className="hero-orbit-tag">TRÁFEGO & ESCALA</span>
          </div>
          <div className="hero-orbit-metric">
            <span>ROI Rastreado</span>
            <svg className="hero-orbit-sparkline" viewBox="0 0 64 20" fill="none">
              <path d="M2 17 L16 13 L28 15 L42 7 L62 2" stroke="#4aff5a" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="hero-orbit-card hero-orbit-tr">
          <div className="hero-orbit-head">
            <span className="hero-orbit-icon"><Zap size={13} /></span>
            <span className="hero-orbit-tag">CRM & AUTOMAÇÃO</span>
          </div>
          <div className="hero-orbit-status">
            <span className="hero-orbit-live" />
            <span>Resposta em segundos · 24/7</span>
          </div>
        </div>

        <div className="hero-orbit-card hero-orbit-bl">
          <div className="hero-orbit-head">
            <span className="hero-orbit-icon"><Clapperboard size={13} /></span>
            <span className="hero-orbit-tag">AUDIOVISUAL</span>
          </div>
          <div className="hero-orbit-eq">
            <span />
            <span />
            <span />
            <span />
            <span />
            <em>REELS · ADS</em>
          </div>
        </div>
      </div>
    </div>
  );
}
