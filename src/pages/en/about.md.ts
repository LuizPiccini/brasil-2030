import { buildDateIso } from "../../data/build-info.mjs";
import content from "../../content/about-current-en.md?raw";
export const GET = () => new Response(`---\nedition: public\nsourceRevision: ${buildDateIso}-en\n---\n\n` + content, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
