import { buildDateLabel } from "./build-info.mjs";

export type Locale = "pt" | "en" | "es";
export type ContentPageKey = "scenario" | "summary" | "evidence" | "strategy" | "letter" | "about";
export type PageKey = ContentPageKey | "signatories" | "privacy";

/** Where data deletion requests go, per the privacy page. */
export const CONTACT_EMAIL = "luiz@piccini.app";

export const siteCopy = {
  pt: {
    locale: "pt-BR",
    shortLocale: "PT",
    title: "Brasil 2030: O custo do atraso na era da IA",
    description: "Um cenário sobre o que acontece com o Brasil até 2030 se as decisões sobre inteligência artificial continuarem sendo adiadas.",
    status: "Atualizado",
    updated: buildDateLabel.pt,
    nav: {
      scenario: "Cenários",
      summary: "Resumo",
      evidence: "Evidências",
      strategy: "Estratégia",
      letter: "Carta",
      about: "Sobre",
      signatories: "Signatários",
      privacy: "Privacidade",
    },
    menu: "Menu",
    format: "Markdown",
    skip: "Pular para o conteúdo",
    footerNote: "Uma estratégia para reduzir riscos globais e preservar escolhas brasileiras até 2030.",
  },
  en: {
    locale: "en",
    shortLocale: "EN",
    title: "Brazil 2030: The Cost of Delay in the AI Era",
    description: "A scenario for what happens to Brazil through 2030 if decisions about artificial intelligence keep being postponed.",
    status: "Updated",
    updated: buildDateLabel.en,
    nav: {
      scenario: "Scenarios",
      summary: "Summary",
      evidence: "Evidence",
      strategy: "Strategy",
      letter: "Letter",
      about: "About",
      signatories: "Signatories",
      privacy: "Privacy",
    },
    menu: "Menu",
    format: "Markdown",
    skip: "Skip to content",
    footerNote: "A strategy for reducing global risk and preserving Brazilian choices through 2030.",
  },
  es: {
    locale: "es",
    shortLocale: "ES",
    title: "Brasil 2030: El costo del retraso en la era de la IA",
    description: "Un escenario sobre lo que le sucede a Brasil hasta 2030 si las decisiones sobre inteligencia artificial siguen siendo postergadas.",
    status: "Actualizado",
    updated: buildDateLabel.es,
    nav: {
      scenario: "Escenarios",
      summary: "Resumen",
      evidence: "Evidencias",
      strategy: "Estrategia",
      letter: "Carta",
      about: "Sobre",
      signatories: "Firmantes",
      privacy: "Privacidad",
    },
    menu: "Menú",
    format: "Markdown",
    skip: "Ir al contenido",
    footerNote: "Una estrategia para reducir riesgos globales y preservar las elecciones brasileñas hasta 2030.",
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
    signatories: "/signatarios",
    privacy: "/privacidade",
  },
  en: {
    scenario: "/en",
    summary: "/en/summary",
    evidence: "/en/evidence",
    strategy: "/en/strategy",
    letter: "/en/open-letter",
    about: "/en/about",
    signatories: "/en/signatories",
    privacy: "/en/privacy",
  },
  es: {
    scenario: "/es",
    summary: "/es/resumen",
    evidence: "/es/evidencias",
    strategy: "/es/estrategia",
    letter: "/es/carta-abierta",
    about: "/es/sobre",
    signatories: "/es/signatarios",
    privacy: "/es/privacidad",
  },
};

export const markdownRoutes: Record<Locale, Record<ContentPageKey, string>> = {
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
  es: {
    scenario: "/es/escenario.md",
    summary: "/es/resumen.md",
    evidence: "/es/evidencias.md",
    strategy: "/es/estrategia.md",
    letter: "/es/carta-abierta.md",
    about: "/es/sobre.md",
  },
};

export const contributors = [
  { name: "Luiz Piccini", rolePt: "cenário, síntese e edição", roleEn: "scenario, synthesis, and editing" },
  { name: "Danilo Naiff", rolePt: "cenário e cronologia", roleEn: "scenario and chronology" },
  { name: "Pedro Castilho", rolePt: "modelo de computação e data centers", roleEn: "compute and data-center model" },
  { name: "Ivan M. Franco", rolePt: "coordenação e marcos do projeto", roleEn: "coordination and project milestones" },
];
