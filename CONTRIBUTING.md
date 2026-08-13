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

- `src/content/scenario-pt.md`: canonical Portuguese scenario.
- `src/content/scenario-en.md`: English scenario following the Portuguese edition.
- `src/data/site.ts`: summary, strategy, evidence labels, and author credits.
- `src/components/`: structured pages for evidence, strategy, the open letter, and
  project background.
- `src/lib/markdown.ts`: machine-readable Markdown editions.
- `public/llms.txt`: index of the machine-readable editions.

When changing public prose, check whether the corresponding HTML page, Markdown
edition, and translation also need updating.

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
