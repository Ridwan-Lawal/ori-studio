# ORÍ Studio — Codex Image Kit

This ZIP combines the approved ORÍ Studio concept imagery with asset placements and Codex integration instructions.

## Use

1. Extract the ZIP into your Next.js `ori-studio/` project root.
2. Merge the `public/` and `docs/` folders. These files do not include application code or `AGENTS.md`.
3. Keep your existing project `docs/DESIGN.md`, `docs/CONTENT.md`, and `docs/BUILD_PLAN.md` unchanged. The copies under `docs/reference/` are for comparison only.
4. Read `docs/ASSET_MANIFEST.md` and `docs/CODEX_IMAGE_INTEGRATION.md` before passing the assets to Codex.
5. For the image stage, instruct Codex to use the `selected_assets` entries in `docs/ASSET_MANIFEST.json`.

## Directory map

- `public/images/ori-studio/`: 16 selected images suitable for the specified display sizes.
- `assets/review-only/`: 6 duplicate/near-duplicate crops; don't import by default.
- `assets/original-portrait-png/`: four full-resolution uncompressed source images.
- `docs/ASSET_MANIFEST.md`: final human-readable placements, QA and outstanding gaps.
- `docs/ASSET_MANIFEST.json`: machine-readable image details.
- `docs/PHOTO-CREDITS.md`: AI creation and accurate representation notice.
- `docs/CODEX_IMAGE_INTEGRATION.md`: instructions for Codex.
- `docs/reference/`: snapshots of existing planning documents (comparison only).

The images depict a fictional brand. Do not represent them as photography of an operating salon or actual commissioned work.
