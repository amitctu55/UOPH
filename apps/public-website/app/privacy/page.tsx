import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        description="How UPCHAR collects, uses, and protects personal and health information."
      />
      <section className="section" style={{ maxWidth: "48rem" }}>
        <article className="soft-panel">
          <h2>Information we process</h2>
          <p>
            Account details, appointment metadata, clinical content you or your providers enter, and
            technical logs needed to secure the service.
          </p>
          <h2 style={{ marginTop: "1.5rem" }}>How we use it</h2>
          <p>
            To deliver care workflows, authenticate users, improve reliability, meet legal
            obligations, and communicate service updates.
          </p>
          <h2 style={{ marginTop: "1.5rem" }}>Your choices</h2>
          <p>
            Request access, correction, or deletion where applicable by contacting
            privacy@upchar.health. Some records may be retained for clinical or legal requirements.
          </p>
        </article>
      </section>
    </main>
  );
}
