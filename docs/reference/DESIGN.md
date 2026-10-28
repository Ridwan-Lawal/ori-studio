# ORÍ Studio — Design System & Art Direction

**Version:** 1.0 (planning specification)  
**Status:** Ready for visual validation and implementation; not a claim of shipped UI  
**Project:** Fictional premium natural-hair salon, Lagos concept  
**Audience:** Prospective salon customers and business owners viewing the portfolio showcase  
**Related documents:** `PRODUCT_BRIEF.md`, `USER_JOURNEY.md`, `MVP_SCOPE.md`, `CONTENT.md`, `MOTION.md`, `AGENTS.md` (to be created or synchronized in later stages)

## 1. Design intent

**Positioning:** *A contemporary African hair editorial made usable as a salon website.* The result should feel bespoke, warm, confident and photography-led, with clear customer journeys—not a generic SaaS landing page, template marketplace demo, or animation showcase.

**Core design principles**
1. Lead with authentic hair texture and strong editorial photography.
2. Give each section one communication job; remove decorative content that does not help it.
3. Prioritize readable information, practical navigation, and a coherent booking-request demo.
4. Establish consistency using centralized tokens, reusable primitives, and limited variants.
5. Design mobile intentionally; do not merely shrink desktop compositions.
6. Present the business as a **fictional, self-initiated portfolio concept**; never suggest real bookings, testimonials, staff, appointments, or locations.

**Avoid:** gradients as default backgrounds, glowing blobs, glass cards, generic icon grids, identical three-card patterns, arbitrarily rounded every surface, excessive shadows, filler statistics, fake reviews, random scroll animations, generated nonsense text, and illegible small type.

## 2. Identity and content voice

- **Working name:** ORÍ Studio (name is not cleared for commercial use).
- **Category:** Premium natural-hair salon concept.
- **Voice:** Warm, specific, contemporary, minimal; no inflated claims.
- **Hero eyebrow:** `TEXTURE-LED HAIRCARE`.
- **Hero headline:** `Hair deserves its own rhythm.`
- **Hero support:** `Texture-led care, considered styling, and time well spent in the chair.`
- **Primary hero CTA:** `Explore services` → `/services`.
- **Secondary hero CTA:** `View the lookbook` → `/lookbook`.
- **Global booking CTA:** `Try booking` → `/book` (explicit demo disclosure on booking page).
- **Concept disclosure:** `ORÍ Studio is a fictional portfolio concept. No real appointments are accepted.` This must be visible at least on `/book` and in the footer.
- **No invented proof:** Do not make up review counts, ratings, founder names, awards, press logos, addresses, prices presented as factual, or availability.

## 3. Color design tokens

Use semantic custom properties, not scattered raw hex colors. Colors below are the approved working palette.

| Token | Value | Intended use |
|---|---|---|
| `--color-forest` | `#20382E` | Primary dark backgrounds, solid buttons, dark headings in selected compositions |
| `--color-ivory` | `#F3EFE7` | Main page canvas, text on forest |
| `--color-ink` | `#1F231E` | Body and primary content text on ivory |
| `--color-muted-ink` | `#586357` | Secondary text on ivory |
| `--color-clay` | `#B05D42` | Decorative accents, large labels only where accessible |
| `--color-clay-text` | `#91432D` | Accessible small accent text on ivory |
| `--color-sage` | `#B7C0AD` | Non-text decorative surfaces and muted text on forest |
| `--color-surface` | `#EEE8DD` | Soft secondary surface against ivory |
| `--color-border` | `#C5CBBF` | Subtle borders on ivory, not textual information |
| `--color-white` | `#FFFFFF` | Utility / permitted white text where contrast is suitable |

**Measured WCAG contrast guidance**
- Forest `#20382E` on ivory `#F3EFE7`: approximately **10.99:1**.
- Ink `#1F231E` on ivory: approximately **13.9:1**.
- Muted ink `#586357` on ivory: approximately **5.49:1**.
- Clay text `#91432D` on ivory: approximately **6.01:1**.
- Sage `#B7C0AD` on forest: approximately **6.69:1**.
- Clay `#B05D42` on ivory: approximately **4.08:1**, so **do not use clay for normal-sized text on ivory**. Use `--color-clay-text` for such text.
- Sage on ivory is insufficient for text; reserve it for non-text surfaces/dividers.

