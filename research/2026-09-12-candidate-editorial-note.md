# Narrative candidate — 12 September 2026

Status: review candidate, not collective author approval. Portuguese only.

## Provenance

- Base: Danilo's public proposal at https://piccini-brasil-2030-proposta.dfnaiff.workers.dev/.
- Source revision inspected: `85124d7f423f22f657ee74309d4ebeca59c1c74e` on `danilo/large_revisions_08092026`.
- Adaptation prepared with AI assistance at Luiz Piccini's request. This is a substantial rewrite, not a verbatim import or a merge of Danilo's branch.
- Existing narratives, translations, REDATA page and support API are preserved. The candidate's navigation does not present those pages as an updated edition of this manuscript.

## Preserved

Clinical ransomware with incomplete recovery after payment; Lagos news; defensive dependence; early contraction of entry-level hiring; productive gains with unequal effects; the slowdown followed by access restrictions; robotics in Shenzhen; returning work on worse terms; fiscal pressure and emigration; conditional Chinese access and US pressure; Serra Verde; the distinction between installed and contractable capacity.

## Substantive revisions

- Lourdes opens and closes the narrative. Camila returns throughout, ending in a practical phone call rather than a geopolitical summary.
- Simplified the cast without deleting their institutional functions. Specific attribution of the fictional Lagos attack to a real militant group was not retained.
- Specified the contingent demand, infrastructure and export-control mechanism behind rationing. A pause in training alone does not establish inference scarcity.
- Distinguished hardware access from open weights, stronger authentication from vulnerable SMS, and cheaper processing from a more expensive bundled service.
- Removed universal failure claims, inevitable loss of privacy and unsupported precision in future employment, fiscal, robot and quota numbers. Directional harms remain; no quantitative model result is implied.
- Reduced military detail in 2030 and separated the no-slowdown risk appendix. Kept concrete democratic erosion without calling continued institutional conflict a completed regime collapse.
- Added four decision points and retained the aspiration of Brazil becoming an AI-era middle power, conditional on safety, implementation, competition and enforceable access.
- Corrected REDATA's distinction between domestic public/scientific compute and substitution through additional R&D.
- Corrected Serra Verde's transaction chronology: April announcement, September completion; added primary company sources.
- Condensed 2026 contextual statistics and institutional lists (including diplomatic-bloc membership counts) rather than presenting an exhaustive factual inventory. Sources in the manuscript support only the claims to which they are attached.

## Review priorities

1. Does the domestic-access strategy materially reduce foreign interruption risks under the fictional agreement?
2. Are the pace of labor-market change and the sectoral transmission plausible?
3. Do readers follow Lourdes as an ordinary person rather than a policy spokesperson?
4. Are the democratic-erosion mechanisms sufficiently specific and proportionate?
5. Can the alternatives preserve hope without promising that infrastructure alone prevents catastrophe?

No new signature request, external-reader message, translation approval or general launch is implied by deploying the candidate.

## Deployment evidence

- Content commit: `3397ca41816858a31a39f74489f93e0993c04557`.
- Review branch: `codex/narrative-candidate-2026-09-12`; not merged into `main`.
- URL: https://brasil-2030.piccini.app/candidato; Markdown: https://brasil-2030.piccini.app/candidato.md.
- Cloudflare deployment: `8c962c6b-23b3-472a-8ac3-03ef1c59e1e3`.
- Checks: Astro reported no errors/warnings; all 22 tests passed; 55 deployment files passed the leakage check; Wrangler dry run and deployment succeeded.
- Live verification: both candidate URLs returned HTTP 200; the article and Markdown matched the validated build exactly. Cloudflare appends its existing analytics script to the HTML. The existing home still exposes both scenario branches and a link to the candidate.
- Review intentionally pending: factual/source review by the authors, economic and technical beta review, and native EN/ES adaptation. No browser visual QA was performed in this publication pass.

## Publication-style rewrite — local follow-up, 12 September 2026

Status: rewritten and validated locally, then deployed on Luiz's explicit follow-up request (see the deployment record below). This rewrite has not been committed or pushed. Removing editorial labels from the reader does not imply collective author approval.

### Framework and references

