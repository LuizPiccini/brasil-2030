// Gera a vista anotada do cenário negativo a partir do markdown publicado.
// Camadas: preto = texto do Danilo · vermelho = edição/inserção · azul = Lourdes · verde = mobília.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "src/content/scenario-negative-pt.md";
const OUT = "drafts/mainline-negativo-pt.html";
const MAP = JSON.parse(readFileSync("drafts/proveniencia.json", "utf8"));

const esc = (s) => s.replace(/&(?![a-z]+;|#\d+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) =>
  esc(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<i>$1</i>");

const blocks = readFileSync(SRC, "utf8").split("\n\n").map((b) => b.trim()).filter(Boolean);

const renderBody = (raw) => {
  if (raw.startsWith("<")) return raw;                                  // figura já em HTML
  if (raw.startsWith("## ")) return null;                               // tratado como capítulo
  if (raw.startsWith("> ")) return `<p class="status">${inline(raw.replace(/^> /gm, ""))}</p>`;
  if (raw.startsWith("|")) {
    const rows = raw.split("\n").map((r) => r.trim()).filter((r) => r && !/^\|[\s|:-]+\|$/.test(r));
    const cells = (r) => r.slice(1, -1).split("|").map((c) => c.trim());
    const head = cells(rows[0]).map((c) => `<th>${inline(c)}</th>`).join("");
    const body = rows.slice(1).map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("");
    return `<div class="tablewrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  }
  return `<p>${inline(raw)}</p>`;
};

const LAYER_CLASS = { base: "", edit: "is-edit", rev: "is-rev", people: "is-people", furn: "is-furn" };
const chapters = [];
let current = null;

blocks.forEach((raw, i) => {
  if (raw.startsWith("## ")) {
    const title = raw.slice(3);
    const year = title.slice(0, 4);
    current = { year, title: title.slice(6), units: [] };
    chapters.push(current);
    return;
  }
  const meta = MAP[String(i)] || { layer: "base" };
  current.units.push({ html: renderBody(raw), layer: meta.layer, tag: meta.tag, note: meta.note, before: meta.before });
});

const counts = { rev: 0, people: 0, furn: 0, edit: 0 };
chapters.forEach((c) => c.units.forEach((u) => { if (counts[u.layer] !== undefined) counts[u.layer]++; }));

const unitHtml = (u) => {
  const cls = LAYER_CLASS[u.layer];
  const rail = u.note
    ? `<div class="rail"><div class="note note-${u.layer}"><span class="tag">${u.tag || ""}</span>${
        u.before ? `<p class="before"><b>Antes:</b> ${u.before}</p>` : ""
      }<p>${u.note}</p></div></div>`
    : `<div class="rail"></div>`;
  return `<div class="unit"><div class="col ${cls}">${u.html}</div>${rail}</div>`;
};

const chapterHtml = (c) => `
<article class="chapter" id="y${c.year}">
  <div class="chapter-head"><h2><span class="year">${c.year}</span> ${c.title}</h2></div>
  ${c.units.map(unitHtml).join("\n  ")}
</article>`;

const shell = readFileSync("drafts/_shell.html", "utf8");
writeFileSync(
  OUT,
  shell
    .replace("<!--CHAPTERS-->", chapters.map(chapterHtml).join("\n"))
    .replace("<!--COUNTS-->", JSON.stringify(counts))
);
console.log("ok", OUT, counts);
