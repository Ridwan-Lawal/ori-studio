# Milestone 5 — Final QA, Optimization & Preview Preparation

## Readiness assessment

The local production build passes functional, responsive, accessibility and recovery QA. It is prepared for an **authenticated Vercel preview**, not approved for a production release. Preview creation and hosted verification remain blocked because Vercel CLI 65.4.0 is logged out and the directory is not linked to a Vercel project. No preview URL, hosted build/runtime logs or production deployment exists.

[Deployment handoff and exact preview-only steps](../../docs/DEPLOYMENT.md). No credentials are needed in chat. No production deployment or Remotion work was started.

## Bugs found and fixes applied

1. **Browser Back left an open Lookbook dialog in the top layer.** Native dialog cleanup now closes it on route deactivation/unmount and restores body scrolling. Forward navigation also restores a usable page.
2. **Mobile menu remained open across browser-history route changes.** The shared header closes the native dialog when pathname changes, preserving Escape and focus-return behavior.
3. **Gallery accessible names did not contain all visible label text.** Buttons now reference title, category and action through `aria-labelledby`, with explicit caption word boundaries. Layout and visible wording are preserved.
4. **Review definition-list markup was invalid.** Edit controls now live inside their associated definition values. Typed state, validation and review/edit behavior remain unchanged.
5. **Primary/light/selected-filter focus rings lacked contrast in their surrounding canvas.** The former primary outline matched ivory exactly (1:1). Explicit approved forest/ivory outlines now measure approximately 10.99:1, with a 2px outline and 4px offset. Keyboard screenshots and computed checks cover both 390/1440px.
6. **Intermittent browser fallback `/favicon.ico` requests returned 404.** A permanent redirect now serves the existing approved `/icon.svg`; primary SVG metadata remains intact.
7. **Booking privacy copy overpromised clearing on navigation.** It now correctly describes memory-only selections and no submission/saving; cached browser-history pages may retain transient state.
8. **Missing production metadata/recovery foundations.** Added honest route-specific social metadata, canonical-origin handling, noindex policy, robots route, sharing image, custom not-found page and recoverable error boundary with heading focus.

Services photography was checked explicitly: curls belong to Wash & Define, straightened hair belongs to Silk Press, and Loc Retwist stays text-only. Dedicated Flat Twists/Loc Retwist imagery remains absent from the approved library. No technical asset-availability prose appears in service descriptions; fictional-concept and illustrative-duration disclosures remain visible. No prices, reviews, addresses, staff claims or operating-business schema were invented.

## Performance changes and findings

- Homepage and Services hero images use current Next.js image preloading/high priority. Other section/gallery images remain lazy and retain intrinsic dimensions, meaningful alt text, responsive `sizes` and manifest display caps.
- Browser network traces found shared navigation prefetching the homepage GSAP bundle on Services, Lookbook and Booking. Disabling automatic prefetch on shared links removes that roughly **45 KB compressed** motion download from their initial loads. Navigation still works on selection. `performance-network.json` verifies the motion chunk is absent on all three routes.
- Approved Instrument Serif/Manrope remain self-hosted through `next/font`; no external font request or new runtime dependency was introduced.
- Server Component page boundaries and the scoped `useGSAP`/matchMedia cleanup are preserved. Repeated-route and reduced-motion tests confirm trigger cleanup and visible content.
- All final browser layout-shift samples are zero. Lighthouse CLS is reported per run below. These are lab observations, not field Core Web Vitals.
- The final hero photograph stays fully opaque from first paint. Its short settling motion is desktop-only. A small homepage wrapper defers the separately loaded GSAP effects until after the narrow-screen hero image decodes and paints; initially reduced-motion visits skip that effects download entirely. Earlier opacity-animation runs are preserved in `lighthouse/before-photo-fix/`.
- Desktop/mobile audits use the installed Lighthouse CLI with Chrome and JSON/HTML outputs. Runs are sequential, without other browser QA competing for CPU. Non-home metrics were captured after the shared-prefetch/focus fixes; the final deferred-homepage-effects change was remeasured on Home. Local origins differ between those builds, and each raw report retains its exact URL/time. Results vary by machine load; they are not public-host or field measurements.
- A quiet pre-change homepage baseline measured performance **94 mobile / 100 desktop**, LCP **2.5s / 0.7s**, TBT **230ms / 10ms**, CLS **0 / 0**. The earlier concurrent baseline measured 78 mobile and is retained for transparency, not used as the reference comparison.
- A Services audit overlapped an earlier batch and produced a misleading low score. It is saved under `lighthouse/investigation/`; a subsequent isolated Services sample measured 94. Pre-prefetch-fix reports are retained under `lighthouse/before-prefetch-fix/`. Do not mix those investigations with the final table.
- Remaining framework JavaScript/polyfill and hydration costs are documented in the Lighthouse reports. Image-size advisories must be interpreted with the emulated DPR; the approved high-density image variants are not replaced with visibly softer 1× files to inflate scores.

