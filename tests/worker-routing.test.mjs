import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import worker from "../worker.js";

test("the Worker maps canonical clean URLs directly to built HTML", async () => {
  let requestedUrl;
  const env = {
    ASSETS: {
      fetch: async (request) => {
        requestedUrl = new URL(request.url);
        return new Response("<h1>English scenario</h1>", {
          headers: { "Content-Type": "text/html" },
        });
      },
    },
  };

  const response = await worker.fetch(new Request("https://brasil-2030.piccini.app/en"), env);
  assert.equal(response.status, 200);
  assert.equal(requestedUrl.pathname, "/en/index.html");
  assert.equal(requestedUrl.searchParams.has("__asset_revision"), true);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
});

test("the Worker removes trailing slashes without consulting the asset cache", async () => {
  let assetCalls = 0;
  const env = { ASSETS: { fetch: async () => { assetCalls += 1; return new Response("unused"); } } };
  const response = await worker.fetch(new Request("https://brasil-2030.piccini.app/en/?view=full"), env);
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://brasil-2030.piccini.app/en?view=full");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");
  assert.equal(assetCalls, 0);
});

test("Cloudflare automatic HTML redirects remain disabled", () => {
  const config = readFileSync(new URL("../wrangler.toml", import.meta.url), "utf8");
  assert.match(config, /html_handling = "none"/);
  assert.match(config, /run_worker_first = true/);
});
