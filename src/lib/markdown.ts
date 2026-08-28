import scenarioCommonPt from "../content/scenario-common-pt.md?raw";
import scenarioCommonEn from "../content/scenario-common-en.md?raw";
import scenarioPositivePt from "../content/scenario-positive-pt.md?raw";
import scenarioPositiveEn from "../content/scenario-positive-en.md?raw";
import scenarioNegativePt from "../content/scenario-negative-pt.md?raw";
import scenarioNegativeEn from "../content/scenario-negative-en.md?raw";

type Locale = "pt" | "en";
type Key = "scenario" | "summary" | "redata" | "evidence" | "strategy" | "letter" | "about";

const sharedHeader = (locale: Locale) => `---\ntitle: ${locale === "pt" ? "Brasil 2030: Energia para Escolher" : "Brazil 2030: The Energy to Choose"}\nlocale: ${locale === "pt" ? "pt-BR" : "en"}\nedition: public\nupdated: 2026-08-28\nsourceRevision: 2026-08-28-redata-final-v2\n---\n\n`;

const evidencePt = `# Evidências\n\nCada afirmação recebe uma categoria e uma data de verificação.\n\n- **Fato observado, alta confiança:** há evidência forte de uso de IA por criminosos e Estados em operações cibernéticas; ataques autônomos de ponta a ponta não foram reportados e o impacto agregado ainda é incerto. [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026)\n- **Fato observado, alta confiança:** o Diálogo Global da ONU reúne os 193 Estados-membros; a primeira sessão ocorreu em julho de 2026. [ONU](https://www.un.org/global-dialogue-ai-governance/en/faq)\n- **Fato observado, alta confiança:** os Estados Unidos lançaram a Pax Silica em dezembro de 2025 para cadeias seguras de IA, semicondutores, computação e energia. [Casa Branca](https://www.whitehouse.gov/wp-content/uploads/2026/01/WHOSTP-2025-Wins.pdf)\n- **Fato observado, alta confiança:** 29 países fundaram a WAICO em Xangai em julho de 2026. [Governo da China](https://english.www.gov.cn/news/202607/17/content_WS6a59a226c6d00ca5f9a0c432.html)\n- **Fato observado, alta confiança:** a oferta interna de eletricidade chegou a 783,3 TWh em 2025, com 86,8% de renováveis. [EPE, BEN 2026](https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-975/topico-847/BEN_S%C3%ADntese_2026_PT.pdf)\n- **Fato observado, alta confiança:** a EPE registrou 719 MW de carga total de data centers em 2025. O número não funciona como inventário de GPUs. [EPE](https://www.epe.gov.br/sites-pt/areas-de-atuacao/energia-eletrica/WorkshopCOPAM/%5BEPE%5D%20Coleta%20Data%20Center%20na%20distribui%C3%A7%C3%A3o%202025%20IV%20COPAM_12-2025.pdf)\n- **Fato observado, alta confiança:** a EPE propôs R$5,68 bilhões em novas instalações de transmissão para conectar até 4 GW de cargas eletrointensivas no Ceará e no Piauí. [EPE](https://www.epe.gov.br/pt/imprensa/noticias/epe-propoe-solucao-de-transmissao-flexivel-e-escalonavel-para-atendimento-a-ate-4gw-de-cargas-eletrointensivas-no-ceara-e-piaui)\n- **Resposta regulatória, alta confiança:** o CONAMA pediu diretrizes nacionais para consumo de água e energia, emissões, impactos territoriais, tarifas e participação pública no licenciamento de data centers. [CONAMA](https://conama.mma.gov.br/?id=858&option=com_sisconama&task=arquivo.download)\n- **Alegação do empreendedor, exige verificação:** a ByteDance afirma que o projeto de Pecém usará energia renovável e resfriamento com reuso de água. Fonte, limites, reposição em secas e obrigações auditáveis continuam relevantes. [TikTok](https://newsroom.tiktok.com/tiktok-anuncia-seu-primeiro-data-center-na-america-latina-com-investimento-superior-a-r-200-billhoes?lang=pt-BR)\n- **Plano publicado, alta confiança:** o PBIA prevê R$23,03 bilhões em investimento. Os valores são planejados. [MCTI](https://www.gov.br/mcti/pt-br/centrais-de-conteudo/publicacoes-mcti/plano-brasileiro-de-inteligencia-artificial/pbia_mcti_2025.pdf)\n- **Projeto reportado, confiança média:** reportagens descrevem cerca de 200 MW na primeira fase de Pecém e expansão possível para perto de 1 GW. [w.media](https://w.media/bytedance-begins-construction-of-us-38-44-billion-data-center-in-brazil/)\n- **Estimativa dos autores, baixa confiança:** o Brasil pode deter 0,1% a 0,5% da computação relevante para IA. Não existe um censo comparável.\n- **Precedente regulatório, alta confiança:** o regime americano de 2025 criou tiers para chips, pesos e treinamento, não para APIs comuns. [Federal Register](https://www.federalregister.gov/documents/2025/01/15/2025-00636/framework-for-artificial-intelligence-diffusion)\n- **Precedente comercial, alta confiança:** no caso DS472, a OMC considerou incompatíveis medidas brasileiras ligadas a conteúdo e produção local, incluindo o Inovar-Auto. [OMC](https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds472_e.htm)\n- **Invenção narrativa:** a cena de Camila e Lourdes, o canal brasileiro entre China e Estados Unidos, o protocolo limitado de 2030 e tiers de inferência em 2029.\n- **Proposta em aberto:** ainda precisamos definir como uma desaceleração recíproca poderia ser verificada e acionada.\n- **Em modelagem:** capacidade em 2030, parcela contratável e custo por trajetória.\n`;

