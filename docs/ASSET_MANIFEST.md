# ORÍ Studio — Approved Image Asset Map

**Scope:** Consolidated image kit for the ORÍ Studio fictional portfolio demo.
**Date:** 2026-10-27

## Status and limitations

- These are AI-generated, fictional concept images. They do **not** document an actual salon, its employees, its customers or its work.
- The four original editorial portraits are 1122 × 1402 pixels and can serve as hero/featured images in restrained layouts.
- The remainder are crops from generated collage renders (roughly 294–829px wide). **Do not upscale them**, use as fullscreen backgrounds, or put a 300px crop in a 900px-wide component.
- All exported files have their original pixel dimensions retained and use WebP compression. The originals for the four portraits are preserved in `assets/original-portrait-png/`.
- `assets/review-only/` contains repeated or redundant looks. It is **not** in `public/` and Codex should not import it.
- Correctly represent styles. A loc updo is not proof of a loc-retwist treatment; curls do not prove a wash treatment was performed. Never present these generated looks as client work.

## Priority layout assignments

1. **Home hero** — `hero/hero-natural-afro.webp`, prominent right-side editorial portrait; keep face and hair in frame on mobile.
2. **Home signature services** — `services/knotless-braids.webp` and `services/defined-natural-curls.webp`, used as editorial style illustrations, not as a gallery of supposed client results.
3. **Home lookbook preview** — `lookbook/braided-updo-editorial.webp` as the primary featured style, paired with 2–3 *small* tiles from the lookbook directory.
4. **Our Approach / studio section** — `editorial/salon-interior-wide.webp` (fictional environment). Do not call it a photograph of an existing ORÍ Studio location.
5. **Services page** — pair haircare copy with `editorial/amber-haircare-still-life.webp` or `editorial/styling-tools-still-life.webp` at native-like display sizes.
6. **Lookbook page** — use selected individual portrait assets and compact crops with mixed aspect ratios. Implement an asymmetric masonry/editorial layout. Do not force 300px-wide images into large lightboxes.
7. **Booking page** — primarily typographic. Optional small haircare/studio image only; form usability has priority.

## Website assets

| Filename (under `public/images/ori-studio/`) | Resolution | Display recommendation | Placement |
|---|---|---|---|
| `hero/hero-natural-afro.webp` | 1122×1402 | HERO / FEATURE | Home: right-side hero photograph; mobile hero below headline |
| `services/knotless-braids.webp` | 1122×1402 | HERO / FEATURE | Services: featured protective-style portrait; /services image |
| `services/defined-natural-curls.webp` | 1122×1402 | HERO / FEATURE | Services: natural hair styling illustration; featured services |
| `lookbook/braided-updo-editorial.webp` | 1122×1402 | HERO / FEATURE | Lookbook: large featured portrait; updo inspiration |
| `lookbook/silk-press.webp` | 308×486 | SMALL TILE ONLY | Lookbook: compact silk press card; do not enlarge |
| `lookbook/two-strand-twists.webp` | 301×486 | SMALL TILE ONLY | Lookbook: compact twists card; do not enlarge |
| `lookbook/bantu-knots.webp` | 295×486 | SMALL TILE ONLY | Lookbook: compact Bantu knots card; do not enlarge |
| `lookbook/loc-updo.webp` | 294×486 | SMALL TILE ONLY | Lookbook: compact loc updo card; not evidence of a retwist service |
| `lookbook/long-braids-side-view.webp` | 758×502 | SMALL TILE ONLY | Lookbook: compact landscape editorial tile |
| `lookbook/defined-curls-daylight.webp` | 758×502 | SMALL TILE ONLY | Lookbook: compact landscape editorial tile |
| `lookbook/updo-profile.webp` | 758×502 | SMALL TILE ONLY | Lookbook: compact landscape editorial tile |
| `editorial/salon-interior-wide.webp` | 829×559 | SMALL TILE ONLY | Home: Our Approach supporting photograph; interior preview only |
| `editorial/salon-interior-detail.webp` | 602×527 | SMALL TILE ONLY | Homepage editorial detail or About section, not full bleed |
| `editorial/amber-haircare-still-life.webp` | 306×527 | SMALL TILE ONLY | Home: haircare philosophy accent; small portrait tile |
| `editorial/styling-tools-still-life.webp` | 302×527 | SMALL TILE ONLY | Services: compact details image |
| `editorial/curl-texture-detail.webp` | 305×486 | SMALL TILE ONLY | Home: optional small detail; thumbnail only |

## Missing / pending imagery

- Full-resolution separate portrait depicting **flat twists** if the services page needs a dedicated image.
- Full-resolution accurate **loc retwist** service portrait (current loc updo is an inspiration image only).
- A full-resolution, widescreen salon interior if the design requires a hero-width studio photograph.
- Additional *independently framed* looks if the lookbook feels repetitive.

These are non-blocking for the first homepage if it uses text-led service listings and the existing primary images.

## Accessibility, crop and delivery rules

- Use `next/image` with correct `sizes`; set `priority` only for the above-the-fold hero.
- Set an explicit width/height or defined `fill` container with `aspect-ratio` to prevent layout shifts.
- Use the supplied `object_position` as a **starting suggestion**; inspect crops manually at 320px, 390px, 768px and 1440px.
- Informative photographs need useful alt text; purely decorative repeated photos should use `alt=""`.
- Put headlines and CTA **outside** the photographs; do not add text baked into the images.
- Do not stretch small files, run fake AI enhancement, or claim the images are authentic client photographs.
- Maintain the required footer and booking demo disclosures specified by `docs/CONTENT.md` and `AGENTS.md`.

## Source and rights register

The assets were generated by OpenAI image generation for this fictional design concept. No third-party stock photo from the earlier moodboard was copied into this pack. Evaluate model-specific AI image terms and any downstream advertising rules before commercial production usage.

## Milestone 5 — Social sharing derivative

`social-preview.png` (1200×630) is a browser-rendered brand composition using the approved `hero/hero-natural-afro.webp`, Instrument Serif and Manrope. The portrait displays at 504×630, below its native resolution, without new generated imagery. The image visibly states that ORÍ Studio is fictional and accepts no real appointments. It is for metadata/social previews, not a new website-section photograph.
