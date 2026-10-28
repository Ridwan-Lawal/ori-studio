"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const MotionEffects = dynamic(() => import("./home-motion-effects").then((module) => module.HomeMotionEffects), { ssr: false });

/** Keep server content visible; optional effects must not compete with the critical portrait. */
export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let active = true;
    let generation = 0;
    let frame = 0;
    let idle: number | undefined;
    let timer: number | undefined;

    function cancelPending() {
      window.cancelAnimationFrame(frame);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    }

    function schedule() {
      cancelPending();
      const current = ++generation;
      const apply = () => { if (active && current === generation) setEnabled(preference.matches); };
      if (!preference.matches || window.matchMedia("(min-width: 768px)").matches) {
        frame = window.requestAnimationFrame(apply);
        return;
      }
      const image = root.current?.querySelector<HTMLImageElement>(".hero-image img");
      void (image?.decode().catch(() => undefined) ?? Promise.resolve()).then(() => {
        if (!active || current !== generation) return;
        frame = window.requestAnimationFrame(() => {
          frame = window.requestAnimationFrame(() => {
            if (!active || current !== generation) return;
            if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(apply, { timeout: 1000 });
            else timer = window.setTimeout(apply, 0);
          });
        });
      });
    }

    schedule();
    preference.addEventListener("change", schedule);
    return () => {
      active = false;
      generation++;
      cancelPending();
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return <div ref={root} className="motion-root">{children}{enabled && <MotionEffects root={root} />}</div>;
}
