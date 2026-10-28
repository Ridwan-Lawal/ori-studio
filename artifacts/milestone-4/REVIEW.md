# Milestone 4 — Motion & Visual Refinement

## Outcome

Completed the visual audit, selective motion system and responsive regression checks across all four routes. The approved typography, palette, copy, images, crops, native dialogs and booking model are preserved. No deployment, production integration or Remotion work was started.

Baseline priorities were recorded before implementation in [AUDIT.md](AUDIT.md). Eight development screenshots were captured at 390/1440px; production captures replace the development indicator in the final set.

## Visual improvements and components

| File | Change |
| --- | --- |
| `src/components/home-motion.tsx` | New scoped client enhancement for the server-rendered homepage; coordinated hero and six selective scroll groups. |
| `src/app/page.tsx` | Passes existing server-rendered content through `HomeMotion`; remains a Server Component. |
| `src/app/globals.css` | Progressive 220ms native mobile-dialog transitions. No token, typography or layout redesign. |
| `src/components/catalogue.module.css` | Aligns illustrated Services tracks to the existing 5:7 catalogue grid; approved 14px secondary gallery labels reduce narrow-column wrapping; fine-pointer photo/action feedback. |
| `src/components/booking/booking-flow.tsx` | Keys only the stage presentation wrapper to the current step. The typed reducer and field behavior are unchanged. |
| `src/components/booking/booking.module.css` | Short stage entrance, separate from in-place validation errors. |
| `package.json`, `pnpm-lock.yaml` | Adds `gsap` 3.15.0 and `@gsap/react` 2.1.2. No other direct dependency changes. |
| `docs/MOTION.md` | Documents implemented timing, scope, cleanup, resilience and reduced-motion rules. |
| `README.md` | Updates milestone status and verification reference. |
| `artifacts/milestone-4/qa.mjs` | Reproducible standalone Playwright audit; test tooling is not part of the website runtime. |

Services, Lookbook and Booking route modules remain server-rendered. Header/footer markup, service/lookbook content and existing links remain unchanged. No new images, stock photography, illustrations or decorative icons were introduced. Small photographs are never scaled by animation; the silk-press portrait remains capped at 240px and loc retwist remains text-only.

## Motion implementation

- **Hero:** heading 550ms, support 450ms at +80ms, actions 450ms at +160ms and photograph 650ms at +40ms. Restrained fade/upward travel only; no enlarged photography, split-letter effects or bouncing.
- **Selective scroll entry:** philosophy, Services introduction/photo, featured Lookbook, studio approach, booking introduction and final CTA. A 500ms entry with 70ms grouping, 8px mobile / 16px desktop travel. Individual paragraphs and dividers are not animated.
- **Services and Lookbook:** CSS opacity feedback on fine pointer devices. Gallery action underline strengthens on hover/focus. Native gallery filtering and lightbox changes remain immediate.
- **Booking:** 200ms opacity/4px stage entrance. Validation updates in place and does not restart animation. Focus and state changes are immediate; all previous choices remain owned by the existing reducer.
- **Navigation:** native dialog open/close semantics with 220ms opacity/16px movement; progressive `@starting-style`, display and overlay transitions. No delayed-close timer or animation-dependent focus handling.

`useGSAP` scopes targets to the homepage wrapper and owns cleanup. ScrollTrigger and the React hook are registered once. `gsap.matchMedia` applies responsive travel and skips/reverts decorative effects for reduced motion. Deferred entry callbacks are registered with the media context, so their tweens are collected too. Context cleanup removes timelines/triggers when Next.js hides cached pages or unmounts them. Completed entrances are remembered by refs to avoid unnecessary repetition on cached restoration.

Only opacity and transforms are animated. No pinned sections, scrub, scroll interception, continuous loops, image enlargement or layout-property animation. Font readiness refreshes trigger geometry, with a cleanup guard on that asynchronous callback.

