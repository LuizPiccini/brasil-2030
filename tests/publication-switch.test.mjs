import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import worker from "../worker.js";
import { NOINDEX, PRODUCTION_ORIGIN, PUBLICATION_OPEN, shouldBlockIndexing, siteOrigin } from "../src/data/publication.mjs";

const root = new URL("../dist/", import.meta.url);
const read = (file) => readFileSync(new URL(file, root), "utf8");

const assetEnv = (body = "<html></html>", type = "text/html") => ({
  ASSETS: { fetch: async () => new Response(body, { headers: { "Content-Type": type } }) },
});

// The four places that used to hold this decision independently must now agree, because
// flipping three of four fails silently: nothing errors, the site just never gets indexed.
test("robots.txt, the meta tag and the Worker header all follow one switch", async () => {
  const robots = read("robots.txt");
  const html = read("index.html");

  if (PUBLICATION_OPEN) {
    assert.match(robots, /Allow: \//);
    assert.doesNotMatch(robots, /Disallow: \//);
    assert.doesNotMatch(html, /name="robots"/, "an open site must not ship a robots meta tag");
  } else {
    assert.match(robots, /Disallow: \//);
    assert.match(html, new RegExp(`name="robots" content="${NOINDEX}"`));
  }

  const response = await worker.fetch(new Request(`${PRODUCTION_ORIGIN}/`), assetEnv());
  const header = response.headers.get("x-robots-tag");
  assert.equal(
    header === null,
    PUBLICATION_OPEN,
    `production must ${PUBLICATION_OPEN ? "not " : ""}send X-Robots-Tag while PUBLICATION_OPEN is ${PUBLICATION_OPEN}`,
  );
});

test("non-production hosts stay noindex even after publication opens", async () => {
  for (const host of ["brasil-2030.piccini.app", "piccini-brasil-2030.workers.dev", "preview.example.com"]) {
    assert.equal(shouldBlockIndexing(host), true, `${host} must never be indexable`);
    const response = await worker.fetch(new Request(`https://${host}/`), assetEnv());
    assert.equal(response.headers.get("x-robots-tag"), NOINDEX, `${host} must send noindex`);
  }
  assert.equal(shouldBlockIndexing("brasil-2030.com"), !PUBLICATION_OPEN);
  assert.equal(shouldBlockIndexing("www.brasil-2030.com"), !PUBLICATION_OPEN);
});

test("no page ships a hardcoded X-Robots-Tag that would survive publication", () => {
  // The Worker is the only authority. A route that stamps its own header would keep
  // sending noindex after the switch is flipped.
  for (const file of ["src/lib/markdown.ts", "src/pages/candidato.md.ts", "src/pages/resumo.md.ts",
                      "src/pages/carta-aberta.md.ts", "src/pages/sobre.md.ts"]) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /X-Robots-Tag/, `${file} must leave the robots header to worker.js`);
  }
});

test("canonical URLs and the Markdown index follow the published origin", () => {
  const origin = siteOrigin();
  assert.match(read("index.html"), new RegExp(`rel="canonical" href="${origin}/"`));
  assert.match(read("llms.txt"), new RegExp(`\\(${origin}/cenario\\.md\\)`));
  assert.match(read("evidencias.md"), new RegExp(origin.replace(/\./g, "\\.")));
  assert.doesNotMatch(
    read("llms.txt"),
    PUBLICATION_OPEN ? /piccini\.app/ : /brasil-2030\.com/,
    "llms.txt must not mix the staging and production origins",
  );
});

test("English and Spanish visitors get their localized 404", async () => {
  let requested = [];
  const env = {
    ASSETS: {
      fetch: async (request) => {
        const path = new URL(request.url).pathname;
        requested.push(path);
        if (path === "/en/404/index.html") {
          return new Response("<h1>This page does not exist.</h1>", {
            status: 200,
            headers: { "Content-Type": "text/html" },
          });
        }
        if (path === "/es/404/index.html") {
          return new Response("<h1>Esta página no existe.</h1>", {
            status: 200,
            headers: { "Content-Type": "text/html" },
          });
        }
        return new Response("<h1>Esta página não existe.</h1>", {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      },
    },
  };

  const response = await worker.fetch(new Request("https://brasil-2030.com/en/missing"), env);
  assert.equal(response.status, 404, "a miss must still answer 404");
  assert.match(await response.text(), /This page does not exist/);
  assert.ok(requested.includes("/en/404/index.html"));

  requested = [];
  const es = await worker.fetch(new Request("https://brasil-2030.com/es/inexistente"), env);
  assert.equal(es.status, 404);
  assert.match(await es.text(), /Esta página no existe/);
  assert.ok(requested.includes("/es/404/index.html"));

  // Portuguese misses keep the Portuguese page and must not reach the localized ones.
  requested = [];
  const pt = await worker.fetch(new Request("https://brasil-2030.com/inexistente"), env);
  assert.equal(pt.status, 404);
  assert.match(await pt.text(), /Esta página não existe/);
  assert.equal(requested.includes("/en/404/index.html"), false);
  assert.equal(requested.includes("/es/404/index.html"), false);
});

test("HSTS is sent on production only, never on staging", async () => {
  const production = await worker.fetch(new Request(`${PRODUCTION_ORIGIN}/`), assetEnv());
  const staging = await worker.fetch(new Request("https://brasil-2030.piccini.app/"), assetEnv());

  // Tied to the same switch: a year-long max-age on a staging host is painful to undo.
  assert.equal(
    production.headers.has("strict-transport-security"),
    PUBLICATION_OPEN,
    "production HSTS must follow PUBLICATION_OPEN",
  );
  assert.equal(staging.headers.get("strict-transport-security"), null, "staging must never send HSTS");
});

test("the sitemap lists every indexable page and no excluded one", () => {
  const sitemap = read("sitemap.xml");
  const origin = siteOrigin();
  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  assert.ok(listed.length > 0, "the sitemap must list pages");
  for (const loc of listed) {
    assert.ok(loc.startsWith(origin), `${loc} does not use the published origin`);
  }
  for (const page of [`${origin}/`, `${origin}/en`, `${origin}/es`, `${origin}/evidencias`, `${origin}/en/evidence`, `${origin}/es/evidencias`]) {
    assert.ok(listed.includes(page), `the sitemap must list ${page}`);
  }
  // Redirects, error pages and placeholders stay out.
  for (const excluded of ["/apoie", "/candidato", "/en/404", "/signatarios", "/en/signatories", "/es/404", "/es/signatarios"]) {
    assert.equal(listed.includes(`${origin}${excluded}`), false, `${excluded} must not be advertised`);
  }
  if (PUBLICATION_OPEN) assert.match(read("robots.txt"), /Sitemap: /);
});

test("the asset cache buster is derived, not a forgotten string", async () => {
  const worker_source = readFileSync(new URL("../worker.js", import.meta.url), "utf8");
  assert.doesNotMatch(worker_source, /ASSET_REVISION = "/, "ASSET_REVISION must not be hand written");

  let requested;
  const env = { ASSETS: { fetch: async (request) => { requested = new URL(request.url); return new Response("<html></html>", { headers: { "Content-Type": "text/html" } }); } } };
  await worker.fetch(new Request(`${PRODUCTION_ORIGIN}/`), env);
  assert.match(requested.searchParams.get("__asset_revision") ?? "", /^\d{4}-\d{2}-\d{2}$/);
});

test("the privacy page names a contact for deletion in all editions", () => {
  for (const [route, marker] of [["privacidade/index.html", /exclusão/], ["en/privacy/index.html", /deletion/], ["es/privacidad/index.html", /eliminación|borrado/i]]) {
    const html = read(route);
    assert.match(html, /luiz@piccini\.app/, `${route} must name the deletion contact`);
    assert.match(html, marker);
  }
  // Reachable from anywhere.
  assert.match(read("index.html"), /href="\/privacidade"/);
  assert.match(read("en/index.html"), /href="\/en\/privacy"/);
  assert.match(read("es/index.html"), /href="\/es\/privacidad"/);
});

test("pages that need JavaScript say so", () => {
  assert.match(read("index.html"), /<noscript>/, "the scenario panel degrades and must explain it");
  assert.match(read("carta-aberta/index.html"), /<noscript>/, "the signing form does nothing without JS");
  assert.match(read("en/open-letter/index.html"), /<noscript>/);
  assert.match(read("es/carta-abierta/index.html"), /<noscript>/);
});
