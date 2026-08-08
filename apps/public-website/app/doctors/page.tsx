import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Doctors" };

const doctors = [
  {
    name: "Dr. Aisha Rahman",
    specialty: "Cardiology",
    detail: "Preventive cardiology, hypertension, and cardiac rehab.",
  },
  {
    name: "Dr. Noah Patel",
    specialty: "Family medicine",
    detail: "Primary care for adults and teens with chronic care plans.",
  },
  {
    name: "Dr. Elena Vargas",
    specialty: "Dermatology",
    detail: "Virtual consults for rashes, acne, and post-procedure follow-up.",
  },
  {
    name: "Dr. James Okonkwo",
    specialty: "Pediatrics",
    detail: "Well-child visits, vaccines, and same-day teletriage.",
  },
];

export default function DoctorsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Doctors"
        title="Find the right clinician, faster."
        description="Search by specialty, availability, and visit type — then book in-person or video care."
        primaryHref="/book"
        primaryLabel="Book a consultation"
      />

      <section className="section">
        <div className="grid-cards">
          {doctors.map((doc) => (
            <article key={doc.name} className="soft-panel">
              <h3>{doc.name}</h3>
              <p style={{ color: "var(--sea)", fontWeight: 600, marginBottom: "0.5rem" }}>
                {doc.specialty}
              </p>
              <p>{doc.detail}</p>
              <div className="cta-row" style={{ marginTop: "1rem" }}>
                <Link href="/book" className="btn btn--primary">
                  Schedule
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
