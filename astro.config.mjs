import { defineConfig } from "astro/config";
import { siteOrigin } from "./src/data/publication.mjs";

export default defineConfig({
  site: siteOrigin(),
  output: "static",
  trailingSlash: "ignore",
  redirects: {
    // /apoie and /carta-aberta used to render the same letter. The letter lives at
    // /carta-aberta; the old support URL now points at its signing section.
    "/apoie": "/carta-aberta#assinar",
  },
  markdown: {
    shikiConfig: { theme: "github-light" },
  },
});
