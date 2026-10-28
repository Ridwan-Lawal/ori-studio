# Milestone 3 — Interactive Booking Experience

Implemented `/book` only, plus a necessary Lookbook navigation fix: links leaving the native detail dialog close it before navigation. Without this, Next.js retained the dialog in a cached route and it blocked keyboard access to the booking page. No completed page was redesigned.

## Files created

- `src/content/booking.ts`: typed stages, time preferences and exact approved demo messages.
- `src/lib/booking-state.ts`: typed state, reducer, finite service-parameter validation and actionable field validation.
- `src/lib/booking-date.ts`: local calendar day, strict calendar/leap-year validation and timezone-safe display formatting.
- `src/hooks/use-local-date.ts`: hydration-safe browser-local date subscription; refreshes on focus, visibility changes and each minute.
- `src/components/booking/booking-flow.tsx`: form orchestration, progress, focus management, completion and reset.
- `src/components/booking/booking-progress.tsx`: four labeled, semantic progress states.
- `src/components/booking/booking-query.tsx`: validated URL preselection within Suspense.
- `src/components/booking/booking-steps.tsx`: grouped service radios, native date input, time preferences and editable review.
- `src/components/booking/booking.module.css`: scoped editorial layout, responsive controls and interaction feedback.

## Files modified

- `src/app/book/page.tsx`: replaces the shell with approved introduction, disclosures, metadata and booking preview.
- `src/components/lookbook-gallery.tsx`: closes the detail dialog on internal navigation, preserving its existing content and visuals.
- `docs/CONTENT.md`: documents supporting interface copy, illustrative preferences and reset/referral behavior.
- `README.md`: updates milestone status and verification reference.
- This report, JSON verification records and screenshots under `artifacts/milestone-3/`; design-skill inspection records under `.taste-skill/milestone-3*`.

No dependencies installed. No images added or changed. No API, database, persistence, personal information, real availability, submission or advanced motion.

## State and validation

One typed reducer owns the active step, all three preferences, field error and focus intent. The existing six services are reused. Only exactly one known service slug is accepted; missing parameters leave selection empty, while invalid/empty/duplicate parameters add a neutral notice without echoing their contents.

Continue remains operable so an incomplete selection can produce an actionable error; invalid input cannot progress. Radios, fieldsets, legends, explicit labels, associated error messages and native date semantics are used. Errors are announced and focus the affected control. Successful transitions and review edits focus the stage heading. Native radio keyboard behavior and global visible focus styles are preserved.

The date minimum is established in the browser after hydration, avoiding the server timezone. Every advance and final completion validates against a freshly read local date. Strict calendar validation covers impossible dates and leap years. Date labels use calendar-safe UTC formatting, never UTC to determine today. Earlier valid selections survive backward navigation and edits.

Start again clears all preferences, including an initially preselected service. No draft choices are written to the URL. Reloading an incoming referral URL can preselect that original service again; it does not restore date/time preferences. Completion uses the exact approved message and states explicitly that no appointment was created or selections saved/transmitted by that action.

## Verification

Final production build:

- `pnpm lint`: passed, no warnings.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed; `/book` remains statically generated with a Suspense-isolated query reader.
- `git diff --check`: passed.
- Pure reducer/calendar checks: passed valid/leap dates, impossible dates, invalid time preferences, stale-date revalidation and full reset.
- Playwright/Chrome against the production server: full journey at **320, 390, 768 and 1440px**, missing-service/date/time errors, past-date rejection, focus placement, keyboard radio selection, backward preservation, all review edit actions, completion and reset.
- All six real Services links tested with keyboard navigation into the correct service preselection.
- Missing, unknown, empty, duplicate and encoded invalid service parameters tested.
- UTC−8 and UTC+14 browser contexts tested near the UTC day boundary, including correct summary date and rejection when a selected date becomes past before completion.
- Reduced-motion interaction transitions disabled.
- No horizontal overflow or console/hydration errors in the four-width flow suite.
- Completion emitted zero network requests after the page settled. Local and session storage stayed empty.
- Lookbook-to-booking handoff, Enter/Tab access, current-step semantics, clearing initial preselection and non-persistence on reload tested separately; see `extra-results.json`.
- Source hashes verify unchanged homepage, Services/Lookbook route markup, global styling/layout/header/footer, service/lookbook data and dependency files. The deliberate Lookbook dialog handler fix is listed separately above.

