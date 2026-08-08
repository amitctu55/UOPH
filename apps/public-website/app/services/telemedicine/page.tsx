import Link from "next/link";
import { PageIntro } from "../../../components/PageIntro";

export const metadata = { title: "Telemedicine" };

export default function TelemedicinePage() {
  return (
    <main>
      <PageIntro
        eyebrow="Service"
        title="Telemedicine built for real clinical flow."
        description="Secure video visits with chart context, prescriptions, and follow-up scheduling in one session."
        primaryHref="/book"
        primaryLabel="Book a video visit"
        secondaryHref="/services"
        secondaryLabel="All services"
      />
      <section className="section split">
        <div>
          <h2>What you get</h2>
          <ul className="list-clean">
            <li>Encrypted video with waiting room and clinician controls</li>
            <li>Shared medical history and notes during the encounter</li>
            <li>Instant handoff to pharmacy or diagnostics</li>
          </ul>
          <Link href="/book" className="btn btn--primary" style={{ marginTop: "1.25rem" }}>
            Start now
          </Link>
        </div>
        <div
          className="visual-panel"
          style={{
            backgroundImage:
              'linear-gradient(160deg, rgba(11,110,79,0.3), rgba(16,36,31,0.55)), url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80")',
          }}
          role="img"
          aria-label="Telemedicine consultation"
        />
      </section>
    </main>
  );
}
