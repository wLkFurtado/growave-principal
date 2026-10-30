import ShineButton from './ui/ShineButton';
import HeroWaveStage from './HeroWaveStage';
import { ArrowUpRight, ArrowDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ openModal }) {
  return (
    <section className="hero-v2" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-enter"><span className="status-dot" /> AGÊNCIA DE MARKETING DIGITAL E CRM</p>
        <h1 id="hero-title" className="hero-enter">
          <span className="hero-line"><span className="hero-line-inner">Sua próxima</span></span>
          <br />
          <span className="hero-line">
            <span className="hero-line-inner hero-line-delay">
              grande{' '}
              <span className="hero-wave-word">
                onda
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
          <br />
          <span className="hero-line"><span className="hero-line-inner hero-line-delay">de clientes.</span></span>
        </h1>
        <p className="hero-description hero-enter">Anúncios no Google e no Instagram, vídeos, redes sociais e sites para atrair quem procura o que você vende. E um CRM com automação para nenhum contato ficar sem resposta.</p>
        <div className="hero-actions hero-enter">
          <ShineButton className="action-primary" onClick={openModal}>Agendar diagnóstico gratuito <ArrowUpRight size={20} /></ShineButton>
          <Link className="action-text" to="/portfolio"><span className="action-play-badge"><Play size={14} /></span> Conheça nosso trabalho</Link>
        </div>
        <div className="hero-note hero-enter"><span>+40 empresas atendidas</span><span>6 anos de experiência</span><span>Sem compromisso</span></div>
      </div>
      <HeroWaveStage />
      <div className="hero-bottom">
        <a href="#soluções" className="hero-scroll-link">
          Conheça os serviços
          <span className="hero-scroll-arrow"><ArrowDown size={14} /></span>
        </a>
        <span>TRÁFEGO PAGO / SOCIAL MEDIA / AUDIOVISUAL / SITES / CRM</span>
      </div>
    </section>
  );
}