| Route | Device | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home | mobile | 97 | 100 | 100 | 69 | 1.8 s | 160 ms | 0 |
| home | desktop | 100 | 100 | 100 | 69 | 0.8 s | 50 ms | 0 |
| services | mobile | 95 | 100 | 100 | 69 | 2.0 s | 230 ms | 0 |
| services | desktop | 100 | 100 | 100 | 69 | 0.7 s | 30 ms | 0 |
| lookbook | mobile | 96 | 100 | 100 | 69 | 2.3 s | 190 ms | 0 |
| lookbook | desktop | 100 | 100 | 100 | 69 | 0.7 s | 10 ms | 0 |
| book | mobile | 95 | 100 | 100 | 66 | 2.0 s | 230 ms | 0 |
| book | desktop | 100 | 100 | 100 | 66 | 0.6 s | 60 ms | 0 |

Lighthouse SEO is intentionally reduced by `is-crawlable` because this fictional demo is **noindex**. That result is not hidden or “fixed” by making a fictional salon indexable. Other failed SEO checks, if any, are listed in the raw reports. The recommendation is to keep the demo noindex/follow and link it from the creator's real portfolio.

Interaction event timings were recorded for real Playwright pointer/keyboard actions. They are local Event Timing samples, not field INP. Events faster than the observer's 16ms reporting threshold may not appear. Lighthouse TBT is a lab responsiveness proxy.

## Accessibility

- **28 axe-core 4.14.0 scans: zero violations** across mobile/desktop page states, mobile menus, gallery detail, booking errors, date/time/review/completion. Initial scans exposed the label/definition-list defects above.
- Two additional injected-error-state axe checks pass. Recovering with Try again successfully renders the homepage and does not expose the injected error text/stack in the UI.
- Keyboard walkthroughs via Playwright cover Tab/Shift+Tab, Enter, Space, radio arrows, lightbox arrows, Escape, focus containment/return, error focus and stage-heading focus.
- Primary, inverse and selected-filter keyboard focus has explicit high contrast after the manual focus audit. Automated axe alone did not identify this defect.
- Current steady-state text uses the approved measured color pairs; field borders and focus use forest/ink/muted-ink rather than low-contrast decorative sage on ivory.
- axe marks some `color-contrast` / `aria-valid-attr-value` cases for manual review. These are not represented as automated passes: text placement/contrast, controls, current-step `aria-current="step"`, native date semantics, radio groups and error descriptions were inspected alongside keyboard tests.
- No horizontal overflow, missing image alt text or unlabelled form controls was found in the tested flows. Error and 404 content keep the shared concept disclosure.

Screen-reader software, Safari, Firefox and real devices were not available. Native date-picker and discrete-dialog-transition presentation should be confirmed on the hosted preview in those browsers; native/fallback semantics remain implemented.

## Functional and production checks

