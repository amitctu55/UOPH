import Link from "next/link";

export default function ServicesIndex() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-center text-slate-900 mb-6">
            Our Healthcare Solutions
          </h1>
          <p className="text-xl text-center text-slate-600 max-w-3xl mx-auto">
            Comprehensive digital health solutions designed to improve patient care, streamline
            operations, and enhance clinical outcomes.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Choose Your Solution
          </h2>
          <p className="text-center text-slate-600 max-w-4xl mx-auto mb-16">
            UPCHAR offers a comprehensive suite of healthcare technology solutions that can be
            implemented individually or as an integrated platform.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Telemedicine */}
            <Link href="/services/telemedicine" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12.173 8a10 10 0 116.883 0"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Telemedicine
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      Secure video consultations with specialists and primary care physicians from
                      anywhere.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Appointment Booking */}
            <Link href="/services/appointments" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Appointment Scheduling
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      Streamline patient appointments with intelligent scheduling and automated
                      reminders.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Medical Records */}
            <Link href="/services/medical-records" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m2 0a2 2 0 100-4m0 4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Electronic Health Records
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      Secure, interoperable health records that follow patients across the care
                      continuum.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Pharmacy */}
            <Link href="/services/pharmacy" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0-2c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 6c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Pharmacy Management
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      End-to-end prescription management from e-prescribing to medication delivery.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Billing & Payments */}
            <Link href="/services/billing" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0-2c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 6c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Billing & Payments
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      Streamlined medical billing, claims processing, and payment management.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Analytics */}
            <Link href="/services/analytics" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0-2c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 6c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Healthcare Analytics
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      Advanced analytics and reporting for improved clinical and operational
                      decision making.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Patient Portal */}
            <Link href="/services/patient-portal" className="group">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0-2c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 6c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      Patient Portal
                    </h3>
                    <p className="text-slate-600 line-clamp-3">
                      Empower patients with access to their health information and care tools.
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium">Learn More →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Healthcare Delivery?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how UPCHAR's integrated platform can help your organization achieve better
            patient outcomes and operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              Contact Sales
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center px-8 py-3 bg-white/20 text-white border border-white/20 hover:bg-white/30 transition-colors duration-300"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