- Fetched the latest `piccini-brain` remote. Its working checkout has unrelated changes and was not pulled or stashed. The remote confirms that commit `ae37d311` (3 September 2026) consolidated `stop-slop` into `skills/write-well/`; that framework is already present in the checkout and was reread with its Portuguese, analytical, preservation and anti-slop references. The obsolete personal `stop-slop` bridge still points to a removed canonical file.
- Reread [AI 2027](https://ai-2027.com/) for chronological, causal narration: decisions and incentives advance events; technical qualifications can sit in expandable explanations instead of interrupting every passage.
- Reread [Europe 2031](https://europe2031.ai/) for the movement between institutional decisions and personal consequences, characters' gradual changes of mind, and an ending grounded in an ordinary conversation. These are craft references, not evidence for Brazilian predictions. No reference prose was copied.

### Changes in this pass

- Rewrote the five-year narrative, alternatives and risk appendix. The opening starts with clinic work and elections; Camila's influence remains appropriate to a parliamentary aide rather than an omniscient negotiator.
- Expanded the ransomware scene and the useful early experience with the replacement software. Named the recurring receptionist Juliana so her training of Lourdes, dismissal and return on worse terms form one continuous employment story.
- Made the international access mechanism concrete, including capacity that a training pause could free, demand, construction bottlenecks and export restrictions. Preserved the distinction between cheaper basic tasks and costly, reliable advanced services.
- Added the practical diplomatic consultation that constrains Brazil's position and the parliamentary tradeoff behind the renewal of emergency powers. Kept unemployment, underemployment, emigration and democratic erosion without implying that every sector stops or all institutions disappear.
- Reworked the 2030 clinic disruption through an external reporting service and the queue at substitute providers. The clinic retains access to its files; the problem is continuity and processing capacity. This replaces the less clear authorization/reimbursement mechanism at a popular clinic. The staffing and clinical scenes remain fictional and merit a plausibility read by someone familiar with such clinics.
- Removed process credits, pending-approval labels, draft banners, comparisons with the proposal and reviewer instructions from both reader formats. Attribution and adaptation history remain in this internal note. No author endorsement was invented.
- Kept one short scenario disclaimer, the seven source notes and two closed technical explanations. The alternatives retain the ambition of an AI-era middle power; domestic infrastructure remains compatible with a verified slowdown, not a way to evade it.
- Preserved the existing edition, translations, no-index behavior and publication-support flows. The candidate's own navigation uses reading labels rather than review labels.

### Local verification

- `npm run validate`: Astro reported zero errors and warnings; all 23 tests passed; 55 deployment files passed the private/local-artifact check.
- New regression coverage checks the absence of backstage language in HTML and Markdown, unique chapter/source anchors, preserved qualifications and closed technical notes.
- Both local reader URLs return HTTP 200: http://127.0.0.1:4321/candidato and http://127.0.0.1:4321/candidato.md. Opened the reader in Codex. No browser visual QA was performed.
- At the end of the local revision, the prior public deployment remained unchanged. Author acceptance and publication authorization were kept separate.

### Deployment of the rewrite — 12 September 2026

- Authority: Luiz explicitly requested deployment to https://brasil-2030.piccini.app/candidato. No Git operation was requested or performed.
- Deployment used the existing Cloudflare configuration and local working copy on `codex/narrative-candidate-2026-09-12`; `main` and the remote branch were not changed.
- `npm run deploy` rebuilt and validated the site: zero Astro errors/warnings, 23 passing tests, 55 deployment files checked for private/local artifacts.
- Cloudflare version: `192fa9e3-3b8a-4f55-93a8-cffbbefaa7d3`. The publisher reported only the candidate HTML and Markdown as new or modified static assets.
- Live candidate HTML and Markdown returned HTTP 200 and matched the validated article/Markdown exactly. The homepage main content matched before and after deployment.
- Published article SHA-256: `6099d7eeaf1660c9f5efb8fb2c8ec6d4671122aaf0df47c87d1c18561f779529`.
- Published Markdown SHA-256: `f23bb2bfdeba56076102c53c1bc3821c0d398a54899160fe22fd0b366baf2595`.
- The uncommitted source and this audit record remain local; a future branch deployment must include the rewrite to avoid reverting it.

## Restore the original design — local follow-up

Luiz objected to the separate candidate layout and approved restoring the original design locally before publication. This pass does not edit the manuscript or begin the planned side-by-side editorial review with Danilo.

- Restored the existing scenario hero, complete site navigation, support link, three-column reading layout, chapter timeline, scroll-linked sidebar and mobile chapter bar using the original global styles. The main scenario implementation and its stylesheet remain unchanged.
- The hero links to the negative trajectory and the existing alternatives section; it does not pretend there are two complete candidate branches. The English option is visibly unavailable rather than redirecting to a different manuscript as if it were a translation.
- Added `CandidateDashboard.astro` and `candidate-reader.ts` for the candidate's eight sections. The panel uses qualitative indicators and summaries consistent with the current narrative. After 2030 it switches to alternatives, the risk appendix and notes, without presenting those sections as future annual observations.
- Restyled the two diagrams already present in the manuscript. No old quantitative predictions, additional story passages or new visual assets were inserted.
- A broad CSS lookup returned invalid citations; a narrower OpenRouter lookup returned verifiable references. Decisive heading/date styles were checked directly against `global.css`.
- `npm run validate`: zero Astro errors/warnings; 25 tests passed; 55 deployment files passed the artifact check. Tests cover original layout hooks, navigation, unique anchors, forward/backward section selection and source qualifications.
- Manuscript SHA-256 remains `6e8c0b4feac00e46cf2318b57ea838d5e2bfb660fd1cf2dba88bc6f099b2af46`. The candidate article and Markdown match the previously published text exactly.
- Local preview: http://127.0.0.1:4321/candidato, HTTP 200, handed off in the existing preview tab. No browser visual QA was performed.
- No commit, push or deployment in this pass. Public version remains `192fa9e3-3b8a-4f55-93a8-cffbbefaa7d3` until a new publication request. Next: Luiz reviews the restored design, then reviews our text and Danilo's section by section.

### Restored-design deployment

- Luiz subsequently requested deployment for reading on his phone. Published through the existing Cloudflare configuration; no commit or push performed.
- Cloudflare version: `c4f78dc0-7816-44d2-a6e9-08e7648ecdca`.
- Rebuilt successfully: zero Astro errors/warnings, 25 passing tests, 55 deployment files checked. The publisher reported only `/candidato/index.html` as changed.
- Live `/candidato` returns HTTP 200 and its main content matches the validated restored design. The qualitative dashboard is present. Markdown remains unchanged from the prior published manuscript.
- Public URL: https://brasil-2030.piccini.app/candidato. Next: side-by-side editorial review, without implying approval to change the text or integrate the source branch into main.

## Compact single-narrative opening — local only

Luiz approved the proposed opening based on the supplied AI 2027 and Europe 2031 references, explicitly restricting this pass to local work.

- Replaced the two introductory cards with one compact opening. The negative trajectory is the sole narrative; the existing alternatives section remains at the end. No chapter was removed or rewritten.
- Applied the approved introductory paragraph to the reader and Markdown preface. Kept Brasil 2030 dominant, reduced the subtitle, and made “Começar em 2026” and “Resumo” the two opening actions. The scenario disclaimer is now a small paragraph rather than a full-width colored banner.
- Moved the opening into the reading grid. One existing qualitative dashboard starts beside it on wide screens and follows the manuscript; narrow screens retain the concise mobile chapter state. No statistics or artwork were added.
- The candidate's primary navigation now contains Cenário, Resumo, Redata and Sobre. Evidence, strategy, the letter and support remain in the complete menu, available on desktop and mobile. The wordmark and Cenário link stay in the candidate. Other editions keep their existing navigation and layout.
- All CSS changes are candidate-scoped. The light-paper palette, green accent, font families, manuscript diagrams and source notes are preserved.
- Validation: zero Astro errors/warnings, 25 passing tests, and 56 deployment files checked for private/local artifacts. The candidate preview returned HTTP 200; the existing preview tab was queued for display. No browser visual QA was performed.
- The manuscript source SHA-256 is unchanged: `6e8c0b4feac00e46cf2318b57ea838d5e2bfb660fd1cf2dba88bc6f099b2af46`. The rendered article still matches published SHA-256 `6099d7eeaf1660c9f5efb8fb2c8ec6d4671122aaf0df47c87d1c18561f779529`. Only the Markdown preface changed; its manuscript suffix is identical to the source.
- No commit, push or deployment. The public site remains on `c4f78dc0-7816-44d2-a6e9-08e7648ecdca`. Local preview: http://127.0.0.1:4321/candidato. Next: Luiz reviews the opening before the side-by-side manuscript review with Danilo.

## Complete manuscript in the approved October-election style — 13 September, local only

Luiz supplied the new introduction and an October 2026 opening, then asked for the complete text in that style and a new candidate version. The earlier local-only boundary remains in force; this pass neither publishes nor alters the main edition or the approved design.

- Preserved both introductory paragraphs verbatim in the reader and Markdown. Rewrote the five annual chapters, the alternatives and the catastrophic-risk appendix using the `write-well` process: chronological events, intelligible causal steps, concrete choices and character consequences. Kept the existing layout, two diagrams, two closed technical notes and eight-section reading structure.
- The opening now begins with the election and Camila preparing REDATA implementation questions. Retained the sceptical colleague's dialogue while correcting factual overclaims: approximately 700 attackers versus the wider 1,200-agent group in the METR account, no claim of the first AI crime, configuration failures distinguished from unauthorized actions with permitted internet access, and public endorsements of Amodei's appeal distinguished from a joint binding agreement. Added sources 8–10 and moved the evidence cutoff to 13 September. October campaign behavior and subsequent events are explicitly scenario assumptions in the notes.
- Expanded André's bank procurement and tested fallback, Rafael's warnings and eventual emigration, Juliana's displacement and insecure return, and Camila's frustrated legislative oversight. Lourdes remains an ordinary, nontechnical clinic administrator; her water concern is treated as a legitimate licensing question. Retained the Lagos and Shenzhen television scenes, Serra Verde's actual 2026 transaction as background, and Marlene's final interrupted care. Corrected the 2027 exam continuity: the laboratory resends the result, but the appointment has already been disrupted.
- In 2028 moratoria lead to negotiations; the agreement takes effect in 2029. The slowdown reduces risk but does not automatically produce inference scarcity. Demand, infrastructure bottlenecks, commercial priorities and external controls jointly cause the modeled access problem. Cheap routine applications, genuine productivity gains, surviving domestic operators and the bank's successful contingency remain visible.
- The 2030 election returns to the opening themes with unemployment, emigration, foreign contract dependence and selective emergency powers that impair democratic contestation. The alternatives retain Brazil's ambition to become a middle power, conditional on competitive services, verifiable access, continuity, safeguards and diplomacy. A failed slowdown remains a separate appendix, with catastrophe and loss-of-control uncertainty made explicit.
- A bounded OpenRouter source-discovery worker returned an unusable answer. Used the permitted fallback: direct, bounded verification of the already-known candidate entry points, dashboard and regression test file. No successful worker findings were assumed.
- `npm run validate`: zero Astro errors/warnings/hints; 26 tests passed; all 56 deployment files passed the private-artifact check. Tests cover the exact approved introduction in both formats, all eight sections, unique navigation/source anchors, all ten source notes, and absence of public editorial-process artifacts.
- Build hashes compared with the start-of-turn baseline: only `candidato/index.html` and `candidato.md` changed. No files were removed. Every other deployment artifact, including the main edition and style/script assets, is byte-identical. Manuscript SHA-256: `be86fd87da9e1ac3a71c0cc7b7f3751cdf43d35e6c262e2cac263345e99f37b8`.
- Local `/candidato` and `/candidato.md` both return HTTP 200. The existing preview tab was handed off; no browser visual QA was performed. The reader estimates approximately 40 minutes including notes.
- No commit, push or deployment. Next: Luiz reads the complete local candidate and identifies passages for joint editorial review before any publication request.

## Concise revision with Camila and Lourdes only — 13 September, local only

Luiz clarified that the purpose was a shorter, clearer text in his supplied opening style, not an expanded narrative, and explicitly requested only Lourdes and Camila as characters.

- Left the approved two-paragraph introduction and its reader/Markdown entry points byte-identical. Restored Luiz's election-opening phrasing, sceptical-colleague dialogue and Camila introduction, retaining factual corrections about the 700/1,200 agents, incident scope, leaders' endorsements and REDATA's legislative status. The anonymous colleague is part of Luiz's supplied opening, not a new character arc.
- Removed the separate Rafael, André, Juliana and Marlene stories and all four names from the candidate. Bank procurement, emigration, employment loss and supplier alternatives remain as concise analytical developments. Scenes now follow Camila's institutional work and Lourdes's clinic experience. Incidental unnamed staff, officials and patients do not receive biographies or separate arcs.
- Shortened all five annual sections. Preserved the approved sequence: October election, attacks and imported defense, negotiation and unequal access, slowdown with political dependency, and the 2030 employment/democratic deterioration. Lagos, Shenzhen, Serra Verde, environmental concerns and productive uses of AI remain. A failed slowdown is still a separate risk appendix.
- Cut repeated explanations of procurement, contracts and oversight and shortened the alternatives and appendix. Preserved both diagrams, both closed technical notes and the entire ten-source notes section unchanged. The existing dashboard summaries still match the reduced manuscript and needed no edits.
- Used `write-well` for scope, voice, preservation and anti-slop review. The installed `stop-slop` bridge points to an absent canonical file; this was disclosed, and the available write-well anti-slop reference was used instead. No pull, installation or framework change was attempted.
- Actual length using the unchanged site method: **8,294 → 5,480 words**, a reduction of **2,814 words / 34%**, including notes and appendix. Displayed reading time: **40 → 27 minutes**. No change to the 210-words-per-minute formula or to which content it counts. Added a regression ceiling of 6,000 words plus guards for the supplied opening and removal of the four character names.
- `npm run validate`: zero Astro errors/warnings/hints; 26 tests passed; all 56 deployment files passed the private-artifact check. Local HTML and Markdown both return HTTP 200. No browser visual QA was performed.
- Build-hash comparison: only `candidato/index.html` and `candidato.md` changed; no deployment files were removed. Reader component, Markdown endpoint, design and all other deployment artifacts are unchanged. Manuscript SHA-256: `8714b2f61b042915e5ec135729de79f8ce5b44384c0bcf59c564ccebf5a976ce`.
- Local preview: http://127.0.0.1:4321/candidato. No commit, push or deployment. Next: Luiz reviews the shorter, two-character candidate before further edits or a publication request.

## Approved year-by-year edition and publication — 13 September

Luiz approved the revised annual chapters, including the final line “Não sei, mãe. Ninguém sabe.”, then explicitly authorized integration, coherent diagrams/tooltips/footnotes, commit, push and deployment. This supersedes the local-only boundary above for the candidate, not for replacing the main edition.

- Integrated the approved October opening and 2027–2030 narrative. 2027 has unilateral restrictions, the clinic ransomware, returning cash use and junior employment collapse. In 2028 a January escape leads to the March containment blackout and a nonbinding declaration. In 2029 a binding protocol introduces cross inspections; access tiers, the Chinese package and Antônio's emigration deepen dependence. In 2030 the pause remains in force under threat; renewed cuts, electoral restrictions and the mother–daughter conversation close the story.
- Preserved the approved prose; additions are source references and supporting apparatus. The catastrophic-risk appendix remains separate. Antônio is an incidental relative, not a third protagonist.
- Updated every candidate dashboard state and its mobile summary. Added a collapsed five-year synopsis and corrected candidate navigation to open it instead of the older two-scenario summary. Kept the existing access diagram, added accord chronology and access-tier diagrams, and restored the collapsed explanation that a pause does not itself cause inference scarcity.
- Reviewed native source-link tooltips and English-unavailable tooltip. Added sources 13–15 for refusal reduction, ANPD international transfers and the ECA Digital's limited scope. Reclassified the unused Serra Verde narrative reference as background. Added a collapsed glossary explaining exfiltration, inference, retention versus training, fictional policy and qualitative dashboard scales. These legal sources do not establish the projected commercial effects.
- Kept layout, palette and fonts; changes are candidate-scoped. Existing main and EN editions retain their narrative and navigation. Shared header code changes only the candidate branch.
- A first OpenRouter discovery worker failed; direct bounded reads of known files were used. A second bounded lookup of layout/header succeeded with verified references. Browser accessibility inspection confirmed the candidate content, source tooltip help and narrow-screen chapter bar; no screenshot-based visual QA was performed.
- Validation: zero Astro errors/warnings/hints; 27 passing tests; 56 deployment assets pass the private-artifact check. Tests cover approved chronology, exact final line, summary links, three diagrams, fifteen source notes and all navigation anchors.
- The author-approved expansions replace the previous 6,000-word ceiling. Current manuscript plus notes/apparatus: 7,854 words and 38 minutes under the unchanged 210-word formula. Regression ceiling is now 8,200 to prevent further unreviewed expansion, not to hide reading time.
- Publication uses the existing Cloudflare Worker through direct upload, not a new Sites project or Git integration. Deployment receipt follows after live verification.

### Publication receipt

- Source commit: `914f58b5fef1e961ab12ab7cb6db51a75ed7a59b`, pushed normally to `origin/codex/narrative-candidate-2026-09-12`. No integration into main.
- Cloudflare version: `fae3caaa-9cd8-4a3f-b9d8-c1a90f78ae1e`. Publisher uploaded three changed assets: candidate HTML, candidate Markdown and candidate CSS.
- Public https://brasil-2030.piccini.app/candidato and /candidato.md return HTTP 200 and match the validated build byte-for-byte. The exact final line is present in both.
- Main page matches its pre-deployment content byte-for-byte, SHA-256 `a819e7a12f379d5a5e8006e3b75082690314e61ac6e58181b1d236733e363aa5`.
- Candidate HTML SHA-256: `d42524fea750ac507253642b7950af8d86d7f92a1f198e64754f59d20f5f1ebc`; Markdown: `da5615474146e183fe2292c6b5a42242073fd54e1446b1c4dc618d4eaf3757c8`.
- This receipt is documentation only; it does not change the deployed source or require another deployment.
