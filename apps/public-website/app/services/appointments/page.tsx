import Link from "next/link";
import { PageIntro } from "../../../components/PageIntro";

export const metadata = { title: "Appointments" };

export default function AppointmentsServicePage() {
  return (
    <main>
      <PageIntro
        eyebrow="Service"
        title="Appointment scheduling without the phone tree."
        description="Patients self-book, clinics manage capacity, and reminders cut no-shows."
        primaryHref="/book"
        primaryLabel="Book an appointment"
      />
      <section className="section">
        <div className="grid-cards cols-3">
          <article className="soft-panel">
            <h3>Smart slots</h3>
            <p>Match visit type, clinician availability, and room resources automatically.</p>
          </article>
          <article className="soft-panel">
            <h3>Reminders</h3>
            <p>Email and SMS nudges keep schedules full and patients prepared.</p>
          </article>
          <article className="soft-panel">
            <h3>Reschedule flow</h3>
            <p>Patients move visits without calling the front desk.</p>
          </article>
        </div>
        <Link href="/book" className="btn btn--primary" style={{ marginTop: "1.5rem" }}>
          Schedule now
        </Link>
      </section>
    </main>
  );
}
