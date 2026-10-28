# ORÍ Studio — Codex Project Instructions

## Project identity
ORÍ Studio is a fictional, self-initiated portfolio concept for a premium natural-hair salon in Lagos, Nigeria. It is **not** a real business or a commissioned client project. The website demonstrates how a salon can present services, inspire style choices, and let visitors preview a booking request.

## Read before every implementation milestone
1. `docs/PRODUCT_BRIEF.md` — audience, problem, goals, honest representation.
2. `docs/MVP_SCOPE.md` — routes, features, acceptance criteria, out-of-scope boundaries.
3. `docs/DESIGN.md` — binding art direction, tokens, components, imagery, accessibility.
4. `docs/CONTENT.md` — approved copy, labels, data and disclaimers.
5. `docs/USER_JOURNEY.md` — navigation and interaction requirements.
6. `docs/MOTION.md` — permissible motion, reduced-motion behavior.
7. `docs/BUILD_PLAN.md` — milestones and stop conditions.

If guidance conflicts, stop and report the conflict instead of silently guessing. `docs/DESIGN.md` governs visual decisions; `docs/MVP_SCOPE.md` governs feature scope; `docs/CONTENT.md` governs copy. Suggest proposed edits to those documents before changing approved decisions.

## Stack and organization
- Next.js App Router, TypeScript, Tailwind CSS; use `src/app` and `@/*` import alias.
- Prefer React Server Components for static content and client components only when interactions require them.
- Use semantic HTML and accessible primitives before introducing new dependencies.
- Keep service and lookbook content in typed modules under `src/content/`; use reusable UI components under `src/components/`.
- Use `next/image` for images when appropriate; track image rights in `docs/PHOTO-CREDITS.md`.
- Use CSS transitions for basic states; install GSAP only if an approved complex animation benefits from it.
- Use Zod only for genuinely useful runtime form validation; no database, user accounts, payments or appointment API in the MVP.

## Design rules: no generic AI templates
- Respect exact design colors, font pairing (Instrument Serif / Manrope), visual hierarchy, spacing and mobile constraints in `docs/DESIGN.md`.
- Editorial photography and strong typography are the visual identity. No default purple gradients, glow blobs, glassmorphism, arbitrary decorative icons, massive corner radii, repetitive card grids, or unapproved colors.
- Never replace approved copy with marketing filler or fabricated statistics.
- Integrate the Leonxlnx design skill as a visual-review assistant, **not** as an authority to override `DESIGN.md`.
- 21st.dev is optional. Before adding any external component: identify why it is needed, inspect source/license/dependencies, assess keyboard and screen-reader behavior, and adapt it to our tokens. Don't install components merely for decoration.
- Remotion belongs to the later social-video deliverable, not this website's runtime.

## Honest concept requirements
- Footer must visibly state: `ORÍ Studio is a fictional portfolio concept. No real appointments are accepted.`
- On `/book`, show the same statement visibly **before** beginning the interaction and near its ending.
- The booking experience is a **non-submitting preview**. Never collect names, emails, phone numbers or other personal data. No network booking requests, no real calendar integration, no 'confirmed' status.
- Date/time fields are preferred dates and times, not real availability.
- Final completion text: `Demo complete — this was a preview. No appointment was booked.`
- No invented client testimonials, business address, staff biographies, ratings, awards, team images, actual salon prices, or claimed results.
- If prices are not yet approved, omit them rather than invent them. All concept-only content must remain clearly distinguishable from real business facts.

## Required behavior
- Routes: `/`, `/services`, `/lookbook`, `/book`.
- Use sensible metadata and semantic content. All links and calls to action must work.
- From services/lookbook, links into `/book` must preselect a service when a valid service ID is provided.
- Booking steps: service -> preferred date -> preferred time -> review -> non-submitting demo completion.
- Prevent past-date selection; validate invalid/empty selections and preserve valid choices when navigating backward.
- Lookbook filters, if implemented, must work and announce empty results; optional lightbox needs keyboard accessibility and Escape dismissal.
- Mobile navigation must handle open/close, focus, and Escape.
- Respect `prefers-reduced-motion`. No essential interaction may depend on animation.

## Testing and QA
- After each milestone run commands supported by the project, including `pnpm lint` and `pnpm exec tsc --noEmit`; for major milestones also run `pnpm build`.
- Use Playwright for key interaction checks and capture desktop/mobile screenshots at 390px and 1440px; test 320, 768, 1024 and 1920px when relevant.
- Inspect for horizontal overflow, awkward crops, illegible text, missing/error/empty states, broken focus, and console errors. Verify accessible names and keyboard operation.
- Report any checks that could not run; don't claim passing results without execution.

## Operating discipline
- Work on **one milestone** at a time, as assigned. Do not begin the next milestone automatically.
- Before coding, summarize requirements and list files you plan to change.
- Keep scope narrow; do not install unnecessary packages or create unrelated features.
- After changes, report: files changed, commands run, outcomes, screenshots captured, unresolved issues, and the milestone's acceptance criteria.
- Never present this concept as a paying client project.
