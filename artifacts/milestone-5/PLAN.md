# Milestone 5 QA plan and initial findings

Inspected the four routes, reducer, native dialogs, image helpers and useGSAP/matchMedia implementation. Booking and motion exist; they are not placeholders. Reuse the previous journey tests and extend them to 1024px, browser history, internal links, axe, metadata, errors and image caps.

Initial gaps: no Open Graph/Twitter/canonical policy; no robots route or indexing decision; default not-found/error presentation; no Vercel linkage. Add shared route metadata, noindex/follow, a social image rendered from the approved hero/fonts, native error recovery and safe deployment exclusions. Keep the brand and current image assignments intact.

The booking privacy note overstates clearing on route exit: Next's cached routes may retain transient React state on Back. Clarify that choices are memory-only rather than promising they always clear on navigation; do not introduce persistence or alter the data model.

Canonical/social origins must come from configured SITE_URL or the real Vercel deployment hostname. No fabricated domain. Recommend noindex/follow for this fictional salon; omit a sitemap while noindex. Crawling remains allowed so crawlers can read the noindex directive.

Run baseline production journey tests and mobile/desktop Lighthouse before final performance fixes, then all required checks against a fresh production build. QA tools are installed separately under /tmp, not added to website dependencies. Attempt Vercel authentication inspection before preview upload; never run a production deployment.
