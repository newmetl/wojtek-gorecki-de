import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant/20 bg-surface">
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
            <p className="mt-3 font-body text-[0.8rem] font-medium text-on-surface/40">
              Psychologische und spirituelle Beratung
            </p>
          </div>

          {/* Center links */}
          <nav className="flex flex-col gap-3" aria-label="Footer-Navigation">
            <Link
              href="/blog"
              className="font-label text-[0.8rem] font-medium text-on-surface/50 transition-all duration-300 hover:text-primary"
            >
              Blog
            </Link>
            <a
              href="https://www.facebook.com/wojtek.gorecki"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-[0.8rem] font-medium text-on-surface/50 transition-all duration-300 hover:text-primary"
            >
              Facebook
            </a>
            <a
              href="mailto:hallo@wojtek-gorecki.de"
              className="font-label text-[0.8rem] font-medium text-on-surface/50 transition-all duration-300 hover:text-primary"
            >
              E-Mail
            </a>
          </nav>

          {/* Copyright + legal */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="font-label text-[0.75rem] font-medium text-on-surface/35">
              &copy; {currentYear} Wojtek Gorecki
            </p>
            <div className="flex gap-6">
              <Link
                href="/impressum"
                className="font-label text-[0.75rem] font-medium text-on-surface/35 transition-all duration-300 hover:text-on-surface/70"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="font-label text-[0.75rem] font-medium text-on-surface/35 transition-all duration-300 hover:text-on-surface/70"
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
