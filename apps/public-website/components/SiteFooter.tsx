import Link from "next/link";

const columns = [
  {
    title: "Care",
    links: [
      { href: "/services", label: "Services" },
      { href: "/doctors", label: "Doctors" },
      { href: "/hospitals", label: "Hospitals" },
      { href: "/diagnostics", label: "Diagnostics" },
      { href: "/pharmacy", label: "Pharmacy" },
      { href: "/book", label: "Book a visit" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/packages", label: "Health packages" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" className="brand-mark brand-mark--footer">
            <span className="brand-mark__glyph" aria-hidden="true">
              U
            </span>
            <span className="brand-mark__name">UPCHAR</span>
          </Link>
          <p>
            Connected care for patients, clinicians, and hospitals — telemedicine, records,
            pharmacy, and billing in one secure platform.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="site-footer__col">
            <h2>{col.title}</h2>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} UPCHAR. Built for safer, faster care delivery.</p>
      </div>
    </footer>
  );
}