Contrast must be rechecked whenever a new color combination is introduced. Don't communicate a status using color alone.

**Semantic pairings:** Main canvas ivory/ink; dark editorial panels forest/ivory; button forest/ivory; fine accents clay-text/ivory; border on ivory border/ivory. Do not add unrelated accent colors.

### Example token map (adapt for Tailwind theme tokens)

```css
:root {
  --color-forest: #20382e;
  --color-ivory: #f3efe7;
  --color-ink: #1f231e;
  --color-muted-ink: #586357;
  --color-clay: #b05d42;
  --color-clay-text: #91432d;
  --color-sage: #b7c0ad;
  --color-surface: #eee8dd;
  --color-border: #c5cbbf;
  --color-white: #ffffff;
  --radius-control: 6px;
  --container-max: 1320px;
  --section-space: clamp(72px, 9vw, 144px);
  --site-gutter: clamp(20px, 4.5vw, 72px);
}
```

## 4. Typography

**Heading font:** Instrument Serif (editorial, elegant), regular/italic.  
**Body/UI font:** Manrope, normal weights 400/500/600/700.  
Use `next/font/google` with local font optimization when implementing in Next.js, subject to availability; keep sensible fallback font stacks.

| Role | Desktop / fluid target | Mobile floor | Line height | Treatment |
|---|---|---|---|---|
| Display / hero | `clamp(3rem, 6.8vw, 7.25rem)` | 48px | 0.96–1.0 | Instrument Serif, optional italic fragments, -0.025em tracking |
| Section title | `clamp(2.5rem, 5vw, 5.5rem)` | 40px | 1.03 | Instrument Serif, sentence case |
| Subsection heading | `clamp(1.75rem, 3vw, 3rem)` | 28px | 1.12 | Instrument Serif |
| Body | `1rem` | 16px | 1.6 | Manrope regular |
| Large intro | `clamp(1.125rem, 1.6vw, 1.375rem)` | 18px | 1.5 | Manrope regular |
| Small/help text | `0.875rem` | 14px | 1.5 | Manrope medium |
| Eyebrow / overline | `0.75rem` | 12px | 1.3 | Manrope semibold, 0.1–0.15em tracking |

- Do not use all-caps paragraphs. Use all caps primarily for eyebrows and miniature navigation details.
- Limit body copy to a comfortable `60–72ch` measure; hero supporting copy to about `34–45ch`.
- Avoid single-word orphan headline lines and clipping of italic serif descenders.
- Avoid text over busy photography unless a deliberate legible overlay is validated on multiple crops.

## 5. Layout, sizing, and responsive rules

- **Max content width:** 1320px, excluding full-bleed photographic sections.
- **Gutter:** `clamp(20px, 4.5vw, 72px)`; reduce to 16px only if the 320px layout requires it.
- **Grid:** conceptual 12 columns desktop ≥1024px; 8 columns tablet 768–1023px; 4 columns mobile <768px.
- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128; use 8px-related increments for most spacing.
- **Section vertical spacing:** `clamp(72px, 9vw, 144px)`; editorial full-bleed exceptions need a clear reason.
- **Buttons/forms:** at least 44px high, preferably 48–52px; visible focus rings.
- **Corners:** keep photos typically squared or minimally rounded; interactive controls 6px; avoid ubiquitous 20–30px radii.
- **Shadow:** minimal; default to borders and contrast instead of floating cards.
- **Breakpoints for QA:** 320, 390, 768, 1024, 1440px; test 1920px for line lengths and stretched compositions.

### Desktop-specific

- Hero: approximate 42% text + 58% photography. Navigation is one line when space permits.
- Services: editorial vertical listing and one supporting image, not three equal cards.
- Lookbook: asymmetric photo geometry with deliberate white space and different aspect ratios.
- Section numbers: small overlines to establish sequence, used sparingly.

### Mobile-specific

- Header: compact wordmark + accessible menu button; no horizontal overflow.
- Hero: headline and CTA precede full-width portrait; crop preserves hairstyle as the focal point.
- Content: one-column editorial flow; no small text or hard-to-hit links.
- Services: individual rows with category and clear next action.
- Lookbook: alternating 1-column and 2-column groupings only if images remain legible.
- Booking: full-width field controls; progress clearly identified, usable at 320px.

