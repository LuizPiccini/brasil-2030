import scenarioCommonEn from "../content/scenario-common-en.md?raw";
import scenarioPositiveEn from "../content/scenario-positive-en.md?raw";
import scenarioNegativeEn from "../content/scenario-negative-en.md?raw";
import { evidenceFor } from "../data/evidence";
import { strategyFor } from "../data/strategy";
import { buildDateIso } from "../data/build-info";
import { siteCopy, type Locale } from "../data/site";

type Key = "scenario" | "summary" | "evidence" | "strategy" | "letter" | "about";

const SITE = "https://brasil-2030.piccini.app";

const sharedHeader = (locale: Locale) =>
  `---\ntitle: ${siteCopy[locale].title}\nlocale: ${siteCopy[locale].locale}\nedition: public\nupdated: ${buildDateIso}\nsourceRevision: ${buildDateIso}-derived\n---\n\n`;

/** Relative in-site links become absolute so a downloaded .md still resolves. */
const absolute = (url: string) => (url.startsWith("/") ? `${SITE}${url}` : url);

// ---------------------------------------------------------------------------
// Derived pages. These read the same modules the .astro pages render, so the
// Markdown edition cannot fall behind the HTML edition again.
// ---------------------------------------------------------------------------

function evidenceMarkdown(locale: Locale): string {
  const pt = locale === "pt";
  const heading = pt ? "# Evidências" : "# Evidence";
  const lede = pt
    ? "Cada afirmação recebe uma categoria, uma fonte e uma data de verificação."
    : "Each claim carries a category, a source, and a review date.";
  const checkedLabel = pt ? "Verificado em" : "Checked";
  const rows = evidenceFor(locale).map((item) => {
    const label = pt ? item.labelPt : item.labelEn;
    const confidence = pt ? item.confidencePt : item.confidenceEn;
    const claim = pt ? item.claimPt : item.claimEn;
    return `- **${label}, ${confidence}.** ${claim} [${item.source}](${absolute(item.url)}). ${checkedLabel} ${item.checked}.`;
  });
  return `${heading}\n\n${lede}\n\n${rows.join("\n")}\n`;
}

function strategyMarkdown(locale: Locale): string {
  const pt = locale === "pt";
  const heading = pt ? "# Estratégia" : "# Strategy";
  const subheading = pt ? "## Cinco compromissos" : "## Five commitments";
  const rows = strategyFor(locale).map(
    (item, index) => `${index + 1}. **${item.title}.** ${item.body}\n   _${item.actor}:_ ${item.owner}`,
  );
  return `${heading}\n\n${subheading}\n\n${rows.join("\n")}\n`;
}

// ---------------------------------------------------------------------------
// Legacy English prose. The Portuguese editions of these pages are generated
// straight from their content files (see src/pages/*.md.ts); only the older
// English edition still needs a copy here. It disappears when the English pages
// are rebuilt.
// ---------------------------------------------------------------------------

const legacyEn: Record<Exclude<Key, "evidence" | "strategy">, string> = {
  scenario: `${scenarioCommonEn}\n\n---\n\n## Positive scenario: coordination and room to choose\n\n${scenarioPositiveEn}\n\n---\n\n## Negative scenario: satellite country\n\n${scenarioNegativeEn}`,

  summary: `# Summary\n\n**Two paths, three commitments.**\n\nBoth scenarios face attacks, automation, and geopolitical competition. Choices made in 2026 determine whether energy and data centers expand Brazil's options or deepen dependency.\n\n1. **Argue for a global slowdown.** Support reciprocal and verifiable limits focused on the most dangerous capabilities.\n2. **Open channels between the United States and China.** Use Brazilian diplomacy to sustain talks on incidents, evaluations, and limits.\n3. **Turn energy into sovereignty.** Condition grid access, permits, and incentives on contractable capacity, continuity, consultation, and verifiable public benefits.\n\n## Two paths\n\n- **Coordination and room to choose:** attacks produce pressure for an agreement, and energy and compute help Brazil become an AI-era middle power.\n- **Satellite country:** the United States and China slow down under rules that preserve their advantage. Brazil trades alignment for access while unemployment, brain drain, and democratic erosion reduce its autonomy.\n\nThe agreement reduces part of the global risk. Domestic capacity determines who takes part in decisions.\n`,

  letter: `# Open letter to Brazil's 2026 candidates\n\n> No electoral endorsement.\n\nThe race toward increasingly capable AI systems may increase cyberattacks, infrastructure failures, and risks that no country controls alone. Brazil also cannot accept technological dependence without bargaining power.\n\nWe ask for four commitments: argue for reciprocal and verifiable global limits; offer mediation between China and the United States; prepare Brazil's critical infrastructure; and condition data-center benefits on contractable access, continuity, consultation, water limits, and transparent grid-connection costs.\n\nBrazil can help buy time and use energy, the grid, and its market to preserve choices. Diplomacy and inference sovereignty belong to the same security policy.\n`,

  about: `# About\n\nBrazil 2030 describes possible paths so that global risks, foreign policy, and infrastructure choices become concrete enough to debate. The Portuguese edition leads the editorial work; this English version is an earlier edition and is not a translation of the current Portuguese narrative.\n\nThe chronology combines Danilo Naiff's work with the continuation prepared by Luiz Piccini and Apollo. Pedro Castilho works on the compute model; Ivan M. Franco coordinates milestones.\n\nThe format draws on [AI 2027](https://ai-2027.com/), [AI 2040](https://ai-2040.com/), and [Europe 2031](https://europe2031.ai/). Brazil 2030 is not affiliated with those projects.\n`,
};

export function markdownFor(locale: Locale, key: Key): string {
  if (key === "evidence") return `${sharedHeader(locale)}${evidenceMarkdown(locale).trim()}\n`;
  if (key === "strategy") return `${sharedHeader(locale)}${strategyMarkdown(locale).trim()}\n`;

  if (locale === "pt") {
    throw new Error(
      `markdownFor("pt", "${key}") is no longer available: the Portuguese ${key} page is generated from its own content file in src/pages/${key}.md.ts`,
    );
  }

  const title = key === "scenario" ? `# ${siteCopy.en.title}\n\n` : "";
  return `${sharedHeader(locale)}${title}${legacyEn[key].trim()}\n`;
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