Results: `test-results.json`, `extra-results.json`, `unchanged-results.json`.

Browser testing used installed Chrome through Playwright; Firefox, Safari, real devices and a screen reader were not available in this run. Native date-picker presentation can vary by browser.

## Screenshots

Twenty full-page captures: `book-{stage}-{width}.png`, where stage is `service`, `date`, `time`, `review` or `complete`, and width is `320`, `390`, `768` or `1440`.

| Stage | Mobile | Desktop |
| --- | --- | --- |
| Service | [390px](book-service-390.png) | [1440px](book-service-1440.png) |
| Preferred date | [390px](book-date-390.png) | [1440px](book-date-1440.png) |
| Preferred time | [390px](book-time-390.png) | [1440px](book-time-1440.png) |
| Review | [390px](book-review-390.png) | [1440px](book-review-1440.png) |
| Demo complete | [390px](book-complete-390.png) | [1440px](book-complete-1440.png) |

## Design-taste review

`DESIGN.md` remains authoritative. No new direction, fonts, palette, imagery or ornamental UI was introduced. The booking interface is intentionally typographic and functional, rather than a photography-led marketing page.

ROUND 1
Seen in one second: An editorial booking preview with a visible fictional-concept disclosure.
Idea (one sentence): Make space for a considered choice through quiet typography and a readable sequence of preferences.
Live thing: Native controls, service selection, stateful progress, validation and editable review.
Layout words by section: introduction=editorial split / progress=four labeled positions / form=grouped text rows / context=forest field / footer=existing brand.
Scores: design 6.5 · usability 8 · creativity 6.5 · content 8 → overall 6.5 after marketing-page caps.
Caps applied: Approved eyebrows, numbering and rules; no photographs or footage, as appropriate to a booking form. These generic marketing-page caps do not justify overriding the approved form design.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Service/time descriptions were unnecessarily small (`book-service-390.png`, initial review): increased to the 16px body step.
2. Programmatic heading focus suppressed the global focus outline: removed that suppression and retained visible focus.
3. The completion reset button stretched across the desktop form due to a scoped selector mismatch (`book-complete-1440.png`, intermediate review): corrected the selector to preserve content-sized alignment.

ROUND 2
Seen in one second: A clear, honest preview with large editorial type and readable form options.
Idea (one sentence): The approved salon identity carries through a calm, local-only request preview.
Live thing: Service/date/time controls, four-step progress, review edits, error feedback and reset.
Layout words by section: introduction=editorial split / progress=labeled rule / selection=category rows / review=definition list / completion=explicit demo state.
Scores: design 6.5 · usability 8.5 · creativity 6.5 · content 8 → overall 6.5 after the same generic marketing-page caps.
Caps applied: Same approved-brand/form exceptions. No attempt to raise the score by adding unnecessary photography, video, animation or new brand treatments.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No remaining blocking visual defect in the reviewed desktop/mobile stages.
2. Six grouped service options create a longer first step on 320px; retained readable touch targets and clear categories rather than compressing the controls.
3. The native date control follows the browser locale; its explicit label and calendar-safe written review preserve clarity.

The automated inspector initially reported body-size because the frequent category labels, navigation, disclosures and footer are 14px. Running form instructions/descriptions are 16px, titles 18px+, while the smaller labels/disclosures follow the approved small-text token. The body-size allowance records that distinction; shared approved typography was not rewritten.

Final initial-state inspector: **0 FAIL / 0 WARN with documented allowances** (`.taste-skill/milestone-3-approved/report.json`). Allowances cover approved ivory, eyebrows, rules, numbering, small labels/body-size classification, image-free form, no footage/decorative motion, and the inspector's heuristic off-centre measurement. The actual shared container edges are aligned and full-page screenshots show no horizontal overflow. Screenshots from the inspector and all five mobile/desktop flow stages were visually reviewed.

## Acceptance and remaining work

Milestone 3 requirements are met. No known blocking functional or visual issue remains. No later milestone, real booking submission, backend, payments, deployment or advanced motion was implemented.
