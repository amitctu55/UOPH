import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            FAQ
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-6">
          <div className="border border-slate-200 rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-slate-900">
                How does UPCHAR ensure the security of my medical data?
              </h3>
              <button className="faq-toggle w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800">
                <span>Show answer</span>
                <span className="ml-auto h-4 w-4 shrink-0">
                  <svg className="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div className="faq-content hidden pt-4">
                <p className="text-slate-600">
                  We employ bank-level security measures including AES-256 encryption for data at
                  rest, TLS 1.3 for data in transit, regular security audits, and HIPAA-compliant
                  practices. Your medical information is stored in secure, isolated environments
                  with strict access controls and continuous monitoring.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-slate-900">
                What types of healthcare providers can I find on UPCHAR?
              </h3>
              <button className="faq-toggle w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800">
                <span>Show answer</span>
                <span className="ml-auto h-4 w-4 shrink-0">
                  <svg className="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div className="faq-content hidden pt-4">
                <p className="text-slate-600">
                  UPCHAR connects you with a comprehensive network of healthcare providers including
                  primary care physicians, specialists (cardiology, dermatology, pediatrics, etc.),
                  hospitals, clinics, diagnostic centers, pharmacies, and allied health
                  professionals. All providers are verified and credentialed before joining our
                  platform.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-slate-900">
                How much does it cost to use UPCHAR?
              </h3>
              <button className="faq-toggle w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800">
                <span>Show answer</span>
                <span className="ml-auto h-4 w-4 shrink-0">
                  <svg className="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div className="faq-content hidden pt-4">
                <p className="text-slate-600">
                  Creating an account and browsing providers is free. Consultation fees vary by
                  provider and service type, with transparent pricing shown before booking. We
                  accept various insurance plans and offer multiple payment options including
                  credit/debit cards, digital wallets, and instalment plans for larger procedures.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-slate-900">
                Is UPCHAR available in my area/country?
              </h3>
              <button className="faq-toggle w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800">
                <span>Show answer</span>
                <span className="ml-auto h-4 w-4 shrink-0">
                  <svg className="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div className="faq-content hidden pt-4">
                <p className="text-slate-600">
                  UPCHAR is currently available in major metropolitan areas across the United
                  States, with plans to expand nationwide and internationally. Enter your zip code
                  on our homepage to check availability in your specific location, or contact our
                  support team for the most up-to-date coverage information.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-slate-900">
                How do I schedule a telemedicine consultation?
              </h3>
              <button className="faq-toggle w-full text-left px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-800">
                <span>Show answer</span>
                <span className="ml-auto h-4 w-4 shrink-0">
                  <svg className="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div className="faq-content hidden pt-4">
                <p className="text-slate-600">
                  Scheduling a telemedicine consultation is simple: 1) Create your free account, 2)
                  Search for doctors by specialty or name, 3) View available time slots, 4) Select a
                  convenient appointment time, 5) Confirm your booking and receive a secure video
                  link. You'll receive reminders via email and SMS before your appointment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Still Need Help? Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
