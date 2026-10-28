import Link from "next/link";
import { conceptDisclosure, shellPages } from "@/content/site";

type RouteShellProps = { page: keyof typeof shellPages };

export function RouteShell({ page }: RouteShellProps) {
  const { label, title } = shellPages[page];
  return (
    <main id="main-content" tabIndex={-1} className="site-container shell-content">
      <p className="text-eyebrow text-clay-text">{label}</p>
      <h1 className="text-display">{title}</h1>
      <p className="text-intro text-muted-ink">
        Temporary page shell — Milestone 0: project foundation.
      </p>
      {page === "book" && <p className="disclosure">{conceptDisclosure}</p>}
      <Link className="button" href={page === "home" ? "/services" : "/"}>
        {page === "home" ? "Explore services" : "ORÍ Studio"}
      </Link>
    </main>
  );
}
