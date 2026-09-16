import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";
import test from "node:test";

const root = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(root);

function htmlFiles() {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const child = join(dir, entry.name);
      return entry.isDirectory() ? walk(child) : [child];
    });
  return walk(distPath).filter((file) => file.endsWith(".html"));
}

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const idsIn = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decode(m[1])));

// Guards P0 #3: the Markdown edition is generated from the same module the HTML page
// renders, so a claim added to the register must appear in both or this fails.
test("the Markdown evidence register matches the HTML evidence register", () => {
  const html = readFileSync(new URL("evidencias/index.html", root), "utf8");
  const markdown = readFileSync(new URL("evidencias.md", root), "utf8");

  const htmlRows = (html.match(/<tr data-evidence-kind/g) || []).length;
  const markdownRows = (markdown.match(/^- \*\*/gm) || []).length;
  assert.ok(htmlRows > 0, "the evidence table must render rows");
  assert.equal(
    markdownRows,
    htmlRows,
    `evidencias.md has ${markdownRows} claims but the HTML table has ${htmlRows}`,
  );

  // Spot-check that late revisions reached both editions, not only the HTML one.
  for (const claim of ["Serra Verde", "Santos Dumont", "ANPD", "Pax Silica"]) {
    assert.ok(html.includes(claim), `HTML evidence must mention ${claim}`);
    assert.ok(markdown.includes(claim), `evidencias.md must mention ${claim}`);
  }
});

test("the Markdown strategy page matches the HTML strategy page", () => {
  const html = readFileSync(new URL("estrategia/index.html", root), "utf8");
  const markdown = readFileSync(new URL("estrategia.md", root), "utf8");
  const commitments = (html.match(/class="strategy-item"/g) || []).length;
  const numbered = (markdown.match(/^\d+\. \*\*/gm) || []).length;
  assert.ok(commitments > 0, "the strategy page must render commitments");
  assert.equal(numbered, commitments, `estrategia.md has ${numbered} commitments but the page has ${commitments}`);
  assert.ok(markdown.includes("autoridade permanente"), "estrategia.md must carry the current wording");
});

// Guards P0 #4: the two-scenario edition left Evidence links pointing at chapters that
// no longer existed. Any anchor into a page that has no matching id fails here.
test("every in-site anchor resolves to an element that exists", () => {
  const homepageIds = idsIn(readFileSync(new URL("index.html", root), "utf8"));
  const problems = [];

  for (const file of htmlFiles()) {
    const name = relative(distPath, file).replaceAll("\\", "/");
    const html = readFileSync(file, "utf8");
    const localIds = idsIn(html);

    for (const [, href] of html.matchAll(/href="(#[^"]+)"/g)) {
      const id = decode(href.slice(1));
      if (!localIds.has(id)) problems.push(`${name} links to ${href} but has no #${id}`);
    }

    // Links from any page into the homepage narrative.
    for (const [, href] of html.matchAll(/href="(\/#[^"]+)"/g)) {
      const id = decode(href.slice(2));
      if (!homepageIds.has(id)) problems.push(`${name} links to ${href} but the homepage has no #${id}`);
    }
  }

  assert.deepEqual(problems, [], `broken in-site anchors:\n${problems.join("\n")}`);
});
