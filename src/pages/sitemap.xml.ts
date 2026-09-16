import { buildDateIso } from "../data/build-info.mjs";
import { siteOrigin } from "../data/publication.mjs";
import { markdownRoutes, routes, type ContentPageKey, type Locale } from "../data/site";

// TODO when a page is added or removed: this list is written by hand, so a new route does
// not appear here on its own. tests/publication-switch.test.mjs fails if a built HTML page
// is missing from it, which is the reminder.

/** Pages worth offering to a crawler, in rough order of importance. */
const CONTENT_PAGES: ContentPageKey[] = ["scenario", "summary", "evidence", "strategy", "letter", "about"];

/** Pages that exist but should not be advertised: redirects, error pages, placeholders. */
export const EXCLUDED_FROM_SITEMAP = ["apoie", "candidato", "en/404", "signatarios", "en/signatories"];

export const GET = () => {
  const site = siteOrigin();
  const urls: { loc: string; priority: string }[] = [];

  for (const locale of ["pt", "en"] as Locale[]) {
    for (const key of CONTENT_PAGES) {
      urls.push({
        loc: `${site}${routes[locale][key]}`,
        priority: key === "scenario" ? "1.0" : "0.7",
      });
      urls.push({ loc: `${site}${markdownRoutes[locale][key]}`, priority: "0.3" });
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${buildDateIso}</lastmod>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
};
