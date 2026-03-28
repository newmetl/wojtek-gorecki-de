import type { Metadata } from "next";
import { EB_Garamond, Quicksand } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wojtek Gorecki \u2013 Psychologische und spirituelle Beratung",
  description:
    "Begleitung auf dem Weg zu innerer Klarheit. Psychologische und spirituelle Beratung in einem Raum der Stille und Pr\u00e4senz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${ebGaramond.variable} ${quicksand.variable}`}
    >
      <body className="bg-surface text-on-surface font-body antialiased">
        <Navigation />
        <main className="min-h-screen pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
