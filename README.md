# Brasil 2030: Energia para Escolher

Source repository for the public working site of the Brasil 20XX scenario project:
[brasil-2030.piccini.app](https://brasil-2030.piccini.app/).

## Editorial state

- Portuguese is the default and editorially leading public language.
- English follows the 2026-08-19 Pecém public-bargain revision.
- The public argument has three commitments: a verifiable global slowdown, Brazilian support for US-China negotiations, and domestic data-center and grid infrastructure for leverage and inference sovereignty.
- Data-center support is conditional on a public bargain covering contractable compute access, water, grid costs, affected communities, and measurable local benefits.
- Scenario inventions and open estimates must keep their visible evidence labels.
- Pedro's 2030 model values remain open and must not be filled without the model.
- Search indexing remains disabled until the authors approve publication.

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

Cloudflare receives the built `dist/` assets through Wrangler Direct Upload. Merging a
pull request does not deploy automatically. A maintainer with Cloudflare access deploys
the validated `main` branch with:

```shell
npm ci
npm run deploy
```
