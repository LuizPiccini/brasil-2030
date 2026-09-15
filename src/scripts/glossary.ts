// Editorial explanations; future events remain scenario assumptions, not facts.
export const terms: [string[], string][] = [
  [["capacidade computacional", "compute"], "Recursos de processamento usados para treinar ou executar modelos de IA. Ter um prédio ou eletricidade disponível não garante acesso a esses recursos."],
  [["data centers", "data center"], "Instalações que abrigam computadores, redes, energia e refrigeração. Podem atender clientes locais ou estrangeiros."],
  [["agentes autônomos", "agentes", "agente"], "Sistemas de IA que executam etapas de uma tarefa usando ferramentas, sem receber uma instrução humana para cada ação."],
  [["modelos de fronteira", "modelo de fronteira"], "Modelos entre os mais capazes disponíveis em determinado momento. A expressão não indica uma classificação fixa."],
  [["modelos", "modelo"], "Sistemas treinados com dados para produzir respostas ou realizar tarefas. Um agente pode usar um modelo junto com ferramentas e memória."],
  [["inferência"], "Execução de um modelo já treinado para responder a pedidos ou realizar tarefas. É diferente de treinar o modelo."],
  [["soberania de inferência"], "Capacidade de obter e manter acesso à execução de modelos para atender necessidades brasileiras, mesmo sob restrições externas. Não significa independência em chips ou modelos."],
  [["capacidade contratável"], "Computação que um usuário consegue de fato contratar, com condições definidas de acesso, disponibilidade e desempenho."],
  [["pesos abertos"], "Parâmetros de um modelo disponibilizados para uso fora do serviço do criador, conforme sua licença. Isso não implica que os dados de treinamento sejam públicos."],
  [["pesos"], "Valores numéricos ajustados durante o treinamento que compõem o modelo. Copiá-los pode permitir executar o modelo em outra infraestrutura."],
  [["abliteração"], "Técnica que modifica um modelo para reduzir certos comportamentos de recusa. Não remove necessariamente todas as proteções nem garante controle sobre seu comportamento."],
  [["ransomware"], "Ataque que bloqueia acesso a sistemas ou dados e exige resgate. Pagar não garante recuperação nem impede que dados sejam divulgados."],
  [["sandboxes", "sandbox"], "Ambientes com acesso limitado, usados para testar programas. O isolamento pode falhar por erros de configuração ou vulnerabilidades."],
  [["enxame"], "Grupo de agentes que atua em conjunto ou troca informações durante uma tarefa."],
  [["retenção zero", "zero data retention", "zero-data retention"], "Política de não reter determinados dados enviados ao serviço. O alcance e as exceções dependem do contrato; não é sinônimo de anonimato nem de proibir o uso de dados para treinamento."],
  [["não é vinculante", "não vinculante"], "Sem obrigações juridicamente exigíveis nos termos do instrumento. Uma declaração ainda pode ter peso político."],
  [["treinamento"], "Processo que ajusta os parâmetros de um modelo a partir de dados e avaliações. Exige computação e é diferente de executar um modelo já treinado."],
  [["vinculante"], "Que estabelece obrigações para as partes. Isso não garante, por si só, cumprimento ou fiscalização eficaz."],
  [["fiscalização cruzada"], "No cenário, inspeções em que as partes do acordo verificam instalações e práticas umas das outras."],
  [["CCTI"], "Comissão de Ciência, Tecnologia e Inovação da Câmara dos Deputados."],
  [["PBIA"], "Plano Brasileiro de Inteligência Artificial. Reúne propostas de investimento e ações públicas; previsão de recursos não é execução garantida."],
  [["REDATA"], "Regime de incentivos a data centers discutido no texto. A nota e a fonte junto à narrativa delimitam a versão legislativa usada."],
  [["LGPD"], "Lei Geral de Proteção de Dados Pessoais. Define regras para o tratamento de dados pessoais; não é uma proibição geral de contratar serviços estrangeiros."],
  [["Lei Felca", "ECA Digital"], "Nome popular e denominação do marco de proteção de crianças e adolescentes em ambientes digitais. A aplicação depende do serviço e das obrigações previstas na lei."],
  [["Hugging Face"], "Plataforma que hospeda e distribui modelos, conjuntos de dados e ferramentas de aprendizado de máquina."],
  [["RubyGems"], "Serviço de distribuição de pacotes de software da linguagem Ruby."],
  [["DSEWiki"], "Wiki mencionado no relato do incidente. A referência numerada traz a fonte e o contexto da alegação."],
];

