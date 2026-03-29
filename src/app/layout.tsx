import type { Metadata, Viewport } from "next";
import { EB_Garamond, Quicksand } from "next/font/google";
import "./globals.css";

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

const BASE_URL = "https://wojtek-gorecki.de";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Wojtek Gorecki – Psychologische und spirituelle Beratung",
  description:
    "Begleitung auf dem Weg zu innerer Klarheit. Psychologische und spirituelle Beratung in einem Raum der Stille und Präsenz.",
  openGraph: {
    title: "Wojtek Gorecki – Psychologische und spirituelle Beratung",
    description:
      "Begleitung auf dem Weg zu innerer Klarheit. Psychologische und spirituelle Beratung in einem Raum der Stille und Präsenz.",
    url: BASE_URL,
    siteName: "Wojtek Gorecki",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Wojtek Gorecki – Psychologische und spirituelle Beratung",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
