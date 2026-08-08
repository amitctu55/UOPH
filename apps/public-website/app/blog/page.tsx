import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Blog" };

const posts = [
  {
    title: "Why care continuity beats another patient portal",
    date: "Jun 12, 2026",
    excerpt: "Portals fail when context resets. Here's how UPCHAR keeps the story intact.",
  },
  {
    title: "Designing telemedicine that clinicians actually finish",
    date: "May 28, 2026",
    excerpt: "Less chrome, more chart — patterns we learned from live specialty clinics.",
  },
  {
    title: "HIPAA-inspired controls without slowing delivery",
    date: "May 3, 2026",
    excerpt: "Audit logs, encryption, and least privilege as everyday engineering defaults.",
  },
];

export default function BlogPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Blog"
        title="Notes from building connected care."
        description="Product thinking, clinical workflow research, and engineering write-ups from the UPCHAR team."
      />
      <section className="section">
        <div className="grid-cards cols-3">
          {posts.map(post => (
            <article key={post.title} className="soft-panel">
              <p className="eyebrow">{post.date}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  marginTop: "0.9rem",
                  color: "var(--sea)",
                  fontWeight: 600,
                }}
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
