import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Diagnostics" };

const tests = [
  { title: "Complete blood count", body: "Baseline labs with digital results in your chart." },
  { title: "Metabolic panel", body: "Kidney, liver, and electrolyte screening packages." },
  { title: "Imaging referral", body: "X-ray, ultrasound, and MRI scheduling with partner centers." },
];

export default function DiagnosticsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Diagnostics"
        title="Labs and imaging without the paper chase."
        description="Book tests, track status, and route results into the same medical record your clinician uses."
        primaryHref="/book"
        primaryLabel="Book diagnostics"
      />
      <section className="section">
        <div className="grid-cards cols-3">
          {tests.map((t) => (
            <article key={t.title} className="soft-panel">
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </article>
          ))}
        </div>
        <div className="cta-row" style={{ marginTop: "2rem" }}>
          <Link href="/book" className="btn btn--primary">
            Schedule a test
          </Link>
        </div>
      </section>
    </main>
  );
}
