# ORÍ Studio

A fictional, self-initiated portfolio concept for a premium natural-hair salon in Lagos. No real appointments are accepted.

Current implementation: **Milestone 5 — Final QA and preview preparation**. All four routes, the booking demo and restrained motion are implemented. Final QA adds accessibility/history fixes, metadata/social sharing, noindex policy, error recovery, image priority and deployment configuration. Local production verification is recorded under `artifacts/milestone-5/`; preview deployment is blocked by Vercel login/project linkage.

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js. Validation:

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Structure

- `src/app/`: App Router routes, shared layout and global design tokens.
- `src/components/`: reusable Server Components.
- `src/content/`: shared typed content.
- `public/images/ori-studio/`: approved concept imagery; website selections follow the asset manifest and display-size limits.
- `docs/`: approved scope, design, content, milestone plan and asset register.

The `@/*` alias resolves to `src/*`. Tailwind CSS v4 uses the Turbopack integration in `next.config.ts`, restricted to non-module stylesheets so Next.js can scope catalogue CSS Modules normally. Instrument Serif and Manrope load through `next/font/google`, are self-hosted in the build, and have system fallbacks. A first build needs network access to retrieve the font files.

Read `AGENTS.md` and the required project documents before implementation. `docs/DESIGN.md` governs the visual system; `docs/ASSET_MANIFEST.json` records image dimensions and display limits. Generated people and interiors do not depict real customers, staff or premises.

Milestone 2 verification and visual review are recorded in `artifacts/milestone-2/REVIEW.md`; responsive screenshots and Playwright results are alongside it. The flat-twist and loc-retwist photographs remain unavailable; internal image notes are in `docs/SERVICE_IMAGE_NOTES.md`. Prices are intentionally omitted.

Milestone 3 verification, screenshots and visual critique are recorded in `artifacts/milestone-3/REVIEW.md`. No dependencies, API routes or backend services were added.

Milestone 4 baseline audit, final critique, responsive verification and screenshot/recording links are in `artifacts/milestone-4/REVIEW.md`. GSAP and `@gsap/react` are the only new dependencies. No deployment or production integrations were started.

Milestone 5 findings and Lighthouse reports are linked from `artifacts/milestone-5/REVIEW.md`. Preview-only deployment steps and the indexing recommendation are in `docs/DEPLOYMENT.md`. No production deployment or Remotion work was started.
