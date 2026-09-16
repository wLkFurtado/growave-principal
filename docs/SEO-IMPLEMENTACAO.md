# SEO Growave — implementação e pendências

## Implementado no código

- Seis páginas de serviços em `/servicos/`: `trafego-pago`, `social-media`, `landing-pages`, `audiovisual`, `crm-e-automacao` e `agendamento-inteligente`.
- Páginas `/agencia-de-marketing-em-cabo-frio`, `/sobre` e `/perguntas-frequentes`.
- Cards da home com links para os serviços. A página comercial antiga `/crm` permanece separada; os novos links de CRM levam à página editorial `/servicos/crm-e-automacao`.
- FAQ acessível com elementos HTML nativos, inclusive na home.
- Conteúdo integral e metadados no HTML das nove novas páginas durante o build. Elas não precisam de JavaScript para exibir conteúdo, navegar ou abrir respostas.
- Título, descrição, canonical e metadados sociais próprios; JSON-LD de entidade, página, breadcrumb, serviços e perguntas correspondentes ao conteúdo visível.
- Uma única entidade Growave com tipos Organization e LocalBusiness e identificador estável. Removidos o tipo MarketingAgency e coordenadas não confirmadas. O endereço permanece limitado à cidade/estado já informados no site; endereço completo, horário e localização exata dependem de confirmação.
- Sitemap de produção gerado automaticamente a partir das páginas. O arquivo público também foi atualizado para a prévia de desenvolvimento.
- Regra explícita `OAI-SearchBot: Allow: /`. O arquivo anterior já permitia todos os agentes. Não foi alterada a política geral dos demais bots.
- Fallback global da SPA removido. Somente portfólio e galeria recebem a home como entrada React. O preset automático de SPA da Vercel foi desativado para que rotas inexistentes, como `/cgi-bin/`, usem o 404 estático.
- Blocos existentes do Meta Pixel preservados. O fallback noscript foi movido para o body para corrigir HTML inválido.

## Publicação e validação externa — pendentes

Estas alterações não foram publicadas nesta tarefa. Não foi confirmado o status atual de indexação de `/cgi-bin/` no Search Console. O ambiente local de desenvolvimento do Vite ainda usa fallback de SPA; o comportamento HTTP de produção precisa ser conferido na Vercel após publicar.

1. Publicar e confirmar HTTP 200 nas novas páginas, HTML completo e canonical correto.
2. Conferir HTTP 404 em `/cgi-bin/`, `/cgi-bin/qualquer-coisa` e um endereço aleatório. Não bloquear esses caminhos no robots.txt: o robô precisa poder observar o 404.
3. Conferir HTTP 200 em `/robots.txt` e `/sitemap.xml`. Verificar se CDN, firewall ou proteção de deploy não bloqueiam os rastreadores.
4. No Search Console, usar a propriedade de domínio `growave.com.br`. A verificação exige o registro DNS fornecido pela conta; não foi inventado nem instalado um token.
5. Enviar `https://www.growave.com.br/sitemap.xml` na área Sitemaps e inspecionar as páginas principais. Solicitar nova indexação após confirmar a versão publicada.
6. Inspecionar `/cgi-bin/`; após o 404 publicado, acompanhar a remoção da URL do índice. Uma remoção temporária pelo Search Console pode ser usada pelo titular se necessária, mas não substitui a correção HTTP.
7. Validar os dados estruturados no Schema Markup Validator e no Rich Results Test. O endereço parcial não é apresentado como elegibilidade garantida a resultados locais. FAQPage descreve as respostas visíveis; não é apresentado como recurso de destaque de FAQ no Google.

## Perfil da Empresa no Google — rascunho para revisão

Não houve acesso nem alterações no perfil. Confirmar o link do perfil e a titularidade antes de editar.

Descrição sugerida (baseada apenas nos serviços e localização já informados):

> A Growave é uma agência de marketing sediada em Cabo Frio, RJ, com atendimento a empresas de todo o Brasil. Conectamos tráfego pago, social media, landing pages e produção audiovisual a CRM, automação e agendamento inteligente. O trabalho começa com uma conversa sobre o negócio e seus objetivos para definir prioridades e um escopo adequado. Entre em contato para conhecer nossas soluções.

Campos a conferir com o responsável: nome comercial, categoria adequada às atividades reais, endereço ou área de atendimento, atendimento presencial, telefone, horário e site. Usar fotos reais e atuais da marca/equipe/trabalhos autorizados. Publicar serviços consistentes com as páginas do site e responder avaliações sem prometer resultados nem criar avaliações artificiais.

## Cases — dados necessários antes de publicar

O portfólio continua acessível. Não foram criados cases ou números sem comprovação. Para cada case, preencher:

- Cliente e autorização para divulgar o nome/marca.
- Serviço prestado e período.
- Problema inicial e contexto.
- Trabalho efetivamente realizado pela Growave.
- Resultado e fonte de comprovação; período comparado e método de cálculo, se houver números.
- Material visual e autorização de uso.
- Depoimento literal aprovado, se disponível.

## Referências

- Google, códigos HTTP: https://developers.google.com/crawling/docs/troubleshooting/http-status-codes
- Google, sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google, LocalBusiness: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google, FAQ: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Google, perfil local: https://support.google.com/business/answer/7091?hl=pt-BR
- OpenAI, rastreadores: https://developers.openai.com/api/docs/bots

Permitir rastreamento, gerar sitemap e adicionar schema não garantem indexação, posições, resultados enriquecidos ou menção em respostas de IA.

## Política de Privacidade

Criada em `/politica-de-privacidade`, ligada aos rodapés do site e da página comercial de CRM, incluída no sitemap e gerada em HTML estático. O texto descreve o formulário externo, o Meta Pixel e as integrações observadas, com canal de contato para titulares.

Antes de publicar, o responsável deve confirmar razão social/CNPJ e endereço do controlador, o fornecedor efetivo do formulário/CRM, bases legais para cada finalidade, regras de conservação e condições de processamento internacional. Não foram inventadas essas informações. O texto não afirma que há consentimento de cookies: o Meta Pixel continua carregando no acesso à página, e implementar gestão de consentimento é um trabalho separado.
