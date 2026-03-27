import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="font-headline text-lg italic text-on-surface transition-opacity hover:opacity-80"
            >
              Wojtek Gorecki
            </Link>
            <p className="mt-3 font-body text-sm text-on-surface/60">
              Psychologische und spirituelle Beratung
            </p>
          </div>

          {/* Center links */}
          <nav className="flex flex-col gap-3" aria-label="Footer-Navigation">
            <Link
              href="/blog"
              className="font-body text-sm text-on-surface opacity-60 transition-opacity hover:opacity-100"
            >
              Blog
            </Link>
            <a
              href="https://www.facebook.com/wojtek.gorecki"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-on-surface opacity-60 transition-opacity hover:opacity-100"
            >
              Facebook
            </a>
            <a
              href="mailto:kontakt@wojtek-gorecki.de"
              className="font-body text-sm text-on-surface opacity-60 transition-opacity hover:opacity-100"
            >
              E-Mail
            </a>
          </nav>

          {/* Copyright + legal */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="font-body text-sm text-on-surface opacity-60">
              &copy; {currentYear} Wojtek Gorecki
            </p>
            <div className="flex gap-4">
              <Link
                href="/impressum"
                className="font-body text-sm text-on-surface opacity-60 transition-opacity hover:opacity-100"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="font-body text-sm text-on-surface opacity-60 transition-opacity hover:opacity-100"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
