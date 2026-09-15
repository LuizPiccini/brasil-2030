import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import worker from "../worker.js";
import { chapterAtReadingLine } from "../src/scripts/candidate-reader.ts";
import { candidateReadingTime } from "../src/data/candidate-reading-time.ts";

const html = readFileSync(new URL("../dist/candidato/index.html", import.meta.url), "utf8");
const markdown = readFileSync(new URL("../dist/candidato.md", import.meta.url), "utf8");

test("candidate reads as a publication without implying a translated edition", () => {
  assert.match(html, /<title>Energia para Escolher \| Brasil 2030<\/title>/);
  assert.match(html, /Este é um cenário, não uma previsão/);
  assert.match(html, /noindex, nofollow, noarchive/);
  assert.match(html, /rel="canonical" href="https:\/\/brasil-2030.piccini.app\/"/);
  assert.doesNotMatch(html, /hreflang="en"/);
  assert.match(html, /aria-disabled="true" title="Este texto ainda não tem tradução em inglês"/);
  assert.match(html, /href="\/cenario.md"/);
  assert.equal(readFileSync(new URL("../dist/index.html", import.meta.url), "utf8"), html);
});

test("candidate has a compact single-scenario opening within the existing reading design", () => {
  for (const className of ["candidate-opening", "reading-layout", "chapter-nav", "reading-aside", "scenario-dashboard", "mobile-chapter-bar"]) {
    assert.match(html, new RegExp(`class="${className}"`));
  }
  for (const path of ["evidencias", "carta-aberta", "sobre"]) {
    assert.ok(html.includes(`href="/${path}"`), `missing navigation to ${path}`);
  }
  assert.match(html, /data-candidate-states=/);
  assert.match(html, /Não mede o Brasil real/);
  assert.doesNotMatch(html, /data-branch-target|scenario-hero-branches|hero-branch-positive|scenario-disclaimer/);
  assert.doesNotMatch(html, /Começar em 2026/);
  assert.doesNotMatch(html.match(/<section class="candidate-opening"[\s\S]*?<\/section>/)?.[0] ?? "", /hero-actions/);
  assert.equal((html.match(/data-candidate-states=/g) || []).length, 1, "one dashboard follows the full narrative");
  const primaryNav = html.match(/<nav class="desktop-nav"[^>]*>(.*?)<\/nav>/s)[1];
  assert.deepEqual([...primaryNav.matchAll(/href="([^"]+)"/g)].map((match) => match[1]), ["/", "/carta-aberta", "/sobre"]);
  assert.match(html, /href="\/carta-aberta#assinar"/);
  assert.match(markdown, /A inteligência artificial já está transformando o trabalho, a segurança e as relações entre países/);
  const rootHtml = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.doesNotMatch(rootHtml, /scenario-hero-branches/);
  assert.match(rootHtml, /candidate-opening/);
});

test("reader tracks forward, backward and appendix navigation without conflating years", () => {
  assert.equal(chapterAtReadingLine([400, 900, 1400], 100), 0);
  assert.equal(chapterAtReadingLine([-800, -300, 200], 100), 1);
  assert.equal(chapterAtReadingLine([-800, -300, 100], 100), 2);
  assert.equal(chapterAtReadingLine([-100, 400, 900], 100), 0);
  assert.equal(chapterAtReadingLine([-700, -600, -500, -400, -300, -200, -100, 0], 100), 7);
});

test("all candidate navigation and source anchors resolve uniquely", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate IDs");
  for (const [, href] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(decodeURIComponent(href)), `missing #${href}`);
  }
  const chapterCount = (html.match(/<h2\b/g) || []).length;
  assert.equal(chapterCount, 9, "five years, alternatives, appendix, notes and separate glossary dialog");
});

