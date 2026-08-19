export type Locale = "pt" | "en";
export type PageKey = "scenario" | "summary" | "evidence" | "strategy" | "letter" | "about";

export const siteCopy = {
  pt: {
    locale: "pt-BR",
    shortLocale: "PT",
    title: "Brasil 2030: Energia para Escolher",
    description: "Um cenário sobre como o Brasil pode ajudar a desacelerar a corrida da IA, proteger sua infraestrutura e transformar energia em soberania de inferência.",
    status: "Rascunho de trabalho",
    updated: "19 ago 2026",
    nav: {
      scenario: "Cenário",
      summary: "Resumo",
      evidence: "Evidências",
      strategy: "Estratégia",
      letter: "Carta",
      about: "Sobre",
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
    description: "A scenario about how Brazil can help slow the AI race, protect critical infrastructure, and turn energy into inference sovereignty.",
    status: "Working draft",
    updated: "19 Aug 2026",
    nav: {
      scenario: "Scenario",
      summary: "Summary",
      evidence: "Evidence",
      strategy: "Strategy",
      letter: "Letter",
      about: "About",
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
    evidence: "/evidencias",
    strategy: "/estrategia",
    letter: "/carta-aberta",
    about: "/sobre",
  },
  en: {
    scenario: "/en",
    summary: "/en/summary",
    evidence: "/en/evidence",
    strategy: "/en/strategy",
    letter: "/en/open-letter",
    about: "/en/about",
  },
};

export const markdownRoutes: Record<Locale, Record<PageKey, string>> = {
  pt: {
    scenario: "/cenario.md",
    summary: "/resumo.md",
    evidence: "/evidencias.md",
    strategy: "/estrategia.md",
    letter: "/carta-aberta.md",
    about: "/sobre.md",
  },
  en: {
    scenario: "/en/scenario.md",
    summary: "/en/summary.md",
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
