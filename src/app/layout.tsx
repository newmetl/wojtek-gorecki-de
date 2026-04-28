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

const DESCRIPTION =
  "Begleitung auf dem Weg zu innerer Klarheit. Psychologische und spirituelle Beratung in einem Raum der Stille und Präsenz.";
const TITLE = "Wojtek Gorecki – Psychologische und spirituelle Beratung";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2d3b2e",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Wojtek Gorecki",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/images/og-default.jpg", alt: TITLE }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wojtek Gorecki",
  url: BASE_URL,
  description: DESCRIPTION,
  jobTitle: "Psychologischer und spiritueller Berater",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
  sameAs: [BASE_URL],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  );
}