const evidenceEn = `# Evidence\n\nEach claim carries a category and a review date.\n\n- **Observed fact, high confidence:** there is strong evidence of AI use by criminals and states in cyber operations; fully autonomous end-to-end attacks have not been reported and the aggregate impact remains uncertain. [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026)\n- **Observed fact, high confidence:** the UN Global Dialogue includes all 193 member states; its first session was held in July 2026. [United Nations](https://www.un.org/global-dialogue-ai-governance/en/faq)\n- **Observed fact, high confidence:** the United States launched Pax Silica in December 2025 for secure AI, semiconductor, compute, and energy supply chains. [White House](https://www.whitehouse.gov/wp-content/uploads/2026/01/WHOSTP-2025-Wins.pdf)\n- **Observed fact, high confidence:** 29 countries founded WAICO in Shanghai in July 2026. [Chinese government](https://english.www.gov.cn/news/202607/17/content_WS6a59a226c6d00ca5f9a0c432.html)\n- **Observed fact, high confidence:** domestic electricity supply reached 783.3 TWh in 2025, with 86.8% renewables. [EPE, BEN 2026](https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-975/topico-847/BEN_S%C3%ADntese_2026_PT.pdf)\n- **Observed fact, high confidence:** EPE recorded 719 MW of total data-center load in 2025. The figure is not a GPU inventory. [EPE](https://www.epe.gov.br/sites-pt/areas-de-atuacao/energia-eletrica/WorkshopCOPAM/%5BEPE%5D%20Coleta%20Data%20Center%20na%20distribui%C3%A7%C3%A3o%202025%20IV%20COPAM_12-2025.pdf)\n- **Observed fact, high confidence:** EPE proposed R$5.68 billion in new transmission assets to connect up to 4 GW of electro-intensive load in Ceará and Piauí. [EPE](https://www.epe.gov.br/pt/imprensa/noticias/epe-propoe-solucao-de-transmissao-flexivel-e-escalonavel-para-atendimento-a-ate-4gw-de-cargas-eletrointensivas-no-ceara-e-piaui)\n- **Regulatory response, high confidence:** CONAMA called for national rules covering water and electricity use, emissions, territorial impacts, tariffs, and public participation in data-center licensing. [CONAMA](https://conama.mma.gov.br/?id=858&option=com_sisconama&task=arquivo.download)\n- **Developer claim, verification required:** ByteDance says the Pecém project will use renewable power and cooling with water reuse. The source, limits, drought-period replenishment, and auditable obligations remain relevant. [TikTok](https://newsroom.tiktok.com/tiktok-anuncia-seu-primeiro-data-center-na-america-latina-com-investimento-superior-a-r-200-billhoes?lang=pt-BR)\n- **Published plan, high confidence:** the PBIA sets out R$23.03 billion in planned investment. [MCTI](https://www.gov.br/mcti/pt-br/centrais-de-conteudo/publicacoes-mcti/plano-brasileiro-de-inteligencia-artificial/pbia_mcti_2025.pdf)\n- **Reported project, medium confidence:** reports describe about 200 MW in Pecém's first phase and possible expansion toward 1 GW. [w.media](https://w.media/bytedance-begins-construction-of-us-38-44-billion-data-center-in-brazil/)\n- **Author estimate, low confidence:** Brazil may hold 0.1% to 0.5% of AI-relevant compute. No comparable census exists.\n- **Regulatory precedent, high confidence:** the 2025 US regime created tiers for chips, weights, and training, not ordinary APIs. [Federal Register](https://www.federalregister.gov/documents/2025/01/15/2025-00636/framework-for-artificial-intelligence-diffusion)\n- **Trade precedent, high confidence:** in dispute DS472, the WTO found Brazilian measures tied to local content and production, including Inovar-Auto, inconsistent with trade rules. [WTO](https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds472_e.htm)\n- **Narrative invention:** the Camila and Lourdes scene, Brazilian US-China channel, limited 2030 protocol, and inference tiers in 2029.\n- **Open proposal:** a reciprocal slowdown still needs a defined verification and trigger mechanism.\n- **Model pending:** 2030 capacity, contractable share, and cost by trajectory.\n`;

