# ORÍ Studio — Website Showcase

A separate, editable Remotion project. It does not add Remotion to the Next.js website runtime or change website source. The website is the parent directory (`../`, also resolvable as `../../ori-studio/` from here).

## Deliverables

- `out/ori-studio-showcase.mp4` — 1080 × 1920, H.264 MP4, 30 fps, 750 frames / 25 seconds.
- `out/ori-studio-cover.png` — matching vertical cover.
- `out/ori-studio-draft.mp4` — reviewed 540 × 960 draft.
- `out/review/` — scene-boundary frames, Studio captures, validation and render logs.
- `public/media/raw/` — authentic Playwright WebM recordings.
- `public/media/clips/` — prepared recordings with page-loading lead-ins removed.
- `public/media/stills/` — actual desktop/mobile website screenshots.
- `public/media/capture-manifest.json` — actual source origin, viewports, checks and visually reviewed trims.

## Preview and render

Requires Node 24 and npm. From this directory:

```bash
npm ci
npm run dev
```

Open the exact Studio URL printed by the command, then select **OriStudioShowcase**. This session used `http://localhost:3040/OriStudioShowcase`. The single video composition is 1080×1920, 30 fps, 750 frames. `OriStudioCover` is its poster still, not another video variation.

```bash
npm run lint
npm run render:draft
npm run render
npm run cover
```

Rendering scripts use a single worker and bounded media caches. The final-render script creates a Remotion capture master, then normalizes its JPEG/full-range color tags and levels to limited-range BT.709 H.264 (`yuv420p`) with fast-start metadata. This prevents the forest green darkening in browser playback. The master stays under `out/review/`; it is a QA intermediate, not another video variation. If your Chrome installation differs, append `-- --browser-executable=/path/to/chrome` to the npm render command, or let Remotion install its supported headless browser. This environment used `/usr/bin/google-chrome` via the CLI `--browser-executable` option. A first draft attempt failed with a non-integer one-third render scale; the draft uses an exact half scale instead. Earlier attempts also exposed render memory pressure; the successful commands and logs record the bounded-cache configuration.

## Edit

`src/Root.tsx` registers the composition and cover. `src/Composition.tsx` contains six individually authored scene nodes on one named track (Services and Lookbook split the third storyboard scene). Timing is inline in seconds × composition fps. All typography/camera movement uses Remotion frame interpolation; there is no CSS animation, GSAP runtime, randomized motion or time-dependent content in the composition. Each shot owns its actual footage. Cuts preserve the exact 3/9/15/21/25-second storyboard boundaries.

The opening hook, developer headline and DM CTA are the requested copy. Text is kept inside generous platform-safe margins. Platform overlays vary; check the destination app's posting preview. No username or contact address was invented.

## Source capture

The verified source was the working local production server at **http://localhost:3026**. No publicly deployed URL was verified. The saved footage is self-contained: preview/render does **not** need the website server.

The capture tool uses Playwright and Chrome. Supply `PLAYWRIGHT_MODULE` if Playwright is installed outside this project, and `ORI_CAPTURE_URL` for another verified source origin. For example, on this environment:

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/ori-showcase-browsers \
PLAYWRIGHT_MODULE=/home/ridwan/.npm/_npx/9833c18b2d85bc59/node_modules/playwright \
ORI_CAPTURE_URL=http://localhost:3026 node scripts/capture.cjs
node scripts/prepare-clips.mjs
```

Install Playwright's FFmpeg recording helper into the configured browser-cache path before recapturing. `ORI_CAPTURE_ONLY=services-desktop,booking-mobile` refreshes only those recordings and retains the rest of the manifest. Recapture dates are selected through the website's real local-date minimum, not fabricated form content. Images/fonts are loaded before recording; scrolling uses a deliberate eased browser scroll. The video shows real UI selections and the no-appointment completion, not a simulated booking interface. Source recordings are 25 fps, conformed to the 30 fps composition; a short final hold is deliberate when a shot ends before its edit boundary.

The booking source uses a visually verified 2–8-second source trim so date, time, review and completion all remain visible. Other initial trims are derived from capture timing and checked in the edit. The media preparation helper locates Remotion's installed native FFmpeg/FFprobe package. Prepared media is included, so normal editing/rendering does not require rerunning capture or preparation.

## Identity, rights and audio

ORÍ Studio is a fictional, self-initiated portfolio concept. No real appointments are accepted. The models, looks and interiors are the project's approved generated assets, not real customers, staff or premises. Only actual website captures are used; no AI website mockups or artificial device interfaces were created. The parent `docs/ASSET_MANIFEST.md` and `docs/PHOTO-CREDITS.md` record image provenance and display limits.

The forest/ivory/clay palette and Instrument Serif / Manrope match the approved website identity. Fonts are copied from the website's optimized local Latin WOFF2 files; provenance is in `public/fonts/manifest.json` and SIL OFL licenses are included under `public/fonts/licenses/`.

There is **no audio track**. No music was downloaded or licensed. All meaning is visual and readable while muted.

The Remotion scaffold's own license is `UNLICENSED`; check Remotion's current commercial/team license requirements before adopting its tooling in a different business context. No Remotion service is deployed here.

## QA and remaining limitations

See `out/REPORT.md` for executed results, scene review and exact deliverables. The initial npm audit is retained in `out/review/npm-audit.json`: the current upstream Remotion tooling has ten high-severity dependency findings stemming from its Zod dependency. npm's proposed fix downgrades Remotion and is not applied blindly. This is local authoring tooling; no Studio/backend is published, and the final MP4 does not execute JavaScript. Recheck/update the complete compatible Remotion package set before exposing authoring tools to untrusted inputs.

No website deployment, production publishing, or additional video variation is included. Stop after this first showcase.

## Refined showcase

The requested refinement is delivered separately as `out/ori-studio-showcase-refined.mp4` and `out/ori-studio-cover-refined.png`; the original MP4 and cover are retained. See `out/REPORT-REFINED.md`.

Re-render this edit with `npm run render:refined` and `npm run cover:refined`. These commands target only the refined filenames. `src/Composition.tsx` now contains the refined edit. New mobile captures live under `public/media/refined/` and are self-contained. To recapture, start a fresh production website server on port 3027 after building, then run `node scripts/capture-refined.cjs`. `ORI_REFINED_ONLY=booking` updates only Booking. Verify the loaded styles before recording; never rebuild the website while recording from the same production server.

The new edit uses 0–3s website-first hook and responsive reveal; 3–6s mobile homepage; 6–9.5s service details; 9.5–13.5s real filter changes; 13.5–21s booking preferences/review/demo completion; 21–25s Lawal Ridwan and the retained DM CTA. No confirmed portfolio URL was found, so none was added.