## 6. Page composition and content contract

### Home `/`
1. **Header:** ORÍ Studio wordmark; Services, Lookbook, Our Approach (anchor), Try booking.
2. **Hero:** eyebrow, headline, supporting copy, primary/secondary CTAs, portrait image.
3. **Philosophy:** editorial typography; `Good hair begins with good care.`
4. **Signature services:** knotless braids, wash & define, loc retwist; link to all services.
5. **Lookbook teaser:** dark forest section with three strong photos and a link to the full gallery.
6. **Approach:** Understand → Care → Create using numbered rows, not icon cards.
7. **Booking introduction:** explain the demonstration customer journey clearly.
8. **FAQs:** relevant non-fictional statements and demo limitations.
9. **Final CTA and footer:** explore appointment flow; persistent concept disclosure.

### Services `/services`
- Intro line: `Care for every chapter of your hair.`
- Six services in categories: protective styling (knotless braids, flat twists), care (deep conditioning, wash & define), maintenance (silk press, loc retwist).
- Each: title, category, clear description, optional indicative duration and **illustrative** price, relevant image, route to booking preview.
- No fictional staff schedules, fake guarantees, or unsupported medical claims.

### Lookbook `/lookbook`
- Intro line: `Find your next expression.`
- Curated gallery of roughly 8–10 approved photographs with title, category and relevant service link when applicable.
- Filters or category chips must update the gallery and provide a meaningful empty state.
- Optional lightbox must support Escape, keyboard focus and dismissal.

### Book `/book`
- Intro line: `Make time for your hair.`
- Four stages: choose service → preferred date → preferred time → review.
- Support preselection via URL query param from the service and lookbook.
- Date picker blocks past dates; example times are **preferences, not live availability**.
- No personal data collection in the public demo. Do not send appointment requests or claim success.
- Completion wording: `Demo complete — this was a preview. No appointment was booked.`
- Offer restart and navigation back to services.

## 7. Components: specs and behavior

| Component | Structural style | Required states |
|---|---|---|
| Header | Clean editorial horizontal navigation; mobile drawer | Default, scrolled if needed, open, keyboard focus, escape-close |
| Button | Primary forest / ivory; text-link secondary; no decorative bloat | Default, hover, focus-visible, disabled, loading if needed |
| SectionHeading | Eyebrow + serif title + optional concise intro | Responsive wrap, light/dark surfaces |
| ServiceRow | Number / name / category / arrow; image accompaniment on desktop | Hover, focus, selected/preselected |
| GalleryItem | Optimized photograph with concise title/category | Hover, focus, opened lightbox where implemented |
| FAQ | Semantic disclosure/accordion | Closed, open, focus, keyboard operability |
| BookingProgress | Four steps, labels and current-step indicator | Completed, current, upcoming |
| FormControl | Clear labels and helper text; outline rather than heavy shadows | Default, focus, invalid, disabled |
| DemoDisclosure | Small but visible persistent content | Always visible where claim of booking might be inferred |
| Footer | Navigation + concept/author attribution | Responsive, readable link focus |

**21st.dev rule:** It is a *discovery source*, not the source of truth. Only import/adapt a component after checking semantics, licenses, dependencies, accessibility, visual consistency, and whether a simpler local implementation is more maintainable. Do not bring in unrelated styles or heavy dependencies.

## 8. Image and asset art direction

- Prefer photography of Black textured hair, braids, protective styling, natural-hair details, and natural-light salon spaces, consistent with the concept and audience.
- Hero portrait: 4:5; ensure enough safe space for crop at 390px width.
- Services: 3:4 or 4:5 photographs with meaningful category relationship.
- Lookbook: 3:4, 4:5 and 1:1 mix, deliberate crop rhythm; never distort images.
- Use **licensed photographs** or intentionally created original images; maintain `PHOTO-CREDITS.md` with source URL, creator, license and attribution requirements.
- Never misrepresent a found stock image as a photo of a real ORÍ Studio client or location.
- Implement using `next/image` with accurate `sizes`, meaningful alt attributes, and optimized modern formats where possible.
- Critical hero media should load early; lower-page media should load lazily. Avoid large blocking videos for hero.