const strategyPt = `# Estratégia\n\n## Cinco compromissos\n\n1. **Defender uma desaceleração verificável.** Propor limites recíprocos para capacidades que ampliem riscos cibernéticos, biológicos ou de perda de controle.\n2. **Sustentar um canal China-Estados Unidos.** Oferecer mediação, fóruns e capacidade técnica para acordos de incidentes, avaliações e ritmo.\n3. **Preparar o Brasil.** Mapear dependências e endurecer energia, telecomunicações, finanças e serviços públicos contra falhas e ataques.\n4. **Construir soberania de inferência.** Vincular rede, licenças e incentivos a acesso contratável, continuidade, consulta às comunidades afetadas e limites públicos de uso da água.\n5. **Medir e corrigir.** Publicar capacidade, uso, preço, jurisdição, consumo hídrico, custo da rede e empregos permanentes; encerrar subsídios que não entreguem benefício público.\n\nDesaceleração não significa paralisar toda pesquisa ou adoção. Significa criar limites verificáveis para a corrida de fronteira enquanto aplicações de menor risco continuam. Percentuais fixos de acesso doméstico ainda precisam ser testados por pilotos.\n`;

const strategyEn = `# Strategy\n\n## Five commitments\n\n1. **Argue for a verifiable slowdown.** Propose reciprocal limits on capabilities that increase cyber, biological, or loss-of-control risks.\n2. **Sustain a China-US channel.** Offer mediation, forums, and technical capacity for agreements on incidents, evaluations, and pacing.\n3. **Prepare Brazil.** Map dependencies and harden energy, telecommunications, finance, and public services against failures and attacks.\n4. **Build inference sovereignty.** Tie grid access, permits, and incentives to contractable access, continuity, consultation with affected communities, and public water-use limits.\n5. **Measure and correct.** Publish capacity, use, price, jurisdiction, water consumption, grid costs, and permanent jobs; end subsidies that fail to deliver public benefits.\n\nA slowdown does not mean freezing all research or adoption. It means verifiable limits on the frontier race while lower-risk applications continue. Fixed domestic-access percentages still need to be tested through pilots.\n`;

const letterPt = `# Carta aberta aos candidatos de 2026\n\n> Edição de 28 de agosto de 2026. Não representa endosso eleitoral.\n\nA corrida por sistemas de IA cada vez mais capazes pode aumentar ataques cibernéticos, falhas de infraestrutura e riscos que nenhum país controla sozinho. O Brasil também não pode aceitar dependência tecnológica sem poder de barganha.\n\nPedimos quatro compromissos: defender limites globais recíprocos e verificáveis; oferecer mediação entre China e Estados Unidos; preparar a infraestrutura crítica brasileira; e condicionar benefícios a data centers a acesso contratável, continuidade, consulta, limites hídricos e custos transparentes de conexão à rede.\n\nO Brasil pode ajudar a ganhar tempo e usar energia, rede e mercado para preservar escolhas. Diplomacia e soberania de inferência são partes da mesma política de segurança.\n`;

const letterEn = `# Open letter to Brazil's 2026 candidates\n\n> 28 August 2026 edition. No electoral endorsement.\n\nThe race toward increasingly capable AI systems may increase cyberattacks, infrastructure failures, and risks that no country controls alone. Brazil also cannot accept technological dependence without bargaining power.\n\nWe ask for four commitments: argue for reciprocal and verifiable global limits; offer mediation between China and the United States; prepare Brazil's critical infrastructure; and condition data-center benefits on contractable access, continuity, consultation, water limits, and transparent grid-connection costs.\n\nBrazil can help buy time and use energy, the grid, and its market to preserve choices. Diplomacy and inference sovereignty belong to the same security policy.\n`;