// Links are further reading, not evidence that fictional scenario events occurred.
export const termSources: Record<string, [string, string]> = {
  "capacidade computacional": ["https://research.ibm.com/blog/AI-inference-explained", "IBM Research"],
  "data centers": ["https://pt.wikipedia.org/wiki/Centro_de_processamento_de_dados", "Wikipédia"],
  "agentes autônomos": ["https://www.ibm.com/think/topics/ai-agents", "IBM"],
  "modelos de fronteira": ["https://www.anthropic.com/responsible-scaling-policy/roadmap", "Anthropic"],
  "modelos": ["https://www.ibm.com/think/topics/ai-model", "IBM"],
  "inferência": ["https://www.ibm.com/think/topics/ai-inference", "IBM"],
  "soberania de inferência": ["https://www.ibm.com/think/topics/ai-sovereignty", "IBM · soberania de IA"],
  "capacidade contratável": ["https://www.ibm.com/think/topics/ai-inference", "IBM · serviços de inferência"],
  "pesos abertos": ["https://www.ibm.com/think/topics/open-source-ai", "IBM"],
  "pesos": ["https://www.ibm.com/think/topics/ai-model", "IBM"],
  "abliteração": ["https://arxiv.org/abs/2406.11717", "Estudo de Arditi e colaboradores"],
  "ransomware": ["https://www.ic3.gov/CSA/2023/231019.pdf", "Guia CISA/FBI"],
  "sandboxes": ["https://developers.cloudflare.com/workers/reference/security-model/", "Cloudflare · isolamento e segurança"],
  "enxame": ["https://www.ibm.com/think/topics/multiagent-system", "IBM · sistemas multiagentes"],
  "retenção zero": ["https://privacy.anthropic.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to", "Anthropic"],
  "não é vinculante": ["https://treaties.un.org/Pages/Overview.aspx?path=overview/definition/page1_en.xml", "ONU · tratados e declarações"],
  "treinamento": ["https://research.ibm.com/blog/AI-inference-explained", "IBM Research"],
  "vinculante": ["https://treaties.un.org/Pages/Overview.aspx?path=overview/definition/page1_en.xml", "ONU · tratados e declarações"],
  "fiscalização cruzada": ["https://arxiv.org/abs/2304.04123", "Estudo sobre verificação de acordos de IA"],
  "CCTI": ["https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cctci", "Câmara dos Deputados"],
  "PBIA": ["https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/transformacaodigital/arquivosinteligenciaartificial/plano-brasileiro-de-inteligencia-artificial-pbia-_vf.pdf", "MCTI"],
  "REDATA": ["https://www12.senado.leg.br/noticias/materias/2026/09/01/incentivo-para-instalacao-de-data-centers-no-brasil-e-aprovado-pelo-senado", "Senado"],
  "LGPD": ["https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados", "ANPD"],
  "Lei Felca": ["https://planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm", "Texto da lei"],
  "Hugging Face": ["https://huggingface.co/docs", "Documentação oficial"],
  "RubyGems": ["https://guides.rubygems.org/what-is-a-gem/", "Documentação oficial"],
  "DSEWiki": ["https://collusion.wiki/", "Relato dos investigadores"],
};

export function installGlossary() {
  const dialog = document.querySelector<HTMLDialogElement>("#term-dialog");
  if (!dialog || document.querySelector(".term-trigger")) return;
  const seen = new Set<number>();
  const aliases = terms.flatMap(([names], index) => names.map(name => ({ name, index }))).sort((a,b) => b.name.length-a.name.length);
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp("(?<![\\p{L}\\p{N}])(" + aliases.map(a => escape(a.name)).join("|") + ")(?![\\p{L}\\p{N}])", "giu");
  const root = document.querySelector("#main-content")!;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while(walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.parentElement?.closest("p, li") && !node.parentElement.closest("a,button,script,style,summary,nav,form,details,figure,aside,[id^=fonte]")) nodes.push(node);
  }
  for(const node of nodes) {
    const text = node.data;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for(const match of text.matchAll(pattern)) {
      const alias = aliases.find(a => a.name.toLocaleLowerCase() === match[0].toLocaleLowerCase())!;
      if(seen.has(alias.index)) continue;
      seen.add(alias.index);
      fragment.append(text.slice(cursor, match.index));
      const button = document.createElement("button");
      button.type="button"; button.className="term-trigger"; button.textContent=match[0];
      button.setAttribute("aria-haspopup","dialog"); button.setAttribute("aria-controls","term-dialog");
      button.setAttribute("aria-label", match[0] + ": abrir explicação");
      button.addEventListener("click", () => {
        dialog.querySelector("#term-title")!.textContent=match[0];
        dialog.querySelector("#term-definition")!.textContent=terms[alias.index][1];
        const more = dialog.querySelector<HTMLAnchorElement>("#term-more")!;
        const source = termSources[terms[alias.index][0][0]];
        more.hidden = !source;
        if (source) {
          more.href = source[0];
          more.textContent = `Saiba mais · ${source[1]} ↗`;
          more.setAttribute("aria-label", `Saiba mais sobre ${match[0]} em ${source[1]} (abre em nova aba)`);
        } else {
          more.removeAttribute("href");
        }
        dialog.showModal();
      });
      fragment.append(button); cursor=match.index!+match[0].length;
    }
    if(cursor) { fragment.append(text.slice(cursor)); node.replaceWith(fragment); }
  }
  dialog.querySelector("#term-close")!.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if(event.target === dialog) {
    const box=dialog.getBoundingClientRect();
    if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) dialog.close();
  }});
}
