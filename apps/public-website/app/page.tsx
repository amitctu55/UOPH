import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="home-hero" aria-label="UPCHAR hero">
        <div className="home-hero__media" aria-hidden="true" />
        <div className="home-hero__content">
          <p className="home-hero__brand">UPCHAR</p>
          <h1>Care that travels with every patient.</h1>
          <p className="lede">
            One secure platform for telemedicine, appointments, records, pharmacy, and hospital
            operations.
          </p>
          <div className="cta-row">
            <Link href="/book" className="btn btn--primary">
              Book a visit
            </Link>
            <Link href="/services" className="btn btn--ghost" style={{ color: "#10241f" }}>
              Explore services
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Built for every side of care</h2>
        <p className="lede">
          Patients get clarity. Clinicians get flow. Hospitals get one operational picture.
        </p>
        <div className="feature-rail" style={{ marginTop: "2rem" }}>
          <article>
            <h3>Patients</h3>
            <p>Find doctors, join video visits, refill prescriptions, and keep records close.</p>
          </article>
          <article>
            <h3>Doctors</h3>
            <p>Manage schedules, chart encounters, and follow patients across visits.</p>
          </article>
          <article>
            <h3>Hospitals</h3>
            <p>Coordinate departments, billing, staffing, and analytics from one mesh.</p>
          </article>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>From first booking to lasting follow-up</h2>
          <p className="lede">
            UPCHAR stitches the journey together so nobody loses context between rooms, screens, or
            clinics.
          </p>
          <ol className="list-clean" style={{ marginTop: "1.5rem" }}>
            <li>
              <strong>Match & book</strong> — search specialists, hospitals, and packages in
              minutes.
            </li>
            <li>
              <strong>Consult securely</strong> — in-person or telemedicine with shared records.
            </li>
            <li>
              <strong>Continue care</strong> — pharmacy, diagnostics, and reminders stay connected.
            </li>
          </ol>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            <Link href="/doctors" className="btn btn--primary">
              Find a doctor
            </Link>
            <Link href="/about" className="btn btn--ghost">
              Our mission
            </Link>
          </div>
        </div>
        <div className="visual-panel" role="img" aria-label="Clinician speaking with a patient" />
      </section>

      <section className="band">
        <div className="section">
          <h2>Ready when care can&apos;t wait</h2>
          <p className="lede">
            Start with a visit, a hospital partnership, or a health package tailored to your team.
          </p>
          <div className="cta-row" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
            <Link href="/signup" className="btn btn--primary">
              Create account
            </Link>
            <Link href="/contact" className="btn btn--ghost" style={{ color: "#10241f" }}>
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
