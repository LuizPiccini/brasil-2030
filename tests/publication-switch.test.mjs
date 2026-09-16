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

test("English visitors get the English 404", async () => {
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

  // Portuguese misses keep the Portuguese page and must not reach the English one.
  requested = [];
  const pt = await worker.fetch(new Request("https://brasil-2030.com/inexistente"), env);
  assert.equal(pt.status, 404);
  assert.match(await pt.text(), /Esta página não existe/);
  assert.equal(requested.includes("/en/404/index.html"), false);
});