- All four routes tested at **320, 390, 768, 1024 and 1440px**.
- Homepage → Services/Lookbook, all three service-category anchors, all six service booking links, footer/header links, cross-route Our Approach and Back to top targets resolve.
- Browser Back/Forward passes with open gallery/menu dialogs and restores scrolling.
- Gallery category/search/reset/empty states, native detail dialog, keyboard arrows/Escape, focus return and related-service handoffs pass.
- Booking: all known slugs, missing/invalid/empty/duplicate/encoded parameters, required fields, past dates, UTC−8/UTC+14 local-date boundaries, review edits, retained choices, exact demo completion and reset pass.
- Completion generates no network request and no local/session-storage writes; no personal-information fields, API route, database or real appointment submission exists.
- No-JavaScript checks retain route titles/static content and explain the booking interaction requirement. Reduced motion keeps content visible and reverts GSAP triggers/styles.
- Branded 404 returns HTTP 404; robots/favicon/social image return valid responses. A fault injected only in a browser-intercepted script verifies the error boundary, focus and successful retry; no fault/diagnostic code is shipped in app source.
- `pnpm lint`: passed, no warnings.
- `pnpm exec tsc --noEmit`: passed.
- `SITE_URL=http://localhost:3026 pnpm build`: passed; four pages, icon and robots are statically generated.
- `git diff --check`: passed.
- `pnpm install --frozen-lockfile`: passed with the pinned lockfile. The earlier offline check failed on unavailable registry metadata; the online install resolved that environment limitation without changing dependencies.
- Bounded known-token/private-key scanning found no matches and no sensitive tracked paths. Environment, Vercel, agent and local cloud paths are ignored. This is a scoped source/config review, not a claim of exhaustive secret detection.
- No unexpected console/hydration errors in the passing production suites. Expected injected errors and deliberate 404 recovery checks are isolated from normal-route assertions.

The motion harness was improved to await actual GSAP target initialization and completion, rather than assuming a fixed delay or accepting an initially visible state before a deferred entrance begins. Canonical-root URLs are normalized before comparison; hash navigation assertions await browser navigation. Earlier harness failures are retained separately, not represented as product failures.

## Metadata, indexing and deployment settings

`src/lib/site-metadata.ts` supplies unique route metadata, Open Graph/Twitter text and a 1200×630 sharing image. Canonicals exclude booking query parameters. Origins come only from configured `SITE_URL` or the actual Vercel deployment hostname; no public domain is fabricated. The local audit origin is not a proposed production domain.

`public/images/ori-studio/social-preview.png` is a browser-rendered brand composition using the approved hero at 504×630 and approved fonts. It states the fictional/no-appointments disclosure. The derivative and credits are documented in both asset manifests and PHOTO-CREDITS.

