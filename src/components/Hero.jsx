import ShineButton from './ui/ShineButton';
import HeroWaveStage from './HeroWaveStage';
import { ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ openModal }) {
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
      <HeroWaveStage />
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


