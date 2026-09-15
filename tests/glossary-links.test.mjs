import assert from "node:assert/strict";
import test from "node:test";
import { terms, termSources } from "../src/scripts/glossary.ts";
test("every glossary term has a named HTTPS further-reading resource", () => {
  for (const [names] of terms) {
    const source=termSources[names[0]];
    assert.ok(source, names[0]);
    assert.equal(new URL(source[0]).protocol, "https:");
    assert.ok(source[1].length > 2);
  }
  assert.equal(Object.keys(termSources).length,terms.length);
});
