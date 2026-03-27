"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "\u25A0" },
  { href: "/admin/termine", label: "Termine", icon: "\u25CB" },
  { href: "/admin/locations", label: "Locations", icon: "\u25B3" },
  { href: "/admin/blog", label: "Blog", icon: "\u25C7" },
  { href: "/admin/einstellungen", label: "Einstellungen", icon: "\u2699" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === "/admin/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white border border-[#e0ddd8] rounded-lg p-2 shadow-sm"
        aria-label="Toggle navigation"
      >
        <svg
          className="w-5 h-5 text-[#1a1c1a]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-60 bg-white border-r border-[#e0ddd8] flex flex-col transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-[#e0ddd8]">
          <h1 className="font-label font-semibold text-lg text-[#795437]">
            Admin
          </h1>
          <p className="text-xs text-[#1a1c1a]/50 font-label mt-0.5">
            wojtek-gorecki.de
          </p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-label transition-colors ${
                isActive(item.href)
                  ? "bg-[#795437]/10 text-[#795437] font-medium"
                  : "text-[#1a1c1a]/70 hover:bg-[#faf9f6] hover:text-[#1a1c1a]"
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[#e0ddd8] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-label text-[#1a1c1a]/70 hover:bg-[#faf9f6] hover:text-[#1a1c1a] transition-colors"
          >
            Zur Website &rarr;
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-label text-[#1a1c1a]/70 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </aside>
    </>
  );
}
