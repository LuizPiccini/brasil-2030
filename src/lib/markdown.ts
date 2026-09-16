import { evidenceFor } from "../data/evidence";
import { strategyFor } from "../data/strategy";
import { buildDateIso } from "../data/build-info";
import { siteCopy, type Locale } from "../data/site";
import { siteOrigin } from "../data/publication.mjs";

type Key = "scenario" | "summary" | "evidence" | "strategy" | "letter" | "about";

const SITE = siteOrigin();

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

export function markdownFor(locale: Locale, key: Key): string {
  if (key === "evidence") return `${sharedHeader(locale)}${evidenceMarkdown(locale).trim()}\n`;
  if (key === "strategy") return `${sharedHeader(locale)}${strategyMarkdown(locale).trim()}\n`;

  throw new Error(
    `markdownFor("${locale}", "${key}") is no longer available: that page is generated from its own content file in src/pages/. Only evidence and strategy are rendered from shared data here.`,
  );
}

export function markdownResponse(locale: Locale, key: Key): Response {
  return new Response(markdownFor(locale, key), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