const aboutPt = `# Sobre\n\nBrasil 2030 descreve uma trajetória possível para tornar riscos globais, política externa e escolhas de infraestrutura concretos o bastante para debate. A edição em português orienta o trabalho editorial; a versão inglesa acompanha suas revisões.\n\nA cronologia consolida o trabalho de Danilo Naiff com a continuação preparada por Luiz Piccini e Apollo. Pedro Castilho trabalha no modelo de computação; Ivan M. Franco coordena os marcos. Tomás é convidado a revisar fontes, criticar premissas e ajudar na distribuição, mas não é listado como coautor nesta edição.\n\nO formato se inspira em [AI 2027](https://ai-2027.com/), [AI 2040](https://ai-2040.com/) e [Europe 2031](https://europe2031.ai/). Brasil 2030 não possui afiliação com esses projetos.\n`;

const aboutEn = `# About\n\nBrazil 2030 describes one possible path so that global risks, foreign policy, and infrastructure choices become concrete enough to debate. The Portuguese edition leads the editorial work; the English version follows its revisions.\n\nThe chronology combines Danilo Naiff's work with the continuation prepared by Luiz Piccini and Apollo. Pedro Castilho works on the compute model; Ivan M. Franco coordinates milestones. Tomás is invited to review sources, challenge assumptions, and help with distribution, but is not listed as a coauthor in this edition.\n\nThe format draws on [AI 2027](https://ai-2027.com/), [AI 2040](https://ai-2040.com/), and [Europe 2031](https://europe2031.ai/). Brazil 2030 is not affiliated with those projects.\n`;

const summaryPtV2 = `# Resumo\n\n**Duas trajetórias, três compromissos.**\n\nOs dois cenários enfrentam ataques, automação e disputa geopolítica. As escolhas de 2026 determinam se energia e data centers ampliam a margem brasileira ou aprofundam a dependência.\n\n1. **Defender uma desaceleração global.** Apoiar limites recíprocos e verificáveis para as capacidades mais perigosas.\n2. **Abrir canais entre China e Estados Unidos.** Usar a diplomacia brasileira para sustentar negociações sobre incidentes, avaliações e limites.\n3. **Transformar energia em soberania.** Condicionar rede, licenças e incentivos a capacidade contratável, continuidade, consulta e benefícios públicos verificáveis.\n\n## Dois caminhos\n\n- **Coordenação e margem de escolha:** o REDATA cria acesso contratável, ataques produzem pressão por um acordo, e energia e compute ajudam o Brasil a se tornar uma potência intermediária da era da IA.\n- **País satélite:** o REDATA falha ou cria enclaves. EUA e China desaceleram sob regras que preservam sua vantagem. O Brasil troca alinhamento por acesso enquanto desemprego, brain drain e erosão democrática reduzem sua autonomia.\n\nO acordo reduz parte do risco global. A capacidade doméstica define quem participa das decisões.\n`;

const summaryEnV2 = `# Summary\n\n**Two paths, three commitments.**\n\nBoth scenarios face attacks, automation, and geopolitical competition. Choices made in 2026 determine whether energy and data centers expand Brazil's options or deepen dependency.\n\n1. **Argue for a global slowdown.** Support reciprocal and verifiable limits focused on the most dangerous capabilities.\n2. **Open channels between China and the United States.** Use Brazilian diplomacy to sustain talks on incidents, evaluations, and limits.\n3. **Turn energy into sovereignty.** Condition grid access, permits, and incentives on contractable capacity, continuity, consultation, and verifiable public benefits.\n\n## Two paths\n\n- **Coordination and room to choose:** REDATA creates contractable access, attacks produce pressure for an agreement, and energy and compute help Brazil become an AI-era middle power.\n- **Satellite country:** REDATA fails or creates enclaves. The United States and China slow down under rules that preserve their advantage. Brazil trades alignment for access while unemployment, brain drain, and democratic erosion reduce its autonomy.\n\nThe agreement reduces part of the global risk. Domestic capacity determines who takes part in decisions.\n`;

