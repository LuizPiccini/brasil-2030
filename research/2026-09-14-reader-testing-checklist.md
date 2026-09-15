# Edição local para teste de leitura

## Entregue

- Navegação portuguesa: Cenário, Carta e compromissos, Sobre.
- Resumo reescrito a partir da cronologia aprovada, com a mesma fonte para a página /resumo.
- Carta com quatro compromissos, critérios de acompanhamento e distinção entre revisão, apoio pessoal e compromisso de candidatura.
- REDATA, estratégia anterior e signatários antigos preservados como arquivo, fora da navegação principal.
- Explicações de termos por clique/toque, diálogo acessível, Escape, fechamento por botão e retorno de foco.
- Inglês identificado como edição anterior; não apresentado como tradução atual.
- Prosa principal de 2026–2030 preservada. Contagem de leitura não inclui resumo nem explicações.

## Limite deliberado para o teste

O formulário é um protótipo local sem envio, armazenamento ou coleta de e-mail. Antes de abrir adesões públicas, implementar consentimento versionado, validação de identidade/representação e moderação vinculada à nova carta. Não migrar os apoios do REDATA.

Nenhuma publicação, commit, push ou convite a leitores foi realizado nesta etapa.

## Roteiro para leitores

1. Leia a introdução e o resumo. Conte com suas palavras o que acontece e por que o Brasil perde autonomia.
2. Leia um ano sem orientação. Marque onde precisou reler, onde faltou explicação e onde a história parece exagerada.
3. Abra uma explicação. Ela resolve a dúvida? Ficou claro o que é definição e o que é referência?
4. Encontre as propostas de ação. Quais compromissos você entendeu que uma candidatura assumiria?
5. Teste a assinatura com dados fictícios. Você entendeu a diferença entre revisar o texto, apoiar a carta e assumir um compromisso público?

Registrar dispositivo, trecho, problema e sugestão. Não pedir avaliação de tradução aos leitores desta edição portuguesa.

## Validação técnica

- npm run validate: Astro sem erros; 28 testes; verificação de ausência de artefatos privados.
- check-candidate-mobile.mjs: nove larguras, 320–1440 px, resumo expandido sem overflow.
- check-reader-review.mjs: 320, 393, 768 e 1440 px; glossário, teclado, foco, páginas secundárias e formulário sem POST.

## Pendências antes da publicação

- Revisão coletiva da carta, da declaração de independência e dos créditos; completar minibios apenas com informação aprovada.
- Rodada com leitores e tratamento do feedback.
- Traduções EN/ES.
- Ativação real de adesões apenas após aprovação do texto e do fluxo de consentimento.
