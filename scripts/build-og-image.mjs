// Regenerates public/og.png from the site's own palette and typography.
//
// Run this whenever the title or subtitle changes, so the social card cannot drift
// from src/data/site.ts the way the Markdown editions used to drift from the pages.
//
//   pip install fonttools brotli        # once, to convert the woff2 brand fonts
//   node scripts/build-og-image.mjs
//
// Fonts: scripts/prepare-og-fonts.py turns the variable woff2 files shipped by
// @fontsource-variable into static TTFs under .cache/fonts, which fontconfig then
// exposes to librsvg. That directory is disposable and git-ignored.

import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const WIDTH = 1200;
const HEIGHT = 630;

// Straight from src/styles/global.css.
const PAPER = "#f4f0e6";
const INK = "#171716";
const INK_SOFT = "#4d4a43";
const LINE = "#c9c1b2";
const RED = "#943e34";

const SERIF = "Literata OG";
const SANS = "Plex OG";

const years = ["2026", "2027", "2028", "2029", "2030"];

const yearRail = years
  .map((year, index) => {
    const x = 76 + index * 104;
    const last = index === years.length - 1;
    return `
      <text x="${x}" y="566" font-family="${SANS}" font-weight="${last ? 700 : 500}" font-size="23"
            letter-spacing="1.5" fill="${last ? RED : INK_SOFT}">${year}</text>
      ${last ? "" : `<circle cx="${x + 78}" cy="559" r="2.5" fill="${LINE}" />`}`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}" />

  <!-- Left rule, echoing the reading rail on the scenario page. -->
  <rect x="0" y="0" width="10" height="${HEIGHT}" fill="${RED}" />

  <text x="76" y="104" font-family="${SANS}" font-weight="700" font-size="31"
        letter-spacing="6.5" fill="${INK}">BRASIL 2030</text>

  <line x1="76" y1="142" x2="1124" y2="142" stroke="${LINE}" stroke-width="1" />

  <text x="76" y="286" font-family="${SERIF}" font-weight="700" font-size="92" fill="${INK}">O custo do atraso</text>
  <text x="76" y="386" font-family="${SERIF}" font-weight="700" font-size="92" fill="${INK}">na era da IA</text>

  <text x="76" y="462" font-family="${SERIF}" font-weight="400" font-size="27" fill="${INK_SOFT}">O que acontece com o Brasil se as decisões sobre</text>
  <text x="76" y="498" font-family="${SERIF}" font-weight="400" font-size="27" fill="${INK_SOFT}">inteligência artificial continuarem sendo adiadas.</text>

  <line x1="76" y1="530" x2="1124" y2="530" stroke="${LINE}" stroke-width="1" />
  ${yearRail}

  <text x="1124" y="566" text-anchor="end" font-family="${SANS}" font-weight="500" font-size="21"
        letter-spacing="0.5" fill="${INK_SOFT}">brasil-2030.piccini.app</text>
</svg>`;

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));

// Rasterize at 2x and scale down, so the type keeps clean antialiased edges.
const png = await sharp(Buffer.from(svg), { density: 144 })
  .resize(WIDTH, HEIGHT, { kernel: "lanczos3" })
  .png({ palette: true, colours: 128, compressionLevel: 9, effort: 10 })
  .toBuffer();

writeFileSync(out, png);
console.log(`og.png: ${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(1)} KB`);
