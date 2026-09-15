import content from "../content/about-current-pt.md?raw";
export const GET = () => new Response("---\nedition: public\nsourceRevision: 2026-09-14-reader-review\n---\n\n" + content, { headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex" } });
