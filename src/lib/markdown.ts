import scenarioCommonPt from "../content/scenario-common-pt.md?raw";
import scenarioCommonEn from "../content/scenario-common-en.md?raw";
import scenarioPositivePt from "../content/scenario-positive-pt.md?raw";
import scenarioPositiveEn from "../content/scenario-positive-en.md?raw";
import scenarioNegativePt from "../content/scenario-negative-pt.md?raw";
import scenarioNegativeEn from "../content/scenario-negative-en.md?raw";

type Locale = "pt" | "en";
type Key = "scenario" | "summary" | "redata" | "evidence" | "strategy" | "letter" | "about";

const sharedHeader = (locale: Locale, status: string) => `---\ntitle: ${locale === "pt" ? "Brasil 2030: Energia para Escolher" : "Brazil 2030: The Energy to Choose"}\nlocale: ${locale === "pt" ? "pt-BR" : "en"}\nstatus: ${status}\nupdated: 2026-08-28\nsourceRevision: 2026-08-28-redata-amendments-v0.6\n---\n\n`;

const evidencePt = `# Evidências\n\nCada afirmação recebe uma categoria e uma data de verificação.\n\n- **Fato observado, alta confiança:** há evidência forte de uso de IA por criminosos e Estados em operações cibernéticas; ataques autônomos de ponta a ponta não foram reportados e o impacto agregado ainda é incerto. [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026)\n- **Fato observado, alta confiança:** o Diálogo Global da ONU reúne os 193 Estados-membros; a primeira sessão ocorreu em julho de 2026. [ONU](https://www.un.org/global-dialogue-ai-governance/en/faq)\n- **Fato observado, alta confiança:** a oferta interna de eletricidade chegou a 783,3 TWh em 2025, com 86,8% de renováveis. [EPE, BEN 2026](https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-975/topico-847/BEN_S%C3%ADntese_2026_PT.pdf)\n- **Fato observado, alta confiança:** a EPE registrou 719 MW de carga total de data centers em 2025. O número não funciona como inventário de GPUs. [EPE](https://www.epe.gov.br/sites-pt/areas-de-atuacao/energia-eletrica/WorkshopCOPAM/%5BEPE%5D%20Coleta%20Data%20Center%20na%20distribui%C3%A7%C3%A3o%202025%20IV%20COPAM_12-2025.pdf)\n- **Fato observado, alta confiança:** a EPE propôs R$5,68 bilhões em novas instalações de transmissão para conectar até 4 GW de cargas eletrointensivas no Ceará e no Piauí. [EPE](https://www.epe.gov.br/pt/imprensa/noticias/epe-propoe-solucao-de-transmissao-flexivel-e-escalonavel-para-atendimento-a-ate-4gw-de-cargas-eletrointensivas-no-ceara-e-piaui)\n- **Resposta regulatória, alta confiança:** o CONAMA pediu diretrizes nacionais para consumo de água e energia, emissões, impactos territoriais, tarifas e participação pública no licenciamento de data centers. [CONAMA](https://conama.mma.gov.br/?id=858&option=com_sisconama&task=arquivo.download)\n- **Alegação do empreendedor, exige verificação:** a ByteDance afirma que o projeto de Pecém usará energia renovável e resfriamento com reuso de água. Fonte, limites, reposição em secas e obrigações auditáveis continuam relevantes. [TikTok](https://newsroom.tiktok.com/tiktok-anuncia-seu-primeiro-data-center-na-america-latina-com-investimento-superior-a-r-200-billhoes?lang=pt-BR)\n- **Plano publicado, alta confiança:** o PBIA prevê R$23,03 bilhões em investimento. Os valores são planejados. [MCTI](https://www.gov.br/mcti/pt-br/centrais-de-conteudo/publicacoes-mcti/plano-brasileiro-de-inteligencia-artificial/pbia_mcti_2025.pdf)\n- **Projeto reportado, confiança média:** reportagens descrevem cerca de 200 MW na primeira fase de Pecém e expansão possível para perto de 1 GW. [w.media](https://w.media/bytedance-begins-construction-of-us-38-44-billion-data-center-in-brazil/)\n- **Estimativa dos autores, baixa confiança:** o Brasil pode deter 0,1% a 0,5% da computação relevante para IA. Não existe um censo comparável.\n- **Precedente regulatório, alta confiança:** o regime americano de 2025 criou tiers para chips, pesos e treinamento, não para APIs comuns. [Federal Register](https://www.federalregister.gov/documents/2025/01/15/2025-00636/framework-for-artificial-intelligence-diffusion)\n- **Invenção narrativa:** a cena de Camila e Lourdes, o canal brasileiro entre China e Estados Unidos, o protocolo limitado de 2030 e tiers de inferência em 2029.\n- **Proposta em aberto:** ainda precisamos definir como uma desaceleração recíproca poderia ser verificada e acionada.\n- **Em modelagem:** capacidade em 2030, parcela contratável e custo por trajetória.\n`;

