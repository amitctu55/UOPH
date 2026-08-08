import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Hospitals" };

const hospitals = [
  {
    name: "Riverbend Medical Center",
    city: "Austin, TX",
    focus: "Tertiary care, cardiology, and emergency medicine.",
  },
  {
    name: "Northline Community Hospital",
    city: "Chicago, IL",
    focus: "Community hospital with strong maternity and orthopedics.",
  },
  {
    name: "Harborview Specialty Clinic Network",
    city: "Seattle, WA",
    focus: "Multi-specialty outpatient network with telemedicine hubs.",
  },
];

export default function HospitalsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Hospitals"
        title="Partner facilities across the network."
        description="Browse hospitals and clinic networks running on UPCHAR for scheduling, records, and operations."
        primaryHref="/contact"
        primaryLabel="Become a partner hospital"
      />

      <section className="section">
        <div className="grid-cards cols-3">
          {hospitals.map((h) => (
            <article key={h.name} className="soft-panel">
              <h3>{h.name}</h3>
              <p style={{ color: "var(--sea)", fontWeight: 600, marginBottom: "0.5rem" }}>{h.city}</p>
              <p>{h.focus}</p>
              <Link href="/book" style={{ display: "inline-block", marginTop: "1rem", color: "var(--sea)", fontWeight: 600 }}>
                Book at this facility →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
