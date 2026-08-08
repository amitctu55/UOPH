import Link from "next/link";
import { PageIntro } from "../../../components/PageIntro";

export const metadata = { title: "Medical records" };

export default function MedicalRecordsServicePage() {
  return (
    <main>
      <PageIntro
        eyebrow="Service"
        title="Records that follow the patient."
        description="Store, share, and audit access to clinical documents across providers with encryption and consent controls."
        primaryHref="/signup"
        primaryLabel="Create account"
      />
      <section className="section">
        <div className="grid-cards">
          <article className="soft-panel">
            <h3>Longitudinal chart</h3>
            <p>Visits, labs, meds, and notes stay linked instead of trapped in silos.</p>
          </article>
          <article className="soft-panel">
            <h3>Consent-aware sharing</h3>
            <p>Patients and organizations control who can view sensitive documents.</p>
          </article>
        </div>
        <Link href="/contact" className="btn btn--primary" style={{ marginTop: "1.5rem" }}>
          Ask about EHR integration
        </Link>
      </section>
    </main>
  );
}
