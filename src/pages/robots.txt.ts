import { PUBLICATION_OPEN, siteOrigin } from "../data/publication.mjs";

// Derived from src/data/publication.mjs so it can never disagree with the meta tag,
// the Worker header, or the canonical origin.
export const GET = () => {
  const body = PUBLICATION_OPEN
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin()}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n\n# Search indexing stays closed until the authors approve publication.\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
};
