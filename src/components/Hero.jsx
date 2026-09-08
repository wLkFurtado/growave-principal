import { ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ openModal }) {
  const moveBrand = event => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--brand-x', `${x * 5}deg`);
    event.currentTarget.style.setProperty('--brand-y', `${-y * 5}deg`);
  };
  const resetBrand = event => {
    event.currentTarget.style.setProperty('--brand-x', '0deg');
    event.currentTarget.style.setProperty('--brand-y', '0deg');
  };
  return (
    <section className="hero-v2" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-enter"><span className="status-dot" /> ESTRATÉGIA. CRIATIVIDADE. CRESCIMENTO.</p>
        <h1 id="hero-title" className="hero-enter">Sua próxima<br />grande <span>onda.</span></h1>
        <p className="hero-description hero-enter">Sua marca tem potencial. A gente conecta tráfego, conteúdo e tecnologia para transformar esse potencial em novas oportunidades.</p>
        <div className="hero-actions hero-enter">
          <button className="action-primary" onClick={openModal}>Vamos crescer juntos <ArrowUpRight size={20} /></button>
          <Link className="action-text" to="/portfolio"><Play size={16} /> Conheça nosso trabalho</Link>
        </div>
        <div className="hero-note hero-enter"><span>Consultoria inicial gratuita</span><span>Estratégia feita para o seu negócio</span></div>
      </div>
      <div className="hero-art hero-logo-art hero-enter" aria-hidden="true" onPointerMove={moveBrand} onPointerLeave={resetBrand}>
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
      <div className="hero-bottom"><a href="#soluções">Explore o ecossistema <ArrowDown size={15} /></a><span>TRÁFEGO / AUTOMAÇÃO / AUDIOVISUAL</span></div>
    </section>
  );
}
