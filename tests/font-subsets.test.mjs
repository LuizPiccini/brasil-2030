import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";
import test from "node:test";

const root = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(root);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const child = join(dir, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });

/** Parses a CSS unicode-range value into a list of [start, end] code point pairs. */
function parseUnicodeRange(value) {
  return value.split(",").map((part) => {
    const [start, end] = part.trim().replace(/^U\+/i, "").split("-");
    return [parseInt(start, 16), parseInt(end ?? start, 16)];
  });
}

const stripMarkup = (html) =>
  html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&[a-z]+;/gi, " ");

// UI arrows that no subset of either brand font carries, and never did. They are
// navigation affordances, not prose, and arrows are near identical across system fonts,
// so the fallback is deliberate. Prose must not rely on the fallback: a missing accent in
// running text reads as a typographic defect, an arrow does not.
const SYSTEM_FALLBACK_SYMBOLS = new Set([
  "←", // back one year, in the mobile chapter bar
  "→", // forward one year
  "↗", // external link marker in the glossary
  "↩", // return to the reference, in the footnotes
]);

// The site loads only the latin subset of each brand font. Everything the content needs
// must fall inside it, otherwise a character silently renders in a fallback system font.
test("no content needs a character outside the font subsets actually shipped", () => {
  const home = readFileSync(new URL("index.html", root), "utf8");

  const declared = [...home.matchAll(/unicode-range:\s*([^;}]+)/g)].map((m) => m[1].trim());
  assert.ok(declared.length >= 1, "the page must declare the font subsets it loads");
  const ranges = parseUnicodeRange(declared[0]);
  const supported = (codePoint) => ranges.some(([start, end]) => codePoint >= start && codePoint <= end);

  const files = walk(distPath).filter((file) => file.endsWith(".html") || file.endsWith(".md"));
  const offenders = new Map();

  for (const file of files) {
    const name = relative(distPath, file).replaceAll("\\", "/");
    const raw = readFileSync(file, "utf8");
    const text = file.endsWith(".html") ? stripMarkup(raw) : raw;

    for (const char of text) {
      const codePoint = char.codePointAt(0);
      if (codePoint < 0x80 || supported(codePoint) || SYSTEM_FALLBACK_SYMBOLS.has(char)) continue;
      const key = `${char} (U+${codePoint.toString(16).toUpperCase().padStart(4, "0")})`;
      if (!offenders.has(key)) offenders.set(key, name);
    }
  }

  assert.deepEqual(
    [...offenders.entries()],
    [],
    "these characters have no glyph in the loaded subsets; add the matching subset in BaseLayout.astro or change the copy",
  );
});

test("the build ships only the two latin font files", () => {
  const fonts = walk(distPath)
    .filter((file) => file.endsWith(".woff2"))
    .map((file) => relative(distPath, file).replaceAll("\\", "/"));

  assert.equal(fonts.length, 2, `expected 2 font files, got ${fonts.length}: ${fonts.join(", ")}`);
  assert.ok(fonts.every((font) => font.includes("latin")), `non-latin subset shipped: ${fonts.join(", ")}`);

  const home = readFileSync(new URL("index.html", root), "utf8");
  for (const font of fonts) {
    assert.ok(
      home.includes(`rel="preload" as="font" type="font/woff2" href="/${font}"`),
      `${font} must be preloaded`,
    );
  }
});
