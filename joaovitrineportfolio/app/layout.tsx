import type { Metadata, Viewport } from "next";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { site } from "@/content/site";
import { LenisProvider } from "@/components/chrome/LenisProvider";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { KeyboardNav } from "@/components/chrome/KeyboardNav";
import { BootSequenceGate } from "@/components/chrome/BootSequenceGate";
import { Grain } from "@/components/primitives/Grain";
import { Scanlines } from "@/components/primitives/Scanlines";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.alias}`,
  },
  description: site.description,
  keywords: [
    "fullstack engineer",
    "design engineer",
    "react",
    "next.js",
    "typescript",
    "laravel",
    "yii2",
    "cinematic interfaces",
    "production engineering",
    "remote engineer",
    "portfolio",
    "joão vitor chaves",
    "jotavtech",
  ],
  authors: [{ name: site.name, url: site.social.github }],
  creator: site.name,
  icons: {
    icon: [
      { url: site.thumbnail, type: "image/png" },
      { url: site.thumbnail, sizes: "32x32", type: "image/png" },
      { url: site.thumbnail, sizes: "192x192", type: "image/png" },
    ],
    shortcut: site.thumbnail,
    apple: [{ url: site.thumbnail, type: "image/png" }],
  },
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.alias,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: site.thumbnail,
        width: 1018,
        height: 746,
        alt: `${site.alias} monogram`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [site.thumbnail],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="relative bg-ink text-chrome-100 antialiased">
        <LenisProvider />
        <BootSequenceGate />
        <Header />
        <KeyboardNav />
        <main className="relative">{children}</main>
        <Footer />
        {/* atmosphere — grain + scanlines + vignette */}
        <Grain opacity={0.06} />
        <Scanlines opacity={0.035} />
        <div
          aria-hidden
          className="vignette pointer-events-none fixed inset-0 z-[1]"
        />
      </body>
    </html>
  );
}