const redataPtV2 = `# REDATA: aprovar com cinco ajustes

> Posição dos autores sobre o PL 278/2026. Revisão factual do texto-base e das 22 emendas em 28 de agosto de 2026. A redação indicativa precisa de revisão jurídica antes do protocolo.

O projeto está no Plenário do Senado, ainda sem relator, e pode ser votado na semana de 31 de agosto a 4 de setembro. [Acompanhe a tramitação](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786).

Nossa posição é aprovar o REDATA com mudanças pontuais. Foram apresentadas 22 emendas; a Emenda 1 consta como retirada. Nenhuma das restantes cobre integralmente qualquer um dos cinco pedidos centrais. Apenas a Emenda 21 cobre parcialmente um dos sete pontos de regulamentação, ao propor certificação nacional de energia.

## Cinco ajustes

1. **Medir capacidade contratável.** Aferir os 10% em unidades técnicas auditáveis. Receita deve ser indicador complementar. Hardware, desempenho, disponibilidade, SLA e condições comerciais precisam ser comparáveis à capacidade exportada.
2. **Preservar um piso não substituível.** Revogar a troca integral por P&D. Como compromisso, limitar a substituição à metade e preservar pelo menos 5% da capacidade efetiva total no Brasil.
3. **Incluir quem opera o compute.** Habilitar empresas de GPU cloud, inferência e computação que usem data center de terceiro. Incluir refrigeração líquida, distribuição elétrica, controle térmico e interconexão de alta densidade.
4. **Criar uma porta brasileira de contratação.** Exigir contrato executável no Brasil, documentação fiscal, residência local dos dados, conformidade com LGPD e ANPD e suporte sujeito à legislação brasileira.
5. **Publicar resultados e recuperar benefícios.** Criar relatório anual, público e auditado. O descumprimento da oferta doméstica deve gerar recuperação proporcional do benefício.

## Sete pontos para regulamentação

1. Auditoria da capacidade instalada, oferecida, contratada e utilizada no Brasil.
2. Geração do hardware, desempenho, SLA, disponibilidade e condições comerciais.
3. Chamadas abertas de P&D, beneficiários publicados e controle de conflitos.
4. WUE, volume absoluto de água, origem e situação hídrica local.
5. Certificação de energia sem dupla contagem e com emissões verificáveis.
6. Reforços de rede, custos, cronograma e responsável pelo pagamento.
7. Avaliação independente antes de qualquer renovação após cinco anos.

## Prioridade política

Se houver espaço para apenas três mudanças, priorizar capacidade técnica auditável, piso doméstico de 5% e relatório com clawback. A Emenda 21 oferece um ponto de partida parcial para a certificação de energia. As Emendas 2 e 6 só são aceitáveis como fallback com critérios técnicos completos, prazo curto, silêncio positivo, lista pública e recurso. Reescrever a Emenda 8 para preservar a medição da água.

## Duas linhas vermelhas

1. **Não bloquear equipamentos que o Brasil ainda não produz.** Rejeitar índice rígido de conteúdo local e trava de importação sem saída objetiva.
2. **Não chamar gás natural de energia limpa.** Uso de contingência exige divulgação de horas, emissões e plano de transição e não deve cumprir automaticamente a obrigação de energia limpa.

## Comentário das 22 emendas

1. **Emenda 1, Laércio Oliveira:** retirada pelo autor. Se o conteúdo voltar, rejeitar a transformação da obrigação de energia limpa em mera preferência.
2. **Emenda 2, Eduardo Braga:** aceitar apenas como fallback. A redação mantém uma trava à importação dependente de ato do Executivo e precisa de critérios, prazo, silêncio positivo, lista pública e recurso.
3. **Emenda 3, Nelsinho Trad:** tratar separadamente. A mudança em concessões de geração amplia o escopo sem melhorar as contrapartidas do REDATA.
4. **Emenda 4, Laércio Oliveira:** apoiar com ajustes. A definição de energia limpa precisa usar emissões verificadas e impedir dupla contagem.
5. **Emenda 5, Laércio Oliveira:** fundir com a 4. Duas definições paralelas aumentam a ambiguidade.
6. **Emenda 6, Omar Aziz:** aplicar o mesmo fallback da Emenda 2 e consolidar as duas se essa solução for usada.
7. **Emenda 7, Esperidião Amin:** rejeitar. A localização em região carbonífera não deve reduzir a capacidade acessível ao Brasil.
8. **Emenda 8, Jorge Seif:** reescrever. Água de reuso merece incentivo, mas não dispensa volume absoluto, origem e situação hídrica local.
9. **Emenda 9, Luis Carlos Heinze:** tratar separadamente. A tributação ligada à CDE e ao carvão exige debate próprio.
10. **Emenda 10, Luis Carlos Heinze:** tratar separadamente. A alocação de custos de cortes de geração precisa mostrar quem paga.
11. **Emenda 11, Zequinha Marinho:** apoiar com salvaguardas de confiabilidade, planejamento e transparência de custos da rede.
12. **Emenda 12, Wellington Fagundes:** exigir análise de incidência. A mudança pode transferir custos de armazenamento a outros consumidores.
13. **Emenda 13, Izalci Lucas:** rejeitar. O índice de conteúdo local pode atrasar importações, estimular captura e repetir a lógica de reserva de mercado sem criar oferta nacional de fronteira.
14. **Emenda 14, Irajá:** tratar em projeto próprio ou acrescentar adicionalidade, custo fiscal, acesso e clawback ao incentivo para baterias.
15. **Emenda 15, Marcelo Castro:** tratar no marco de ZPE. A reforma não cria a porta brasileira de contratação.
16. **Emenda 16, Esperidião Amin:** rejeitar o texto atual. Gás e biometano devem passar por padrão de emissões, sem aprovação automática por categoria.
17. **Emenda 17, Luis Carlos Heinze:** reescrever com custo fiscal publicado, acesso não discriminatório, adicionalidade e clawback.
18. **Emenda 18, Luis Carlos Heinze:** tratar separadamente. Renovação de concessões hidrelétricas exige processo próprio.
19. **Emenda 19, Luis Carlos Heinze:** fundir com a 12 e publicar a incidência sobre tarifas e concorrência.
20. **Emenda 20, Jayme Campos:** aproveitar o conceito de contratação doméstica, acrescentando LGPD, processamento local e contrato brasileiro.
21. **Emenda 21, Veneziano Vital do Rêgo:** apoiar com cancelamento do certificado usado, rastreabilidade e emissões verificadas.
22. **Emenda 22, Laércio Oliveira:** rejeitar e substituir a lista de tecnologias por um padrão verificável de desempenho e emissões.

## Fontes

- [Senado Federal: tramitação e 22 emendas](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786)
- [Senado Federal: texto-base](https://legis.senado.leg.br/sdleg-getter/documento?dm=10162783&disposition=inline)
- [Agência Senado: possível votação na semana de 31 de agosto](https://www12.senado.leg.br/noticias/materias/2026/08/27/senado-pode-votar-na-proxima-semana-incentivos-fiscais-para-data-centers)
- [OMC: caso DS472 e o precedente de conteúdo local do Inovar-Auto](https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds472_e.htm)
`;

