# ORÍ Studio — Codex Implementation Milestones

**Protocol:** Assign exactly one milestone per Codex session/task. Request screenshots for visual milestones. Stop after satisfying the acceptance criteria; review before proceeding.

## Milestone 0 — Project foundation (FIRST)
- Inspect the Next.js scaffold, root guidance and design documents.
- Confirm TypeScript, Tailwind, ESLint, `src/` conventions and aliases are functioning.
- Add font loading with Instrument Serif + Manrope and fallbacks.
- Add approved semantic color/spacing/type tokens from `DESIGN.md`.
- Set default metadata, global background, typography, focus-visible styles and container utility.
- Create a minimal shared layout and placeholder route shells for `/`, `/services`, `/lookbook`, `/book` (clearly temporary, no invented content).
- Do **not** build full sections, implement GSAP, integrate external UI libraries or add booking features.
- Acceptance: dev server runs; lint/typecheck/build pass; tokens/fonts visible; no horizontal overflow in shell at 390px and 1440px.

## Milestone 1 — Homepage structure
- Implement header/mobile menu, hero, philosophy, featured services, lookbook preview, approach, booking intro, FAQ, final CTA and footer.
- Use only approved content and licensed/approved images; when assets are missing, use clearly declared temporary layout placeholders and report the blocker.
- Acceptance: meaningful responsive composition; nav/CTAs work; mobile and desktop screenshots checked; disclosure visible.

## Milestone 2 — Services and lookbook
- Implement typed services data and corresponding editorial service views.
- Add photo gallery and accessible filters. Evaluate a 21st.dev component only if there is a clear need and no simpler viable option.
- Acceptance: all service actions and gallery links work; filters and empty state pass; image credits checked.

## Milestone 3 — Booking request preview
- Implement service/date/time/review interaction, safe preselection, in-memory state and demo end state.
- Acceptance: no personal data entry or submission, accurate validation, retained choices, past dates blocked and completion text exact.

## Milestone 4 — Motion and visual critique
- Use Taste Skill for aesthetic audit of the implemented site and screenshot-based revision.
- Add minimal intentional motion, CSS first and GSAP if justified; reduced motion supported.
- Acceptance: stable, cohesive visuals on mobile/desktop; no major layout shifts; no unwanted effects.

## Milestone 5 — QA and deployment
- Run lint, type check, build and Playwright smoke tests, accessibility and keyboard testing, image/license review and performance inspection.
- Deploy to Vercel after review.
- Acceptance: working public link, correct metadata, no broken flows, all concept disclosures in place.

## Milestone 6 — Promotional content (separate effort)
- Create 20–30-second TikTok/Facebook/WhatsApp screen showcases; install Remotion agent skills in the video project, not website runtime.
- Acceptance: actual site footage, vertical 9:16, concept labeling, legible captions, direct CTA to portfolio/contact.
