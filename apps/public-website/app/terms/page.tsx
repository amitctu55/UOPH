import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Legal"
        title="Terms of Service"
        description="The rules for using UPCHAR websites, dashboards, and related services."
      />
      <section className="section" style={{ maxWidth: "48rem" }}>
        <article className="soft-panel">
          <h2>Using UPCHAR</h2>
          <p>
            You agree to provide accurate information, protect account credentials, and use the
            platform only for lawful healthcare and administrative purposes.
          </p>
          <h2 style={{ marginTop: "1.5rem" }}>Clinical responsibility</h2>
          <p>
            UPCHAR facilitates care coordination. Licensed clinicians remain responsible for medical
            decisions. The platform is not an emergency service.
          </p>
          <h2 style={{ marginTop: "1.5rem" }}>Availability</h2>
          <p>
            We target high availability but may perform maintenance or experience interruptions.
            Enterprise agreements define specific uptime commitments.
          </p>
        </article>
      </section>
    </main>
  );
}
