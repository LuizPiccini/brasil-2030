import { buildDateIso } from "../../data/build-info.mjs";
import letter from "../../content/letter-current-en.md?raw";
export const GET = () => new Response(`---\nedition: public\nsourceRevision: ${buildDateIso}-en\n---\n\n` + letter, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
