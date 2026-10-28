"use client";

import { useSyncExternalStore } from "react";
import { localDateString } from "@/lib/booking-date";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

// An empty server snapshot avoids comparing dates in the server's timezone during hydration.
const serverSnapshot = () => "";
const clientSnapshot = () => localDateString();

export function useLocalDate() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
