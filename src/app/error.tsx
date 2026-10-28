"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return (
    <main id="main-content" tabIndex={-1} className="site-container shell-content">
      <h1 ref={heading} tabIndex={-1} className="text-display">Something went wrong.</h1>
      <p className="text-intro">We couldn’t display this page. Please try again or return to the homepage.</p>
      <button type="button" className="button" onClick={reset}>Try again</button>
      <p><Link className="text-link" href="/">Return to ORÍ Studio</Link></p>
    </main>
  );
}
