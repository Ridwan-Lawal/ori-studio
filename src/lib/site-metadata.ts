import type { Metadata } from "next";

/** Use a configured URL or Vercel's actual deployment hostname; never invent a public domain. */
export function siteOrigin(): URL | undefined {
  const configured = process.env.SITE_URL;
  const deployment = process.env.VERCEL_URL;
  if (!configured && !deployment) return undefined;
  const origin = new URL(configured ?? `https://${deployment}`);
  if (!["http:", "https:"].includes(origin.protocol) || origin.username || origin.password) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials.");
  }
  return new URL(origin.origin);
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const origin = siteOrigin();
  const url = origin ? new URL(path, origin) : undefined;
  const image = origin ? {
    url: new URL("/images/ori-studio/social-preview.png", origin),
    width: 1200,
    height: 630,
    alt: "ORÍ Studio — fictional portfolio concept. Editorial natural-afro portrait; no real appointments are accepted.",
  } : undefined;
  const socialTitle = `${title} | ORÍ Studio — Fictional portfolio concept`;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title: socialTitle, description, type: "website", siteName: "ORÍ Studio — Fictional portfolio concept", ...(url ? { url } : {}), ...(image ? { images: [image] } : {}) },
    twitter: { card: "summary_large_image", title: socialTitle, description, ...(image ? { images: [image.url] } : {}) },
  };
}
