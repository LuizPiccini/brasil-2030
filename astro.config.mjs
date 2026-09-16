import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://brasil-2030.piccini.app",
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
