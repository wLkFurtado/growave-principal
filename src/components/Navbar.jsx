import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [['Soluções', '/#soluções'], ['Método', '/#estratégia'], ['Portfólio', '/portfolio'], ['Nosso diferencial', '/#crm-integrado']];
export default function Navbar({ openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="site-header">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <nav className="site-nav" aria-label="Navegação principal">
        <a href="/" aria-label="Growave — início"><img src="/logo-horizontal.png" alt="Growave" width="150" height="44" /></a>
        <div className="desktop-links">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
        <button className="nav-contact" onClick={openModal}>Vamos conversar <ArrowUpRight size={17} /></button>
        <button className="menu-toggle" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </nav>
      {isOpen && <div id="mobile-menu" className="mobile-menu">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setIsOpen(false)}>{label}<ArrowUpRight size={20} /></a>)}<button className="action-primary" onClick={() => { setIsOpen(false); openModal(); }}>Agendar consultoria <ArrowUpRight size={18} /></button></div>}
    </header>
  );
}
