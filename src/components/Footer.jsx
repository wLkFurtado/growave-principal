import { ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-grid"><div><a href="/" aria-label="Voltar ao início"><img src="/logo-horizontal.png" alt="Growave" width="160" height="48" /></a><p>Estratégia, criatividade e tecnologia.<br />Na mesma direção: a sua próxima conquista.</p></div>
      <div><h3>Explore</h3><a href="/#soluções">Nossas soluções</a><a href="/portfolio">Portfólio</a><a href="/#crm-integrado">Nosso diferencial</a><a href="/#estratégia">Nosso processo</a></div>
      <div><h3>Vamos conversar</h3><a href="mailto:contato@growave.com.br">contato@growave.com.br <ArrowUpRight size={14} /></a><a href="https://wa.me/5522981611733" target="_blank" rel="noopener noreferrer">+55 22 98161-1733 <ArrowUpRight size={14} /></a><div className="footer-social"><a href="https://instagram.com/growave.agencia" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Growave">Instagram <ArrowUpRight size={13} /></a><a href="https://facebook.com/GrowaveAgencia" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Growave">Facebook <ArrowUpRight size={13} /></a></div></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Growave. Todos os direitos reservados.</span><a href="mailto:contato@growave.com.br?subject=Privacidade%20e%20dados">Privacidade e dados <ArrowUpRight size={13} /></a><span>FEITO PARA IR ALÉM.</span></div>
  </footer>;
}
