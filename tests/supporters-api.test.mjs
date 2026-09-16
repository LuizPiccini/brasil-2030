import assert from "node:assert/strict";
import test from "node:test";
import worker from "../worker.js";

function createDb({ existing = null, published = [] } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      return {
        bind(...params) {
          return {
            async first() {
              calls.push({ method: "first", sql, params });
              return existing;
            },
            async run() {
              calls.push({ method: "run", sql, params });
              return { success: true };
            },
            async all() {
              calls.push({ method: "all", sql, params });
              return { results: published };
            },
          };
        },
        async all() {
          calls.push({ method: "all", sql, params: [] });
          return { results: published };
        },
      };
    },
  };
}

test("the support endpoint is closed and never writes", async () => {
  const DB = createDb();
  const response = await worker.fetch(new Request("https://brasil-2030.piccini.app/api/apoios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      supporterType: "citizen",
      name: "Maria da Silva",
      email: "maria@example.com",
      consent: true,
      locale: "pt",
    }),
  }), { DB });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false, error: "support_closed" });
  assert.equal(DB.calls.length, 0, "a closed endpoint must not touch the database");
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("a closed endpoint cannot unpublish an approved signatory", async () => {
  const DB = createDb({ existing: { id: "already-approved" } });
  const response = await worker.fetch(new Request("https://brasil-2030.piccini.app/api/apoios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      supporterType: "citizen",
      name: "Nome Trocado",
      email: "signatario@example.com",
      consent: true,
      locale: "pt",
    }),
  }), { DB });

  assert.equal(response.status, 503);
  assert.equal(DB.calls.some((call) => call.sql.includes("UPDATE supporters")), false);
});

test("the public signatory endpoint returns approved public fields only", async () => {
  const DB = createDb({ published: [{
    id: "abc",
    name: "Ana",
    supporterType: "expert",
    roleTitle: "Pesquisadora",
    organization: "Universidade",
    message: "Apoio.",
    publishedAt: "2026-08-28T12:00:00.000Z",
  }] });
  const response = await worker.fetch(new Request("https://brasil-2030.piccini.app/api/signatarios"), { DB });
  const payload = await response.json();
  assert.equal(response.status, 200);
  assert.equal(payload.signatories.length, 1);
  assert.equal("email" in payload.signatories[0], false);
  assert.match(DB.calls[0].sql, /WHERE status = 'approved'/);
});
