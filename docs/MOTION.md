# ORÍ Studio — Motion Specification

## Core principle
Motion supports clarity, hierarchy and feedback; it is not a video game or a scroll-effects demo. Main website uses CSS for simple transitions and **GSAP only if complex sequencing is justified**. Remotion is reserved for a separate promotional-video milestone.

| Element | Interaction | Target duration |
|---|---|---|
| Hero | Headline intro + subtle photographic settling, once | 500–700ms |
| Mobile navigation | Menu open/close with clear opacity/position transition | 180–260ms |
| Buttons/links | Small color/underline response | 120–180ms |
| Services | Supporting image fade/crossfade when service changes | 200–350ms |
| Gallery | One-time gentle reveal or no reveal on constrained devices | 300–500ms |
| Booking | Step-to-step transition, preserve field focus | 180–280ms |
| FAQ | Controlled open/close with no scroll jump | 160–240ms |

## Prohibitions
No scroll-jacking, heavy pinned scroll sequences, continuous decorative loops, forced parallax, unexpected sound, or animation-based navigation blockers. Avoid using both GSAP and Motion for one interaction.

## Reduced motion
Use `prefers-reduced-motion: reduce` to disable movement and keep functional state changes instant. Never hide essential text or controls until JavaScript-driven animation completes.

## QA
Test initial load, slow/reduced-power devices, mobile menu, keyboard focus after booking transitions, and reduced-motion settings. Motion must not cause layout shifts, scroll traps or missed clicks.

## Remotion video phase (later)
Produce a standalone vertical 1080×1920 video showcasing the real built site. The video must disclose that ORÍ Studio is a portfolio concept and use actual screenshots/screen recordings rather than fabricating a real salon application.

## Milestone 4 implementation

- Homepage only: `HomeMotion` is a small client wrapper around server-rendered children. `useGSAP` scopes its timelines and ScrollTriggers; `gsap.matchMedia` handles 768px responsive travel (8px mobile / 16px desktop) and skips reduced motion. Media and hook contexts revert on hiding/unmount, including deferred entry callbacks.
- Hero: headline 550ms; support 450ms at +80ms; actions 450ms at +160ms; photograph 650ms at +40ms. Text uses opacity and small upward translation; the desktop photograph settles vertically at full opacity, with no enlargement; narrow screens keep the critical photograph still for early LCP. If hydration arrives more than 250ms after first contentful paint, skip the entrance rather than fading already-read content backward.
- Six scroll groups: philosophy, services introduction/photo, featured lookbook, studio approach, booking introduction and final CTA. One-time 500ms entry with a restrained 70ms group stagger. Waiting sections are fully visible; tween starting styles are applied only on entry. Completed groups do not repeat on cached route restoration. No pins, scrub, scroll interception, loops or continuous off-screen animation.
- Services: pointer-only 250ms photographic opacity feedback, preserving crop and display caps. No text is gated by motion.
- Lookbook: fine-pointer photographic opacity and action underline feedback; keyboard focus remains visible. Images never scale beyond their approved display sizes. Filtering and dialog content changes remain immediate.
- Booking: keyed stage wrapper uses a 200ms CSS opacity/4px translation entrance. Errors update in place without restarting the transition; values and focus remain owned by the unchanged reducer.
- Native mobile dialog: 220ms transform/opacity with progressive `@starting-style` and discrete display/overlay transitions. Open/close, Escape and focus semantics stay immediate. Unsupported browsers retain a functioning native dialog.
- Reduced motion disables decorative CSS transitions/animations and creates no GSAP entrance/scroll effects; changing the preference live reverts GSAP state. Default server markup contains no animation-hidden content.

## Milestone 5 QA recovery fixes

- The gallery's native dialog now closes during route deactivation/unmount, including browser Back/Forward that does not call a Link navigation handler. Its body-scroll lock is restored during cleanup.
- The shared mobile menu closes when pathname changes, including browser-history navigation. Native Escape/focus behavior is preserved.
- GSAP timing and scoped lifecycle are unchanged; production QA continues to verify cleanup, reduced motion and visible default content.

- Shared navigation disables automatic route prefetch so the homepage GSAP bundle is not downloaded on Services, Lookbook or Booking before a visitor chooses Home. Normal link navigation and cached-history restoration remain supported.

- Final LCP refinement: the hero photograph keeps full opacity throughout its 650ms settling motion, avoiding a late full-opacity paint. Text/support/action sequencing remains unchanged.

- Below 768px the critical hero photograph stays still at full opacity; changing a partly-visible image’s area can delay mobile LCP. Heading/support/action entry remains, and desktop photography retains the settling motion.

- Effects loading is isolated in `home-motion-effects.tsx`. The small homepage wrapper keeps server markup visible and loads no GSAP for an initially reduced-motion visit. On narrow screens it waits for portrait decode, two animation frames and browser idle before mounting the scoped effects. Pending frames/idle work and preference listeners are canceled on deactivation; the GSAP module still owns matchMedia and context cleanup. Desktop effects mount promptly. Late hero entrances retain the existing skip safeguard.
