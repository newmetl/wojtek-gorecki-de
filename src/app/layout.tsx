import type { Metadata } from "next";
import { Noto_Serif, Work_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const notoSerif = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
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
      className={`${notoSerif.variable} ${workSans.variable}`}
    >
      <body className="bg-surface text-on-surface font-body antialiased">
        <Navigation />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
