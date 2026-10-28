# Codex — Asset Integration Task (Milestone 1 or later)

**Prerequisite:** Read root `AGENTS.md`, `docs/DESIGN.md`, `docs/CONTENT.md`, `docs/BUILD_PLAN.md`, `docs/ASSET_MANIFEST.md`, and `docs/ASSET_MANIFEST.json`.

This package is **assets + documentation only**. It is not an instruction to start or skip milestones.

## Task

1. Confirm image files exist under `public/images/ori-studio/` and correspond to the manifest. Use only public assets listed under `selected_assets` for the site.
2. Use the manifest path, original dimensions, safe max width, alternative text and `object_position` to connect images to the homepage, services and lookbook.
3. Use `next/image`, explicit responsive `sizes`, no layout shift, and strong crops on mobile. Do not interpolate/upscale the smaller collage crops.
4. Keep primary hero/feature images large and keep the limited assets in small supporting modules.
5. Maintain accurate service representation. Avoid assigning a loc-updo portrait as evidence of a loc retwist, and don't invent missing service photographs.
6. All generated image subjects and interiors are fictional. Keep visible fictional portfolio concept disclosures; do not invent client or model identities.
7. Respect design tokens and the photography-led editorial compositions in `docs/DESIGN.md`. No unnecessary floating cards, generic gradients or stock-like logos.
8. Preserve `docs/PHOTO-CREDITS.md` as the rights/creation register; do not replace it with unverified claims.
9. After implementation, review desktop + mobile browser screenshots, checking image crops, text-image balance, accessibility, and loading/performance.
10. Report any layout needing a wider/larger image and the exact dimensions required. **Stop at the assigned milestone.**

**Do not** begin Milestone 1 if we have not explicitly authorized it. If still on Milestone 0, merely install/copy the assets and verify file integrity.
