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
  ["signatarios/index.html", "pt-BR", "Signatários"],
  ["sobre/index.html", "pt-BR", "Sobre"],
  ["en/index.html", "en", "Brazil 2030: The Cost of Delay in the AI Era"],
  ["en/summary/index.html", "en", "Summary"],
  ["en/evidence/index.html", "en", "Evidence"],
  ["en/strategy/index.html", "en", "Strategy"],
  ["en/open-letter/index.html", "en", "Letter and commitments"],
  ["en/signatories/index.html", "en", "Signatories"],
  ["en/about/index.html", "en", "About"],
  ["en/404/index.html", "en", "Page not found"],
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
    if (!["index.html", "en/index.html"].includes(route)) {
      assert.match(html, /rel="alternate" hreflang="pt-BR"/);
      assert.match(html, /rel="alternate" hreflang="en"/);
    }
    assert.match(html, /property="og:image" content="https:\/\/brasil-2030\.piccini\.app\/og\.png"/);
    assert.match(html, /<main id="main-content" tabindex="-1">/);
    assert.ok(html.includes(title), `${route} must include ${title}`);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Lorem ipsum/i);
  }
});

test("both editions carry the single narrative, its chapters and its notes", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  const chapters = {
    pt: ["2026-um-assunto-para-depois-da-eleição", "2027-a-segunda-feira-sem-sistema", "2028-o-acordo-dos-outros",
         "2029-acesso-em-troca-de-alinhamento", "2030-país-satélite", "o-que-poderia-ter-sido-diferente"],
    en: ["2026-a-matter-for-after-the-election", "2027-the-monday-without-a-system", "2028-someone-elses-agreement",
         "2029-access-in-exchange-for-alignment", "2030-satellite-country", "what-could-have-been-different"],
  };
  for (const [html, ids] of [[pt, chapters.pt], [en, chapters.en]]) {
    for (const id of ids) {
      assert.ok(html.includes(`href="#${id}"`), `the timeline must link to #${id}`);
      assert.ok(html.includes(`id="${id}"`), `the narrative must contain #${id}`);
    }
  }
  // The footnote apparatus is shared: the ids stay identical across editions.
  for (const html of [pt, en]) {
    assert.match(html, /id="fonte-5"/);
    assert.equal((html.match(/id="fonte-\d+"/g) || []).length, 19);
  }
  assert.match(pt, /Notas e fontes/);
  assert.match(en, /Notes and sources/);
  assert.doesNotMatch(en, /Notas e fontes/);
});

test("the scenario dashboard is bilingual and explicit about uncertainty", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  assert.match(pt, /data-candidate-states/);
  assert.match(en, /data-candidate-states/);
  assert.match(pt, /Estado do Brasil/);
  assert.match(pt, /Não mede o Brasil real/);
  assert.match(en, /State of Brazil/);
  assert.match(en, /It does not measure real-world Brazil/);
  assert.match(en, /Systemic risk/);
  assert.match(en, /Inference sovereignty/);
  // The two-scenario edition is gone from both.
  for (const html of [pt, en]) {
    assert.doesNotMatch(html, /data-branch-target/);
    assert.doesNotMatch(html, /data-scenario-branch/);
  }
  assert.doesNotMatch(en, /Earlier English edition/);
});

test("the narrative diagrams render in both editions without images", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  for (const html of [pt, en]) {
    assert.equal((html.match(/class="candidate-diagram"/g) || []).length, 3);
    assert.doesNotMatch(html, /<svg|<canvas/);
  }
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
    assert.match(markdown, route === "cenario.md" ? /sourceRevision: 2026-09-14-narrative/ : ["resumo.md", "carta-aberta.md", "sobre.md"].includes(route) ? /sourceRevision: 2026-09-14-reader-review/ : /sourceRevision: \d{4}-\d{2}-\d{2}-(derived|en)/);
  }
});

test("language switches preserve page identity", () => {
  const pairs = [
    ["resumo/index.html", "/en/summary"],
    ["evidencias/index.html", "/en/evidence"],
    ["estrategia/index.html", "/en/strategy"],
    ["carta-aberta/index.html", "/en/open-letter"],
    ["signatarios/index.html", "/en/signatories"],
    ["sobre/index.html", "/en/about"],
    ["en/summary/index.html", "/resumo"],
    ["en/evidence/index.html", "/evidencias"],
    ["en/open-letter/index.html", "/carta-aberta"],
    ["en/about/index.html", "/sobre"],
  ];
  for (const [route, counterpart] of pairs) {
    const html = readFileSync(new URL(route, root), "utf8");
    assert.ok(html.includes(`href="${counterpart}"`), `${route} must link to ${counterpart}`);
    // Nothing is untranslated any more, so the switch is never disabled.
    assert.doesNotMatch(html, /ainda não tem tradução/, `${route} must not claim a missing translation`);
  }
});

test("publication support files exist", () => {
  for (const file of ["robots.txt", "llms.txt", "404.html"]) {
    assert.equal(existsSync(new URL(file, root)), true, `${file} must exist`);
  }
  assert.match(readFileSync(new URL("robots.txt", root), "utf8"), /Disallow: \//);
  assert.match(readFileSync(new URL("llms.txt", root), "utf8"), /English pages remain an earlier edition/);
});

test("informational pages retain their punctuation convention", () => {
  // The two narrative editions keep the authors' dialogue punctuation; the rest does not.
  const narrative = ["index.html", "en/index.html", "resumo/index.html", "en/summary/index.html"];
  for (const [route] of htmlRoutes) {
    if (narrative.includes(route)) continue;
    const html = readFileSync(new URL(route, root), "utf8");
    assert.equal(html.includes("—"), false, `${route} contains an em dash`);
  }
});

test("the letter's signing form is a local preview in both editions", () => {
  for (const [route, marker] of [["carta-aberta/index.html", /Nenhum dado foi enviado/],
                                 ["en/open-letter/index.html", /No data was sent/]]) {
    const html = readFileSync(new URL(route, root), "utf8");
    assert.match(html, marker);
    assert.doesNotMatch(html, /fetch\(/, `${route} must not call the retired support API`);
  }
  for (const route of ["signatarios/index.html", "en/signatories/index.html"]) {
    const html = readFileSync(new URL(route, root), "utf8");
    assert.doesNotMatch(html, /fetch\(/, `${route} must not call the retired support API`);
  }
  assert.equal(existsSync(new URL("en/support/index.html", root)), false, "the REDATA support page is retired");
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
