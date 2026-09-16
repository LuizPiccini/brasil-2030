# Brasil 2030: O custo do atraso na era da IA

Source repository for the public working site of the Brasil 20XX scenario project:
[brasil-2030.piccini.app](https://brasil-2030.piccini.app/).

## Editorial state

- The site carries **one** Portuguese narrative, served at `/` and `/candidato` from `src/content/scenario-candidate-pt.md`. It runs from "2026: Um assunto para depois da eleição" to "2030: País satélite", followed by "O que poderia ter sido diferente", a no-slowdown appendix, and sources. Editorial provenance: `research/2026-09-12-candidate-editorial-note.md`.
- Portuguese is the default and editorially leading public language.
- The English pages are an **earlier, untranslated edition** that still shows the retired two-scenario structure. They are scheduled to be rebuilt; do not treat them as a translation of the current narrative.
- The public argument has three commitments: a verifiable global slowdown, Brazilian support for US-China negotiations, and domestic data-center and grid infrastructure for leverage and inference sovereignty.
- The REDATA advocacy pages were retired. REDATA survives only as a documented 2026 event inside the narrative and the evidence register.
- Markdown editions are **generated**, never written twice. `/evidencias.md` and `/estrategia.md` derive from `src/data/evidence.ts` and `src/data/strategy.ts`, the same modules the pages render; `/cenario.md`, `/resumo.md`, `/carta-aberta.md` and `/sobre.md` derive from their content files. `tests/derivation-and-anchors.test.mjs` fails the build if an edition drifts.
- The "updated" date shown on the site is the build date, from `src/data/build-info.ts`. Do not hardcode it.
- Data-center support is conditional on a public bargain covering contractable compute access, water, grid costs, affected communities, and measurable local benefits.
- Scenario inventions and open estimates must keep their visible evidence labels.
- Pedro's 2030 model values remain open and must not be filled without the model.
- Search indexing remains disabled until the authors approve publication. It is **one switch**: `PUBLICATION_OPEN` in `src/data/publication.mjs`. Flipping it moves `robots.txt`, the robots meta tag, the Worker's `X-Robots-Tag`, and the canonical/`og:url`/hreflang origin together, from `brasil-2030.piccini.app` to `brasil-2030.com`. Hosts other than production stay `noindex` either way, so previews never compete with the real site. Two things it cannot do for you: add the production route in `wrangler.toml`, and create a `sitemap.xml`.

## Contributing

Contributions use short-lived branches and pull requests into `main`. Before opening a
pull request, run `npm run validate` and preserve the distinction between observed
facts, author estimates, open proposals, and narrative inventions.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the content map and editorial workflow.

## Local work

```shell
npm ci
npm run dev
npm run validate
```

## Deployment

The 2026-09-12 candidate is deployed from `codex/narrative-candidate-2026-09-12`,
not merged into `main`. A subsequent deployment from `main` without the candidate
implementation will remove `/candidato`; integrate the candidate route first if
it must remain available. This is a review deployment, not a general launch.

Cloudflare receives the built `dist/` assets through Wrangler Direct Upload. Merging a
pull request does not deploy automatically. A maintainer with Cloudflare access deploys
the validated `main` branch with:

```shell
npm ci
npm run deploy
```