const evidenceEn = `# Evidence\n\nEach claim carries a category and a review date.\n\n- **Observed fact, high confidence:** there is strong evidence of AI use by criminals and states in cyber operations; fully autonomous end-to-end attacks have not been reported and the aggregate impact remains uncertain. [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026)\n- **Observed fact, high confidence:** the UN Global Dialogue includes all 193 member states; its first session was held in July 2026. [United Nations](https://www.un.org/global-dialogue-ai-governance/en/faq)\n- **Observed fact, high confidence:** domestic electricity supply reached 783.3 TWh in 2025, with 86.8% renewables. [EPE, BEN 2026](https://www.epe.gov.br/sites-pt/publicacoes-dados-abertos/publicacoes/PublicacoesArquivos/publicacao-975/topico-847/BEN_S%C3%ADntese_2026_PT.pdf)\n- **Observed fact, high confidence:** EPE recorded 719 MW of total data-center load in 2025. The figure is not a GPU inventory. [EPE](https://www.epe.gov.br/sites-pt/areas-de-atuacao/energia-eletrica/WorkshopCOPAM/%5BEPE%5D%20Coleta%20Data%20Center%20na%20distribui%C3%A7%C3%A3o%202025%20IV%20COPAM_12-2025.pdf)\n- **Observed fact, high confidence:** EPE proposed R$5.68 billion in new transmission assets to connect up to 4 GW of electro-intensive load in Ceará and Piauí. [EPE](https://www.epe.gov.br/pt/imprensa/noticias/epe-propoe-solucao-de-transmissao-flexivel-e-escalonavel-para-atendimento-a-ate-4gw-de-cargas-eletrointensivas-no-ceara-e-piaui)\n- **Regulatory response, high confidence:** CONAMA called for national rules covering water and electricity use, emissions, territorial impacts, tariffs, and public participation in data-center licensing. [CONAMA](https://conama.mma.gov.br/?id=858&option=com_sisconama&task=arquivo.download)\n- **Developer claim, verification required:** ByteDance says the Pecém project will use renewable power and cooling with water reuse. The source, limits, drought-period replenishment, and auditable obligations remain relevant. [TikTok](https://newsroom.tiktok.com/tiktok-anuncia-seu-primeiro-data-center-na-america-latina-com-investimento-superior-a-r-200-billhoes?lang=pt-BR)\n- **Published plan, high confidence:** the PBIA sets out R$23.03 billion in planned investment. [MCTI](https://www.gov.br/mcti/pt-br/centrais-de-conteudo/publicacoes-mcti/plano-brasileiro-de-inteligencia-artificial/pbia_mcti_2025.pdf)\n- **Reported project, medium confidence:** reports describe about 200 MW in Pecém's first phase and possible expansion toward 1 GW. [w.media](https://w.media/bytedance-begins-construction-of-us-38-44-billion-data-center-in-brazil/)\n- **Author estimate, low confidence:** Brazil may hold 0.1% to 0.5% of AI-relevant compute. No comparable census exists.\n- **Regulatory precedent, high confidence:** the 2025 US regime created tiers for chips, weights, and training, not ordinary APIs. [Federal Register](https://www.federalregister.gov/documents/2025/01/15/2025-00636/framework-for-artificial-intelligence-diffusion)\n- **Narrative invention:** the Camila and Lourdes scene, Brazilian US-China channel, limited 2030 protocol, and inference tiers in 2029.\n- **Open proposal:** a reciprocal slowdown still needs a defined verification and trigger mechanism.\n- **Model pending:** 2030 capacity, contractable share, and cost by trajectory.\n`;

