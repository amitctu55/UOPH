import Link from "next/link";
import { PageIntro } from "../../components/PageIntro";

export const metadata = { title: "Services" };

const services = [
  {
    href: "/services/telemedicine",
    title: "Telemedicine",
    body: "Encrypted video visits with shared charts and follow-up plans.",
  },
  {
    href: "/services/appointments",
    title: "Appointments",
    body: "Intelligent scheduling, reminders, and waitlist recovery.",
  },
  {
    href: "/services/medical-records",
    title: "Medical records",
    body: "Secure longitudinal records that travel with the patient.",
  },
  {
    href: "/pharmacy",
    title: "Pharmacy",
    body: "E-prescribe, refill, and delivery coordination in one flow.",
  },
  {
    href: "/diagnostics",
    title: "Diagnostics",
    body: "Book labs and imaging with results routed into the chart.",
  },
  {
    href: "/packages",
    title: "Health packages",
    body: "Membership and preventive packages for families and employers.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Services"
        title="A full stack for modern care delivery."
        description="Use UPCHAR modules alone or as one integrated platform across clinics and hospitals."
        primaryHref="/contact"
        primaryLabel="Talk to sales"
        secondaryHref="/book"
        secondaryLabel="Book a visit"
      />

      <section className="section">
        <div className="grid-cards cols-3">
          {services.map((service) => (
            <Link key={service.href} href={service.href} className="soft-panel">
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <p style={{ marginTop: "0.9rem", color: "var(--sea)", fontWeight: 600 }}>Learn more →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
