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
    await page.locator('.hero-actions').getByRole("link", { name: "Resumo", exact: true }).click();
    await page.waitForFunction(() => document.querySelector("#resumo-do-cenario").open);
    await page.evaluate(() => document.fonts.ready);
    const result = await page.locator("#resumo-do-cenario").evaluate(root => {
      const table = root.querySelector("table");
      const caption = table.querySelector("caption");
      const wrapper = root.querySelector(".candidate-table-scroll");
      const rect = caption.getBoundingClientRect();
      const cells = [...table.querySelectorAll("td")];
      return {
        width: wrapper.clientWidth,
        scrollWidth: wrapper.scrollWidth,
        pageWidth: document.documentElement.clientWidth,
        pageScrollWidth: document.documentElement.scrollWidth,
        captionWidth: rect.width,
        captionHeight: rect.height,
        labels: cells.map(cell => getComputedStyle(cell, "::before").content),
        overflowingCells: cells.filter(cell => cell.scrollWidth > cell.clientWidth + 1).length,
        years: [...table.querySelectorAll('th[scope="row"]')].map(cell => cell.textContent),
      };
    });
    assert.ok(result.pageScrollWidth <= result.pageWidth + 1, `page overflow at ${width}`);
    assert.ok(result.scrollWidth <= result.width + 1, `summary overflow at ${width}`);
    assert.ok(result.captionWidth >= result.width - 2, `narrow caption at ${width}`);
    assert.ok(result.captionHeight < 100, `vertical caption at ${width}`);
    assert.equal(result.overflowingCells, 0, `clipped text at ${width}`);
    assert.deepEqual(result.years, ["2026", "2027", "2028", "2029", "2030"]);
    if (width <= 600) {
      assert.deepEqual(result.labels, Array.from({ length: 5 }, () => ['"O que acontece"', '"Consequência para o Brasil"']).flat());
    } else {
      assert.ok(result.labels.every(label => label === "none" || label === "normal"));
    }
    if (width === 393 && process.env.CANDIDATE_SCREENSHOT) {
      await page.locator('#resumo-do-cenario').evaluate(element => {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 105);
      });
      await page.screenshot({ path: process.env.CANDIDATE_SCREENSHOT });
    }
    console.log(`PASS ${width}px: caption ${Math.round(result.captionWidth)}×${Math.round(result.captionHeight)}, no overflow, correct labels`);
    await page.close();
  }
} finally {
  await browser.close();
}