const strategyPt = `# Estratégia\n\n## Cinco compromissos\n\n1. **Defender uma desaceleração verificável.** Propor limites recíprocos para capacidades que ampliem riscos cibernéticos, biológicos ou de perda de controle.\n2. **Sustentar um canal China-Estados Unidos.** Oferecer mediação, fóruns e capacidade técnica para acordos de incidentes, avaliações e ritmo.\n3. **Preparar o Brasil.** Mapear dependências e endurecer energia, telecomunicações, finanças e serviços públicos contra falhas e ataques.\n4. **Construir soberania de inferência.** Vincular rede, licenças e incentivos a acesso contratável, continuidade, consulta às comunidades afetadas e limites públicos de uso da água.\n5. **Medir e corrigir.** Publicar capacidade, uso, preço, jurisdição, consumo hídrico, custo da rede e empregos permanentes; encerrar subsídios que não entreguem benefício público.\n\nDesaceleração não significa paralisar toda pesquisa ou adoção. Significa criar limites verificáveis para a corrida de fronteira enquanto aplicações de menor risco continuam. Percentuais fixos de acesso doméstico ainda precisam ser testados por pilotos.\n`;

const strategyEn = `# Strategy\n\n## Five commitments\n\n1. **Argue for a verifiable slowdown.** Propose reciprocal limits on capabilities that increase cyber, biological, or loss-of-control risks.\n2. **Sustain a China-US channel.** Offer mediation, forums, and technical capacity for agreements on incidents, evaluations, and pacing.\n3. **Prepare Brazil.** Map dependencies and harden energy, telecommunications, finance, and public services against failures and attacks.\n4. **Build inference sovereignty.** Tie grid access, permits, and incentives to contractable access, continuity, consultation with affected communities, and public water-use limits.\n5. **Measure and correct.** Publish capacity, use, price, jurisdiction, water consumption, grid costs, and permanent jobs; end subsidies that fail to deliver public benefits.\n\nA slowdown does not mean freezing all research or adoption. It means verifiable limits on the frontier race while lower-risk applications continue. Fixed domestic-access percentages still need to be tested through pilots.\n`;

const letterPt = `# Carta aberta aos candidatos de 2026\n\n> Rascunho para revisão da equipe. Não representa endosso eleitoral.\n\nA corrida por sistemas de IA cada vez mais capazes pode aumentar ataques cibernéticos, falhas de infraestrutura e riscos que nenhum país controla sozinho. O Brasil também não pode aceitar dependência tecnológica sem poder de barganha.\n\nPedimos quatro compromissos: defender limites globais recíprocos e verificáveis; oferecer mediação entre China e Estados Unidos; preparar a infraestrutura crítica brasileira; e condicionar benefícios a data centers a acesso contratável, continuidade, consulta, limites hídricos e custos transparentes de conexão à rede.\n\nO Brasil pode ajudar a ganhar tempo e usar energia, rede e mercado para preservar escolhas. Diplomacia e soberania de inferência são partes da mesma política de segurança.\n`;

