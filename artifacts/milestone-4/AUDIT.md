# Milestone 4 — Baseline audit and priorities

Reviewed the running development site at 390px and 1440px before implementation. A dev server already owned port 3000, so it was reused. Eight screenshots live in `baseline/`. These include the development indicator; final captures will use production. Documentation, current route markup, native dialogs, booking reducer and image manifest were inspected.

Preserve: 42/58 hero, Instrument Serif/Manrope, approved colors, photography and crops, service/image associations and resolution caps, text-led catalogue, asymmetric gallery, explicit disclosures, typed booking model and current focus/validation behavior.

## Prioritized refinements

1. **Lifecycle and resilience:** add one scoped homepage GSAP layer, clean it up when routes are hidden/unmounted, skip reduced motion and keep the default markup visible. No hidden off-screen starting states, pinning, loops or scroll interception.
2. **Service alignment:** illustrated service rows use 1:1 columns while neighboring rows use 5:7. Match the column tracks so the image accompaniment belongs to the same catalogue grid. Retain compact silk-press dimensions and text-only loc-retwist.
3. **Gallery labels and feedback:** category labels compete with style titles in narrow portrait columns. Use the approved 14px secondary-label token; keep action/body text 16px. Restrict photographic hover feedback to fine pointers and provide keyboard focus feedback without rescaling small images.
4. **State changes:** native menu appears abruptly and booking steps replace instantly. Add short progressive CSS transitions that preserve immediate open/close semantics, focus, errors and values.
5. **Hero/scroll hierarchy:** introduce a single short hero sequence and selective heading/image groups in philosophy, services, featured lookbook, approach, booking introduction and final CTA. No paragraph-by-paragraph effects.

Skill baseline: `.taste-skill/milestone-4-before` (Services at 1440/390). Approved-brand and functional allowances retain documented typography, labels, rules and palette rather than replacing the art direction.
