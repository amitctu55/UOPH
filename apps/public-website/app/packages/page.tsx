import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Health packages" };

const packages = [
  {
    name: "Essential Care",
    price: "$29/mo",
    body: "Primary care telemedicine, appointment booking, and basic records access.",
  },
  {
    name: "Family Shield",
    price: "$79/mo",
    body: "Family profiles, pediatric visits, pharmacy discounts, and annual labs.",
  },
  {
    name: "Enterprise Health",
    price: "Custom",
    body: "Employer and hospital packages with analytics, SSO, and dedicated support.",
  },
];

export default function PackagesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Packages"
        title="Memberships that match how you seek care."
        description="Choose a personal, family, or enterprise package — upgrade anytime as needs grow."
        primaryHref="/signup"
        primaryLabel="Start free trial"
      />
      <section className="section">
        <div className="grid-cards cols-3">
          {packages.map((pkg) => (
            <article key={pkg.name} className="soft-panel">
              <h3>{pkg.name}</h3>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", margin: "0.4rem 0 0.8rem" }}>
                {pkg.price}
              </p>
              <p>{pkg.body}</p>
              <Link href="/signup" className="btn btn--primary" style={{ marginTop: "1.1rem" }}>
                Choose plan
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
