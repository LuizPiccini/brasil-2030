export type Locale = "pt" | "en";
export type ContentPageKey = "scenario" | "summary" | "redata" | "evidence" | "strategy" | "letter" | "about";
export type PageKey = ContentPageKey | "redataNote" | "support" | "signatories";

export const siteCopy = {
  pt: {
    locale: "pt-BR",
    shortLocale: "PT",
    title: "Brasil 2030: Energia para Escolher",
    description: "Dois cenários sobre como escolhas em risco, diplomacia e computação podem mudar a posição do Brasil até 2030.",
    status: "Atualizado",
    updated: "28 ago 2026",
    nav: {
      scenario: "Cenários",
      summary: "Resumo",
      redata: "REDATA",
      evidence: "Evidências",
      strategy: "Estratégia",
      letter: "Carta",
      about: "Sobre",
      support: "Apoie",
      signatories: "Signatários",
    },
    menu: "Menu",
    format: "Markdown",
    skip: "Pular para o conteúdo",
    footerNote: "Uma estratégia para reduzir riscos globais e preservar escolhas brasileiras até 2030.",
  },
  en: {
    locale: "en",
    shortLocale: "EN",
    title: "Brazil 2030: The Energy to Choose",
    description: "Two scenarios for how choices about risk, diplomacy, and compute could change Brazil's position through 2030.",
    status: "Updated",
    updated: "28 Aug 2026",
    nav: {
      scenario: "Scenarios",
      summary: "Summary",
      redata: "REDATA",
      evidence: "Evidence",
      strategy: "Strategy",
      letter: "Letter",
      about: "About",
      support: "Support",
      signatories: "Signatories",
    },
    menu: "Menu",
    format: "Markdown",
    skip: "Skip to content",
    footerNote: "A strategy for reducing global risk and preserving Brazilian choices through 2030.",
  },
} as const;

export const routes: Record<Locale, Record<PageKey, string>> = {
  pt: {
    scenario: "/",
    summary: "/resumo",
    redata: "/redata",
    evidence: "/evidencias",
    strategy: "/estrategia",
    letter: "/carta-aberta",
    about: "/sobre",
    redataNote: "/redata/nota-executiva",
    support: "/apoie",
    signatories: "/signatarios",
  },
  en: {
    scenario: "/en",
    summary: "/en/summary",
    redata: "/en/redata",
    evidence: "/en/evidence",
    strategy: "/en/strategy",
    letter: "/en/open-letter",
    about: "/en/about",
    redataNote: "/en/redata/executive-note",
    support: "/en/support",
    signatories: "/en/signatories",
  },
};

export const markdownRoutes: Record<Locale, Record<ContentPageKey, string>> = {
  pt: {
    scenario: "/cenario.md",
    summary: "/resumo.md",
    redata: "/redata.md",
    evidence: "/evidencias.md",
    strategy: "/estrategia.md",
    letter: "/carta-aberta.md",
    about: "/sobre.md",
  },
  en: {
    scenario: "/en/scenario.md",
    summary: "/en/summary.md",
    redata: "/en/redata.md",
    evidence: "/en/evidence.md",
    strategy: "/en/strategy.md",
    letter: "/en/open-letter.md",
    about: "/en/about.md",
  },
};

export const contributors = [
  { name: "Luiz Piccini", rolePt: "cenário, síntese e edição", roleEn: "scenario, synthesis, and editing" },
  { name: "Danilo Naiff", rolePt: "cenário e cronologia", roleEn: "scenario and chronology" },
  { name: "Pedro Castilho", rolePt: "modelo de computação e data centers", roleEn: "compute and data-center model" },
  { name: "Ivan M. Franco", rolePt: "coordenação e marcos do projeto", roleEn: "coordination and project milestones" },
];
