import ShineButton from './ui/ShineButton';
import { ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ openModal }) {
  const moveBrand = event => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const el = event.currentTarget;
    el.style.setProperty('--brand-x', `${(x * 7).toFixed(2)}deg`);
    el.style.setProperty('--brand-y', `${(-y * 7).toFixed(2)}deg`);
    el.style.setProperty('--brand-shift-x', `${(x * 22).toFixed(2)}px`);
    el.style.setProperty('--brand-shift-y', `${(y * 18).toFixed(2)}px`);
    el.style.setProperty('--hero-spot-x', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--hero-spot-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    el.dataset.interactive = 'true';
  };
  const resetBrand = event => {
    const el = event.currentTarget;
    el.style.setProperty('--brand-x', '0deg');
    el.style.setProperty('--brand-y', '0deg');
    el.style.setProperty('--brand-shift-x', '0px');
    el.style.setProperty('--brand-shift-y', '0px');
    delete el.dataset.interactive;
  };
  return (
    <section className="hero-v2" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-enter"><span className="status-dot" /> ESTRATÉGIA. CRIATIVIDADE. CRESCIMENTO.</p>
        <h1 id="hero-title" className="hero-enter">
          <span className="hero-line"><span className="hero-line-inner">Sua próxima</span></span>
          <br />
          <span className="hero-line">
            <span className="hero-line-inner hero-line-delay">
              grande{' '}
              <span className="hero-wave-word">
                onda.
                <svg className="hero-wave-svg" viewBox="0 0 180 18" fill="none" aria-hidden="true">
                  <path
                    d="M3 12.5C34 3.5 64 17.5 96 9.5C124 2.5 150 14.5 177 7"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </span>
        </h1>
        <p className="hero-description hero-enter">Sua marca tem potencial. A gente conecta tráfego, conteúdo e tecnologia para transformar esse potencial em novas oportunidades.</p>
        <div className="hero-actions hero-enter">
          <ShineButton className="action-primary" onClick={openModal}>Vamos crescer juntos <ArrowUpRight size={20} /></ShineButton>
          <Link className="action-text" to="/portfolio"><span className="action-play-badge"><Play size={14} /></span> Conheça nosso trabalho</Link>
        </div>
        <div className="hero-note hero-enter"><span>Consultoria inicial gratuita</span><span>Estratégia feita para o seu negócio</span></div>
      </div>
      <div className="hero-art hero-logo-art hero-enter" aria-hidden="true" onPointerMove={moveBrand} onPointerLeave={resetBrand}>
        <span className="hero-art-aura" />
        <div className="brand-depth">
          <div className="brand-composition">
            <div className="brand-symbol-crop">
              <img src="/assets/growave-brand-hero.jpg" alt="" width="1600" height="1600" fetchPriority="high" />
            </div>
            <div className="brand-wordmark-crop">
              <img src="/assets/growave-brand-hero.jpg" alt="" width="1600" height="1600" />
            </div>
            <p className="brand-signature">ESTRATÉGIA EM MOVIMENTO.</p>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#soluções" className="hero-scroll-link">
          Explore o ecossistema
          <span className="hero-scroll-arrow"><ArrowDown size={14} /></span>
        </a>
        <span>TRÁFEGO / AUTOMAÇÃO / AUDIOVISUAL</span>
      </div>
    </section>
  );
}

