import { buildDateIso } from "../../data/build-info.mjs";
import narrative from "../../content/scenario-candidate-en.md?raw";
export const GET = () => new Response(`---\nedition: public\nsourceRevision: ${buildDateIso}-en\n---\n\n# Summary\n\n` + narrative.slice(0, narrative.indexOf("## 2026")), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
