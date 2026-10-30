import { ArrowUpRight } from 'lucide-react';
import { services } from '../content/sitePages';
export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-grid"><div><a href="/" aria-label="Voltar ao início"><img src="/logo-horizontal.png" alt="Growave" width="160" height="48" /></a><p>Agência de marketing digital e CRM em Cabo Frio, RJ.<br />Atraímos clientes e organizamos o atendimento de empresas em todo o Brasil.</p></div>
      <div><h3>Serviços</h3>{services.map(service => <a key={service.path} href={service.path}>{service.name}</a>)}</div>
      <div><h3>Explore</h3><a href="/portfolio">Portfólio</a><a href="/#estratégia">Como funciona</a><a href="/sobre">Sobre a Growave</a><a href="/agencia-de-marketing-em-cabo-frio">Marketing em Cabo Frio</a><a href="/perguntas-frequentes">Perguntas frequentes</a></div>
      <div><h3>Vamos conversar</h3><a href="mailto:contato@growave.com.br">contato@growave.com.br <ArrowUpRight size={14} /></a><a href="https://wa.me/5522981611733" target="_blank" rel="noopener noreferrer">+55 22 98161-1733 <ArrowUpRight size={14} /></a><div className="footer-social"><a href="https://instagram.com/growave.agencia" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Growave">Instagram <ArrowUpRight size={13} /></a><a href="https://facebook.com/GrowaveAgencia" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Growave">Facebook <ArrowUpRight size={13} /></a></div></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Growave. Todos os direitos reservados.</span><a href="/politica-de-privacidade">Política de Privacidade <ArrowUpRight size={13} /></a><span>FEITO PARA IR ALÉM.</span></div>
  </footer>;
}
