# Milestone 2 — Services & Lookbook

**Services refinement:** the later user-directed composition and copy refinements supersede the service-image placement and customer-facing availability notes below. See `services-refinement/REVIEW.md` for the final Services review and screenshots.

## Scope and changed files

Implemented `/services` and `/lookbook`. The homepage, shared global stylesheet, root layout, header, footer, homepage content and `/book` shell source files are unchanged; SHA-256 baselines are recorded in `unchanged-baseline.json`. Fresh homepage screenshots match Milestone 1 pixel-for-pixel at 390px and 1440px.

Created:
- `src/content/services.ts`: typed categories, six stable service slugs, copy, fictional illustrative durations and booking URL helper.
- `src/content/lookbook.ts`: eight approved looks, category/optional service relationships and filtering.
- `src/components/service-entry.tsx`: semantic service article, duration, photography note and booking CTA.
- `src/components/catalogue-image.tsx`: reusable, accessible missing-image fallback around the existing EditorialImage.
- `src/components/lookbook-gallery.tsx`: category/search filtering, live counts, empty/reset state and native dialog with keyboard navigation.
- `src/components/catalogue.module.css`: scoped catalogue and detail-dialog styles using the approved tokens.

Modified:
- `src/app/services/page.tsx` and `src/app/lookbook/page.tsx`: replace route shells and add route-specific metadata.
- `src/content/images.ts`: extend the approved asset-name union for these pages.
- `src/components/editorial-image.tsx`: optional error callback used only by the new fallback wrapper; original homepage rendering is unchanged.
- `next.config.ts`: exclude `*.module.css` from the existing Tailwind loader's extension rewrite, preserving native Next.js CSS Module processing.
- `docs/CONTENT.md`: record the display names from the explicit Milestone 2 brief and clearly fictional duration examples.
- `README.md`: current implementation and verification notes.

No dependencies were installed or updated. No booking steps, submission, persistence, database, authentication, GSAP, Remotion or deployment were added.

## Services

| Service | Stable slug | Fictional illustrative duration |
|---|---|---|
| Knotless Braids | `knotless-braids` | 4–6 hours |
| Flat Twists | `flat-twists` | 1½–2½ hours |
| Deep Conditioning Treatment | `deep-conditioning` | 45–60 minutes |
| Wash & Define | `wash-and-define` | 60–90 minutes |
| Silk Press | `silk-press` | 1½–2 hours |
| Loc Retwist | `loc-retwist` | 1½–2½ hours |

Every service links to `/book?service=<slug>`. The booking route stays a shell and retains the query string; actual preselection and the workflow remain Milestone 3 work. The catalogue discloses that durations are fictional examples, not salon estimates, and labels each duration as illustrative. No prices are included.

Category anchors link to Protective Styling, Natural Haircare and Styling & Maintenance. A dedicated flat-twist portrait and accurate loc-retwist portrait are unavailable; text explains those gaps. Individual twists and loc-updo imagery are not substituted for those services.

## Lookbook and imagery

Eight approved lookbook assets: braided updo, silk press, two-strand twists, Bantu knots, loc updo, long braids, defined curls and updo in profile. The catalogue also uses the approved knotless-braids and defined-natural-curls portraits. All 16 selected source assets were checked for existence, decoding, dimensions and entries in the unchanged photo-credits register.

Three relevant looks offer service and booking links: silk press → Silk Press; long braids → related Knotless Braids direction; defined curls → Wash & Define inspiration. The descriptions distinguish inspiration from evidence of a particular technique or treatment. Other looks link to their service category without inventing an offered service.

All photography uses the existing Next.js Image integration, explicit sizes and reserved aspect ratios. Manifest display-width caps apply in the gallery and dialog. Compact portraits retain their natural aspect ratios; no source is enlarged beyond native dimensions. Long braids uses a restrained 8:5 display crop to remove the source's thin collage edge; the original file is unchanged.

Interactions:
- Category buttons expose their pressed state; All restores the collection.
- Case-insensitive, trimmed search combines predictably with the category filter.
- Live result counts and a meaningful no-results message announce changes.
- Reset filters restores All/empty search and returns focus to the search field.
- Native dialog provides inert background, a named title, concept disclosure, visible close control, Escape and backdrop dismissal.
- Tab/Shift+Tab wrap within the dialog; dismissal returns focus to the originating style button.
- Previous/next buttons and left/right arrow keys navigate only the filtered collection; navigation is disabled for a single result.
- Missing image requests produce a labeled fallback while preserving details and links.

## Executed checks

- `pnpm lint`: passed.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed without warnings after correcting CSS Module processing.
- `git diff --check`: passed.
- Playwright with installed Chrome against the production build: **43 grouped checks passed** at 320, 390, 768 and 1440px. Raw results: `playwright-results.json`.
- Checked both routes for one main heading, fonts, disclosure, valid image paths/dimensions/display caps and no horizontal overflow.
- Checked all six service booking URLs at every viewport, category anchors, gallery filters/counts, search/empty/reset state, dialog keyboard controls, focus containment/return, single-result navigation, related-service anchors, booking handoff, skip link and reduced motion.
- Isolated 404-image fixtures verified both pages' missing-image behavior without losing service links or dialog details. Expected browser HTTP error messages from those simulated outages are recorded separately from normal-operation errors.
- Normal-operation console errors, JavaScript page errors and failed HTTP responses: **0**.
- Homepage source checksums unchanged; screenshots at 390px and 1440px have zero pixel differences from Milestone 1.

