import { privacyPage } from './privacyPage.js';
export const siteUrl = 'https://www.growave.com.br';
export const organization = {
  '@context': 'https://schema.org', '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteUrl}/#organization`, name: 'Growave', url: siteUrl,
  logo: `${siteUrl}/logo-horizontal.png`, image: `${siteUrl}/logo-horizontal.png`,
  description: 'Agência de marketing digital em Cabo Frio, RJ, com tráfego pago, social media, produção audiovisual, sites e landing pages, Google Meu Negócio e Analytics, CRM com automação e agendamento inteligente.',
  telephone: '+55-22-98161-1733', email: 'contato@growave.com.br',
  address: { '@type': 'PostalAddress', addressLocality: 'Cabo Frio', addressRegion: 'RJ', addressCountry: 'BR' },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  sameAs: ['https://instagram.com/growave.agencia', 'https://facebook.com/GrowaveAgencia'],
};
export const commonFaq = [
  ['Quais serviços a Growave oferece?', 'Gestão de tráfego pago (Google Ads e Meta Ads), social media, produção audiovisual, criação de sites e landing pages, Google Meu Negócio e Analytics, CRM com automação de atendimento e agendamento inteligente. Você pode contratar um serviço específico ou combinar vários em uma operação conectada.'],
  ['A Growave atende apenas em Cabo Frio?', 'Não. A agência fica em Cabo Frio, RJ, e atende empresas de todo o Brasil. Para gravações e reuniões presenciais, a disponibilidade e a logística são combinadas na proposta.'],
  ['Como funciona a primeira conversa?', 'É um diagnóstico gratuito e sem compromisso. Você conta sobre seu negócio, seus objetivos e como atende seus clientes hoje. Nós apontamos as prioridades e, se fizer sentido, preparamos uma proposta sob medida.'],
  ['Qual é o valor dos serviços?', 'Depende dos serviços escolhidos e do tamanho da operação. Depois do diagnóstico, você recebe uma proposta com escopo, entregas e investimento definidos. A verba de anúncios e o custo das ferramentas aparecem separados, para você saber para onde vai cada real.'],
  ['Preciso contratar todos os serviços?', 'Não. Você pode começar por um serviço, como tráfego pago ou social media, e incluir outros quando fizer sentido. O diagnóstico ajuda a definir o que priorizar no seu momento.'],
  ['O CRM pode ser integrado às campanhas e aos agendamentos?', 'Sim, e esse é o nosso diferencial. Os contatos que chegam pelos anúncios, pelo site e pelas redes entram no CRM com a origem registrada, recebem resposta automática e podem seguir direto para a agenda. Na implantação, avaliamos as ferramentas que você já usa para definir as integrações.'],
  ['Em quanto tempo aparecem os resultados?', 'Depende do serviço, do mercado, da oferta e da sua estrutura de atendimento. Campanhas de anúncios começam a rodar assim que são aprovadas pelas plataformas, enquanto redes sociais e presença no Google constroem resultado ao longo dos meses. Não prometemos posições nem vendas: acompanhamos os números e ajustamos a estratégia continuamente.'],
];
const service = (slug, name, intro, sections, faq) => ({
  path: `/servicos/${slug}`, name, title: `${name} | Growave`, description: intro,
  eyebrow: 'SERVIÇOS GROWAVE', heading: name, intro, sections, faq, service: true,
});
export const services = [
  service('trafego-pago', 'Gestão de tráfego pago', 'Anúncios no Google Ads e no Meta Ads (Facebook e Instagram) para atrair quem já procura o que você vende, com cada contato direto no seu atendimento.', [
    ['Anúncio bom é o que vira conversa', 'Partimos da sua oferta, do seu público e da capacidade de atendimento da equipe para escolher canais e prioridades. Cada campanha leva a uma ação que importa para o negócio: uma mensagem no WhatsApp, um cadastro ou uma compra.'],
    ['O que está incluído', 'Planejamento de mídia, configuração e gestão das campanhas, alinhamento dos criativos e acompanhamento dos indicadores. Os canais e o escopo de cada entrega são definidos na proposta, de acordo com o seu objetivo.'],
    ['O clique é só o começo', 'Com landing page e CRM, cada contato chega com a origem registrada e recebe resposta rápida. Assim dá para enxergar o caminho do anúncio até o atendimento e investir mais no que traz cliente.'],
  ], [['A verba dos anúncios está incluída?', 'A verba de mídia e o valor da gestão aparecem separados na proposta, para você saber exatamente quanto vai para os anúncios. O orçamento é definido com você, conforme seus objetivos e sua capacidade de investimento.'], ['Vocês trabalham com Google Ads e Meta Ads?', 'Sim. A escolha entre Google, Facebook e Instagram, ou a combinação deles, depende da sua oferta, do comportamento do seu público e do objetivo da campanha.']]),
  service('social-media', 'Gestão de social media', 'Gestão de redes sociais com planejamento, textos e artes na voz da sua marca, para sua empresa ser lembrada na hora da compra.', [
    ['Presença que gera lembrança', 'Organizamos temas, linguagem e formatos para apresentar sua marca com consistência. Quem acompanha seu perfil entende o que você faz e lembra de você quando precisa.'],
    ['O que está incluído', 'Calendário editorial, textos e peças visuais, com o fluxo de aprovação combinado com você antes de começar. A frequência de posts e os formatos são definidos na proposta, conforme a estratégia e os materiais disponíveis.'],
    ['Conteúdo que leva ao atendimento', 'As publicações apoiam campanhas, divulgam serviços e levam as pessoas para o seu site ou WhatsApp. Social media faz parte da mesma jornada que o tráfego pago, o audiovisual e o CRM.'],
  ], [['A produção de vídeos faz parte do pacote?', 'Pode, se fizer sentido para a estratégia. A necessidade de captação e edição é avaliada no planejamento e, quando entra na proposta, vem com entregas e logística definidas.'], ['Como é definida a frequência de posts?', 'Pela estratégia, pela disponibilidade de materiais e pelo escopo contratado. Não existe uma quantidade ideal única para todos os negócios.']]),
  service('criacao-de-sites', 'Criação de sites e landing pages', 'Sites institucionais e landing pages pensados para o celular, com estrutura clara e formulários e botões de contato ligados ao seu atendimento.', [
    ['Site ou landing page? Depende do objetivo', 'O site institucional reúne várias páginas e apresenta a empresa para quem já procura a sua marca. A landing page é uma página única, focada em uma ação e normalmente ligada a uma campanha. Ajudamos a escolher o formato certo para o momento, e os dois podem trabalhar juntos.'],
    ['Do layout à publicação', 'Design, montagem das páginas, adaptação para celular e publicação. Domínio, hospedagem, acessos e manutenção são combinados na proposta, para você saber o que está incluído e quem cuida de cada parte.'],
    ['Feito para ser encontrado e gerar contatos', 'Títulos, descrições e endereços de página ajudam o Google a entender o conteúdo. Formulários e botões de contato podem ser ligados ao CRM, para nenhum pedido de orçamento se perder.'],
  ], [['Qual é a diferença entre um site e uma landing page?', 'O site reúne várias páginas para apresentar a empresa por inteiro e costuma atender quem já procura a marca. A landing page é uma página única, focada em uma ação e ligada a uma campanha. Os dois podem ser combinados na mesma estratégia.'], ['A página funciona no celular?', 'Sim. O layout é pensado para diferentes tamanhos de tela, com atenção à leitura, aos botões e ao formulário.'], ['Vocês cuidam do domínio e da hospedagem?', 'Sim, a configuração de domínio, hospedagem e acessos faz parte da implantação. Os custos recorrentes e a responsabilidade pela manutenção ficam definidos na proposta.']]),
  service('ecossistema-google', 'Google Meu Negócio e Analytics', 'Seu perfil no Google e no Maps organizado para quem procura perto, com Analytics, Search Console e Tags configurados para medir o que acontece no site.', [
    ['Apareça para quem procura perto', 'O Google Meu Negócio, hoje chamado Perfil da Empresa no Google, é o que aparece na busca e no Maps quando alguém procura um serviço na região. Organizamos informações, categorias, fotos e publicações e acompanhamos as avaliações recebidas.'],
    ['Medição: Analytics, Search Console e Tags', 'Configuramos o Google Analytics 4, o Search Console e o Gerenciador de Tags para registrar as ações importantes do site, acompanhar como suas páginas aparecem na busca e manter o rastreamento organizado em um só lugar.'],
    ['A base que sustenta as campanhas', 'Sem medição, o investimento em anúncios fica sem dado confiável para ajustar. A conta do Google Ads pode ser conectada a essa estrutura; a gestão das campanhas faz parte do serviço de tráfego pago.'],
  ], [['Preciso ter site para usar o Perfil da Empresa no Google?', 'Não é obrigatório, mas o perfil costuma funcionar melhor com uma página para onde direcionar quem pesquisa. Endereço, telefone e horários precisam estar corretos e coerentes nos dois lugares.'], ['Vocês garantem a primeira posição no Google?', 'Não. O ranqueamento depende de concorrência, relevância e critérios do próprio Google, que nenhuma agência controla. O trabalho organiza as informações e acompanha os indicadores disponíveis.']]),
  service('audiovisual', 'Produção audiovisual', 'Roteiro, filmagem e edição de vídeos, reels e campanhas que mostram o que sua marca tem de único e fazem as pessoas pararem para assistir.', [
    ['A história vem antes do formato', 'Começamos pelo que a marca precisa comunicar e por onde o vídeo vai circular. Isso orienta a linguagem, o roteiro e a organização da produção.'],
    ['Da captação à edição', 'Planejamento, filmagem e edição, com locação, equipe, formatos finais e revisões combinados no escopo. Cada etapa tem uma entrega clara.'],
    ['Pronto para os seus canais', 'Os vídeos são entregues nos formatos certos para redes sociais, anúncios e campanhas. Veja o portfólio para conhecer trabalhos publicados e conversar sobre a direção ideal para sua marca.'],
  ], [['Vocês fazem filmagem presencial?', 'Sim. Local, datas e logística da captação são confirmados na proposta.'], ['Onde posso ver os trabalhos?', 'Os vídeos publicados estão no portfólio do site. A seleção ajuda a conhecer a linguagem das nossas produções.']]),
  service('crm-e-automacao', 'CRM e automação de atendimento', 'Todo contato no mesmo lugar, com resposta automática, histórico e follow-up, para sua equipe saber o próximo passo e nenhuma oportunidade se perder.', [
    ['Nosso diferencial: o que conecta tudo', 'O CRM reúne os contatos que chegam pelos anúncios, pelo site, pelas redes e pelo WhatsApp, com o histórico de cada conversa. A geração de oportunidades fica ligada ao acompanhamento comercial, e sua equipe sabe o que fazer em seguida.'],
    ['Processo antes de automação', 'Mapeamos as etapas do seu atendimento e os pontos em que os contatos esfriam. A partir disso, criamos fluxos de resposta, follow-up e lembretes, deixando claro o que é automático e o que fica com a equipe.'],
    ['Campanhas, páginas e agenda conectadas', 'A origem de cada contato, o atendimento e o agendamento passam a fazer parte da mesma jornada. Na implantação, avaliamos as ferramentas que você já usa para definir as integrações.'],
  ], [['Preciso trocar todas as minhas ferramentas?', 'Não necessariamente. Primeiro avaliamos sua operação atual, as integrações possíveis e o que realmente precisa mudar.'], ['A automação substitui minha equipe?', 'Não. Ela cuida das tarefas repetitivas e organiza o acompanhamento. Sua equipe continua responsável pelo relacionamento e pelas decisões que pedem contexto humano.']]),
  service('agendamento-inteligente', 'Agendamento inteligente', 'Do interesse ao horário marcado, com confirmação e lembrete automáticos e tudo registrado no CRM, para reduzir faltas e o trabalho manual da sua equipe.', [
    ['Da conversa ao compromisso', 'Organizamos o caminho entre o interesse de um contato e a marcação do horário, seguindo as regras da sua operação: disponibilidade, responsáveis e tipos de atendimento.'],
    ['Confirmações e lembretes automáticos', 'Mensagens de confirmação e lembrete podem ser automatizadas nos canais definidos, para reduzir faltas e remarcações sem sobrecarregar sua equipe.'],
    ['Histórico conectado ao CRM', 'Cada agendamento fica ligado ao histórico do contato, para a equipe acompanhar compromissos, remarcações e próximos passos. Regras e responsabilidades são alinhadas na implantação.'],
  ], [['Funciona para clínicas e prestadores de serviços?', 'Sim, é indicado para operações que trabalham com horário marcado, como clínicas, consultórios e prestadores de serviços. A implantação depende das regras de agenda, dos canais e das integrações de cada negócio.'], ['Os lembretes garantem que o cliente compareça?', 'Não. Eles ajudam a reduzir esquecimentos, mas o comparecimento depende do cliente e de outros fatores.']]),
];
export const pages = [
  privacyPage,
  ...services,
  { path: '/agencia-de-marketing-em-cabo-frio', name: 'Marketing em Cabo Frio', title: 'Agência de Marketing em Cabo Frio | Growave', eyebrow: 'CABO FRIO · RIO DE JANEIRO', heading: 'Agência de marketing em Cabo Frio', description: 'Agência de marketing digital em Cabo Frio, RJ: tráfego pago, social media, audiovisual, sites e CRM para empresas da Região dos Lagos e de todo o Brasil.', intro: 'Somos a Growave, agência de marketing digital sediada em Cabo Frio, RJ. Fazemos tráfego pago, social media, audiovisual, sites e CRM com automação para empresas da Região dos Lagos e de todo o Brasil.', sections: [
    ['Estratégia para a realidade do seu negócio', 'Antes de escolher canais, entendemos sua oferta, seu público, a rotina de atendimento e os objetivos da empresa. Esse diagnóstico orienta as prioridades de comunicação e de geração de clientes.'],
    ['Uma operação integrada', 'Tráfego pago, social media, sites e audiovisual trabalham junto com o CRM e o agendamento inteligente, do primeiro contato ao atendimento.'],
    ['Como conversar com a Growave', 'Fale pelo WhatsApp +55 22 98161-1733 ou pelo e-mail contato@growave.com.br. O diagnóstico inicial é gratuito. Para reuniões e gravações presenciais em Cabo Frio, combine a data com a equipe.'],
  ], faq: commonFaq.slice(1, 4) },
  { path: '/sobre', name: 'Sobre a Growave', title: 'Sobre a Growave | Estratégia, Conteúdo e Tecnologia', eyebrow: 'QUEM SOMOS', heading: 'Uma equipe. Uma direção. Sua próxima conquista.', description: 'Conheça a Growave, agência de marketing digital sediada em Cabo Frio, e nossa forma de conectar tráfego, conteúdo, sites, CRM e atendimento.', intro: 'A Growave é uma agência de marketing digital sediada em Cabo Frio, no Rio de Janeiro, que atende empresas de todo o Brasil. Unimos estratégia, criatividade e tecnologia para atrair clientes e organizar o atendimento.', sections: [
    ['O que fazemos', 'Gestão de tráfego pago, social media, produção audiovisual, sites e landing pages, Google Meu Negócio e Analytics, CRM com automação e agendamento inteligente. Cada serviço tem uma função na jornada entre apresentar sua marca e transformar contatos em clientes.'],
    ['Como trabalhamos', 'Começamos com um diagnóstico gratuito para entender o negócio e alinhar prioridades. Depois, definimos o escopo e implementamos as soluções. O acompanhamento dos resultados orienta os próximos ajustes.'],
    ['Nosso diferencial', 'O CRM é o ponto de conexão de tudo: reúne contatos, histórico e etapas de atendimento. É ele que liga o trabalho de marketing à rotina comercial da empresa, para nenhum contato se perder no caminho.'],
    ['Uma relação com clareza', 'Entregas, responsabilidades, ferramentas e investimento são definidos na proposta. O plano parte das necessidades do negócio e pode combinar diferentes serviços.'],
    ['Conheça o nosso trabalho', 'O portfólio reúne produções audiovisuais publicadas. Para discutir um projeto, fale com a equipe e conte o que sua empresa precisa comunicar e alcançar.'],
  ], faq: commonFaq.slice(2, 4) },
  { path: '/perguntas-frequentes', name: 'Perguntas frequentes', title: 'Perguntas Frequentes sobre Marketing e CRM | Growave', eyebrow: 'SUAS DÚVIDAS', heading: 'Respostas para o seu próximo passo.', description: 'Tire dúvidas sobre serviços, atendimento, investimento, CRM, agendamento e o diagnóstico gratuito da Growave.', intro: 'Entenda como funciona o diagnóstico gratuito, como cobramos e como cada serviço se conecta ao seu atendimento.', sections: [], faq: commonFaq },
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
