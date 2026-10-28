"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Progressive enhancement: server content is visible before and without this layer. */
export function HomeMotionEffects({ root }: { root: RefObject<HTMLDivElement | null> }) {
  const heroEntered = useRef(false);
  const revealed = useRef(new WeakSet<Element>());

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduce) return;
      const distance = context.conditions?.desktop ? 16 : 8;
      // If hydration was delayed, keep the already-painted hero still rather than flashing it back.
      const firstPaint = performance.getEntriesByName("first-contentful-paint")[0];
      const timelyEntrance = !firstPaint || performance.now() - firstPaint.startTime < 250;
      const hero = element.querySelector<HTMLElement>(".home-hero");
      const heroParts = ["#hero-title", ".hero-support", ".hero-actions", ".hero-image"].map((selector) => hero?.querySelector(selector)).filter((part): part is Element => Boolean(part));
      if (timelyEntrance && !heroEntered.current && hero && hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < innerHeight && heroParts.length === 4) {
        const timeline = gsap.timeline({ defaults: { ease: "power2.out", clearProps: "opacity,transform" }, onComplete: () => { heroEntered.current = true; } });
        timeline.fromTo(heroParts[0], { opacity: 0.25, y: distance }, { opacity: 1, y: 0, duration: 0.55 }, 0)
          .fromTo(heroParts[1], { opacity: 0.35, y: distance / 2 }, { opacity: 1, y: 0, duration: 0.45 }, 0.08)
          .fromTo(heroParts[2], { opacity: 0.5, y: distance / 2 }, { opacity: 1, y: 0, duration: 0.45 }, 0.16);
        // A partly visible mobile portrait must not grow its visible area during LCP.
        if (context.conditions?.desktop) {
          timeline.fromTo(heroParts[3], { y: distance / 2 }, { y: 0, duration: 0.65 }, 0.04);
        }
      }

      // Explicit groups, in document order. No blanket paragraph or divider animation.
      const groups = [
        { section: ".philosophy", targets: ".section-heading, .philosophy-image" },
        { section: ".services-section", targets: ".section-topline, .services-image" },
        { section: ".lookbook-section", targets: ".section-topline, .lookbook-feature, .lookbook-knots, .lookbook-curls" },
        { section: ".approach-section", targets: ".section-heading, .approach-content" },
        { section: ".booking-introduction", targets: ".booking-content" },
        { section: ".final-cta", targets: ".final-content" },
      ];
      for (const group of groups) {
        const section = element.querySelector<HTMLElement>(group.section);
        if (!section) continue;
        const targets = Array.from(section.querySelectorAll<HTMLElement>(group.targets));
        if (revealed.current.has(section)) continue;
        if (section.getBoundingClientRect().bottom <= 0) { revealed.current.add(section); continue; }
        // Only initialize the tween on entry. Waiting sections never have hidden styles.
        // context.add records deferred tweens for cleanup as well as their triggers.
        const enter = context.add(`reveal-${group.section}`, () => {
          gsap.fromTo(targets, { opacity: 0.45, y: distance }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out", clearProps: "opacity,transform", onComplete: () => { revealed.current.add(section); } });
        });
        ScrollTrigger.create({ trigger: section, start: "top 88%", once: true, onEnter: () => enter() });
      }
      // Font loading can alter line breaks; no polling or continuously running effects.
      let active = true;
      void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => { active = false; };
    }, element);
    return () => media.revert();
  }, { scope: root });

  return null;
}