This follows the official [GSAP React guidance](https://gsap.com/resources/React/) and [matchMedia lifecycle guidance](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

## Accessibility, resilience and performance

- Server markup starts fully visible. There are no pre-hidden off-screen blocks or essential animation gates.
- Entry starting styles are applied only when the corresponding section enters. Even an interrupted fade never starts at zero opacity.
- If hero hydration occurs more than 250ms after first contentful paint, it skips the entrance rather than fading already-read text backward. A 1200ms chunk-delay test verified this safeguard; a separate normal-load trace verified the heading actually animates on timely hydration.
- Reduced motion creates zero ScrollTriggers, removes CSS movement and preserves immediate controls. Changing the preference live reverts active JS styles/triggers.
- Keyboard focus, menu Escape/focus trapping, lightbox keyboard/Escape behavior, associated errors and booking focus management pass regression checks.
- Observed layout-shift scores were **0** in the recorded production samples across routes/widths. This is a lab observation, not a claim about field performance.
- The homepage motion chunk measures 116,409 bytes raw / 45,200 bytes gzip, including GSAP, ScrollTrigger, the React integration and the wrapper. No all-plugin bundle or additional animation framework is imported. See `source-and-bundle-check.json`.

## Verification results

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass, no warnings |
| `pnpm exec tsc --noEmit` | Pass |
| `pnpm build` | Pass; all four routes remain statically generated |
| `git diff --check` | Pass |
| All four routes at 320, 390, 768, 1440px | Pass; images decode and no horizontal overflow |
| Hero completion and scroll-group order | Pass; inline motion properties clear after completion |
| Mobile menu keyboard, focus loop, Escape, route navigation | Pass |
| Gallery category/search/reset, empty state, lightbox keyboard/Escape, booking handoff | Pass |
| All six Services booking links | Pass; correct service preselected |
| Full booking/back/edit/reset regression at all four widths | Pass |
| Invalid/empty/duplicate query parameters and missing fields | Pass |
| Past/impossible date handling and UTC−8 / UTC+14 local-calendar checks | Pass |
| No network/storage writes from completion | Pass |
| Repeated client route navigation / ScrollTrigger cleanup | Pass; zero triggers after leaving Home, at most six after restoration |
| Live and initial reduced motion | Pass |
| No JavaScript | Static titles/information remain visible on all routes; Booking explains its JavaScript requirement |
| Console/hydration errors | None in completed production suites |
| Browser recording | Captured actual browser frames to WebM; playback verified at 960×600 |

The main responsive suite and remaining lifecycle assertions were executed against the same final production build. A strict locator in the harness initially matched both header/footer home links; it was scoped to the header before rerunning the lifecycle checks. Final results are `test-results.json`; the full standalone harness includes that correction.

Lifecycle diagnostics expose the existing GSAP references only in an intercepted browser-test response. No diagnostic global is shipped in application source. Tests confirm actual ScrollTrigger counts rather than inferring cleanup solely from screenshots.

Further records: `booking-regression/test-results.json`, `late-hydration.json`, `hero-entrance.json`, `recording-results.json`, `source-and-bundle-check.json`.

Re-run the standalone suite with an existing Playwright installation:

```bash
ORI_QA_URL=http://localhost:3016 PLAYWRIGHT_MODULE=/path/to/playwright node artifacts/milestone-4/qa.mjs
```

Chrome/Playwright was available. Safari, Firefox, real devices and a screen reader were not tested. Browsers without discrete dialog-transition support keep the native menu behavior with simpler visual transitions.

## Screenshots and recording

| Route | Mobile | Desktop |
| --- | --- | --- |
| Homepage | [390px](final/home-390.png) | [1440px](final/home-1440.png) |
| Services | [390px](final/services-390.png) | [1440px](final/services-1440.png) |
| Lookbook | [390px](final/lookbook-390.png) | [1440px](final/lookbook-1440.png) |
| Booking | [390px](final/book-390.png) | [1440px](final/book-1440.png) |

Also captured all routes at 320/768px in `final/`, all five booking stages at all four widths in `booking-regression/`, and the delayed-hydration state. Baseline captures are in `baseline/`.

[Actual browser motion recording — WebM](motion-demo.webm). This is QA footage of the fictional concept, not a Remotion promotional deliverable.

## Final design-taste critique

No new direction was drawn. The existing approved photographic editorial direction was retained; no palettes, typefaces, assets or content were swapped to satisfy generic house-style preferences.

ROUND 1
Seen in one second: An African beauty editorial with a clear service journey and warm, consistent photography.
Idea (one sentence): Hair has its own rhythm; the interface should give the photographs and decisions space.
Live thing: Working service links, filtered gallery/native lightbox and a local-only booking preview.
Layout words by section: hero=42/58 / philosophy=offset text/still-life / services=editorial rows / gallery=asymmetric / approach=numbered text / booking=guided form / footer=quiet close.
Scores: design 7.5 · usability 8 · creativity 7 · content 8 → 7.6 before generic house-style caps; 6.5 with the skill's approved-brand caps.
Caps applied: Approved eyebrows, numbering, hairline rules and italic emphasis. The binding project specification explicitly keeps those devices.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Illustrated service rows do not share the 5:7 tracks used by surrounding rows (`baseline/services-1440.png`): aligned their tracks, preserving photograph caps and service associations.
2. Gallery category labels compete with style titles and wrap heavily in narrow portrait columns (`baseline/lookbook-390.png`): moved secondary categories to the approved 14px label token; retained 16px actions/body copy.
3. Menu and booking stage replacement feel abrupt against the editorial pace (`baseline/book-390.png`, native interaction audit): added short CSS entrances and progressive native menu entry/exit; preserved immediate focus/errors.

ROUND 2
Seen in one second: The same approved visual identity, with a more consistent catalogue and restrained, purposeful movement.
Idea (one sentence): Photographs introduce the texture; movement quietly guides attention through the existing story and choices.
Live thing: Hero sequence, selective entrances and intact navigation/gallery/booking interactions.
Layout words by section: hero=unchanged asymmetry / catalogue=aligned editorial tracks / gallery=quiet labels / form=immediate steps / menu=native drawer.
Scores: design 8 · usability 8.5 · creativity 7 · content 8 → 8.0 before generic house-style caps; 6.5 with the same approved-brand caps.
Caps applied: Same approved-brand exceptions. These are not proposed deviations from DESIGN.md, nor reasons to redesign the site.
Top three remaining considerations, each tied to the reviewed screenshots and disposition:
1. Small generated lookbook crops constrain portrait scale (`final/lookbook-1440.png`): retain compact sizes and whitespace; enlarging them would violate the manifest. Higher-resolution replacements require separate asset approval.
2. Six readable service choices make Booking's first stage long at 320px (`final/book-320.png`): preserve accessible touch targets and category grouping rather than compressing the controls or adding scope.
3. Native date and dialog transition rendering varies by browser (`booking-regression/book-date-390.png` and interaction audit): preserve native semantics, written date review and reduced-motion fallbacks; Safari/Firefox visual confirmation remains unperformed.

No remaining issue justified a new layout, image replacement or feature in this milestone. All four final inspector reports show **0 FAIL / 0 WARN with documented project allowances**:

- `.taste-skill/milestone-4-home-approved`
- `.taste-skill/milestone-4-services`
- `.taste-skill/milestone-4-lookbook`
- `.taste-skill/milestone-4-book`

Allowances retain approved palette/type devices, semantic row structures and smaller secondary labels. Home's `still-page` threshold asks for more continuous/decorative motion than MOTION.md permits; it was explicitly allowed after verifying selective entry effects, not addressed by adding loops or animating every element. The “card rows” heuristic identifies native service/approach rows, not added cards. Booking deliberately has no photography. All inspector-listed final screenshots and desktop/mobile route captures were opened and visually reviewed.

Measured Services typography/palette are unchanged before/after: H1 97.9px desktop / 48px mobile, 2 lines, body 16px/1.6, Instrument Serif + Manrope, ivory/forest. The improvements are alignment and state feedback rather than a rebrand.

## Scope, deviations and remaining issues

Milestone 4 acceptance criteria are met: cohesive stable layouts, selective motion, reduced-motion resilience, preserved interaction paths and no measured severe layout shifts or unwanted effects. No design-system deviations or known blocking issues remain. The asset limitations and browser coverage limits above remain explicit. Dedicated flat-twist and loc-retwist photographs are still missing from the approved library; those service entries remain text-only, as documented in the asset manifest. No later milestone was started.
