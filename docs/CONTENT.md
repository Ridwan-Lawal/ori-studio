# ORÍ Studio — Content Contract

All text is for a **fictional** concept, not an operating salon. Avoid unsupported historical, financial, social-proof or business claims.

## Global
- Brand: `ORÍ Studio`
- Navigation: `Services`, `Lookbook`, `Our Approach`, `Try booking`
- Footer disclosure (verbatim): `ORÍ Studio is a fictional portfolio concept. No real appointments are accepted.`

## Home
- Eyebrow: `TEXTURE-LED HAIRCARE`
- Hero H1: `Hair deserves its own rhythm.`
- Hero supporting copy: `Texture-led care, considered styling, and time well spent in the chair.`
- Primary: `Explore services`
- Secondary: `View the lookbook`
- Philosophy eyebrow: `01 / THE PHILOSOPHY`
- Philosophy H2: `Good hair begins with good care.`
- Philosophy paragraph: `At ORÍ Studio, the process matters as much as the finished look. Every style begins with an understanding of your texture, your routine, and how you want to feel.`
- Services eyebrow: `02 / WHAT WE DO`
- Services H2: `Care in every detail.`
- Lookbook eyebrow: `03 / THE LOOKBOOK`
- Lookbook H2: `Expressions of texture.`
- Lookbook intro: `A collection of styles worth considering.`
- Approach eyebrow: `04 / OUR APPROACH`
- Approach H2: `Thoughtful from start to finish.`
- Approach sequence: `Understand` -> `Care` -> `Create`.
- Booking H2: `Your next style begins here.`
- Booking blurb: `Choose a service, select your preferred appointment details, and preview your request.`
- Final H2: `Ready for your next look?`
- Final action: `Explore booking`

## Services page
- Intro H1: `Care for every chapter of your hair.`
- Protective Styling: `Knotless Braids`, `Flat Twists`.
- Natural Haircare: `Deep Conditioning Treatment`, `Wash & Define`.
- Styling & Maintenance: `Silk Press`, `Loc Retwist`.
- These display names follow the explicit Milestone 2 brief; existing homepage labels remain unchanged.
- Describe service approaches plainly; do not claim guaranteed results, medical benefits or specific salon experience.
- Avoid sample prices until reviewed and approved; omit rather than invent.

## Lookbook page
- Intro H1: `Find your next expression.`
- Category names match the service taxonomy.
- Photos must be licensed and listed in `PHOTO-CREDITS.md`.
- No claims that a style was created by the fictional studio.

## Booking page
- Intro H1: `Make time for your hair.`
- Visible note before selections: `This is a demo booking experience. Times are preferences, not confirmed availability. No appointment will be submitted.`
- Stage labels: `Service`, `Preferred date`, `Preferred time`, `Review`.
- Action labels: `Continue`, `Back`, `Review request`, `Complete demo`, `Start again`.
- Final state (verbatim): `Demo complete — this was a preview. No appointment was booked.`

## Copy quality
Warm, minimal and direct. Prefer specific service language over stock slogans. No lorem ipsum. Avoid fabricated ratings, press logos, awards, service rates, specific working hours, address or team. Where photography features people, it is representation of a hairstyle, not fictional staff or clients.

## Milestone 2 — Catalogue and lookbook content

- Service copy and stable slugs live in `src/content/services.ts`; lookbook labels, descriptions and optional service relationships live in `src/content/lookbook.ts`.
- Durations are **fictional illustrative examples**, requested for this concept catalogue. They are not salon estimates, schedules or availability. Label each as `Illustrative duration` and disclose their fictional status before the catalogue.
- Knotless Braids: 4–6 hours; Flat Twists: 1½–2½ hours; Deep Conditioning Treatment: 45–60 minutes; Wash & Define: 60–90 minutes; Silk Press: 1½–2 hours; Loc Retwist: 1½–2½ hours.
- No prices are approved; omit them.
- AI-generated looks are inspiration, not client work. Missing flat-twist and loc-retwist photography is recorded in internal documentation, not customer-facing service descriptions. Do not substitute individual twists or a loc updo.
- Lightbox images remain within their manifest display limits. Label the interaction `View style`, not an invitation to enlarge small files to full screen.
- Only relevant looks carry a service relationship. For other looks, link to the service category without inventing a new service or technique claim.

## Services refinement

- Keep asset availability and technical image notes in `docs/SERVICE_IMAGE_NOTES.md`.
- Attach hairstyle photographs to the appropriate service entry: curls to Wash & Define, straightened hair to Silk Press. Loc Retwist stays text-only until an appropriate image is approved.
- Preserve the fictional-concept and illustrative-duration disclosures.

## Milestone 3 — Booking preview interface

- The existing booking headline, disclosures, stage labels, actions and completion message above remain authoritative.
- `src/content/booking.ts` defines the stage titles and the illustrative Morning, Afternoon and Evening preferences. These are broad preferences, never available slots or working hours.
- Supporting form copy explains required selections, today-or-later dates, changing preferences, and the local-only nature of the preview. Validation gives an actionable instruction for the affected field.
- Completion explains that no appointment was created and completing the demo did not transmit or save selections. No personal information is requested.
- Service preselection accepts exactly one known `service` slug. Invalid, empty or repeated parameters show a neutral notice and leave selection empty. Incoming values are never echoed.
- Start again clears all in-memory preferences, including the initial service. The incoming referral URL is not updated with subsequent choices; reloading a referral URL can preselect its original service again.

## Milestone 5 — Honest metadata and recovery

- Titles, descriptions and social previews identify ORÍ Studio as a fictional portfolio concept. No operating-business structured data is added.
- The privacy note promises memory-only selections and no submission or saving; it does not promise that leaving the route erases React state. Browser Back may restore an in-memory page.
- Not-found and error states use plain recovery copy and working home/retry actions.
- Recommend `noindex, follow` for the fictional salon demonstration, with no sitemap while noindex. Canonical/social URLs require a configured `SITE_URL` or Vercel's actual deployment hostname; no domain is invented.
