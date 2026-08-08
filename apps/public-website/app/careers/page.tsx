import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Careers" };

const roles = [
  { title: "Senior NestJS Engineer", loc: "Remote / Austin" },
  { title: "Frontend Engineer (Next.js)", loc: "Remote" },
  { title: "Clinical Product Manager", loc: "Hybrid — Chicago" },
  { title: "Security & Compliance Lead", loc: "Remote" },
];

export default function CareersPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Careers"
        title="Build infrastructure that improves real visits."
        description="Join clinicians, designers, and engineers shipping a healthcare platform meant for production wards and living rooms alike."
        primaryHref="/contact"
        primaryLabel="Apply via contact"
      />
      <section className="section">
        <ul className="list-clean">
          {roles.map((role) => (
            <li key={role.title} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <strong>{role.title}</strong>
                <div style={{ color: "var(--ink-soft)" }}>{role.loc}</div>
              </div>
              <Link href="/contact" style={{ color: "var(--sea)", fontWeight: 600 }}>
                Apply →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