Robots metadata plus `X-Robots-Tag` specify noindex/follow. `robots.txt` allows crawling so crawlers can read that directive; no sitemap is advertised while noindex. This follows [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Vercel's build-time hostname support is documented in its [system variables reference](https://vercel.com/docs/environment-variables/system-environment-variables).

`vercel.json` declares Next.js, frozen pnpm install and `pnpm build`; Node 24.x is pinned to match the audited runtime (24.21.0). `.vercelignore` prevents uploading originals, QA artifacts, environment files, local agent/cloud directories and build caches, while retaining the imported JSON manifest.

## Files created or changed

New app/config assets: `src/components/home-motion-effects.tsx`, `src/lib/site-metadata.ts`, `src/app/robots.ts`, `src/app/not-found.tsx`, `src/app/error.tsx`, `public/images/ori-studio/social-preview.png`, `.vercelignore`, `vercel.json`, `docs/DEPLOYMENT.md`.

Updated: `src/components/home-motion.tsx` (deferred effects loading and reduced-motion gating), four route metadata exports, `src/app/layout.tsx`, `src/app/globals.css`, image helpers, shared header/footer, gallery markup/lifecycle, booking review markup/styles/privacy copy, `next.config.ts`, `package.json` (Node engine only), `.gitignore`, README, CONTENT/MOTION/ASSET_MANIFEST/PHOTO-CREDITS documentation.

No new website dependency. Lighthouse, axe and Vercel CLI were installed separately under `/tmp` for QA. Existing unrelated working-tree changes were preserved; no commit or push was made.

## Artifacts

- `test-results.json`: five-width main journey/motion suite.
- `extended-results.json`: history, anchors, links, metadata, image loading/caps and no console errors.
- `booking-regression/test-results.json`: full booking validation/state/privacy regression, including timezone cases; five stages at all five widths.
- `accessibility-baseline.json`, `accessibility-final.json`, `focus-baseline.json`, `focus-final.json`, `error-results.json`.
- `performance-network.json`, `lighthouse/summary.json`, per-route/device Lighthouse HTML/JSON reports.
- `security-check.json`, `deployment-status.json`.
- Standalone `qa.mjs`, `extended-qa.mjs`, `focus-qa.mjs` accept `ORI_QA_URL` and an installed `PLAYWRIGHT_MODULE` path. Hosted tests require authorized access if Vercel Deployment Protection is enabled.

| Route | Mobile | Desktop |
| --- | --- | --- |
| Homepage | [390px](final/home-390.png) | [1440px](final/home-1440.png) |
| Services | [390px](final/services-390.png) | [1440px](final/services-1440.png) |
| Lookbook | [390px](final/lookbook-390.png) | [1440px](final/lookbook-1440.png) |
| Booking | [390px](final/book-390.png) | [1440px](final/book-1440.png) |

Twenty normal-route captures include 320/768/1024px. Booking-stage, error/404 and keyboard-focus captures are alongside them. Baseline production captures are under `baseline/`.

## Design-taste final critique

The existing direction is retained; no redraw, palette/font replacement or new stock imagery. All four inspector reports passed with documented allowances for approved eyebrows, italics, numbering, rules, small secondary labels and restrained motion. No photographs were enlarged to satisfy generic picture/motion quotas. Before/after baseline typography remains Instrument Serif/Manrope, 48px mobile display floor and approved colors.

ROUND 1
Seen in one second: A coherent contemporary African beauty editorial, with a usable fictional service journey.
Idea (one sentence): Photography establishes texture; typography and quiet feedback make the salon concept usable.
Live thing: Working service discovery, gallery and non-submitting booking demo.
Layout words by section: hero=42/58 / services=editorial tracks / lookbook=asymmetric / booking=typed preferences / recovery=plain branded copy.
Scores: design 8 · usability 8.5 · creativity 7 · content 8 → 8.0 before generic house-style caps; 6.5 under the skill's approved-brand caps.
Caps applied: The binding brand requires devices the generic house style bans; they are preserved, not redesigned for a higher score.
Top three actionable issues and fixes:
1. Invisible focus outlines on ivory/forest controls (`focus-baseline.json`): fixed with approved contrasting tokens; captured after fixes.
2. Dialogs surviving browser-history navigation: fixed lifecycle cleanup and pathname handling; all five widths pass.
3. Accessible labels/review semantics: corrected without introducing new visual patterns; axe now reports zero violations in the tested states.

Final review: no blocking visual issue remains in the inspected captures. Existing small-image limits, the long but readable six-service first booking step and browser-native control presentation remain documented tradeoffs, not reasons to change approved imagery or compress touch targets. The social derivative also preserves the editorial direction and explicit concept disclosure.

## Remaining issues and stop condition

- **Deployment blocker:** Vercel login/project linkage unavailable. Preview upload, preview URL, hosted functional checks and deployment-log inspection have not been performed.
- Public-origin metadata and CDN/runtime behavior must be verified on the actual preview; localhost lab results cannot establish public-host performance.
- Safari/Firefox, physical devices, screen-reader testing and field INP remain unperformed.
- Dedicated Flat Twists/Loc Retwist photography remains missing; honest text-only placements are preserved.

Local QA and preview preparation are complete. Production readiness remains conditional on an authenticated preview, hosted verification and explicit production approval. Stop here; do not automatically deploy to production or begin Remotion work.