const redataEnV2 = `# REDATA: pass with five changes

> The authors' position on Bill 278/2026. Factual review of the base bill and all 22 amendments on August 28, 2026. The indicative language requires legal review before filing.

The bill is before the Senate plenary, still has no rapporteur, and may be voted during the August 31 to September 4 session week. [Follow the bill](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786).

Our position is to pass REDATA with targeted changes. Senators filed 22 amendments; Amendment 1 is listed as withdrawn. None of the remaining amendments fully covers any of the five core requests. Only Amendment 21 partly covers one of the seven regulatory points by proposing national power certification.

## Five changes

1. **Measure contractable capacity.** Measure the 10% through auditable technical units. Revenue should be supplementary. Hardware, performance, availability, SLA, and commercial terms must be comparable with exported capacity.
2. **Preserve a non-substitutable floor.** Remove full substitution through R&D. As a compromise, cap substitution at half and preserve at least 5% of total effective capacity in Brazil.
3. **Include compute operators.** Qualify GPU cloud, inference, and compute companies using third-party data centers. Cover liquid cooling, power distribution, thermal control, and high-density interconnection.
4. **Create a Brazilian contracting door.** Require a contract enforceable in Brazil, fiscal documentation, local data residency, LGPD and ANPD compliance, and support under Brazilian law.
5. **Publish results and recover benefits.** Create an annual, public, audited report. Breach of domestic-supply commitments should trigger proportional recovery of benefits.

## Seven regulatory points

1. Audit capacity installed, offered, contracted, and used in Brazil.
2. Hardware generation, performance, SLA, availability, and commercial terms.
3. Open R&D calls, published beneficiaries, and conflict controls.
4. WUE, absolute water volume, source, and local water stress.
5. Power certification without double counting and with verified emissions.
6. Grid reinforcements, cost, timeline, and who pays.
7. Independent review before any renewal after five years.

## Political priority

If there is room for only three changes, prioritize auditable technical capacity, a 5% domestic floor, and an annual report with clawback. Amendment 21 is a partial starting point for power certification. Amendments 2 and 6 are acceptable only as a fallback with complete technical criteria, a short deadline, approval by silence, a public list, and appeal. Rewrite Amendment 8 to preserve water-use measurement.

## Two red lines

1. **Do not block equipment Brazil does not yet make.** Reject rigid local-content targets and import gates without an objective exit.
2. **Do not call natural gas clean power.** Emergency use requires disclosure of operating hours, emissions, and a transition plan and should not automatically satisfy the clean-power obligation.

## Comments on all 22 amendments

1. **Amendment 1, Laércio Oliveira:** withdrawn by the author. If revived, oppose turning the clean-power commitment into a preference.
2. **Amendment 2, Eduardo Braga:** accept only as a fallback. It keeps an import gate dependent on executive action and needs criteria, a deadline, approval by silence, a public list, and appeal.
3. **Amendment 3, Nelsinho Trad:** handle separately. Generation-concession changes broaden the bill without improving REDATA commitments.
4. **Amendment 4, Laércio Oliveira:** support with changes. The clean-power definition needs verified emissions and protection against double counting.
5. **Amendment 5, Laércio Oliveira:** merge with Amendment 4. Parallel definitions increase ambiguity.
6. **Amendment 6, Omar Aziz:** apply the same fallback as Amendment 2 and consolidate the two if that solution is used.
7. **Amendment 7, Esperidião Amin:** oppose. Location in a coal region should not reduce capacity available to Brazil.
8. **Amendment 8, Jorge Seif:** rewrite. Reclaimed water should be encouraged without waiving absolute volume, source, and local water-stress data.
9. **Amendment 9, Luis Carlos Heinze:** handle separately. Coal-related CDE taxation needs its own debate.
10. **Amendment 10, Luis Carlos Heinze:** handle separately. Curtailment-cost allocation must identify who pays.
11. **Amendment 11, Zequinha Marinho:** support with safeguards for reliability, planning, and transparent grid costs.
12. **Amendment 12, Wellington Fagundes:** require incidence analysis. The change may shift storage costs to other consumers.
13. **Amendment 13, Izalci Lucas:** oppose. Its local-content index may delay imports, encourage capture, and repeat reserve-market logic without creating a domestic frontier supply.
14. **Amendment 14, Irajá:** use a separate bill or add additionality, fiscal cost, access, and clawback to the battery incentive.
15. **Amendment 15, Marcelo Castro:** handle under ZPE law. The reform does not create a Brazilian contracting door.
16. **Amendment 16, Esperidião Amin:** oppose the current text. Gas and biomethane should face an emissions standard without automatic approval by category.
17. **Amendment 17, Luis Carlos Heinze:** rewrite with a published fiscal cost, open access, additionality, and clawback.
18. **Amendment 18, Luis Carlos Heinze:** handle separately. Hydro-concession renewal requires its own process.
19. **Amendment 19, Luis Carlos Heinze:** merge with Amendment 12 and publish tariff and competition incidence.
20. **Amendment 20, Jayme Campos:** use the domestic-contracting concept while adding LGPD compliance, local processing, and a Brazilian contract.
21. **Amendment 21, Veneziano Vital do Rêgo:** support with certificate retirement, traceability, and verified emissions.
22. **Amendment 22, Laércio Oliveira:** oppose and replace the technology list with a verified performance and emissions standard.

## Sources

- [Brazilian Senate: status and 22 amendments](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786)
- [Brazilian Senate: base bill](https://legis.senado.leg.br/sdleg-getter/documento?dm=10162783&disposition=inline)
- [Senate News: possible vote during the August 31 session week](https://www12.senado.leg.br/noticias/materias/2026/08/27/senado-pode-votar-na-proxima-semana-incentivos-fiscais-para-data-centers)
- [WTO: dispute DS472 and the Inovar-Auto local-content precedent](https://www.wto.org/english/tratop_e/dispu_e/cases_e/ds472_e.htm)
`;

