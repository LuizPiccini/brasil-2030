import letter from "../content/letter-current-pt.md?raw";
export const GET = () => new Response("---\nedition: public\nsourceRevision: 2026-09-14-reader-review\n---\n\n" + letter, { headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" } });
