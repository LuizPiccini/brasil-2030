// Resolve marcações de edição num arquivo markdown.
//   node scripts/resolve-edits.mjs <arquivo>            aceita tudo: remove <del>, desembrulha <ins>
//   node scripts/resolve-edits.mjs <arquivo> --reject   rejeita tudo: desembrulha <del>, remove <ins>
//   node scripts/resolve-edits.mjs <arquivo> --count    só conta, não altera
import { readFileSync, writeFileSync } from "node:fs";

const [file, flag] = process.argv.slice(2);
if (!file) { console.error("uso: node scripts/resolve-edits.mjs <arquivo> [--reject|--count]"); process.exit(1); }

const src = readFileSync(file, "utf8");
const dels = (src.match(/<del>/g) || []).length;
const inss = (src.match(/<ins>/g) || []).length;

if (flag === "--count") { console.log(`${file}: ${dels} <del>, ${inss} <ins>`); process.exit(0); }

const out = flag === "--reject"
  ? src.replace(/<ins>[\s\S]*?<\/ins>/g, "").replace(/<\/?del>/g, "")
  : src.replace(/<del>[\s\S]*?<\/del>/g, "").replace(/<\/?ins>/g, "");

writeFileSync(file, out.replace(/[ \t]+([,.;:!?])/g, "$1").replace(/  +/g, " "));
console.log(`${file}: ${flag === "--reject" ? "rejeitadas" : "aceitas"} ${dels} remoções e ${inss} inserções`);