const aboutPtV2 = aboutPt.replace("uma trajetória possível", "duas trajetórias possíveis");
const aboutEnV2 = aboutEn.replace("one possible path", "two possible paths");
const combinedScenarioPt = `${scenarioCommonPt}\n\n---\n\n## Cenário positivo: coordenação e margem de escolha\n\n${scenarioPositivePt}\n\n---\n\n## Cenário negativo: país satélite\n\n${scenarioNegativePt}`;
const combinedScenarioEn = `${scenarioCommonEn}\n\n---\n\n## Positive scenario: coordination and room to choose\n\n${scenarioPositiveEn}\n\n---\n\n## Negative scenario: satellite country\n\n${scenarioNegativeEn}`;

const evidencePtV2 = evidencePt
  .replace(
    "Cada afirmação recebe uma categoria e uma data de verificação.\n\n",
    "Cada afirmação recebe uma categoria e uma data de verificação.\n\n- **Situação legislativa, alta confiança:** em 28 de agosto de 2026, o PL 278/2026 estava no Plenário do Senado, sem relator e com 22 emendas. A matéria poderia ser votada na semana de 31 de agosto a 4 de setembro. [Agência Senado](https://www12.senado.leg.br/noticias/materias/2026/08/27/senado-pode-votar-na-proxima-semana-incentivos-fiscais-para-data-centers)\n- **Análise dos autores, alta confiança:** a leitura do texto-base e das 22 emendas não encontrou nenhuma emenda que cubra integralmente qualquer um dos cinco pedidos centrais. Apenas a Emenda 21 cobre parcialmente um dos sete pontos de regulamentação. [Senado Federal](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786)\n- **Texto aprovado, alta confiança:** a Câmara previu 10% de oferta doméstica medida por receita, substituição integral por P&D adicional e redução a 8% nas regiões incentivadas. [Agência Câmara](https://www.camara.leg.br/noticias/1247282-camara-aprova-incentivo-fiscal-para-investimentos-em-centros-de-processamento-de-dados/)\n",
  )
  .replace(
    "- **Invenção narrativa:** a cena de Camila e Lourdes, o canal brasileiro entre China e Estados Unidos, o protocolo limitado de 2030 e tiers de inferência em 2029.",
    "- **Invenção narrativa:** os dois caminhos após 2026, os incidentes que atingem a clínica de Lourdes, o canal brasileiro entre China e Estados Unidos, o acordo limitado e os controles de bloco de 2029.",
  );

