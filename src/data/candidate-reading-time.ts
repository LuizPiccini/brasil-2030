export const candidateIntroduction = [
  'A inteligência artificial já está transformando o trabalho, a segurança e as relações entre países. O Brasil não está preparado para essas mudanças, e as decisões dos próximos anos terão consequências permanentes para o país.',
  'Escrevemos este cenário porque a trajetória brasileira nos preocupa. Nele, acompanhamos o Brasil até 2030 para mostrar o que pode acontecer se continuarmos ignorando ou errando as decisões importantes. Queremos reunir brasileiros em torno dessa discussão, entender nossas possibilidades e fazer das escolhas sobre inteligência artificial uma prioridade nacional.',
];

/** Introduction and 2026–2030 only; optional apparatus never inflates the estimate. */
export function candidateReadingTime(source: string, introduction: string[] = candidateIntroduction) {
  const start = source.indexOf('## 2026:');
  const end = source.indexOf('\n## O que poderia ter sido diferente', start);
  if (start < 0 || end < 0) throw new Error('Missing candidate narrative boundaries');
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
  const words = ([...introduction, prose].join(' ').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).length;
  return { words, minutes: Math.ceil(words / 210) };
}
