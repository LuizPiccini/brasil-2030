// Gera as duas variantes do mainline negativo a partir do texto publicado,
// para discussão com o time. Regenerar sempre que scenario-negative-pt.md mudar.
import { readFileSync, writeFileSync } from "node:fs";

const base = readFileSync("src/content/scenario-negative-pt.md", "utf8").split("\n\n").map((b) => b.trim()).filter(Boolean);

const apply = (ops) => {
  const out = base.slice();
  // aplica de trás para frente para não deslocar índices
  [...ops].sort((a, b) => b.at - a.at).forEach((op) => {
    if (op.mode === "after") out.splice(op.at + 1, 0, op.text);
    else if (op.mode === "append") out[op.at] = out[op.at] + " " + op.text;
    else if (op.mode === "replace") out[op.at] = op.text;
    else if (op.mode === "sub") out[op.at] = out[op.at].replace(op.from, op.to);
  });
  return out;
};

const header = (titulo, resumo, base_) =>
  `<!-- VARIANTE DE DISCUSSÃO — não é o texto publicado.\n     Gerado por scripts/build-scenario-variants.mjs a partir de ${base_}.\n     Regenerar após qualquer edição no mainline. -->\n\n> **${titulo}**\n> ${resumo}\n\n`;

/* ------------------------------------------------------------------ */
/* A · com o fio de erosão institucional                               */
/* ------------------------------------------------------------------ */
const EROSAO = [
  { at: 22, mode: "append",
    text: "Parte desses poderes permanece depois que a onda diminui, e a prorrogação passa a ser votada como formalidade." },
  { at: 40, mode: "after",
    text: "O governo amplia o monitoramento digital criado durante a crise e passa a classificar movimentos de desempregados como possíveis ameaças cibernéticas. A justificativa é sempre a mesma: quem organiza protestos on-line usa as mesmas ferramentas que quem organiza ataques." },
  { at: 82, mode: "after",
    text: "O Brasil ainda realiza eleições. O governo controla o acesso às principais redes de comunicação, usa dados públicos para direcionar propaganda e investiga adversários com ferramentas criadas para combater ataques digitais. Empresas de mídia enfrentam auditorias e bloqueios, e candidatos de oposição perdem acesso a plataformas durante períodos críticos da campanha.\n\nAs instituições preservam seus nomes e edifícios. Juízes, parlamentares e servidores aprendem quais decisões podem custar recursos, proteção digital ou exposição nas redes. Observadores internacionais passam a classificar o Brasil como um regime híbrido: eleições periódicas e poucas condições para uma disputa livre." },
  { at: 83, mode: "sub",
    from: "| Posição internacional |",
    to: "| Democracia | Instituições competitivas sob pressão | Regime híbrido apoiado por vigilância e patronagem |\n| Posição internacional |" },
  { at: 86, mode: "sub", from: "uma disputa dura sobre a crise", to: "uma violência política feroz" },
];

/* ------------------------------------------------------------------ */
/* B · com os quatro personagens                                       */
/* ------------------------------------------------------------------ */
const QUATRO = [
  { at: 14, mode: "after",
    text: "Rafael, analista do CTIR, vê a fila crescer mais rápido do que a equipe consegue classificá-la. Cada defesa dura menos." },
  { at: 15, mode: "sub", from: "Numa clínica popular da zona norte, Lourdes", to: "Na clínica, Lourdes" },
  { at: 18, mode: "replace",
    text: "Numa noite de maio, Lourdes vê na televisão imagens de Lagos sem energia e com caminhões parados nas vias de acesso. A tarja na parte de baixo menciona interrupções na Índia e na Polônia. Lourdes abaixa o volume e manda um áudio para Camila, sua filha: “Isso pode acontecer aqui também?” Camila ouve a mensagem ao lado de um boletim do CTIR com a mesma pergunta escrita em linguagem técnica." },
  { at: 19, mode: "after",
    text: "André compara os sistemas disponíveis para o banco. Uma plataforma estrangeira supera todas as alternativas. O contrato exige integração profunda, retenção de dados operacionais e pagamento em dólar. André assina porque a outra opção deixaria milhões de clientes expostos. Grandes bancos conseguem pagar; clínicas, municípios e pequenas empresas recebem versões antigas ou acesso intermitente." },
  { at: 5, mode: "replace",
    text: "No Brasil, a mudança chega comprada de fora. André percebe no próprio banco: analistas jovens passam o dia distribuindo tarefas entre agentes, conferindo alertas e assumindo os casos que o sistema não resolve. Numa apresentação interna, alguém chama a função de “gerente de IAs”. O nome pega. O banco corta vagas de entrada e compra a produtividade de fornecedores estrangeiros: quem já está empregado é redistribuído, quem ia começar não começa. É o primeiro ano em que a porta de entrada se fecha, e ninguém ainda chama isso de crise de emprego." },
  { at: 22, mode: "after",
    text: "Camila, secretária parlamentar e assessora de um deputado da CCTI, tenta incluir auditoria judicial, uma cláusula de expiração e a designação de uma autoridade de avaliação de riscos de IA. O deputado concorda no gabinete e vota com o governo no plenário." },
  { at: 37, mode: "append",
    text: "Camila acompanha a delegação brasileira e escreve, no relatório interno, que o país foi ouvido com cortesia e sem consequência." },
  { at: 56, mode: "after",
    text: "Camila lê a tabela durante uma reunião no Itamaraty. O Brasil aparece no segundo nível, entre a Indonésia e a Colômbia, numa lista ordenada por ordem alfabética como se fosse um anexo administrativo." },
  { at: 66, mode: "append",
    text: "Camila vê a Serra Verde marcada num mapa como ativo americano desde 2026, e leva um tempo para entender que o mapa não é uma proposta: é um inventário." },
  { at: 84, mode: "replace",
    text: "André protege o banco com a plataforma chinesa. Não consegue auditar todo o sistema nem trocar de fornecedor sem interromper operações essenciais. Rafael continua no governo, porém vê as soluções que propõe ficarem cada vez mais artificiais. Camila deixa o gabinete depois que o deputado vota pela renovação dos poderes de emergência e chama a medida de defesa da democracia.\n\nA clínica de Lourdes sobrevive com menos funcionários. O sistema decide horários, preços e autorizações de pagamento. Quando o fornecedor bloqueia uma função por falta de conformidade, ninguém na clínica sabe como contestar a decisão.\n\nLourdes pergunta a Camila por que o governo permite que uma empresa de outro país controle tantas coisas. Camila responde que o Brasil assinou os contratos porque precisava manter os sistemas funcionando." },
];

writeFileSync(
  "drafts/variante-erosao-democratica.md",
  header(
    "Variante A · com o fio de erosão institucional",
    "O mainline com o que a decisão 04 tirou: permanência dos poderes de emergência, monitoramento de movimentos sociais, captura eleitoral e a linha “Democracia” no placar. Mantém só a Lourdes, como o mainline.",
    "src/content/scenario-negative-pt.md"
  ) + apply(EROSAO).join("\n\n") + "\n"
);

writeFileSync(
  "drafts/variante-quatro-personagens.md",
  header(
    "Variante B · com os quatro personagens",
    "O mainline com Camila, Rafael e André de volta ao lado da Lourdes. Sem o fio de erosão institucional, como o mainline — o fecho da Camila aqui é a renovação dos poderes, que no mainline não acontece; se esta variante for escolhida sozinha, esse parágrafo precisa de outro motivo.",
    "src/content/scenario-negative-pt.md"
  ) + apply(QUATRO).join("\n\n") + "\n"
);

console.log("variantes geradas");
