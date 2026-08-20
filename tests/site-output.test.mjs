import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";

const root = new URL("../dist/", import.meta.url);
const htmlRoutes = [
  ["index.html", "pt-BR", "Brasil 2030: Energia para Escolher"],
  ["resumo/index.html", "pt-BR", "Resumo"],
  ["evidencias/index.html", "pt-BR", "Evidências"],
  ["estrategia/index.html", "pt-BR", "Estratégia"],
  ["carta-aberta/index.html", "pt-BR", "Carta aberta"],
  ["sobre/index.html", "pt-BR", "Sobre"],
  ["en/index.html", "en", "Brazil 2030: The Energy to Choose"],
  ["en/summary/index.html", "en", "Summary"],
  ["en/evidence/index.html", "en", "Evidence"],
  ["en/strategy/index.html", "en", "Strategy"],
  ["en/open-letter/index.html", "en", "Open letter"],
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
    assert.match(html, /rel="alternate" hreflang="pt-BR"/);
    assert.match(html, /rel="alternate" hreflang="en"/);
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
    [pt, "2026-a-corrida-chega-ao-brasil"],
    [pt, "2027-a-defesa-aprofunda-a-dependência"],
    [pt, "2028-uma-tentativa-de-coordenação"],
    [pt, "2029-tier-2"],
    [pt, "2029-um-governo-sem-inventário"],
    [pt, "2030-energia-para-escolher"],
    [en, "2026-the-race-reaches-brazil"],
    [en, "2027-defense-deepens-dependency"],
    [en, "2028-an-attempt-at-coordination"],
    [en, "2029-tier-2"],
    [en, "2029-a-government-without-an-inventory"],
    [en, "2030-the-energy-to-choose"],
  ];
  for (const [html, id] of targets) {
    assert.ok(html.includes(`href="#${id}"`), `scenario must link to #${id}`);
    assert.ok(html.includes(`id="${id}"`), `scenario must contain #${id}`);
  }
  assert.match(pt, /id="notas-label">Notas</);
  assert.match(pt, /aria-label="Voltar à referência 10"/);
  assert.doesNotMatch(pt, />Footnotes<|Back to reference/);
});

test("scenario dashboard is bilingual, scroll-linked, and explicit about uncertainty", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  assert.match(pt, /data-scenario-dashboard/);
  assert.match(pt, /Estado do Brasil/);
  assert.match(pt, /O painel resume esta trajetória narrativa\. Não mede o Brasil real\./);
  assert.match(pt, /Risco sistêmico/);
  assert.match(pt, /Soberania de inferência/);
  assert.match(en, /State of Brazil/);
  assert.match(en, /This panel summarizes the narrative trajectory\. It does not measure real-world Brazil\./);
  assert.match(en, /Systemic risk/);
  assert.match(en, /Inference sovereignty/);
  assert.match(pt, /updateDashboard\(chapterEntries\.indexOf\(activeEntry\)\)/);
  assert.match(en, /updateDashboard\(chapterEntries\.indexOf\(activeEntry\)\)/);
});

test("the complete scenario visual system renders in both languages", () => {
  const pt = readFileSync(new URL("index.html", root), "utf8");
  const en = readFileSync(new URL("en/index.html", root), "utf8");
  for (const html of [pt, en]) {
    assert.equal((html.match(/class="scenario-visual /g) || []).length, 4);
    assert.match(html, /visual-bargain/);
    assert.match(html, /visual-cascade/);
    assert.match(html, /visual-capacity/);
    assert.match(html, /visual-leverage/);
    assert.doesNotMatch(html, /<svg|<canvas/);
  }
  assert.match(pt, /O data center só vira alavanca com contrapartidas/);
  assert.match(pt, /Um ataque, quatro pontos de vista/);
  assert.match(pt, /Capacidade física não é capacidade utilizável/);
  assert.match(pt, /O mapa da negociação brasileira/);
  assert.match(en, /A data center becomes leverage only through public terms/);
  assert.match(en, /One attack, four points of view/);
  assert.match(en, /Physical capacity is not usable capacity/);
  assert.match(en, /Brazil's negotiation map/);
});

test("core pages remain discoverable and progressive enhancement is explicit", () => {
  const ptEvidence = readFileSync(new URL("evidencias/index.html", root), "utf8");
  const enEvidence = readFileSync(new URL("en/evidence/index.html", root), "utf8");
  assert.match(ptEvidence, /href="\/carta-aberta"[^>]*>Carta</);
  assert.match(enEvidence, /href="\/en\/open-letter"[^>]*>Letter</);
  assert.match(ptEvidence, /class="evidence-filter"[^>]*hidden/);
  assert.match(enEvidence, /data-evidence-count[^>]*aria-live="polite"/);
  assert.match(ptEvidence, /href="\/evidencias\.md"[^>]*>Markdown</);
  assert.equal(existsSync(new URL("og.png", root)), true, "social card must exist");
});

test("all Markdown documents exist and disclose draft status", () => {
  for (const route of markdownRoutes) {
    const path = new URL(route, root);
    assert.equal(existsSync(path), true, `${route} must exist`);
    const markdown = readFileSync(path, "utf8");
    assert.match(markdown, /^---\n/);
    assert.match(markdown, /status: (rascunho-de-trabalho|working-draft)/);
    assert.match(markdown, /sourceRevision: 2026-08-19-visual-system-v0\.4/);
  }
});

test("language switches preserve page identity", () => {
  const pairs = [
    ["index.html", "/en"],
    ["resumo/index.html", "/en/summary"],
    ["evidencias/index.html", "/en/evidence"],
    ["estrategia/index.html", "/en/strategy"],
    ["carta-aberta/index.html", "/en/open-letter"],
    ["sobre/index.html", "/en/about"],
  ];
  for (const [route, counterpart] of pairs) {
    const html = readFileSync(new URL(route, root), "utf8");
    assert.ok(html.includes(`href="${counterpart}"`), `${route} must link to ${counterpart}`);
  }
});

test("working-publication support files exist", () => {
  for (const file of ["robots.txt", "llms.txt", "404.html"]) {
    assert.equal(existsSync(new URL(file, root)), true, `${file} must exist`);
  }
  assert.match(readFileSync(new URL("robots.txt", root), "utf8"), /Disallow: \//);
  assert.match(readFileSync(new URL("llms.txt", root), "utf8"), /Brazilian mediation channel, limited 2030 protocol, and 2029 inference-tier mechanism are scenario inventions/);
});

test("the public copy contains no em dashes", () => {
  for (const [route] of htmlRoutes) {
    const html = readFileSync(new URL(route, root), "utf8");
    assert.equal(html.includes("—"), false, `${route} contains an em dash`);
  }
});
