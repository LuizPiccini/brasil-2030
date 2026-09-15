// Optional browser regression check; uses an existing Playwright installation.
// PLAYWRIGHT_PACKAGE may point to the runtime-provided package directory.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || "playwright");
const base = process.env.CANDIDATE_BASE_URL || "http://127.0.0.1:4321";
const browser = await chromium.launch({ headless: true, channel: "chrome" });
try {
  for (const width of [320, 360, 393, 430, 600, 601, 760, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 852 } });
    await page.goto(new URL(process.env.CANDIDATE_PATH || "/candidato", base).href);
    await page.locator('#resumo-do-cenario > summary').click();
    await page.waitForFunction(() => document.querySelector("#resumo-do-cenario").open);
    await page.evaluate(() => document.fonts.ready);
    const result = await page.locator("#resumo-do-cenario").evaluate(root => {
      const paragraphs = [...root.querySelectorAll("p")];
      return {
        width: root.clientWidth,
        scrollWidth: root.scrollWidth,
        pageWidth: document.documentElement.clientWidth,
        pageScrollWidth: document.documentElement.scrollWidth,
        tables: root.querySelectorAll("table").length,
        paragraphs: paragraphs.length,
        overflowingParagraphs: paragraphs.filter(p => p.scrollWidth > p.clientWidth + 1).length,
        minParagraphWidth: Math.min(...paragraphs.map(p => p.getBoundingClientRect().width)),
        text: root.textContent,
      };
    });
    assert.ok(result.pageScrollWidth <= result.pageWidth + 1, `page overflow at ${width}`);
    assert.ok(result.scrollWidth <= result.width + 1, `summary overflow at ${width}`);
    assert.equal(result.tables, 0, "summary is prose, not a table");
    assert.equal(result.paragraphs, 6);
    assert.equal(result.overflowingParagraphs, 0, `clipped text at ${width}`);
    assert.ok(result.minParagraphWidth >= 240, `narrow prose at ${width}`);
    for (const phrase of ["Camila", "Lourdes", "não uma previsão", "2026", "2027", "2028", "2030"]) assert.ok(result.text.includes(phrase));
    if (width === 393 && process.env.CANDIDATE_SCREENSHOT) {
      await page.locator('#resumo-do-cenario').evaluate(element => {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 105);
      });
      await page.screenshot({ path: process.env.CANDIDATE_SCREENSHOT });
    }
    console.log(`PASS ${width}px: six readable summary paragraphs, no table or overflow`);
    await page.close();
  }
} finally {
  await browser.close();
}
