import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_PACKAGE);
const browser=await chromium.launch({headless:true,channel:"chrome"});
const base=process.env.CANDIDATE_BASE_URL || "http://127.0.0.1:4321";
try {
  for(const width of [320,393,768,1440]) {
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[]; page.on("pageerror",e=>errors.push(e.message));
    await page.goto(base);
    const buttons=page.locator(".term-trigger");
    await buttons.first().waitFor();
    assert.ok(await buttons.count()>=15);
    const first=buttons.first(); await first.focus(); await page.keyboard.press("Enter");
    await page.locator("#term-dialog").waitFor({state:"visible"});
    assert.ok((await page.locator("#term-definition").textContent()).length>30);
    assert.ok(await page.locator("#term-dialog").evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));
    await page.keyboard.press("Escape"); assert.equal(await page.locator("#term-dialog").isVisible(),false);
    assert.equal(await first.evaluate(el=>el===document.activeElement),true);
    await first.click(); await page.locator("#term-close").click();
    for(const path of ["/carta-aberta","/resumo","/sobre","/apoie"]) {
      await page.goto(base+path);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path+" overflow at "+width);
    }
    let submitted=false; page.on("request",r=>{if(r.method()==="POST")submitted=true;});
    await page.locator("#adhesion-kind").selectOption({label:"Apoio pessoal à carta"});
    await page.locator("#adhesion-name").fill("Leitor de teste");
    await page.locator("#letter-preview input[type=checkbox]").check();
    await page.locator("#letter-preview button").click();
    assert.match(await page.locator("#adhesion-status").textContent(),/Nenhum dado/);
    assert.equal(submitted,false);
    assert.deepEqual(errors,[]);
    if(width===393) await page.screenshot({path:"C:/Users/Luiz/AppData/Local/Temp/brasil-reader-letter.png",fullPage:true});
    console.log("PASS reader review "+width+"px: glossary, keyboard, focus return, routes, no overflow, no submission");
    await page.close();
  }
} finally {await browser.close();}
