import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";

const root = new URL("../dist/", import.meta.url);
const htmlRoutes = [
  ["index.html", "pt-BR", "O custo do atraso na era da IA | Brasil 2030"],
  ["resumo/index.html", "pt-BR", "Resumo"],
  ["evidencias/index.html", "pt-BR", "Evidências"],
  ["estrategia/index.html", "pt-BR", "Estratégia"],
  ["carta-aberta/index.html", "pt-BR", "Carta e compromissos"],
  ["apoie/index.html", "pt-BR", "Assinar a carta"],
  ["signatarios/index.html", "pt-BR", "Signatários"],
  ["sobre/index.html", "pt-BR", "Sobre"],
  ["en/index.html", "en", "Brazil 2030: The Cost of Delay in the AI Era"],
  ["en/summary/index.html", "en", "Summary"],
  ["en/evidence/index.html", "en", "Evidence"],
  ["en/strategy/index.html", "en", "Strategy"],
  ["en/open-letter/index.html", "en", "Open letter"],
  ["en/support/index.html", "en", "Support"],
  ["en/signatories/index.html", "en", "Signatories"],
  ["en/about/index.html", "en", "About"],
];

const markdownRoutes = [
  "cenario.md", "resumo.md", "evidencias.md", "estrategia.md", "carta-aberta.md", "sobre.md",
  "en/scenario.md", "en/summary.md", "en/evidence.md", "en/strategy.md", "en/open-letter.md", "en/about.md",
];

test("all localized HTML pages exist with metadata", () => {
  for (const [route, lang, title] of htmlRoutes) {
    const path = new URL(route, root);
    assert.equal(existsSync(path), true, `${route} must exist`);
    const html = readFileSync(path, "utf8");
    assert.match(html, new RegExp(`<html lang="${lang}"`));
    assert.match(html, /<meta name="robots" content="noindex, nofollow, noarchive">/);
    if (!["index.html", "en/index.html", "resumo/index.html", "carta-aberta/index.html", "apoie/index.html", "sobre/index.html", "en/summary/index.html", "en/open-letter/index.html", "en/support/index.html", "en/about/index.html"].includes(route)) {
      assert.match(html, /rel="alternate" hreflang="pt-BR"/);
      assert.match(html, /rel="alternate" hreflang="en"/);
    }
    assert.match(html, /property="og:image" content="https:\/\/brasil-2030\.piccini\.app\/og\.png"/);
    assert.match(html, /<main id="main-content" tabindex="-1">/);
    assert.ok(html.includes(title), `${route} must include ${title}`);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Lorem ipsum/i);
  }
});

test("scenario navigation targets exist and Portuguese notes are localized", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  const targets = [
    [en, "2026-the-branching-point"],
    [en, "2027-the-first-shock"],
    [en, "2028-coordination-takes-shape"],
    [en, "2029-brazil-enters-the-game"],
    [en, "2030-an-ai-era-middle-power"],
    [en, "2027-attacks-layoffs-and-emergency-powers"],
    [en, "2028-someone-elses-agreement"],
    [en, "2029-access-in-exchange-for-alignment"],
    [en, "2030-satellite-country"],
  ];
  for (const [html, id] of targets) {
    assert.ok(html.includes(`href="#${id}"`), `scenario must link to #${id}`);
    assert.ok(html.includes(`id="${id}"`), `scenario must contain #${id}`);
  }
  assert.match(pt, /Notas e fontes/);
  assert.match(pt, /id="fonte-5"/);
  assert.doesNotMatch(pt, />Footnotes<|Back to reference/);
});

test("scenario dashboard is bilingual, scroll-linked, and explicit about uncertainty", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  assert.match(pt, /data-candidate-states/);
  assert.match(pt, /Não mede o Brasil real/);
  assert.match(en, /State of Brazil/);
  assert.match(en, /This panel summarizes the selected trajectory\. It does not measure real-world Brazil\./);
  assert.match(en, /Systemic risk/);
  assert.match(en, /Inference sovereignty/);
  assert.doesNotMatch(pt, /data-branch-target/);
  assert.match(en, /Earlier English edition/);
  assert.match(en, /data-scenario-branch/);
});

