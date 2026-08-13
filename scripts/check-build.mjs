import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const forbiddenNames = /(^|\/)(\.env|credentials?|memory|documents?|.*\.duckdb|.*\.sqlite|.*\.pem|.*\.key)(\/|$)/i;
const forbiddenContent = [
  { label: "personal Gmail address", pattern: /[a-z0-9._%+-]+@gmail\.com/i },
  { label: "private key material", pattern: /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/i },
  { label: "absolute Windows user path", pattern: /\b[A-Z]:\\Users\\[^\\\r\n]+\\/i },
  { label: "absolute Unix user path", pattern: /\/(?:home|Users)\/[^/\r\n]+\//i },
];

function walk(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
}

const files = walk(dist);
const problems = [];

for (const file of files) {
  const name = relative(dist, file).replaceAll("\\", "/");
  if (forbiddenNames.test(name) || name.endsWith(".map")) problems.push(`forbidden output: ${name}`);
  const stats = statSync(file);
  if (stats.size > 5_000_000) problems.push(`oversized output: ${name} (${stats.size} bytes)`);
  if (stats.size < 1_000_000) {
    const content = readFileSync(file, "utf8");
    for (const { label, pattern } of forbiddenContent) {
      if (pattern.test(content)) problems.push(`${label} in ${name}`);
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Checked ${files.length} deployment files; no private or local workspace artifacts found.`);
