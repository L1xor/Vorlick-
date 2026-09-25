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
    "Nástrojárna Jiřího Vorlického v Dolní Řasnici. Výroba nástrojů a přípravků, soustružení, frézování a zakázkové kovoobrábění pro zákazníky v celém Libereckém kraji.",
  keywords: [
    "nástrojárna",
    "kovoobrábění",
    "výroba nástrojů",
    "výroba přípravků",
    "soustružení",
    "frézování",
    "Frýdlant v Čechách",
    "Liberecký kraj",
  ],
  authors: [{ name: "Jiří Vorlický" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jiří Vorlický | Nástrojárna a kovoobrábění Dolní Řasnice",
    description:
      "Výroba nástrojů a přípravků, soustružení, frézování a zakázkové kovoobrábění pro zákazníky v celém Libereckém kraji.",
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