const letterEn = `# Open letter to Brazil's 2026 candidates\n\n> Team review draft. No electoral endorsement.\n\nThe race toward increasingly capable AI systems may increase cyberattacks, infrastructure failures, and risks that no country controls alone. Brazil also cannot accept technological dependence without bargaining power.\n\nWe ask for four commitments: argue for reciprocal and verifiable global limits; offer mediation between China and the United States; prepare Brazil's critical infrastructure; and condition data-center benefits on contractable access, continuity, consultation, water limits, and transparent grid-connection costs.\n\nBrazil can help buy time and use energy, the grid, and its market to preserve choices. Diplomacy and inference sovereignty belong to the same security policy.\n`;

const aboutPt = `# Sobre\n\nBrasil 2030 descreve uma trajetória possível para tornar riscos globais, política externa e escolhas de infraestrutura concretos o bastante para debate. A edição em português orienta o trabalho editorial; a versão inglesa acompanha suas revisões.\n\nA cronologia consolida o trabalho de Danilo Naiff com a continuação preparada por Luiz Piccini e Apollo. Pedro Castilho trabalha no modelo de computação; Ivan M. Franco coordena os marcos. Tomás é convidado a revisar fontes, criticar premissas e ajudar na distribuição, mas não é listado como coautor nesta edição.\n\nO formato se inspira em [AI 2027](https://ai-2027.com/), [AI 2040](https://ai-2040.com/) e [Europe 2031](https://europe2031.ai/). Brasil 2030 não possui afiliação com esses projetos.\n`;

const aboutEn = `# About\n\nBrazil 2030 describes one possible path so that global risks, foreign policy, and infrastructure choices become concrete enough to debate. The Portuguese edition leads the editorial work; the English version follows its revisions.\n\nThe chronology combines Danilo Naiff's work with the continuation prepared by Luiz Piccini and Apollo. Pedro Castilho works on the compute model; Ivan M. Franco coordinates milestones. Tomás is invited to review sources, challenge assumptions, and help with distribution, but is not listed as a coauthor in this edition.\n\nThe format draws on [AI 2027](https://ai-2027.com/), [AI 2040](https://ai-2040.com/), and [Europe 2031](https://europe2031.ai/). Brazil 2030 is not affiliated with those projects.\n`;

const summaryPtV2 = `# Resumo\n\n**Duas trajetórias, três compromissos.**\n\nOs dois cenários enfrentam ataques, automação e disputa geopolítica. As escolhas de 2026 determinam se energia e data centers ampliam a margem brasileira ou aprofundam a dependência.\n\n1. **Defender uma desaceleração global.** Apoiar limites recíprocos e verificáveis para as capacidades mais perigosas.\n2. **Abrir canais entre China e Estados Unidos.** Usar a diplomacia brasileira para sustentar negociações sobre incidentes, avaliações e limites.\n3. **Transformar energia em soberania.** Condicionar rede, licenças e incentivos a capacidade contratável, continuidade, consulta e benefícios públicos verificáveis.\n\n## Dois caminhos\n\n- **Coordenação e margem de escolha:** o REDATA cria acesso contratável, ataques produzem pressão por um acordo, e energia e compute ajudam o Brasil a se tornar uma potência intermediária.\n- **País satélite:** o REDATA falha ou cria enclaves. EUA e China desaceleram sob regras que preservam sua vantagem. O Brasil troca alinhamento por acesso enquanto desemprego, brain drain e erosão democrática reduzem sua autonomia.\n\nO acordo reduz parte do risco global. A capacidade doméstica define quem participa das decisões.\n`;

const summaryEnV2 = `# Summary\n\n**Two paths, three commitments.**\n\nBoth scenarios face attacks, automation, and geopolitical competition. Choices made in 2026 determine whether energy and data centers expand Brazil's options or deepen dependency.\n\n1. **Argue for a global slowdown.** Support reciprocal and verifiable limits focused on the most dangerous capabilities.\n2. **Open channels between China and the United States.** Use Brazilian diplomacy to sustain talks on incidents, evaluations, and limits.\n3. **Turn energy into sovereignty.** Condition grid access, permits, and incentives on contractable capacity, continuity, consultation, and verifiable public benefits.\n\n## Two paths\n\n- **Coordination and room to choose:** REDATA creates contractable access, attacks produce pressure for an agreement, and energy and compute help Brazil become a middle power.\n- **Satellite country:** REDATA fails or creates enclaves. The United States and China slow down under rules that preserve their advantage. Brazil trades alignment for access while unemployment, brain drain, and democratic erosion reduce its autonomy.\n\nThe agreement reduces part of the global risk. Domestic capacity determines who takes part in decisions.\n`;

