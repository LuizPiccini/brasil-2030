import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://brasil-2030.piccini.app",
  output: "static",
  trailingSlash: "ignore",
  markdown: {
    shikiConfig: { theme: "github-light" },
  },
});
