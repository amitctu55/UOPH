import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Pharmacy" };

export default function PharmacyPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Pharmacy"
        title="Prescriptions that stay connected to care."
        description="E-prescribe, refill, and delivery coordination with medication history visible to your care team."
        primaryHref="/signup"
        primaryLabel="Open pharmacy account"
        secondaryHref="/contact"
        secondaryLabel="Partner pharmacies"
      />
      <section className="section split">
        <div>
          <h2>End-to-end medication flow</h2>
          <ul className="list-clean">
            <li>Clinicians send prescriptions directly from the encounter.</li>
            <li>Patients track refill status and delivery windows.</li>
            <li>Pharmacies sync inventory and fulfillment updates.</li>
          </ul>
          <Link href="/book" className="btn btn--primary" style={{ marginTop: "1.25rem" }}>
            Start a refill request
          </Link>
        </div>
        <div
          className="visual-panel"
          style={{
            backgroundImage:
              'linear-gradient(160deg, rgba(11,110,79,0.25), rgba(16,36,31,0.5)), url("https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80")',
          }}
          role="img"
          aria-label="Pharmacy shelves"
        />
      </section>
    </main>
  );
}