const redataPtV2 = `# REDATA: aprovar com cinco ajustes

> Posição dos autores sobre o PL 278/2026. Revisão factual do texto-base e das 22 emendas em 28 de agosto de 2026. A redação indicativa precisa de revisão jurídica antes do protocolo.

O projeto está no Plenário do Senado, ainda sem relator, e pode ser votado na semana de 31 de agosto a 4 de setembro. [Acompanhe a tramitação](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786).

Nossa posição é aprovar o REDATA com mudanças pontuais. A revisão das 22 emendas encontrou uma lacuna: nenhuma cobre integralmente qualquer um dos cinco pedidos centrais. Apenas a Emenda 21 cobre parcialmente um dos sete pontos de regulamentação, ao propor certificação nacional de energia.

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

Se houver espaço para apenas três mudanças, priorizar capacidade técnica auditável, piso doméstico de 5% e relatório com clawback. Apoiar as Emendas 2 e 6 com ampliação da lista de equipamentos. Apoiar a Emenda 21 com cancelamento dos certificados usados e emissões verificáveis. Reescrever a Emenda 8 para que água de reuso não dispense a divulgação do volume absoluto, da origem e da situação hídrica local.

## Fontes

- [Senado Federal: tramitação e 22 emendas](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786)
- [Senado Federal: texto-base](https://legis.senado.leg.br/sdleg-getter/documento?dm=10162783&disposition=inline)
- [Agência Senado: possível votação na semana de 31 de agosto](https://www12.senado.leg.br/noticias/materias/2026/08/27/senado-pode-votar-na-proxima-semana-incentivos-fiscais-para-data-centers)
`;

const redataEnV2 = `# REDATA: pass with five changes

> The authors' position on Bill 278/2026. Factual review of the base bill and all 22 amendments on August 28, 2026. The indicative language requires legal review before filing.

The bill is before the Senate plenary, still has no rapporteur, and may be voted during the August 31 to September 4 session week. [Follow the bill](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786).

Our position is to pass REDATA with targeted changes. The review of all 22 amendments found a clear gap: none fully covers any of the five core requests. Only Amendment 21 partly covers one of the seven regulatory points by proposing national power certification.

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

If there is room for only three changes, prioritize auditable technical capacity, a 5% domestic floor, and an annual report with clawback. Support Amendments 2 and 6 while expanding equipment categories. Support Amendment 21 with certificate cancellation and verified emissions. Rewrite Amendment 8 so reclaimed water does not waive disclosure of absolute volume, source, and local water stress.

## Sources

- [Brazilian Senate: status and 22 amendments](https://www25.senado.leg.br/web/atividade/materias/-/materia/172786)
- [Brazilian Senate: base bill](https://legis.senado.leg.br/sdleg-getter/documento?dm=10162783&disposition=inline)
- [Senate News: possible vote during the August 31 session week](https://www12.senado.leg.br/noticias/materias/2026/08/27/senado-pode-votar-na-proxima-semana-incentivos-fiscais-para-data-centers)
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
  const status = locale === "pt" ? "rascunho-de-trabalho" : "working-draft";
  const body = key === "scenario" ? (locale === "pt" ? combinedScenarioPt : combinedScenarioEn) : pages[locale][key];
  return `${sharedHeader(locale, status)}${key === "scenario" ? `# ${locale === "pt" ? "Brasil 2030: Energia para Escolher" : "Brazil 2030: The Energy to Choose"}\n\n` : ""}${body.trim()}\n`;
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
