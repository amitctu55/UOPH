"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="UPCHAR home">
          <span className="brand-mark__glyph" aria-hidden="true">
            U
          </span>
          <span className="brand-mark__name">UPCHAR</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "is-active"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/login" className="btn btn--ghost">
            Sign in
          </Link>
          <Link href="/book" className="btn btn--primary">
            Book visit
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(v => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
          {nav.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link href="/book" className="btn btn--primary" onClick={() => setOpen(false)}>
            Book visit
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
