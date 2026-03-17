import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Palki: Cuisine of India | Authentic Indian Restaurant Ottawa",
  description:
    "Experience the finest authentic Indian cuisine in Ottawa. Palki Restaurant offers an exquisite dining experience, premium banquet hall for 150 guests, and direct online ordering. Reserve your table today.",
  keywords: [
    "Indian restaurant Ottawa",
    "Palki restaurant",
    "authentic Indian cuisine",
    "banquet hall Ottawa",
    "Indian food Ottawa",
    "fine dining Ottawa",
    "curry Ottawa",
    "wedding reception Ottawa",
  ],
  openGraph: {
    title: "Palki: Cuisine of India",
    description: "Premium authentic Indian cuisine & banquet hall in Ottawa. Reserve your table or plan your event today.",
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
        {children}
      </body>
    </html>
  );
}
