import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/site";
import { restaurantJsonLd } from "@/lib/structured-data";
import JsonLd from "@/components/JsonLd";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: business.seo.title,
    template: `%s | ${business.fullName}`,
  },
  description: business.seo.description,
  keywords: [...business.seo.keywords],
  openGraph: {
    title: business.fullName,
    description: business.seo.description,
    siteName: business.fullName,
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <JsonLd data={restaurantJsonLd()} />
        {children}
      </body>
    </html>
  );
}
