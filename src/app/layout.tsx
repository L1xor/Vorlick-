import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jiří Vorlický | Nástrojárna a kovoobrábění Dolní Řasnice",
  description:
    "Zakázková výroba nástrojů a přípravků pro automotive, přesné broušení nástrojů a zakázkové kovoobrábění ve Frýdlantském výběžku a Libereckém kraji. Provozovna Dolní Řasnice.",
  keywords: [
    "nástrojárna",
    "kovoobrábění",
    "výroba nástrojů",
    "výroba přípravků",
    "broušení nástrojů",
    "Frýdlant v Čechách",
    "Frýdlantský výběžek",
    "Liberecký kraj",
    "automotive",
  ],
  authors: [{ name: "Jiří Vorlický" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jiří Vorlický | Nástrojárna a kovoobrábění Dolní Řasnice",
    description:
      "Zakázková výroba nástrojů a přípravků pro automotive, přesné broušení nástrojů a zakázkové kovoobrábění ve Frýdlantském výběžku.",
    locale: "cs_CZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-white text-slate-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
