const WORKING_HOST = "brasil-2030.piccini.app";
const ASSET_REVISION = "2026-08-28-redata-support";
const MAX_SUPPORT_BODY_BYTES = 16_000;
const SUPPORTER_TYPES = new Set(["citizen", "public_official", "expert", "organization"]);

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

async function receiveSupport(request, env) {
  if (!env.DB) return jsonResponse({ ok: false, error: "support_unavailable" }, 503);

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_SUPPORT_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  if (cleanText(input.website, 200)) {
    return jsonResponse({ ok: true, status: "pending" }, 202);
  }

  const name = cleanText(input.name, 100);
  const supporterType = cleanText(input.supporterType, 32);
  const roleTitle = cleanText(input.roleTitle, 120);
  const organization = cleanText(input.organization, 120);
  const message = cleanText(input.message, 480);
  const email = cleanText(input.email, 254).toLowerCase();
  const locale = input.locale === "en" ? "en" : "pt";
  const consent = input.consent === true;

  const fieldErrors = {};
  if (name.length < 2) fieldErrors.name = "required";
  if (!SUPPORTER_TYPES.has(supporterType)) fieldErrors.supporterType = "invalid";
  if (supporterType === "public_official" && roleTitle.length < 2) fieldErrors.roleTitle = "required";
  if (!validEmail(email)) fieldErrors.email = "invalid";
  if (!consent) fieldErrors.consent = "required";

  if (Object.keys(fieldErrors).length) {
    return jsonResponse({ ok: false, error: "validation", fields: fieldErrors }, 422);
  }

  const now = new Date().toISOString();
  const existing = await env.DB.prepare(
    "SELECT id FROM supporters WHERE email_normalized = ? LIMIT 1",
  ).bind(email).first();

  if (existing?.id) {
    await env.DB.prepare(`
      UPDATE supporters
      SET name = ?, supporter_type = ?, role_title = ?, organization = ?, message = ?,
          locale = ?, status = 'pending', published_at = NULL, updated_at = ?, consent_version = ?
      WHERE id = ?
    `).bind(
      name,
      supporterType,
      roleTitle,
      organization,
      message,
      locale,
      now,
      "2026-08-28",
      existing.id,
    ).run();
  } else {
    await env.DB.prepare(`
      INSERT INTO supporters (
        id, name, supporter_type, role_title, organization, message,
        email_normalized, locale, status, consent_version, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      name,
      supporterType,
      roleTitle,
      organization,
      message,
      email,
      locale,
      "2026-08-28",
      now,
      now,
    ).run();
  }

  return jsonResponse({ ok: true, status: "pending" }, 202);
}

async function listSignatories(env) {
  if (!env.DB) return jsonResponse({ ok: false, error: "support_unavailable" }, 503);

  const result = await env.DB.prepare(`
    SELECT id, name, supporter_type AS supporterType, role_title AS roleTitle,
           organization, message, published_at AS publishedAt
    FROM supporters
    WHERE status = 'approved'
    ORDER BY published_at DESC, created_at DESC
    LIMIT 500
  `).all();

  return jsonResponse({ ok: true, signatories: result.results || [] });
}

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

    if (url.pathname === "/api/apoios") {
      if (request.method !== "POST") {
        return withPublicationHeaders(jsonResponse({ ok: false, error: "method_not_allowed" }, 405), url);
      }
      return withPublicationHeaders(await receiveSupport(request, env), url);
    }

    if (url.pathname === "/api/signatarios") {
      if (request.method !== "GET") {
        return withPublicationHeaders(jsonResponse({ ok: false, error: "method_not_allowed" }, 405), url);
      }
      return withPublicationHeaders(await listSignatories(env), url);
    }

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
