import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="About"
        title="Healthcare technology with clinical gravity."
        description="UPCHAR exists so patients, doctors, and hospitals share one trustworthy system of record and care delivery."
        primaryHref="/careers"
        primaryLabel="Join the team"
        secondaryHref="/contact"
        secondaryLabel="Partner with us"
      />

      <section className="section split">
        <div>
          <h2>Mission</h2>
          <p className="lede">
            Give clinicians time back, give patients clarity, and give hospitals an operational
            backbone that scales without fragmenting care.
          </p>
          <h2 style={{ marginTop: "2rem" }}>Vision</h2>
          <p className="lede">
            A connected care mesh where telemedicine, diagnostics, pharmacy, and billing feel like
            one continuous experience.
          </p>
        </div>
        <div
          className="visual-panel"
          style={{
            backgroundImage:
              'linear-gradient(160deg, rgba(11,110,79,0.25), rgba(16,36,31,0.5)), url("https://images.unsplash.com/photo-1551076805-e1869033fa41?auto=format&fit=crop&w=1400&q=80")',
          }}
          role="img"
          aria-label="Care team collaborating"
        />
      </section>

      <section className="section">
        <h2>What we stand for</h2>
        <div className="grid-cards cols-3" style={{ marginTop: "1.5rem" }}>
          <article className="soft-panel">
            <h3>Patient-first</h3>
            <p>Every workflow starts from access, understanding, and continuity of care.</p>
          </article>
          <article className="soft-panel">
            <h3>Privacy by design</h3>
            <p>Encryption, audit trails, and least-privilege access are defaults, not add-ons.</p>
          </article>
          <article className="soft-panel">
            <h3>Practical innovation</h3>
            <p>We ship features clinicians will use on a Tuesday morning, not just demos.</p>
          </article>
        </div>
      </section>

      <section className="band">
        <div className="section">
          <h2>Help us rewrite the care journey</h2>
          <p className="lede">Engineers, clinicians, and operators — we&apos;re hiring builders.</p>
          <div className="cta-row" style={{ justifyContent: "center", marginTop: "1.25rem" }}>
            <Link href="/careers" className="btn btn--primary">
              View careers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
