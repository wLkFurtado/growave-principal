import SpotlightCard from './ui/SpotlightCard';
import { ArrowUpRight, Target, Workflow, Clapperboard, Monitor, MapPinned, MessagesSquare, CalendarCheck, Check } from 'lucide-react';

const services = [
  {
    icon: Target, tag: '01 / ATRAIR CLIENTES', title: 'Tráfego pago',
    desc: 'Anúncios no Google, no Facebook e no Instagram que colocam sua empresa na frente de quem procura o que você vende. Cada contato gerado chega direto no seu atendimento.',
    detail: 'GOOGLE ADS · META ADS', path: '/servicos/trafego-pago', className: 'service-ads',
  },
  {
    icon: Clapperboard, tag: '02 / CHAMAR ATENÇÃO', title: 'Produção audiovisual',
    desc: 'Roteiro, filmagem e edição de vídeos, reels e campanhas que mostram o que sua marca tem de único e fazem as pessoas pararem o scroll.',
    detail: 'VÍDEOS · REELS · CAMPANHAS', path: '/servicos/audiovisual', className: 'service-film',
  },
  {
    icon: MessagesSquare, tag: '03 / CRIAR RELACIONAMENTO', title: 'Social media',
    desc: 'Planejamento, textos e artes com a voz da sua marca. Uma presença constante nas redes para quem acompanha sua marca lembrar de você na hora de comprar.',
    detail: 'PLANEJAMENTO · CONTEÚDO · DESIGN', path: '/servicos/social-media', className: 'service-social',
  },
  {
    icon: Monitor, tag: '04 / CONVERTER VISITAS', title: 'Sites e landing pages',
    desc: 'Do site institucional que apresenta sua empresa à página de campanha feita para gerar contatos. Estrutura clara, pensada para o celular, com formulários e botões de contato ligados ao seu CRM.',
    detail: 'SITE INSTITUCIONAL · LANDING PAGE · DOMÍNIO', path: '/servicos/criacao-de-sites', className: 'service-pages service-wide',
  },
  {
    icon: MapPinned, tag: '05 / SER ENCONTRADO', title: 'Google Meu Negócio e Analytics',
    desc: 'Perfil no Google e no Maps completo, com informações certas e avaliações acompanhadas, para sua empresa ser encontrada por quem procura perto. E Analytics, Search Console e Tags configurados para medir o que acontece depois do clique.',
    detail: 'PERFIL DA EMPRESA · MAPS · ANALYTICS · SEARCH CONSOLE', path: '/servicos/ecossistema-google', className: 'service-google service-wide',
  },
  {
    icon: CalendarCheck, tag: '06 / REDUZIR FALTAS', title: 'Agendamento inteligente',
    desc: 'Do interesse ao horário marcado, com confirmação e lembrete automáticos e tudo registrado no CRM. Para reduzir faltas e tirar tarefas repetitivas da sua equipe.',
    detail: 'AGENDA · CONFIRMAÇÃO · LEMBRETES', path: '/servicos/agendamento-inteligente', className: 'service-scheduling',
  },
];

export default function Features({ openModal }) {
  return (
    <section id="soluções" className="services-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SERVIÇOS</p>
          <h2>Serviços que funcionam sozinhos.<br /><span>E ainda melhor juntos.</span></h2>
        </div>
        <p>Comece pelo que sua empresa mais precisa agora ou monte a operação completa. Nosso CRM conecta cada etapa, do primeiro clique ao cliente atendido.</p>
      </div>

      <div className="services-grid ecosystem-grid">
        <SpotlightCard className="service-card service-crm-featured" id="crm-integrado">
          <div className="crm-card-header">
            <Workflow size={34} strokeWidth={1.4} aria-hidden="true" />
            <span className="crm-difference">NOSSO DIFERENCIAL</span>
          </div>
          <p className="eyebrow">CONECTAR TUDO</p>
          <h3>CRM e automação.<br /><span>Nenhum contato esquecido.</span></h3>
          <p>Todo contato que chega pelo anúncio, pelo site, pelo Instagram ou pelo WhatsApp entra no mesmo lugar e recebe resposta automática na hora. Sua equipe vê o histórico, sabe o próximo passo e acompanha cada oportunidade até a venda.</p>
          <ol className="crm-journey" aria-label="Etapas conectadas pelo CRM">
            <li><MessagesSquare size={16} aria-hidden="true" /><span>Contato</span></li>
            <li><Workflow size={16} aria-hidden="true" /><span>Atendimento</span></li>
            <li><CalendarCheck size={16} aria-hidden="true" /><span>Agenda</span></li>
          </ol>
          <ul className="crm-benefits">
            {['Resposta automática em segundos, 24h por dia', 'Histórico e follow-up de cada contato', 'Agendamento com confirmação e lembrete'].map(item => (
              <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <a className="service-page-link" href="/servicos/crm-e-automacao">Conhecer CRM e automação <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button className="crm-card-cta" onClick={openModal}>Quero organizar meu atendimento <ArrowUpRight size={19} aria-hidden="true" /></button>
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
        <p>Não sabe por onde começar? No diagnóstico gratuito, a gente indica o que faz sentido para o seu momento.</p>
        <button className="action-text" onClick={openModal}>Quero meu diagnóstico gratuito <ArrowUpRight size={18} aria-hidden="true" /></button>
      </div>
    </section>
  );
}
