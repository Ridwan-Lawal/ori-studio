import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteOrigin } from "@/lib/site-metadata";
import "./globals.css";

const editorial = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});
const interfaceFont = Manrope({
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: siteOrigin(),
  robots: { index: false, follow: true },
  icons: { icon: "/icon.svg" },
  title: { default: "ORÍ Studio — Fictional haircare concept", template: "%s | ORÍ Studio" },
  description: "A fictional portfolio concept for a premium natural-hair salon in Lagos. Explore the design preview; no real appointments are accepted.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${editorial.variable} ${interfaceFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
