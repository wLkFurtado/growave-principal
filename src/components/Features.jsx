import SpotlightCard from './ui/SpotlightCard';
import { ArrowUpRight, Target, Workflow, Clapperboard, Monitor, MapPinned, MessagesSquare, CalendarCheck, Check } from 'lucide-react';

const services = [
  {
    icon: Target, tag: '01 / TRÁFEGO PAGO', title: 'Sua marca no lugar certo.',
    desc: 'Campanhas para alcançar quem procura o que você oferece e transformar atenção em oportunidades comerciais.',
    detail: 'META ADS · GOOGLE ADS', path: '/servicos/trafego-pago', className: 'service-ads',
  },
  {
    icon: Clapperboard, tag: '02 / AUDIOVISUAL', title: 'Conteúdo que faz sentir.',
    desc: 'Direção criativa, filmagem e edição para mostrar o que torna sua marca única, do primeiro frame à mensagem final.',
    detail: 'FILMAGEM · REELS · CAMPANHAS', path: '/servicos/audiovisual', className: 'service-film',
  },
  {
    icon: MessagesSquare, tag: '03 / SOCIAL MEDIA', title: 'Presença que cria conexão.',
    desc: 'Planejamento editorial, design e conteúdo com a voz da sua marca. Uma presença consistente para construir relacionamento e manter sua empresa na conversa.',
    detail: 'ESTRATÉGIA · CONTEÚDO · DESIGN', path: '/servicos/social-media', className: 'service-social',
  },
  {
    icon: Monitor, tag: '04 / SITES E LANDING PAGES', title: 'Sua marca na web, do jeito certo.',
    desc: 'Do site institucional que apresenta sua empresa à página de campanha focada em uma ação. Estrutura clara, leitura no celular e formulários ligados ao seu CRM.',
    detail: 'SITE · LANDING PAGE · DOMÍNIO', path: '/servicos/criacao-de-sites', className: 'service-pages service-wide',
  },
  {
    icon: MapPinned, tag: '05 / ECOSSISTEMA GOOGLE', title: 'Achado por quem procura perto.',
    desc: 'Perfil da Empresa no Google, Maps e avaliações organizados, com Analytics, Search Console e Tags configurados para medir o que acontece depois do clique.',
    detail: 'MEU NEGÓCIO · ANALYTICS · SEARCH CONSOLE', path: '/servicos/ecossistema-google', className: 'service-google service-wide',
  },
  {
    icon: CalendarCheck, tag: '06 / AGENDAMENTO INTELIGENTE', title: 'Da conversa para a agenda.',
    desc: 'Agendamentos integrados ao CRM, com organização dos contatos, confirmações e lembretes automáticos. Menos tarefas repetitivas para sua equipe, mais atenção para cada cliente.',
    detail: 'AGENDA · CONFIRMAÇÃO · LEMBRETES', path: '/servicos/agendamento-inteligente', className: 'service-scheduling',
  },
];

export default function Features({ openModal }) {
  return (
    <section id="soluções" className="services-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / NOSSO ECOSSISTEMA</p>
          <h2>Mais que serviços.<br /><span>Uma operação conectada.</span></h2>
        </div>
        <p>Conteúdo atrai. A página converte. A agenda aproxima. Nosso CRM conecta cada etapa para sua equipe acompanhar as oportunidades.</p>
      </div>

      <div className="services-grid ecosystem-grid">
        <SpotlightCard className="service-card service-crm-featured" id="crm-integrado">
          <div className="crm-card-header">
            <Workflow size={34} strokeWidth={1.4} aria-hidden="true" />
            <span className="crm-difference">NOSSO DIFERENCIAL</span>
          </div>
          <p className="eyebrow">CRM & AUTOMAÇÃO</p>
          <h3>O que conecta tudo.<br /><span>E faz a diferença.</span></h3>
          <p>Nosso CRM reúne os contatos que chegam pelas campanhas, páginas e redes sociais. Histórico, acompanhamento e agendamentos no mesmo fluxo, para sua equipe saber qual é o próximo passo.</p>
          <ol className="crm-journey" aria-label="Etapas conectadas pelo CRM">
            <li><MessagesSquare size={16} aria-hidden="true" /><span>Contato</span></li>
            <li><Workflow size={16} aria-hidden="true" /><span>Atendimento</span></li>
            <li><CalendarCheck size={16} aria-hidden="true" /><span>Agenda</span></li>
          </ol>
          <ul className="crm-benefits">
            {['Contatos e histórico organizados', 'Automações para acompanhar oportunidades', 'Agendamento conectado ao atendimento'].map(item => (
              <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <a className="service-page-link" href="/servicos/crm-e-automacao">Conhecer CRM e automação <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button className="crm-card-cta" onClick={openModal}>Quero conectar minha operação <ArrowUpRight size={19} aria-hidden="true" /></button>
        </SpotlightCard>

        {services.map(({ icon: Icon, tag, title, desc, detail, className, path }) => (
          <SpotlightCard key={tag} className={`service-card ${className}`}>
            <div className="service-symbol"><Icon size={46} strokeWidth={1.2} aria-hidden="true" /><span className="service-index" aria-hidden="true">{tag.split(' / ')[0]}</span></div>
            <p className="eyebrow">{tag}</p>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="service-detail">{detail}</div>
            <a className="service-page-link" href={path}>Conhecer o serviço <ArrowUpRight size={16} aria-hidden="true" /></a>
          </SpotlightCard>
        ))}
      </div>
      <div className="ecosystem-footer">
        <p>Seu negócio tem um momento. A gente conecta as soluções certas para ele.</p>
        <button className="action-text" onClick={openModal}>Desenhar minha estratégia <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </section>
  );
}
