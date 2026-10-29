import Footer from '../components/Footer';
import Faq from '../components/Faq';
import { services } from '../content/sitePages';

export default function ContentPage({ page }) {
  return (
    <>
      <header className="content-nav">
        <a href="/" aria-label="Growave — início"><img src="/logo-horizontal.png" alt="Growave" width="140" height="42" /></a>
        <nav aria-label="Navegação">
          <a href="/#soluções">Serviços</a>
          <a href="/sobre">Sobre</a>
          <a href="/portfolio">Portfólio</a>
          <a href="/#contato">Contato</a>
        </nav>
      </header>
      <main className={`content-page${page.legal ? ' privacy-page' : ''}`}>
        <nav className="content-breadcrumb hero-enter" aria-label="Caminho da página">
          <a href="/">Início</a>
          <span aria-hidden="true">/</span>
          <span>{page.name}</span>
        </nav>
        <section className="content-intro">
          <p className="eyebrow hero-enter">{page.eyebrow}</p>
          <h1>{page.heading}</h1>
          <p className="hero-enter hero-description">{page.intro}</p>
          {page.legal ? (
            <p className="policy-date hero-enter">Última atualização: {page.updatedAt}</p>
          ) : (
            <a className="action-primary shine-button hero-enter" href="/#contato">
              <span className="shine-button-content">Agendar consultoria gratuita</span>
            </a>
          )}
        </section>
        <div className="content-sections">
          {page.sections.map(([title, body], index) => (
            <section key={title} className="content-card">
              <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
        {!page.legal && (
          <section className="content-related">
            <h2>Conheça as soluções conectadas</h2>
            <div>
              {services.filter(service => service.path !== page.path).map(service => (
                <a href={service.path} key={service.path}>
                  <span>{service.name}</span>
                  <span className="content-related-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>
        )}
        <Faq items={page.faq} />
        {page.legal && (
          <section className="policy-references">
            <h2>Referências e informações adicionais</h2>
            {page.references.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            ))}
          </section>
        )}
        {page.legal ? (
          <section className="content-contact">
            <h2>Fale sobre seus dados</h2>
            <p>Canal de privacidade da Growave</p>
            <a className="action-primary shine-button" href="mailto:contato@growave.com.br?subject=Privacidade%20e%20dados">
              <span className="shine-button-content">contato@growave.com.br</span>
            </a>
          </section>
        ) : (
          <section className="content-contact">
            <h2>Vamos conversar sobre seu negócio?</h2>
            <p>Growave · Cabo Frio, RJ · Atendimento em todo o Brasil</p>
            <a className="action-primary shine-button" href="https://wa.me/5522981611733">
              <span className="shine-button-content">Falar pelo WhatsApp</span>
            </a>
            <a href="mailto:contato@growave.com.br">contato@growave.com.br</a>
            <a href="/portfolio">Conhecer o portfólio</a>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