test("candidate HTML and Markdown preserve the full manuscript and its boundaries", () => {
  for (const phrase of ["A segunda-feira sem sistema", "A ligação", "O que poderia ter sido diferente", "se a desaceleração não acontecer", "Camila", "Lourdes", "potência intermediária", "Notas e fontes"]) {
    assert.ok(html.includes(phrase), `HTML: ${phrase}`);
    assert.ok(markdown.includes(phrase), `Markdown: ${phrase}`);
  }
  assert.match(markdown, /Este é um cenário, não uma previsão/);
  assert.match(html, /autenticação mais resistente/i);
  assert.match(html, /Uma pausa no treinamento não produz escassez de inferência por si só/);
  assert.match(html, /O teste não tem defensores ativos/);
  assert.match(html, /não atribuímos probabilidades a cada evento/);
  assert.doesNotMatch(html, /25% do total de inferência|não haja mais a menor pressão/);
});

test("reader artifacts are removed in both formats while sourcing remains available", () => {
  const backstage = /basead[oa] na proposta de Danilo|assistência de IA|aprovação coletiva|versão candidata|proposta de narrativa|PT · revisão|o que mudaria na história|para revisar, indique|candidate-banner|candidate-evidence|candidate-byline/i;
  for (const output of [html, markdown]) {
    assert.doesNotMatch(output, backstage);
    for (let source = 1; source <= 19; source++) {
      assert.match(output, new RegExp(`id="fonte-${source}"`));
    }
  }
  assert.equal((html.match(/<details class="candidate-note"/g) || []).length, 4);
  assert.doesNotMatch(html, /<details class="candidate-note"[^>]*\bopen\b/);
});

test("complete candidate keeps the approved opening and October-to-2030 chronology in both formats", () => {
  const introduction = [
    "A inteligência artificial já está transformando o trabalho, a segurança e as relações entre países. O Brasil não está preparado para essas mudanças, e as decisões dos próximos anos terão consequências permanentes para o país.",
    "Escrevemos este cenário porque a trajetória brasileira nos preocupa. Nele, acompanhamos o Brasil até 2030 para mostrar o que pode acontecer se continuarmos ignorando ou errando as decisões importantes. Queremos reunir brasileiros em torno dessa discussão, entender nossas possibilidades e fazer das escolhas sobre inteligência artificial uma prioridade nacional.",
  ];
  for (const output of [html, markdown]) {
    for (const paragraph of introduction) assert.ok(output.includes(paragraph));
    for (const phrase of ["2026: Um assunto para depois da eleição", "Em outubro de 2026, o Brasil vai às urnas", "Camila", "Lourdes", "Outra eleição", "13 de setembro de 2026"]) {
      assert.ok(output.includes(phrase), `missing narrative element: ${phrase}`);
    }
    assert.doesNotMatch(output, /A notícia que fica para depois|Todos os candidatos à presidência|os CEOs das quatro maiores empresas/);
    assert.doesNotMatch(output, /Rafael|André|Juliana|Marlene/, "only Camila and Lourdes retain fictional character arcs");
  }
  assert.ok(markdown.includes("Quando riscos de IA são mencionados, autoridades e jornalistas pensam em deepfakes e desinformação."), "preserve the approved revision");
  assert.ok(markdown.includes("Camila não tira os olhos da tela e continua trabalhando enquanto seu colega reclama em voz alta."));
  const source = readFileSync(new URL("../src/content/scenario-candidate-pt.md", import.meta.url), "utf8");
  const { words, minutes } = candidateReadingTime(source);
  assert.ok(words <= 6500, `prevent unreviewed expansion of the main narrative: ${words} words`);
  assert.match(html, new RegExp(`Cerca de ${minutes} min de leitura`));
  assert.doesNotMatch(source, /<\/?(?:del|ins)>/);
});

