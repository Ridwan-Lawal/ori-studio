# ORÍ Studio — MVP Scope and Acceptance Criteria

## Routes
- `/`: Editorial hero, philosophy, signature services, lookbook preview, approach, booking explainer, FAQ, conversion CTA, footer.
- `/services`: Six services in three categories, with concise descriptions and corresponding paths into the booking preview.
- `/lookbook`: Curated photo gallery with service/category labeling, accessible filtering and a sensible no-results state.
- `/book`: Multi-step, non-submitting booking-request demo.

## Data model
- Service: `id`, `name`, `category`, `summary`, `description`, `image`, optional `durationLabel`. Do **not** invent prices.
- Look: `id`, `title`, `image`, `category`, optional `serviceId`, `alt`.
- Booking preview: `serviceId`, `preferredDate`, `preferredTime` (client-side only; no personal data).

## Booking requirements
1. Visitors can pick a service directly or arrive from a service/look with an allowed service ID in the URL query string.
2. A client-side date control disallows past dates, with date validation before advancing.
3. Time options are explicitly shown as *preferences*, not live appointment inventory.
4. Visitors can move backward without losing valid entries and review their summary.
5. Final action says exactly: `Demo complete — this was a preview. No appointment was booked.`
6. No user names, email, phone, backend booking requests, or persistence beyond transient client UI state.
7. Missing/invalid selections show clear, accessible feedback.

## Lookbook requirements
- Category filters have stable and predictable behavior; "All" restores the entire set.
- Images have appropriate alt text, responsive sizes and safe cropping.
- A look with a relevant service offers a link to the booking preview with that service preselected.
- If a lightbox is implemented, it must support keyboard navigation, Escape dismissal and correct focus management.

## Content and business-truth constraints
- Persistent footer disclosure: fictional concept; no real appointments.
- No fabricated salon reviews, award logos, customer numbers, team bios, real address, or false service pricing.
- Brand and copy follow `docs/CONTENT.md` and visual rules follow `docs/DESIGN.md`.

## Quality gates
- Links, navigation, controls and booking journey work.
- Mobile menu is keyboard operable.
- 320/390/768/1024/1440px layouts are reviewed for overflow and readability.
- Reduced-motion option works.
- `pnpm lint`, TypeScript check, and `pnpm build` pass before deployment.
- At least a handful of Playwright interaction checks cover the navigation, gallery filtering and booking preview.

## Explicit exclusions
Live appointments, payment processor, user accounts, newsletter signup, CRM, backend or database, admin area, ecommerce checkout, real WhatsApp or contact data submission.
