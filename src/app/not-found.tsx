import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="site-container shell-content">
      <h1 className="text-display">Page not found.</h1>
      <p className="text-intro">This page isn’t part of the ORÍ Studio portfolio concept.</p>
      <Link className="button" href="/">Return to ORÍ Studio</Link>
    </main>
  );
}
