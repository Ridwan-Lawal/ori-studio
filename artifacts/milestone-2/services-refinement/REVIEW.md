# Services — Composition and Copy Refinement

## Changes

- The Silk Press portrait is now inside the Silk Press article, aligned with its text on desktop and placed before the next service on mobile. Loc Retwist is a separate, text-only entry below a clear row boundary.
- The defined-curls portrait is inside Wash & Define rather than beside the entire Natural Haircare category. Deep Conditioning stays text-led.
- Text-only desktop service entries retain the existing two-column editorial alignment: title/summary at left, description/duration/action at right.
- Missing-asset explanations were removed from rendered service copy and the runtime service model. The notes now live in `docs/SERVICE_IMAGE_NOTES.md`.
- Technical image commentary was removed from Wash & Define and Silk Press descriptions. Captions simply identify the service and style-inspiration role.
- The existing fictional-concept and illustrative-duration disclosures remain visible and unchanged. All six booking URLs retain their slugs.
- Mobile body text stays 16px with 1.6 line height, service titles retain the approved 28px floor and 1.12 line height, and the main title retains its 48px floor. Existing spacing tokens, palette, fonts and text-led rows are preserved.
- The compact Silk Press image uses its natural aspect ratio at a maximum 240px display width, preserving the complete hairstyle without upscaling.

Files changed: `src/app/services/page.tsx`, `src/components/service-entry.tsx`, `src/components/catalogue.module.css`, `src/content/services.ts`, `docs/CONTENT.md`, `README.md`, the initial Milestone 2 review's refinement pointer, and this review's artifacts. Created `docs/SERVICE_IMAGE_NOTES.md`. No dependency changes.

## Verification

- `pnpm lint` — passed.
- `pnpm exec tsc --noEmit` — passed.
- `pnpm build` — passed without warnings.
- `git diff --check` — passed.
- Playwright against the production build — **22 grouped checks passed** at 320, 390, 768 and 1440px.
- Verified six services, six illustrative-duration labels, fictional disclosures, all three category anchors and all six service-specific booking CTAs using keyboard activation.
- Verified no customer-facing asset-availability explanations; the correct source, caption and article ownership of each service portrait; no image in Loc Retwist, Flat Twists or Deep Conditioning; and no photograph extending into the Loc Retwist article.
- Verified mobile type sizes/line heights, no horizontal overflow, skip link, visible keyboard operation and reduced-motion behavior.
- Zero normal-operation console errors or JavaScript page errors.
- Homepage screenshots remain pixel-identical at 390px and 1440px. Lookbook screenshots retain identical page dimensions; differences are confined to hairstyle image regions, with its source and layout rules unchanged. Lookbook filtering and its native detail dialog passed a regression smoke check.
- No booking form, additional feature, advanced motion or deployment was implemented.

Screenshots: `services-{320,390,768,1440}.png`, `services-fold-{width}.png`, `styling-maintenance-{width}.png` and `natural-haircare-{width}.png`. Raw checks: `playwright-results.json`; regression evidence: `regressions.json`.

## Visual critique — design-taste-frontend

The established editorial direction was reviewed rather than redrawn. The approved DESIGN.md remains authoritative.

ROUND 1
Seen in one second: a small Silk Press portrait detached from a two-service maintenance list.
Idea (one sentence): give each editorial photograph an unambiguous service context, preserving the text-led catalogue.
Live thing: category anchors and service-specific booking links.
Layout words by section: introduction=portrait split / protective=index / care=category portrait / maintenance=shared accompaniment.
Scores: design 7 · usability 7.5 · creativity 7 · content 7 → overall 7.2 (subjective).
Caps applied: the skill's generic prohibitions on approved overlines, borders and limited motion do not override the project specification.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Maintenance photo sat beside both Silk Press and Loc Retwist (original `../services-1440.png`). Move it into Silk Press and separate Loc Retwist below.
2. Technical missing-photo explanations interrupted the catalogue (`../services-390.png`). Keep them in internal documentation.
3. Care portrait could be read as illustrating both conditioning and definition (`../services-1440.png`). Attach it specifically to Wash & Define.

ROUND 2
Seen in one second: a clear text-led service index with appropriately attached portraits.
Idea (one sentence): pictures belong to their named service entries; maintenance and care copy can stand without a fabricated illustration.
Live thing: working keyboard-accessible category and booking links.
Layout words by section: introduction=split / protective=parallel index / conditioning=text row / definition=illustrated service / silk press=compact illustrated service / loc retwist=text row.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8 (subjective, not an independent jury score).
Caps applied: known editorial approach limits creativity to 7. At 320px, approved copy and the 48px display floor produce three balanced lines without an orphan word; do not shrink the typography or rewrite the title to satisfy a generic line-count rule.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No remaining service-image association or interaction blocker in final desktop/mobile captures.
2. Missing flat-twist and retwist imagery remains an internal content limitation; keep these entries text-only.
3. The small Silk Press source limits its display size; keep the 240px width cap and natural ratio.

Production inspector screenshots and measurements: `.taste-skill/milestone-2/services-refinement/`. Documented allowances retain the approved eyebrows, numbering, subtle dividers, limited motion and three relevant portraits. The detector's `empty-screens` threshold is also waived for the explicitly requested text-led catalogue: the flagged screens contain the service index and maintenance descriptions, not missing/reveal-hidden content. Adding filler images or abandoning the text-led rows would conflict with the user's request. Its `off-centre` warning is advisory: the existing shared `.site-container` still has equal outer margins; portrait placement is intentionally asymmetric inside that frame. Ivory-palette and no-footage warnings reflect the approved identity and scope.

No remaining visual or functional blocker found. Validation used Chromium; other browser engines and live screen-reader testing were not performed.
