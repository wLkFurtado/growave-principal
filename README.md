# Growave

Site institucional em React e Vite, com portfólio integrado ao Cloudinary e Supabase e apresentação comercial do CRM.

## Executar

Use Node.js 22.12 ou superior. Instale com `npm ci`, configure as variáveis de `.env.example` em `.env` e execute `npm run dev`.

- `npm run lint`: verificação estática.
- `npm test`: testes de paginação, falhas parciais, carregamento progressivo e timeout (serviços simulados, sem chamadas externas).
- `npm run build`: gera o site em `dist`.
- `npm run preview`: prévia do build.

## Conteúdo e integrações

- A home apresenta até seis vídeos; `/portfolio` exibe a coleção com expansão de 24 itens.
- Vídeos são listados pela tag `portfolio` no Cloudinary e na raiz do bucket Supabase. Subpastas do bucket não são percorridas.
- As fontes publicam resultados independentemente e têm timeout de 12 segundos por requisição. A ordem de chegada é preservada para não trocar o vídeo aberto enquanto outra fonte responde.
- As prévias de vídeo carregam quando os cards se aproximam da tela. Para reprodução consistente, publique arquivos com codecs compatíveis com os navegadores de destino.
- `/crm` usa a reescrita da Vercel em produção e encaminha para `/crm.html` no Vite.
- O formulário de agendamento é uma integração externa, exibida sem moldura adicional.
- A abertura usa a logo fornecida pelo cliente, otimizada em JPEG local, com flutuação suave e inclinação por ponteiro. Movimento reduzido desativa os efeitos.

## Segurança e operação

Variáveis `VITE_*` são públicas no navegador. Use somente a chave pública `anon`, nunca `service_role`. As permissões de leitura e escrita devem ser configuradas no Supabase; este repositório não contém as políticas do projeto remoto. Publique apenas mídia destinada a acesso público nas fontes do portfólio.

`.env` já era rastreado pelo Git antes destas alterações; as novas regras de ignore não removem esse arquivo do índice ou do histórico. O arquivo deve deixar de ser versionado antes da próxima publicação do código. Não foram encontradas chaves administrativas no arquivo durante a análise.

A configuração da Vercel inclui proteção contra enquadramento externo, bloqueio de objetos e MIME sniffing e política de referência. Não foi aplicada uma lista restritiva de scripts sem validar os domínios exigidos pelo formulário externo.

O link de privacidade leva a um contato real por e-mail. Política de Privacidade e Termos definitivos dependem de conteúdo aprovado pelo responsável pelo negócio; não foram inventados documentos legais.

## Verificação desta entrega

Build, lint e quatro testes automatizados aprovados. A atualização das dependências retornou zero vulnerabilidades na consulta npm. O layout inclui regras responsivas e suporte a movimento reduzido, mas a inspeção visual em navegador e a submissão do formulário externo não foram realizadas neste ambiente. Antes de publicar, confira a home, o menu mobile, as galerias, o agendamento e os cabeçalhos na hospedagem real.
