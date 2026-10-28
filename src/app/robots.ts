import type { MetadataRoute } from "next";

// Crawlers must be able to read the page-level noindex directive.
// No sitemap is advertised while the fictional demonstration is intentionally noindex.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