test("reading time excludes apparatus and link targets but retains main prose and introduction", () => {
  const source = 'ignored\n## 2026: Ano\nOlá [mundo](https://example.com/long-title) [1](#fonte-1 "long tooltip").\n<details><summary>extra</summary>extra</details>\n<figure>diagram</figure><table>cells</table><aside>aside</aside>\n## 2030: Fim\nBoa noite\n## O que poderia ter sido diferente\nrecommendations\n## Notas e fontes\nreferences';
  const base = candidateReadingTime(source, ['Uma introdução']);
  assert.equal(base.words, 10);
  assert.equal(base.minutes, 1);
  assert.deepEqual(candidateReadingTime(source.replace('diagram', 'diagram '.repeat(1000)), ['Uma introdução']), base);
  assert.deepEqual(candidateReadingTime(source + ' references'.repeat(1000), ['Uma introdução']), base);
  assert.throws(() => candidateReadingTime('unrecognized manuscript'));
});

test("approved chronology and ending agree across manuscript, synopsis and dashboard", () => {
  const source = readFileSync(new URL("../src/content/scenario-candidate-pt.md", import.meta.url), "utf8");
  const chapter = (year, next) => source.slice(source.indexOf(`## ${year}:`), source.indexOf(next));
  const y2027 = chapter(2027, "## 2028:");
  const y2028 = chapter(2028, "## 2029:");
  const y2029 = chapter(2029, "## 2030:");
  const y2030 = chapter(2030, "## O que poderia");
  assert.match(y2027, /os dois governos ainda agem separadamente/);
  assert.match(y2028, /Em janeiro, aconteceu/);
  assert.match(y2028, /O apagão de março/);
  assert.match(y2028, /A declaração não é vinculante/);
  assert.match(y2029, /protocolo vinculante, com registro das maiores instalações e fiscalização cruzada/);
  assert.match(y2029, /Seu primo Antônio aceitou aquele emprego na China/);
  assert.match(y2030, /A pausa ainda não acabou/);
  assert.ok(y2030.trimEnd().endsWith("— Não sei, mãe. Ninguém sabe."));
  assert.doesNotMatch(source, /Boko Haram|sequestros-relâmpago|15 milhões|85 países|25%/);
  for (const phrase of ["Resumo do cenário: 2026–2030", "De restrições separadas a fiscalização cruzada", "Três níveis de acesso aos serviços estratégicos americanos", "Não sei, mãe. Ninguém sabe."]) {
    assert.ok(html.includes(phrase), `HTML missing: ${phrase}`);
    assert.ok(markdown.includes(phrase), `Markdown missing: ${phrase}`);
  }
  assert.match(html, /sem obrigações vinculantes/);
  assert.match(html, /nova redução do Nível 2/);
  assert.match(html, /title="A LGPD permite transferências internacionais/);
  assert.match(html, /title="ECA Digital: aplica-se/);
  assert.match(html, /title="Abliteração: redução de recusas/);
  assert.match(html, /retenção zero diz respeito/i);
  assert.match(html, /não é sinônimo de não usar dados para treinamento/);
  assert.equal((html.match(/<figure class="candidate-diagram"/g) || []).length, 3);
  assert.match(html, /href="\/#resumo-do-cenario"/);
  const synopsis = html.match(/<details class="candidate-note" id="resumo-do-cenario">([\s\S]*?)<\/details>/)[1];
  assert.doesNotMatch(synopsis, /<table/);
  assert.equal((synopsis.match(/<p>/g) || []).length, 6);
  assert.doesNotMatch(html, /href="\/resumo"/);
});

test("candidate clean route and Markdown remain available through the existing Worker", async () => {
  for (const [path, asset] of [["/candidato", "/candidato/index.html"], ["/candidato.md", "/candidato.md"]]) {
    let requested;
    const env = { ASSETS: { fetch: async (request) => { requested = new URL(request.url); return new Response("candidate"); } } };
    const response = await worker.fetch(new Request(`https://brasil-2030.piccini.app${path}`), env);
    assert.equal(response.status, 200);
    assert.equal(requested.pathname, asset);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  }
});
