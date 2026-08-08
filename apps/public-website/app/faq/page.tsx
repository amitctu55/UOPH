import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "FAQ" };

const faqs = [
  {
    q: "How does UPCHAR protect medical data?",
    a: "We use TLS 1.3 in transit, AES-256 at rest, strict access controls, and full audit logging inspired by HIPAA and GDPR requirements.",
  },
  {
    q: "Who can join the network?",
    a: "Patients, independent clinicians, clinics, hospitals, diagnostic centers, and pharmacies after credential verification.",
  },
  {
    q: "What does it cost?",
    a: "Individuals can start with Essential Care. Hospitals and employers receive custom enterprise pricing.",
  },
  {
    q: "Can we use only telemedicine?",
    a: "Yes. Modules are composable — start with telemedicine and add records, pharmacy, or billing later.",
  },
];

export default function FAQPage() {
  return (
    <main>
      <PageIntro
        eyebrow="FAQ"
        title="Straight answers about UPCHAR."
        description="Security, pricing, and how the platform fits into existing clinical workflows."
      />
      <section className="section">
        <div className="list-clean">
          {faqs.map((item) => (
            <details key={item.q} className="soft-panel">
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{item.q}</summary>
              <p style={{ marginTop: "0.75rem" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
