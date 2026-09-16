// The one switch that controls whether this site is public.
//
// It used to live in four independent places (public/robots.txt, public/_headers, the
// robots meta in BaseLayout, and a host check in worker.js). Flipping three of four is a
// silent failure: nothing errors, the site just never gets indexed, or worse, a staging
// host does. Everything now derives from here.
//
// Plain .mjs on purpose: worker.js (bundled by Wrangler) and the Astro build both import
// it, and the test runner loads worker.js directly without a TypeScript step.

/**
 * Flip to true only when the authors approve publication. Doing so simultaneously:
 *  - serves an allowing robots.txt
 *  - drops the noindex meta tag and the X-Robots-Tag header on the production host
 *  - moves canonical, og:url and hreflang to the production origin
 * Every other host stays noindex regardless, so previews never compete with production.
 */
export const PUBLICATION_OPEN = false;

/** Where the site lives once it is public. */
export const PRODUCTION_ORIGIN = "https://brasil-2030.com";

/** Where it lives while it is still a working draft. */
export const STAGING_ORIGIN = "https://brasil-2030.piccini.app";

/** Hosts allowed to be indexed once publication is open. */
const INDEXABLE_HOSTS = new Set(["brasil-2030.com", "www.brasil-2030.com"]);

/** Origin used for canonical URLs, og:url, hreflang and the generated Markdown index. */
export const siteOrigin = () => (PUBLICATION_OPEN ? PRODUCTION_ORIGIN : STAGING_ORIGIN);

/**
 * Whether a given host must carry noindex. Before publication: always. After: everything
 * except the production hosts, so workers.dev previews and the piccini.app staging domain
 * never get indexed by accident.
 *
 * @param {string} hostname
 * @returns {boolean}
 */
export const shouldBlockIndexing = (hostname) => !PUBLICATION_OPEN || !INDEXABLE_HOSTS.has(hostname);

/** The value used for both the robots meta tag and the X-Robots-Tag header. */
export const NOINDEX = "noindex, nofollow, noarchive";
