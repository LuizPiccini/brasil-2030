# Contributing to Brasil 2030

Brasil 2030 is a collaborative scenario project. Portuguese leads the editorial
work; the English edition follows approved Portuguese revisions.

## Workflow

1. Create a branch from the latest `main`.
2. Make one coherent editorial or technical change.
3. Run `npm ci` once, then `npm run validate` before each pull request.
4. Open a pull request explaining the claim, source, or presentation change.
5. Ask another author to review changes to factual claims, estimates, or attribution.

Do not commit credentials, `.env` files, build output, local paths, private working
notes, or unpublished personal information. The validation script checks the built
site for common leakage patterns, but contributors remain responsible for what they
submit.

## Content map

- `src/content/scenario-candidate-{pt,en}.md`: the narrative, 2026 to 2030, plus the
  appendix and the notes. The two editions share the same chapter structure and the same
  `fonte-N` footnote ids.
- `src/content/letter-current-{pt,en}.md` and `about-current-{pt,en}.md`: the letter and
  the project background.
- `src/data/evidence.ts` and `src/data/strategy.ts`: the evidence register and the five
  commitments. The `.astro` pages and the Markdown editions both read these, so a claim
  added here reaches both formats.
- `src/data/site.ts`: titles, navigation labels, routes and author credits.
- `src/data/publication.mjs`: the single publication switch. See the launch checklist in
  the README before touching it.
- `src/pages/*.md.ts`: the machine-readable editions, all generated. Never write one by
  hand; `src/lib/markdown.ts` only renders evidence and strategy from the shared data.

When changing public prose, change it in one place. The Markdown editions are generated,
and `npm run validate` fails if an edition drifts from its page, if an internal anchor
stops resolving, or if the copy needs a character outside the loaded font subsets.
Translations are the exception: `-pt` and `-en` content files are edited separately and
must be kept in step by hand.

## Evidence discipline

Every material assertion should remain visibly classified as one of:

- observed fact;
- published plan or regulatory precedent;
- author estimate;
- open proposal or model pending;
- borrowed assumption; or
- narrative invention.

Add a direct source and review date when introducing or materially changing an
observed fact. Never turn an open estimate into a precise value merely to complete
the narrative.

## Pull-request checklist

- [ ] Portuguese and English editions remain aligned where relevant.
- [ ] Factual claims have sources and calibrated labels.
- [ ] Author names and contribution credits are accurate.
- [ ] `npm run validate` passes locally.
- [ ] No credentials, private notes, or local-machine paths are included.
