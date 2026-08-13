const WORKING_HOST = "brasil-2030.piccini.app";
const ASSET_REVISION = "2026-08-07-risk-sovereignty";

function withPublicationHeaders(response, url) {
  const headers = new Headers(response.headers);

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");

  if (url.hostname === WORKING_HOST || url.hostname.endsWith(".workers.dev")) {
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if (/\/_astro\//.test(url.pathname)) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (url.pathname.endsWith(".md")) {
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Content-Disposition", "inline");
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  } else if (headers.get("content-type")?.includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const readsAsset = request.method === "GET" || request.method === "HEAD";

    if (readsAsset && url.pathname.length > 1 && url.pathname.endsWith("/")) {
      const canonicalUrl = new URL(url);
      canonicalUrl.pathname = canonicalUrl.pathname.replace(/\/+$/, "");
      return withPublicationHeaders(Response.redirect(canonicalUrl.toString(), 308), url);
    }

    const assetUrl = new URL(url);
    const lastSegment = url.pathname.split("/").at(-1) || "";
    const cleanHtmlPath = readsAsset && (url.pathname === "/" || !lastSegment.includes("."));

    if (cleanHtmlPath) {
      assetUrl.pathname = url.pathname === "/" ? "/index.html" : `${url.pathname}/index.html`;
      assetUrl.searchParams.set("__asset_revision", ASSET_REVISION);
    }

    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    return withPublicationHeaders(response, url);
  },
};
