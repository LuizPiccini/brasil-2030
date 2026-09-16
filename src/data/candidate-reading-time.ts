import type { Locale } from "./site";

export const candidateIntroduction: Record<Locale, string[]> = {
  pt: [
    'A inteligência artificial já está transformando o trabalho, a segurança e as relações entre países. O Brasil não está preparado para essas mudanças, e as decisões dos próximos anos terão consequências permanentes para o país.',
    'Escrevemos este cenário porque a trajetória brasileira nos preocupa. Nele, acompanhamos o Brasil até 2030 para mostrar o que pode acontecer se continuarmos ignorando ou errando as decisões importantes. Queremos reunir brasileiros em torno dessa discussão, entender nossas possibilidades e fazer das escolhas sobre inteligência artificial uma prioridade nacional.',
  ],
  en: [
    'Artificial intelligence is already reshaping work, security, and relations between countries. Brazil is not prepared for these changes, and the decisions of the next few years will have permanent consequences for the country.',
    'We wrote this scenario because Brazil\'s trajectory worries us. In it, we follow the country through 2030 to show what can happen if we keep ignoring or mishandling the decisions that matter. We want to bring Brazilians together around this discussion, understand our options, and make choices about artificial intelligence a national priority.',
  ],
};

/** Where the narrative proper begins and ends, per edition. */
const boundaries: Record<Locale, { start: string; end: string }> = {
  pt: { start: '## 2026:', end: '\n## O que poderia ter sido diferente' },
  en: { start: '## 2026:', end: '\n## What could have been different' },
};

/** Introduction and 2026-2030 only; optional apparatus never inflates the estimate. */
export function candidateReadingTime(source: string, locale: Locale = 'pt', introductionOverride?: string[]) {
  const introduction = introductionOverride ?? candidateIntroduction[locale];
  const start = source.indexOf(boundaries[locale].start);
  const end = source.indexOf(boundaries[locale].end, start);
  if (start < 0 || end < 0) throw new Error(`Missing candidate narrative boundaries for ${locale}`);
  let prose = source.slice(start, end);
  for (const tag of ['details', 'figure', 'table', 'aside']) {
    prose = prose.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi'), ' ');
  }
  prose = prose
    .replace(/<!--[^]*?-->/g, ' ')
    .replace(/<del\b[^>]*>[\s\S]*?<\/del>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\[\d+\]\(#[^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>`]/g, '');
  const words = ([...introduction, prose].join(' ').match(/[\p{L}\p{N}]+(?:['\u2019-][\p{L}\p{N}]+)*/gu) || []).length;
  return { words, minutes: Math.ceil(words / 210) };
}
