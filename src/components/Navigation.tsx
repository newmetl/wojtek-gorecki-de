"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Start" },
  { href: "/offenes-treffen", label: "Offenes Treffen" },
  { href: "/begleitgespraech", label: "Begleitgespräch" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/blog", label: "Blog" },
  { href: "/#newsletter", label: "Newsletter" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Track scroll for subtle shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
        mobileOpen
          ? "bg-surface"
          : scrolled
            ? "bg-surface/90 shadow-sm shadow-black/[0.03] backdrop-blur-xl"
            : "bg-surface/80 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 pt-[max(1.25rem,env(safe-area-inset-top))] md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline text-[1.35rem] italic text-on-surface transition-opacity hover:opacity-80"
        >
          Wojtek Gorecki
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative font-label text-[0.8rem] font-medium tracking-wider transition-all duration-300 ${
                  isActive(link.href)
                    ? "font-medium text-primary"
                    : "text-on-surface/60 hover:text-on-surface"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] rounded-full bg-primary" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block h-[1.5px] w-6 bg-on-surface transition-all duration-300 ${
              mobileOpen ? "translate-y-[7.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-on-surface transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-on-surface transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

    </header>

    {/* Mobile overlay — rendered outside header so z-index stacking is independent */}
    <div
      className={`fixed inset-0 z-[60] bg-surface transition-all duration-500 md:hidden ${
        mobileOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <nav className="flex h-[100dvh] flex-col items-center justify-center gap-5 px-6 pb-10 pt-28">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className={`font-headline text-2xl transition-all duration-500 ${
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${
              isActive(link.href)
                ? "text-primary"
                : "text-on-surface/70 hover:text-primary"
            }`}
            style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
    </>
  );
}
