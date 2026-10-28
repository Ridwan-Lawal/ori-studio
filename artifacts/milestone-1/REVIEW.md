# Milestone 1 — Homepage review

## Scope and files

Implemented `/` only, with shared navigation/footer available on the existing route shells. Services, Lookbook and Booking remain Milestone 0 shells. No booking interaction, gallery filtering, advanced animation or new dependency was introduced.

Changed: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `README.md`.
Created: `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/editorial-image.tsx`, `src/components/section-heading.tsx`, `src/content/home.ts`, `src/content/images.ts`, and review artifacts.

The homepage remains a Server Component. Only the shared header needs client state, for its native modal mobile navigation. FAQ uses native `details`/`summary` with exclusive expansion. The image component reads only `selected_assets` from the approved JSON manifest and uses intrinsic dimensions, focal positions, responsive `sizes` and display-width caps.

## Images

Paths below are relative to `public/images/ori-studio/`.

| Image | Placement | Original dimensions | Display limit |
|---|---|---|---|
| `hero/hero-natural-afro.webp` | 42/58 hero, 4:5 | 1122 × 1402 | 780px |
| `editorial/amber-haircare-still-life.webp` | Small philosophy accent | 306 × 527 | 280px; actual 180–240px |
| `services/knotless-braids.webp` | Signature-services editorial accompaniment | 1122 × 1402 | 700px |
| `lookbook/braided-updo-editorial.webp` | Featured look, 4:5 | 1122 × 1402 | 700px |
| `lookbook/bantu-knots.webp` | Small 3:4 supporting portrait | 295 × 486 | 270px; actual at most 240px |
| `lookbook/defined-curls-daylight.webp` | Landscape supporting look, square on mobile | 758 × 502 | 470px |
| `editorial/salon-interior-wide.webp` | Approach illustration with fictional-interior caption | 829 × 559 | 650px |

The Bantu-knots focal point was adjusted from the suggested `55% 35%` to `55% 0%` after crop inspection, preserving the knots. The manifest explicitly permits manually refined crops. No review-only files, replacement stock imagery, invented model identities or retouched/upscaled images are used. The existing photo-credits register is preserved.

## Executed verification

- `pnpm lint` — passed.
- `pnpm exec tsc --noEmit` — passed.
- `pnpm build` — passed; all four routes prerendered.
- `git diff --check` — passed.
- Playwright with installed Chrome, against the production build — 27 grouped checks passed at 320, 390, 768, 1024, 1440 and 1920px. See `playwright-results.json`.
- At every width: no horizontal overflow, loaded fonts, valid approved-image dimensions and display limits, two-line hero heading, eight homepage sections and the exact footer disclosure.
- FAQ Enter/Space open and close; opening another answer closes the previous answer.
- Mobile menu: initial focus, Tab/Shift+Tab wrapping, Escape, explicit close, focus return, scroll restoration, anchor navigation and route navigation. Also checked tablet backdrop dismissal and closing on desktop resize.
- Every distinct link destination clicked at desktop widths; skip link and reduced motion checked at every width.
- No JavaScript console errors, page errors or failed HTTP responses.
- Measured layout-shift score: 0 in each test viewport. A separate delayed-image check confirmed identical hero-image container geometry before and after loading.
- Taste Skill source lint and production inspector executed; final inspector recorded 0 failures with documented project-specific allowances, and four advisory warnings.

Screenshots: `home-{width}.png` and `hero-{width}.png` for all six widths; `menu-{width}.png` for 320, 390 and 768px. Taste Skill screenshots and measurement reports are in `.taste-skill/final/`.

## Visual critique

The direction draw selected **Photographs at uneven sizes**, seed **1307257144**, as a composition reference. The repository's approved split hero, numbered approach, section order, type and colors take precedence over the dealt blueprints. No dealt stock photographs, scroll scenes or crossfades were used.