const evidenceEnV2 = evidenceEn
  .replace(
    "Each claim carries a category and a review date.\n\n",
    "Each claim carries a category and a review date.\n\n- **Legislative status, high confidence:** on August 28, 2026, Bill 278/2026 was before the Senate plenary, had no appointed rapporteur, and had received 22 amendments. The bill could be voted during the August 31 to September 4 session week. [Senate News](https://www12.senado.leg.br/noticias/materias/2026/08/27/senado-pode-votar-na-proxima-semana-incentivos-fiscais-para-data-centers)\n- **Author analysis, high confidence:** our review of the base bill and all 22 amendments found no amendment that fully covers any of the five core requests. Only Amendment 21 partly covers one of the seven regulatory points. [Brazilian Senate](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786)\n- **Passed text, high confidence:** the Chamber provided for 10% domestic supply measured through revenue, full substitution through additional R&D, and an 8% obligation in incentivized regions. [Chamber News](https://www.camara.leg.br/noticias/1247282-camara-aprova-incentivo-fiscal-para-investimentos-em-centros-de-processamento-de-dados/)\n",
  )
  .replace(
    "- **Narrative invention:** the Camila and Lourdes scene, Brazilian US-China channel, limited 2030 protocol, and inference tiers in 2029.",
    "- **Narrative invention:** both post-2026 paths, the incidents affecting Lourdes's clinic, the Brazilian US-China channel, the limited agreement, and the 2029 bloc controls.",
  );

const pages: Record<Locale, Record<Exclude<Key, "scenario">, string>> = {
  pt: { summary: summaryPtV2, redata: redataPtV2, evidence: evidencePtV2, strategy: strategyPt, letter: letterPt, about: aboutPtV2 },
  en: { summary: summaryEnV2, redata: redataEnV2, evidence: evidenceEnV2, strategy: strategyEn, letter: letterEn, about: aboutEnV2 },
};

export function markdownFor(locale: Locale, key: Key): string {
  const body = key === "scenario" ? (locale === "pt" ? combinedScenarioPt : combinedScenarioEn) : pages[locale][key];
  return `${sharedHeader(locale)}${key === "scenario" ? `# ${locale === "pt" ? "Brasil 2030: Energia para Escolher" : "Brazil 2030: The Energy to Choose"}\n\n` : ""}${body.trim()}\n`;
}

export function markdownResponse(locale: Locale, key: Key): Response {
  return new Response(markdownFor(locale, key), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