test("the complete scenario visual system renders in both languages", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  for (const html of [en]) {
    assert.equal((html.match(/class="scenario-visual /g) || []).length, 4);
    assert.match(html, /visual-bargain/);
    assert.match(html, /visual-cascade/);
    assert.match(html, /visual-capacity/);
    assert.match(html, /visual-leverage/);
    assert.doesNotMatch(html, /<svg|<canvas/);
  }
  assert.equal((pt.match(/class="candidate-diagram"/g) || []).length, 3);
  assert.match(en, /A data center becomes leverage only through public terms/);
  assert.match(en, /One attack, four points of view/);
  assert.match(en, /Machines in Brazil do not guarantee Brazilian use/);
  assert.match(en, /Brazil's negotiation map/);
});

test("core pages remain discoverable and progressive enhancement is explicit", () => {
  const ptEvidence = readFileSync(new URL("evidencias/index.html", root), "utf8");
  const enEvidence = readFileSync(new URL("en/evidence/index.html", root), "utf8");
  assert.match(ptEvidence, /href="\/carta-aberta"[^>]*>Carta e compromissos</);
  assert.match(enEvidence, /href="\/en\/open-letter"[^>]*>Letter</);
  assert.match(ptEvidence, /class="evidence-filter"[^>]*hidden/);
  assert.match(enEvidence, /data-evidence-count[^>]*aria-live="polite"/);
  assert.match(ptEvidence, /href="\/evidencias\.md"[^>]*>Markdown</);
  const about = readFileSync(new URL("sobre/index.html", root), "utf8");
  assert.match(about, /href="\/carta-aberta"/);
  for (const name of ["Luiz Piccini", "Danilo Naiff", "Pedro Castilho", "Ivan M. Franco"]) {
    assert.ok(about.includes(name));
    assert.ok(readFileSync(new URL("sobre.md", root), "utf8").includes(name));
  }
  assert.match(about, /Calibrating Posteriors/);
  assert.match(about, /Como construímos o cenário/);
  assert.equal(existsSync(new URL("og.png", root)), true, "social card must exist");
});

test("all Markdown documents exist with public-edition metadata", () => {
  for (const route of markdownRoutes) {
    const path = new URL(route, root);
    assert.equal(existsSync(path), true, `${route} must exist`);
    const markdown = readFileSync(path, "utf8");
    assert.match(markdown, /^---\n/);
    assert.match(markdown, /edition: public/);
    assert.match(markdown, route === "cenario.md" ? /sourceRevision: 2026-09-14-narrative/ : ["resumo.md", "carta-aberta.md", "sobre.md"].includes(route) ? /sourceRevision: 2026-09-14-reader-review/ : /sourceRevision: \d{4}-\d{2}-\d{2}-derived/);
  }
});

test("language switches preserve page identity", () => {
  const pairs = [
    ["resumo/index.html", "/en/summary"],
    ["evidencias/index.html", "/en/evidence"],
    ["estrategia/index.html", "/en/strategy"],
    ["carta-aberta/index.html", "/en/open-letter"],
    ["apoie/index.html", "/en/support"],
    ["signatarios/index.html", "/en/signatories"],
    ["sobre/index.html", "/en/about"],
  ];
  for (const [route, counterpart] of pairs) {
    const html = readFileSync(new URL(route, root), "utf8");
    if (["resumo/index.html", "carta-aberta/index.html", "apoie/index.html", "sobre/index.html"].includes(route)) {
      assert.match(html, /Este texto ainda não tem tradução em inglês/);
      assert.doesNotMatch(html, /hreflang="en"/);
      continue;
    }
    assert.ok(html.includes(`href="${counterpart}"`), `${route} must link to ${counterpart}`);
  }
});

test("publication support files exist", () => {
  for (const file of ["robots.txt", "llms.txt", "404.html"]) {
    assert.equal(existsSync(new URL(file, root)), true, `${file} must exist`);
  }
  assert.match(readFileSync(new URL("robots.txt", root), "utf8"), /Disallow: \//);
  assert.match(readFileSync(new URL("llms.txt", root), "utf8"), /English and supporting policy pages remain earlier editions/);
});

test("legacy informational pages retain their punctuation convention", () => {
  for (const [route] of htmlRoutes) {
    if (route === "index.html") continue; // Approved narrative dialogue preserves the authors' punctuation.
    const html = readFileSync(new URL(route, root), "utf8");
    assert.equal(html.includes("—"), false, `${route} contains an em dash`);
  }
});

test("legacy English support flow is preserved and new letter consent stays in local preview", () => {
  const support = readFileSync(new URL("en/support/index.html", root), "utf8");
  const signatories = readFileSync(new URL("signatarios/index.html", root), "utf8");
  assert.match(support, /name="name"/);
  assert.match(support, /name="roleTitle"/);
  assert.match(support, /name="message"/);
  assert.match(support, /name="email"/);
  assert.match(support, /name="consent"/);
  assert.match(support, /fetch\("\/api\/apoios"/);
  const preview = readFileSync(new URL("apoie/index.html", root), "utf8");
  assert.match(preview, /Nenhum dado foi enviado/);
  assert.match(preview, /não serão transferidos/);
  assert.doesNotMatch(preview, /fetch\(/);
  assert.match(signatories, /A lista ainda não está aberta/);
  assert.match(signatories, /Nenhum apoio registrado na campanha anterior foi transferido/);
  assert.doesNotMatch(signatories, /fetch\(/);
});

test("the public edition contains no draft labels", () => {
  for (const [route] of htmlRoutes) {
    const html = readFileSync(new URL(route, root), "utf8");
    assert.doesNotMatch(html, /rascunho|working draft|public draft|team review draft|draft letter/i, `${route} contains a draft label`);
  }
  for (const route of markdownRoutes) {
    const markdown = readFileSync(new URL(route, root), "utf8");
    assert.doesNotMatch(markdown, /rascunho|working draft|public draft|team review draft|draft letter/i, `${route} contains a draft label`);
  }
});