## 9. Motion design (website)

**Purpose:** reinforce hierarchy and feedback; never animation for its own sake.

| Interaction | Intent | Suggested timing |
|---|---|---|
| Hero introduction | Headline enters once, image settles gently; no dramatic parallax | 500–700ms |
| Navigation/menu | Clear open/close movement and fade | 180–260ms |
| Buttons/links | Small color/underline emphasis | 120–180ms |
| Service change | Modest image fade or crossfade without layout shifts | 200–350ms |
| Gallery reveal | Small stagger once on entry, or none on weaker hardware | 300–500ms |
| Booking stage change | Directional/fade transition, preserving focus | 180–280ms |
| FAQ | Expand without jumpy scroll behavior | 160–240ms |

- `prefers-reduced-motion: reduce`: remove nonessential transitions and transforms; preserve state changes without movement.
- Avoid scroll-jacking, repeated trigger flicker, giant pinned sections, and looping 3D effects.
- Prioritize CSS for basic transitions; add **GSAP selectively** for complex choreography. Do not use both GSAP and Motion for the same behavior.
- **Remotion is for the promotional video deliverable**, not the website runtime. Build the 9:16 video only after the site is demonstrably working.

## 10. Accessibility, quality and performance

- Page structure uses semantic heading levels, navigation landmarks, and logical tab order.
- Every interactive control must be keyboard accessible with obvious focus-visible treatment.
- Minimum target size 44×44px where practical; no icon-only actions without labels.
- Meet WCAG AA text contrast for actual displayed pairs; check overlays and component states, not just palette swatches.
- Images: useful alt text for content imagery; `alt=""` for purely decorative assets.
- No horizontal scrolling at 320, 390, 768, 1024 or 1440px.
- Booking: useful errors, preserve values on back/forward, and no false assertion of a real booking.
- Check color-scheme consistency, screen reader announcements where content updates, and `aria-current` on current step where applicable.
- Avoid main-thread-heavy effects and layout shifts. Consider Lighthouse and Playwright test/visual screenshots, with human review before release.

## 11. Visual QA checklist (before each sign-off)

- [ ] Hero communicates the studio proposition in under five seconds.
- [ ] Typography reads like an editorial brand, not a default theme.
- [ ] Photography is coherent in lighting, style, subject, license, and crop.
- [ ] Brand colors stay within tokens and contrast pairings.
- [ ] Sections are distinct without unrelated backgrounds or excess cards.
- [ ] The primary CTA is obvious and functional on desktop and mobile.
- [ ] Mobile at 320px and 390px looks designed, not merely resized.
- [ ] Header, forms, FAQ, service selection, and galleries work with keyboard.
- [ ] Loading, empty, error, invalid, and demo-complete states are meaningful.
- [ ] Reduced motion functions and nothing vital relies on animation.
- [ ] No fake trust signals, real booking claims, or unapproved content.
- [ ] Final results are captured as desktop and mobile screenshots for review.

## 12. Codex implementation contract

1. Read `docs/DESIGN.md` and the product brief before writing UI code.
2. Do not reinterpret the brand, page order, copy, or design tokens without explaining a necessary change.
3. Begin with design tokens and reusable primitives; implement one page/section batch at a time.
4. Keep server and client component boundaries deliberate in Next.js App Router.
5. Reuse components rather than generate minor duplicates.
6. Do not install 21st.dev components automatically; propose and justify any external addition.
7. Implement accessible behavior for motion, menus, lightboxes, and booking controls.
8. After each feature batch: run lint/typechecks/tests as applicable; capture desktop and mobile screenshots; compare against this specification.
9. Stop at the end of the assigned milestone; summarize changes, limitations and remaining issues.
10. Never present this fictional salon site as completed client work.

## 13. Decisions still requiring asset-level review

- Final approved hero and lookbook photographs, their license and credits.
- Whether any service prices/durations should appear and, if so, the illustrative amounts.
- Typography optical refinements after actual font rendering.
- How much hero movement improves the design after real browser testing.
- Final iconography and whether a lightbox is necessary for the lookbook.

**Next workflow phase:** Prepare project scaffolding and `AGENTS.md`; ensure Codex and installed skills consume this design document as the governing visual specification.
