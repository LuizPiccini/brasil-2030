import narrative from "../content/scenario-candidate-pt.md?raw";
export const GET = () => new Response("---\nedition: public\nsourceRevision: 2026-09-14-reader-review\n---\n\n# Resumo\n\n" + narrative.slice(0, narrative.indexOf("## 2026")), { headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" } });
