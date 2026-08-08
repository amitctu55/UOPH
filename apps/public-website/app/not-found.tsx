import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ textAlign: "center", minHeight: "50vh" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem" }}>Page not found</h1>
      <p className="lede" style={{ margin: "1rem auto" }}>
        That route isn&apos;t part of the UPCHAR public site. Head home or book a visit instead.
      </p>
      <div className="cta-row" style={{ justifyContent: "center" }}>
        <Link href="/" className="btn btn--primary">
          Back home
        </Link>
        <Link href="/book" className="btn btn--ghost">
          Book a visit
        </Link>
      </div>
    </main>
  );
}
