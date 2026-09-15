import assert from "node:assert/strict";
import test from "node:test";
import { adjacentYears } from "../src/scripts/candidate-reader.ts";
test("floating arrows navigate years without wrapping or entering appendices", () => {
  assert.deepEqual(adjacentYears(0,5), {previous:null,next:1});
  assert.deepEqual(adjacentYears(1,5), {previous:0,next:2});
  assert.deepEqual(adjacentYears(3,5), {previous:2,next:4});
  assert.deepEqual(adjacentYears(4,5), {previous:3,next:null});
  assert.deepEqual(adjacentYears(5,5), {previous:4,next:null});
  assert.deepEqual(adjacentYears(7,5), {previous:4,next:null});
});
