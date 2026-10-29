import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ShineButton from './ui/ShineButton';

const links = [
  ['Soluções', '/#soluções', 'soluções'],
  ['Operação', '/#operação', 'operação'],
  ['Método', '/#estratégia', 'estratégia'],
  ['Portfólio', '/portfolio', 'portfólio'],
  ['Nosso diferencial', '/#crm-integrado', 'crm-integrado'],
];

export default function Navbar({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setIsOpen(false); };
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
    const ids = ['soluções', 'crm-integrado', 'operação', 'estratégia', 'portfólio'];
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

  return (
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
        <ShineButton className="nav-contact" onClick={openModal}>
          Vamos conversar <ArrowUpRight size={17} />
        </ShineButton>
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
            <ShineButton
              className="action-primary"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => { setIsOpen(false); openModal(); }}
            >
              Agendar consultoria <ArrowUpRight size={18} />
            </ShineButton>
          </div>
        </div>
      </div>
    </header>
  );
}

