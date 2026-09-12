import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import worker from "../worker.js";

const html = readFileSync(new URL("../dist/candidato/index.html", import.meta.url), "utf8");
const markdown = readFileSync(new URL("../dist/candidato.md", import.meta.url), "utf8");

test("candidate is clearly labeled and does not masquerade as the translated edition", () => {
  assert.match(html, /Versão candidata · 12 set 2026/);
  assert.match(html, /aprovação coletiva pendente/);
  assert.match(html, /noindex, nofollow, noarchive/);
  assert.match(html, /rel="canonical" href="https:\/\/brasil-2030.piccini.app\/candidato"/);
  assert.doesNotMatch(html, /hreflang="en"|class="language-switch"|data-scenario-dashboard/);
  assert.match(html, /href="\/candidato.md"/);
  assert.match(readFileSync(new URL("../dist/index.html", import.meta.url), "utf8"), /href="\/candidato"/);
});

test("all candidate navigation and source anchors resolve uniquely", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, "duplicate IDs");
  for (const [, href] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(decodeURIComponent(href)), `missing #${href}`);
  }
  const chapterCount = (html.match(/<h2\b/g) || []).length;
  assert.equal(chapterCount, 8, "five years, alternatives, appendix and notes");
});

test("candidate HTML and Markdown preserve the full manuscript and its boundaries", () => {
  for (const phrase of ["A segunda-feira sem sistema", "A ligação", "O que poderia ter sido diferente", "se a desaceleração não acontecer", "Marlene", "potência intermediária", "Notas e limites desta versão"]) {
    assert.ok(html.includes(phrase), `HTML: ${phrase}`);
    assert.ok(markdown.includes(phrase), `Markdown: ${phrase}`);
  }
  assert.match(markdown, /Versão candidata de 12 de setembro de 2026/);
  assert.match(html, /Métodos de autenticação mais resistentes continuam oferecendo proteção/);
  assert.match(html, /O acordo não torna a inferência escassa por definição/);
  assert.doesNotMatch(html, /25% do total de inferência|não haja mais a menor pressão/);
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
