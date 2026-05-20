import type { Metadata, Viewport } from "next";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { site } from "@/content/site";
import { LenisProvider } from "@/components/chrome/LenisProvider";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
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
    "react",
    "next.js",
    "typescript",
    "laravel",
    "yii2",
    "portfolio",
    "joão vitor chaves",
    "jotavtech",
  ],
  authors: [{ name: site.name, url: site.social.github }],
  creator: site.name,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.alias,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
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
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="relative bg-ink text-chrome-100 antialiased">
        <LenisProvider />
        <Header />
        <main className="relative">{children}</main>
        <Footer />
        <Grain opacity={0.06} />
        <Scanlines opacity={0.035} />
      </body>
    </html>
  );
}
