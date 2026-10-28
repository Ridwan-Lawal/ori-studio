# ORÍ Studio — Preview deployment handoff

ORÍ Studio is a fictional portfolio demonstration. Do not deploy to production as part of Milestone 5.

## Build settings

- Framework: Next.js App Router; source at repository root, routes under `src/app`.
- Node: 24.x (`package.json`), verified locally with Node 24.21.0.
- Package manager: pnpm 12.8.1, pinned via `packageManager`.
- Install: `pnpm install --frozen-lockfile`.
- Build: `pnpm build`; default Next.js output, no static-export override.
- `vercel.json` records framework/install/build settings. Vercel's Next.js adapter supplies the production runtime and image optimization.
- No application secrets or backend integrations are required.
- `.vercelignore` excludes originals, QA artifacts, local agent/cloud settings, environment files and build caches. `docs/ASSET_MANIFEST.json` must remain included because the app imports it.

## Origin and indexing policy

Use Vercel's actual `VERCEL_URL` for a preview's canonical and social URLs. `SITE_URL` is an optional explicit override only when an actual target URL has been configured. Do not set a fictional/unconfigured domain or carry a localhost `SITE_URL` into Vercel settings.

Local QA built with `SITE_URL=http://localhost:3026`; that is a local test configuration, not a public deployment domain. Vercel must build the uploaded source with its own environment rather than reuse this local `.next` directory.

The default policy is **noindex, follow**, in metadata and `X-Robots-Tag`. Crawling is allowed so crawlers can read the directive. There is deliberately no sitemap while all pages are noindex. Social metadata and the branded sharing image remain available to link previews. No LocalBusiness schema, invented address, telephone or reviews are included.

Recommendation: keep the salon demonstration noindex and present/link it from the creator's real portfolio. Reconsider indexing only with an approved portfolio publishing strategy and a configured canonical domain. This is not an access-control mechanism.

## Current blocker

Vercel CLI 65.4.0 reports **Logged out**. No `.vercel/project.json` is present. No preview upload was attempted; no preview URL or hosted verification exists yet. Production deployment was not attempted.

An initial sandboxed CLI call could not create its normal configuration directory; repeating the read-only authentication check outside the sandbox succeeded and confirmed the logged-out state. No credentials were requested, printed or stored in project artifacts.

## Exact steps to create the authorized preview

Run these from `/home/ridwan/projects/ori-studio`:

```bash
pnpm dlx vercel@65.4.0 login
pnpm dlx vercel@65.4.0 whoami
pnpm dlx vercel@65.4.0 link
```

Complete Vercel's browser login yourself, then select the intended account/team and ORÍ Studio project in the link prompts. Review the printed owner/project before continuing. Local linkage stays in the ignored `.vercel/` directory. Do not paste credentials into chat or commit authentication files.

Create a preview and retain the actual URL printed by the CLI:

```bash
pnpm dlx vercel@65.4.0 deploy --logs
```

This command defaults to preview; do not add a production flag. Do not use a temporary/unowned deployment as a substitute for the authenticated project.

After deployment, verify the hosted `/`, `/services`, `/lookbook` and `/book` routes; all optimized images/fonts; mobile menu and history navigation; gallery/filter/lightbox; all six service preselection URLs; booking validation/back/edit/reset/completion; noindex/canonicals/social image; and a nonexistent route's 404 response. Inspect build and runtime logs for errors. If Deployment Protection is enabled, use the authorized Vercel browser session or the CLI's `vercel curl` support; do not expose bypass credentials.

The standalone local journey test can target the actual preview by setting `ORI_QA_URL` and an installed Playwright module path when the preview is reachable. Some local-only diagnostic tests intercept bundled JavaScript to inspect GSAP counts or inject a recoverable error; those should remain test-only and must never be added to application source.

Production release remains **pending preview deployment, hosted verification and explicit approval**.

References: [Vercel preview deployment workflow](https://vercel.com/docs/projects/deploy-from-cli), [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), and [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Ensure the Vercel project exposes system environment variables; if that setting is disabled, configure the actual URL explicitly before building.
