import { privacyPage } from './privacyPage.js';
export const siteUrl = 'https://www.growave.com.br';
export const organization = {
  '@context': 'https://schema.org', '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteUrl}/#organization`, name: 'Growave', url: siteUrl,
  logo: `${siteUrl}/logo-horizontal.png`, image: `${siteUrl}/logo-horizontal.png`,
  description: 'Agência de marketing em Cabo Frio, RJ, com tráfego pago, social media, landing pages, audiovisual, CRM e agendamento inteligente.',
  telephone: '+55-22-98161-1733', email: 'contato@growave.com.br',
  address: { '@type': 'PostalAddress', addressLocality: 'Cabo Frio', addressRegion: 'RJ', addressCountry: 'BR' },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  sameAs: ['https://instagram.com/growave.agencia', 'https://facebook.com/GrowaveAgencia'],
};
export const commonFaq = [
  ['Quais serviços a Growave oferece?', 'Tráfego pago, social media, landing pages, produção audiovisual, CRM e automação e agendamento inteligente. As soluções são combinadas conforme o momento e os objetivos de cada negócio.'],
  ['A Growave atende apenas em Cabo Frio?', 'A agência está sediada em Cabo Frio, RJ, e atende empresas de todo o Brasil. Para produções presenciais, a disponibilidade e a logística são alinhadas na proposta.'],
  ['Como funciona a primeira conversa?', 'A consultoria inicial é gratuita. Conversamos sobre seu negócio, seus objetivos e sua operação atual para identificar prioridades e definir o escopo de uma proposta.'],
  ['Qual é o valor dos serviços?', 'O investimento depende do escopo, dos canais e das necessidades da empresa. O orçamento de mídia e os custos das ferramentas devem ser alinhados na proposta, junto com as entregas.'],
  ['O CRM pode ser integrado às campanhas e aos agendamentos?', 'A integração faz parte da proposta do ecossistema Growave: organizar contatos, acompanhar oportunidades e conectar o atendimento à agenda. As integrações disponíveis são avaliadas conforme as ferramentas utilizadas.'],
  ['Em quanto tempo aparecem os resultados?', 'O prazo varia com o serviço, o mercado, a oferta e a estrutura comercial. O trabalho envolve implementação, acompanhamento e ajustes; não existe um prazo universal nem garantia de posições ou vendas.'],
];
const service = (slug, name, intro, sections, faq) => ({
  path: `/servicos/${slug}`, name, title: `${name} | Growave`, description: intro,
  eyebrow: 'SOLUÇÕES GROWAVE', heading: name, intro, sections, faq, service: true,
});
export const services = [
  service('trafego-pago', 'Gestão de tráfego pago', 'Campanhas no Google Ads e Meta Ads conectadas à sua operação comercial. Conheça a gestão de tráfego pago da Growave.', [
    ['Anúncios com um objetivo claro', 'Partimos da sua oferta, do público e da capacidade de atendimento para definir canais e prioridades. A campanha precisa levar a uma ação que faça sentido para o negócio, como uma conversa, um cadastro ou uma compra.'],
    ['Da campanha ao acompanhamento', 'O trabalho pode incluir planejamento de mídia, configuração de campanhas, alinhamento dos criativos e acompanhamento dos indicadores. O escopo é definido na proposta, considerando os canais escolhidos.'],
    ['O clique é só o começo', 'Landing pages e CRM ajudam a acompanhar os contatos gerados. Essa conexão permite observar o caminho entre o anúncio e o atendimento e ajustar a estratégia com mais contexto.'],
  ], [['A verba dos anúncios está incluída?', 'A verba de mídia e a gestão são itens que precisam ser discriminados na proposta. O orçamento é definido com a empresa conforme os objetivos e a capacidade de investimento.'], ['Vocês trabalham com Google Ads e Meta Ads?', 'Sim. A escolha dos canais considera a oferta, o comportamento do público e os objetivos da campanha.']]),
  service('social-media', 'Gestão de social media', 'Planejamento editorial, conteúdo e design com a voz da sua marca. Conheça o trabalho de social media da Growave.', [
    ['Uma presença que faz sentido', 'Organizamos os temas, a linguagem e os formatos para apresentar sua marca com consistência. A estratégia considera o público, o posicionamento e os objetivos de comunicação.'],
    ['Planejamento, criação e aprovação', 'O escopo pode reunir calendário editorial, textos e peças visuais. A frequência de publicação, os formatos e o fluxo de aprovação são definidos com a empresa antes da execução.'],
    ['Conteúdo conectado ao negócio', 'Publicações podem apoiar campanhas, divulgar serviços e encaminhar pessoas para páginas ou atendimento. Social media faz parte da mesma jornada que o tráfego, o audiovisual e o CRM.'],
  ], [['A produção de vídeos faz parte do pacote?', 'A necessidade de captação e edição é avaliada no planejamento. A produção audiovisual pode compor a proposta, com entregas e logística definidas.'], ['Como é definida a frequência de posts?', 'A frequência depende da estratégia, da disponibilidade de materiais e do escopo contratado, sem uma quantidade única para todos os negócios.']]),
  service('landing-pages', 'Criação de landing pages', 'Páginas de campanha com mensagem clara, layout para celular e chamadas para ação. Conheça as landing pages da Growave.', [
    ['Uma página, uma ação principal', 'A estrutura apresenta a oferta, responde às dúvidas essenciais e conduz o visitante para um próximo passo. O objetivo pode ser solicitar uma proposta, iniciar uma conversa ou preencher um formulário.'],
    ['Conteúdo e experiência juntos', 'O trabalho envolve organizar a mensagem, o design e a experiência em diferentes tamanhos de tela. Formulários, links e chamadas precisam funcionar como parte da campanha.'],
    ['Conexão com o atendimento', 'A captura de contatos pode ser conectada ao CRM, conforme as integrações disponíveis. Assim, o cadastro segue para uma operação de acompanhamento em vez de ficar isolado da equipe.'],
  ], [['A página funciona no celular?', 'O layout é preparado para diferentes tamanhos de tela, com atenção à leitura, aos botões e ao formulário.'], ['É possível usar meu domínio?', 'O domínio e a hospedagem são alinhados na implementação, incluindo os acessos e as configurações necessários.']]),
  service('audiovisual', 'Produção audiovisual', 'Direção criativa, captação e edição para apresentar sua marca em vídeos, reels e campanhas. Conheça o audiovisual da Growave.', [
    ['A história vem antes do formato', 'Começamos pelo que a marca precisa comunicar e por onde o conteúdo será usado. Isso orienta a linguagem, o roteiro e a organização da produção.'],
    ['Da captação à edição', 'O projeto pode incluir planejamento, filmagem e edição. Locação, equipe, formatos finais e revisões são combinados no escopo para que cada etapa tenha uma entrega clara.'],
    ['Peças para os seus canais', 'Os materiais podem ser preparados para redes sociais e campanhas. Consulte o portfólio para conhecer trabalhos publicados e conversar sobre uma direção para sua marca.'],
  ], [['Vocês fazem filmagem presencial?', 'Sim, a captação presencial é uma possibilidade do serviço. Local, datas e logística precisam ser confirmados na proposta.'], ['Onde posso ver os trabalhos?', 'Os vídeos publicados estão disponíveis no portfólio do site. A seleção ajuda a conhecer a linguagem das produções.']]),
  service('crm-e-automacao', 'CRM e automação de atendimento', 'Organize contatos, histórico e oportunidades em uma operação conectada. Conheça o CRM e as automações da Growave.', [
    ['O diferencial que conecta o ecossistema', 'O CRM reúne contatos e histórico de atendimento para dar contexto à equipe. A proposta é conectar a geração de oportunidades ao acompanhamento comercial.'],
    ['Processos antes de automações', 'Mapeamos as etapas do atendimento e os pontos que precisam de acompanhamento. A partir disso, definimos os fluxos e as automações adequados, mantendo clareza sobre as responsabilidades da equipe.'],
    ['Campanhas, páginas e agenda', 'As integrações são avaliadas conforme as ferramentas utilizadas. Quando disponíveis, conectam a origem do contato, o atendimento e o agendamento em uma jornada mais organizada.'],
  ], [['Preciso trocar todas as minhas ferramentas?', 'Não existe uma resposta única. Primeiro avaliamos a operação atual, as integrações disponíveis e as mudanças necessárias para o escopo.'], ['A automação substitui minha equipe?', 'A proposta é apoiar tarefas e organizar o acompanhamento. A equipe continua responsável pelo relacionamento e pelas decisões que exigem contexto humano.']]),
  service('agendamento-inteligente', 'Agendamento inteligente', 'Conecte contatos, atendimento e agenda com confirmações e lembretes. Conheça o agendamento inteligente integrado ao CRM da Growave.', [
    ['Da conversa ao compromisso', 'Organizamos o caminho entre o interesse de um contato e a marcação de um horário. O agendamento faz parte do atendimento e precisa seguir as regras da operação.'],
    ['Disponibilidade, confirmações e lembretes', 'O projeto avalia horários, responsáveis e mensagens de acompanhamento. Confirmações e lembretes podem ser automatizados conforme as ferramentas e os canais definidos.'],
    ['Histórico conectado ao CRM', 'A integração ajuda a equipe a acompanhar os contatos e os compromissos. Mudanças de horário, etapas de atendimento e responsabilidades são alinhadas na implantação.'],
  ], [['Funciona para clínicas e prestadores de serviços?', 'O serviço pode ser avaliado para operações que trabalham com horários. A implantação depende das regras de agenda, dos canais e das integrações de cada negócio.'], ['Os lembretes garantem que o cliente compareça?', 'Não. Eles apoiam a comunicação e o acompanhamento, mas o comparecimento depende do cliente e de outros fatores.']]),
];
export const pages = [
  privacyPage,
  ...services,
  { path: '/agencia-de-marketing-em-cabo-frio', name: 'Marketing em Cabo Frio', title: 'Agência de Marketing em Cabo Frio | Growave', eyebrow: 'CABO FRIO · RIO DE JANEIRO', heading: 'Agência de marketing em Cabo Frio', description: 'Conheça a Growave, agência de marketing em Cabo Frio: tráfego pago, social media, landing pages, audiovisual e CRM integrados.', intro: 'Somos a Growave, uma agência de marketing sediada em Cabo Frio, RJ. Conectamos estratégia, conteúdo e tecnologia para apoiar empresas da cidade e de todo o Brasil.', sections: [
    ['Estratégia para a realidade do seu negócio', 'Antes de escolher canais, buscamos entender a oferta, o público, a rotina de atendimento e os objetivos da empresa. Esse diagnóstico orienta as prioridades de comunicação e geração de oportunidades.'],
    ['Uma operação integrada', 'Tráfego pago, social media, landing pages e audiovisual trabalham com o CRM e o agendamento inteligente. A ideia é acompanhar a jornada desde o primeiro contato até o atendimento.'],
    ['Como conversar com a Growave', 'Fale pelo WhatsApp +55 22 98161-1733 ou pelo e-mail contato@growave.com.br. A primeira conversa é gratuita. Para reuniões e produções presenciais em Cabo Frio, confirme previamente a disponibilidade com a equipe.'],
  ], faq: commonFaq.slice(1, 4) },
  { path: '/sobre', name: 'Sobre a Growave', title: 'Sobre a Growave | Estratégia, Conteúdo e Tecnologia', eyebrow: 'QUEM SOMOS', heading: 'Uma equipe. Uma direção. Sua próxima conquista.', description: 'Conheça a Growave, agência de marketing sediada em Cabo Frio, e nossa forma de conectar estratégia, conteúdo, CRM e atendimento.', intro: 'A Growave é uma agência de marketing sediada em Cabo Frio, no Rio de Janeiro, com atendimento a empresas de todo o Brasil. Nosso trabalho une estratégia, criatividade e tecnologia em uma operação conectada.', sections: [
    ['O que fazemos', 'Atuamos com tráfego pago, social media, landing pages, audiovisual, CRM e automação e agendamento inteligente. Cada solução tem uma função na jornada entre apresentar uma marca e acompanhar as oportunidades que ela gera.'],
    ['Como trabalhamos', 'Começamos com um diagnóstico para entender o negócio e alinhar prioridades. Depois, definimos o escopo e implementamos as soluções. O acompanhamento dos resultados orienta os próximos ajustes.'],
    ['Nosso diferencial', 'O CRM é o ponto de conexão do ecossistema: reúne contatos, histórico e etapas de atendimento. Ele ajuda a integrar o trabalho de marketing à rotina comercial da empresa.'],
    ['Uma relação com clareza', 'Entregas, responsabilidades, ferramentas e investimento são alinhados na proposta. O plano considera as necessidades do negócio e pode combinar diferentes serviços.'],
    ['Conheça o nosso trabalho', 'O portfólio reúne produções audiovisuais publicadas. Para discutir um projeto, fale com a equipe e conte o que sua empresa precisa comunicar e alcançar.'],
  ], faq: commonFaq.slice(2, 4) },
  { path: '/perguntas-frequentes', name: 'Perguntas frequentes', title: 'Perguntas Frequentes sobre Marketing e CRM | Growave', eyebrow: 'SUAS DÚVIDAS', heading: 'Respostas para o seu próximo passo.', description: 'Tire dúvidas sobre serviços, atendimento, investimento, CRM, agendamento e a consultoria inicial da Growave.', intro: 'Entenda como começamos um projeto e como as soluções se conectam à sua operação.', sections: [], faq: commonFaq },
];
export function schemasFor(page) {
  const url = siteUrl + page.path;
  const schemas = [organization, { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#page`, url, name: page.title, description: page.description, inLanguage: 'pt-BR', about: { '@id': organization['@id'] } }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: page.name, item: url },
    ],
  }];
  if (page.service) schemas.push({ '@context': 'https://schema.org', '@type': 'Service', name: page.name, url, description: page.description, provider: { '@id': organization['@id'] }, areaServed: 'Brasil' });
  if (page.faq?.length) schemas.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) });
  return schemas;
}