Screenshots in this directory:
- `services-{320,390,768,1440}.png` and `services-fold-{width}.png`.
- `lookbook-{320,390,768,1440}.png` and `lookbook-fold-{width}.png`.
- `look-detail-{320,390,768,1440}.png`.
- `services-missing-image-390.png`, `lookbook-missing-image-390.png`.
- `home-regression-390.png`, `home-regression-1440.png`.

## Design Taste critique

Continued the established **Photographs at uneven sizes** direction (Milestone 1 seed 1307257144); no new direction was drawn because the user requires the existing design to remain authoritative. No stock imagery, video, scenes or animation framework was introduced.

Subject inventory: ORÍ typography, forest/ivory palette, natural-texture portraits, six specific service names, three care categories, three available service portraits, eight curated hairstyle references, limited collage crops, missing flat-twist/retwist photography, and the fictional non-submitting booking destination. These constraints govern the composition rather than fabricated business history or proof.

The Services argument is: understand the catalogue and fictional duration framing → navigate the three categories → read each service and its booking destination → explore style inspiration. The Lookbook argument is: understand that these are fictional inspirations → narrow the selection → inspect a look → discover an honestly related service or category.

ROUND 1
Seen in one second: service portrait and serif introduction; an asymmetric gallery of warm editorial portraits.
Idea (one sentence): let available hairstyle images read like editorial prints, while treating missing service imagery honestly through typography.
Live thing: category/search filtering and keyboard-accessible style inspection.
Layout words by section: services intro=portrait split / protective=list / care=portrait with entries / maintenance=entries with compact portrait / lookbook intro=statement / gallery=asymmetric prints / detail=photo with context.
Scores: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.6 (subjective, project-specific).
Caps applied: known editorial approach limits creativity to 7; generic bans on approved numbering, overlines, palette and minimal motion do not override DESIGN.md.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Catalogue CSS Modules were initially rewritten to ordinary CSS by the pre-existing loader (`lookbook-fold-1440.png` before correction). Restrict that loader to non-module files and preserve native scoping.
2. Gallery title spans inherited Manrope from the button (`lookbook-1440.png` before correction). Set Instrument Serif explicitly on those editorial titles and retain Manrope for controls.
3. Long-braids source showed a thin collage edge (`lookbook-390.png` before correction). Crop to 8:5 without editing or upscaling the source.

ROUND 2
Seen in one second: a coherent extension of the homepage's editorial typography and warm hair imagery.
Idea (one sentence): a service index and a wall of hairstyle prints share the same visual language while respecting the assets' actual limits.
Live thing: usable filters, empty recovery, compact detail views and service handoff.
Layout words by section: services intro=split / protective=index / care=portrait / maintenance=compact accompaniment / gallery=asymmetric grid / detail=contextual inspection.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8 (subjective, not independent certification).
Caps applied: creativity 7 for a familiar editorial approach. The approved 48px minimum and exact service headline produce three balanced lines at 320px, with no orphan word or clipping; the copy and font floor take precedence over the skill's generic two-line cap.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No remaining visual or interaction blocker found in the final captures.
2. Service-image coverage is incomplete by design: retain text explanations for Flat Twists and Loc Retwist until accurate approved portraits exist.
3. Compact source portraits constrain the lightbox: retain the display caps rather than turning them into large full-screen images.

### Inspector allowances

Production inspector runs and screenshots are in `.taste-skill/milestone-2/services-final/` and `.taste-skill/milestone-2/lookbook-final/`.

- Shared allowances: `eyebrow`, `hairline`, `numbering`, `micro-label`, `small-text`, `still-page`, reflecting approved overlines, subtle borders, numbered categories, typography tokens and the instruction to defer advanced motion.
- Services also allows `few-pictures`: three relevant available service portraits are used rather than adding decoration or inventing missing images to meet an arbitrary four-image minimum.
- Lookbook also allows `body-size`: the heuristic's modal paragraph size is 14px because most paragraph elements are secondary concept notes, result counts and footer disclosures. The document body and gallery category/action text are 16px; detail descriptions are 16px; the primary introduction is 18–22px. Fourteen-pixel secondary/help text is explicitly approved by DESIGN.md.
- Retained advisory warnings concern the approved ivory palette, permitted serif italic emphasis and the absence of unapproved footage.
- Source lint was executed and flags approved eyebrows and subtle dividers; these are documented specification exceptions, not changes made to the brand to satisfy generic rules.

## Outstanding limits

No Milestone 2 functional or visual blockers. Dedicated flat-twist and loc-retwist images remain absent. The eight-look collection also has some stylistic overlap, as documented in the asset manifest; no unapproved images were added to manufacture variety. Validation used Chromium; other browser engines and a live screen-reader session were not run.

The booking workflow, advanced motion and deployment have not begun.
