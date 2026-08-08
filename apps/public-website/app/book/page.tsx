import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Book a visit" };

export default function BookPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Book"
        title="Schedule care in a few clear steps."
        description="Choose visit type, specialty, and preferred time. We'll confirm availability and send reminders."
      />

      <section className="section" style={{ maxWidth: "40rem" }}>
        <form className="form-stack soft-panel">
          <label>
            Full name
            <input name="name" type="text" required placeholder="Alex Morgan" />
          </label>
          <label>
            Email
            <input name="email" type="email" required placeholder="alex@email.com" />
          </label>
          <label>
            Visit type
            <select name="type" defaultValue="telemedicine" required>
              <option value="telemedicine">Telemedicine</option>
              <option value="in-person">In-person</option>
              <option value="diagnostics">Diagnostics</option>
            </select>
          </label>
          <label>
            Specialty
            <select name="specialty" defaultValue="primary" required>
              <option value="primary">Primary care</option>
              <option value="cardiology">Cardiology</option>
              <option value="dermatology">Dermatology</option>
              <option value="pediatrics">Pediatrics</option>
            </select>
          </label>
          <label>
            Preferred date
            <input name="date" type="date" required />
          </label>
          <label>
            Notes
            <textarea name="notes" rows={4} placeholder="Symptoms, preferences, or previous providers" />
          </label>
          <button type="submit" className="btn btn--primary">
            Request appointment
          </button>
        </form>
      </section>
    </main>
  );
}