Subject inventory: ORÍ wordmark; the exact rhythm headline; natural-afro hero; deep-green draped fabric; warm-earth portrait lighting; amber haircare still life; three signature service categories; textured-hair lookbook; fictional arched-mirror interior; Understand → Care → Create; explicitly non-submitting appointment preview. There is no real address, staff identity, business history or customer result to use as proof.

The page argument follows the approved order: introduce texture-led care with an editorial portrait; explain the care philosophy; identify signature services; offer style inspiration; articulate the approach; explain the appointment preview; answer concept/privacy questions; offer the booking-preview destination and close with the required disclosure.

ROUND 1
Seen in one second: the natural afro and the large serif rhythm headline.
Idea (one sentence): ORÍ's texture-led imagery becomes a sequence of editorial prints, moving from the individual hairstyle to care, style inspiration and the imagined studio.
Live thing: the native FAQ disclosures, supported by the accessible mobile menu; booking remains a link to its shell.
Layout words by section: hero=42/58 split / philosophy=statement with small accent / services=portrait and index / lookbook=asymmetric triptych / approach=numbered sequence / appointment=type-led explanation / FAQ=disclosures / final=invitation.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8, subjective project-specific assessment.
Caps applied: creativity capped at 7 for a familiar editorial approach. Generic caps against approved eyebrows, numbering, colors and restrained motion are not used to override the project specification.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Wide-screen hero title developed a single-word last line at 1920px (`hero-1920.png` before correction). Cap the hero display at 98px inside its fixed-width split composition.
2. Bantu-knots crop clipped the uppermost knots (`home-1440.png` before correction). Refine the focal position upward without stretching the file.
3. Final CTA and footer accumulated excess spacing on the same green field (`home-390.png` before correction). Remove the extra footer top padding while retaining the approved section rhythm.

ROUND 2
Seen in one second: the portrait and a legible, two-line editorial headline.
Idea (one sentence): hairstyle, care and studio imagery retain their editorial rhythm without obscuring the practical routes.
Live thing: usable FAQ disclosures and a keyboard-contained mobile menu.
Layout words by section: hero=split / philosophy=statement / services=index / lookbook=triptych / approach=sequence / appointment=explanation / FAQ=disclosures / final=invitation.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8, subjective project-specific assessment.
Caps applied: as above; this is a critique aid, not an independent jury or accessibility certification.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No remaining visible blocker found in the final desktop, tablet and mobile captures.
2. Compact source imagery limits supporting photographs; keep their documented caps rather than enlarging them in future sections.
3. Service, gallery and booking destinations are intentionally shells until their assigned milestones; no homepage control claims a real appointment is accepted.

## Inspector exceptions and warnings

Explicit exceptions: `eyebrow`, `hairline`, `numbering`, `micro-label`, `small-text`, `still-page`. These correspond to DESIGN.md's 12px overlines, numbered rows, subtle dividers and the user's instruction to reserve advanced motion for a later milestone.

Retained advisory warnings:
- `mixed-font-headline`: Instrument Serif italic emphasis is expressly permitted by DESIGN.md.
- `card-rows`: the detector identifies bordered service/approach lists; these are editorial rows, not boxed card grids.
- `palette-cream`: the exact ivory and surface values are mandatory project tokens.
- `no-footage`: no approved video asset exists; this milestone requests still editorial imagery and lightweight CSS interaction states.

## Differences and limits

No changes to approved palette, font pairing, content order or feature scope. Hero typography has an optical cap of 98px instead of growing to the general display utility's 116px maximum, preserving two lines inside the required 42/58 split on wide screens. This is a deliberate responsive refinement, within the specified display range. FAQ wording and the short approach explanations are derived from the documented concept/privacy limitations and care philosophy; they add no business facts or claimed results.

No remaining Milestone 1 visual blockers. Verification used Chromium; other browser engines and live screen-reader testing were not performed. No later milestone has begun.
