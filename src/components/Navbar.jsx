import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Play } from 'lucide-react';
import ShineButton from './ui/ShineButton';

const links = [
  ['Manifesto', '/#manifesto', 'manifesto'],
  ['Serviços', '/#soluções', 'soluções'],
  ['CRM e automação', '/#operação', 'operação'],
  ['Como funciona', '/#estratégia', 'estratégia'],
  ['Portfólio', '/portfolio', 'portfólio'],
  ['Dúvidas', '/#duvidas', 'duvidas'],
];

const indexChapters = [
  { num: '01', title: 'Abertura & Posicionamento', meta: 'HERO · 3D STAGE', href: '/#conteudo' },
  { num: '02', title: 'Manifesto de Crescimento', meta: 'SCROLL PALAVRA POR PALAVRA', href: '/#manifesto' },
  { num: '03', title: 'Cenário & Soluções Integradas', meta: 'TRÁFEGO · REELS · PÁGINAS', href: '/#soluções' },
  { num: '04', title: 'Fluxo Comercial & Automação', meta: 'WHATSAPP · IA · CRM 24/7', href: '/#operação' },
  { num: '05', title: 'Direção & Método em 3 Passos', meta: 'DIAGNÓSTICO · EXECUÇÃO · ESCALA', href: '/#estratégia' },
  { num: '06', title: 'Portfólio Audiovisual', meta: 'ESTEIRA CINEMA · 9:16 & 16:9', href: '/#portfólio' },
  { num: '07', title: 'Perguntas Frequentes', meta: 'DÚVIDAS DIRETO AO PONTO', href: '/#duvidas' },
  { num: '08', title: 'Agendar Diagnóstico', meta: 'CONVERSA ESTRATÉGICA', href: '/#contato' },
];

export default function Navbar({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsIndexOpen(false);
      }
    };
    const onScroll = () => { setScrolled(window.scrollY > 28); };
    onScroll();
    window.addEventListener('keydown', close);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', close);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const ids = ['manifesto', 'soluções', 'operação', 'estratégia', 'portfólio', 'duvidas'];
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-22% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleReplayIntro = () => {
    setIsIndexOpen(false);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('growave:replay-intro'));
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' site-header-scrolled' : ''}`}>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="/" aria-label="Growave — início" className="nav-brand-link">
            <img src="/logo-horizontal.png" alt="Growave" width="150" height="44" />
          </a>
          <div className="desktop-links">
            {links.map(([label, href, sectionId]) => (
              <a
                key={label}
                href={href}
                data-active={activeId === sectionId ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="nav-actions-group">
            <button
              type="button"
              className="nav-index-btn"
              aria-expanded={isIndexOpen}
              onClick={() => setIsIndexOpen(true)}
            >
              <span className="nav-index-dot" />
              <span>ÍNDICE</span>
            </button>
            <ShineButton className="nav-contact" onClick={openModal}>
              Diagnóstico gratuito <ArrowUpRight size={17} />
            </ShineButton>
          </div>
          <button
            className="menu-toggle"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
        <div
          id="mobile-menu"
          className={`mobile-menu-shell${isOpen ? ' is-open' : ''}`}
          aria-hidden={!isOpen}
        >
          <div className="mobile-menu-inner">
            <div className="mobile-menu">
              {links.map(([label, href], index) => (
                <a
                  key={label}
                  href={href}
                  style={{ '--item-index': index }}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                  <ArrowUpRight size={20} />
                </a>
              ))}
              <button
                type="button"
                className="mobile-replay-btn"
                tabIndex={isOpen ? 0 : -1}
                onClick={handleReplayIntro}
              >
                <Play size={15} /> Rever animação de abertura
              </button>
              <ShineButton
                className="action-primary"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => { setIsOpen(false); openModal(); }}
              >
                Agendar diagnóstico gratuito <ArrowUpRight size={18} />
              </ShineButton>
            </div>
          </div>
        </div>
      </header>

      {/* Gaveta Editorial ÍNDICE (inspirada em Pedroso Films #ix) */}
      <aside
        className={`gw-index-drawer${isIndexOpen ? ' is-open' : ''}`}
        aria-hidden={!isIndexOpen}
        aria-label="Índice completo do site"
        onClick={() => setIsIndexOpen(false)}
      >
        <div className="gw-index-panel" onClick={e => e.stopPropagation()}>
          <div className="gw-index-head">
            <div>
              <p className="eyebrow" style={{ marginBottom: 4 }}>GW // ÍNDICE EDITORIAL</p>
              <span className="gw-index-sub">NAVEGAÇÃO POR CAPÍTULOS · 01 — 08</span>
            </div>
            <div className="gw-index-head-actions">
              <button type="button" className="gw-index-replay" onClick={handleReplayIntro}>
                <Play size={13} /> Rever Intro
              </button>
              <button
                type="button"
                className="gw-index-close"
                aria-label="Fechar índice"
                onClick={() => setIsIndexOpen(false)}
              >
                FECHAR [ESC] <X size={15} />
              </button>
            </div>
          </div>

          <div className="gw-index-list">
            {indexChapters.map(ch => (
              <a
                key={ch.num}
                href={ch.href}
                className="gw-index-row"
                onClick={() => setIsIndexOpen(false)}
              >
                <span className="gw-index-num">{ch.num}</span>
                <span className="gw-index-title">{ch.title}</span>
                <span className="gw-index-meta">{ch.meta}</span>
                <ArrowUpRight size={17} className="gw-index-arrow" />
              </a>
            ))}
          </div>

          <div className="gw-index-foot">
            <span>GW // ● ONLINE · CABO FRIO, RJ → BRASIL</span>
            <button
              type="button"
              className="gw-index-cta"
              onClick={() => {
                setIsIndexOpen(false);
                if (openModal) openModal();
              }}
            >
              Iniciar diagnóstico gratuito <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
