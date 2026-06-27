import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Section */}
      <section className="px-6 pt-16 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary mr-2">
              Enterprise healthcare platform
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Healthcare delivery designed for patients, doctors, and hospitals.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600 mx-auto">
              UPCHAR brings teleconsultation, appointment booking, medical records, pharmacy,
              billing, and analytics together in a secure cloud-native platform.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-primary"
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
                  <h3 className="font-semibold text-slate-900">Telemedicine</h3>
                  <p className="mt-1 text-slate-600">
                    Secure video consultations with specialists from anywhere
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-primary"
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
                  <h3 className="font-semibold text-slate-900">Appointment Booking</h3>
                  <p className="mt-1 text-slate-600">
                    Schedule, reschedule, and manage appointments with ease
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-primary"
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
                  <h3 className="font-semibold text-slate-900">Medical Records</h3>
                  <p className="mt-1 text-slate-600">
                    Securely store, access, and share health records
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-primary"
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
                  <h3 className="font-semibold text-slate-900">Pharmacy Integration</h3>
                  <p className="mt-1 text-slate-600">
                    Prescription management and medication delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 mb-12">
            How UPCHAR Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary text-2xl">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Sign Up & Profile Setup</h3>
                <p className="mt-2 text-slate-600">
                  Create your secure profile and connect with healthcare providers
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary text-2xl">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Book & Consult</h3>
                <p className="mt-2 text-slate-600">
                  Schedule appointments and conduct secure video consultations
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary text-2xl">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Manage Health</h3>
                <p className="mt-2 text-slate-600">
                  Access records, prescriptions, and follow-up care in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 mb-12">
            Trusted by Healthcare Providers Nationwide
          </h2>
          <p className="text-center text-slate-600 max-w-4xl mx-auto mb-16">
            Join thousands of patients, doctors, and healthcare organizations who rely on UPCHAR for
            secure, efficient healthcare delivery.
          </p>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-change mb-4">
                <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 102 0V3a1 1 0 10-2 0v1a1 1 0 01-1-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706 1.414a2 2 0 01-2.83 0L7.05 9.173a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">HIPAA Compliant</h3>
              <p className="mt-2 text-center text-slate-600">
                Full compliance with healthcare privacy regulations
              </p>
            </div>

            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">Bank-Level Security</h3>
              <p className="mt-2 text-center text-slate-600">
                Advanced encryption and security protocols
              </p>
            </div>

            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 00-.894 1.34l-1 4A1 1 0 005 8h2a1 1 0 011 1v1a1 1 0 102 0V9a1 1 0 011-1h2a1 1 0 001-1.06l-1-4A1 1 0 0011 2H9zM7 8h6v8H7V8zm4 4a1 1 0 110 2 1 1 0 010-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">99.9% Uptime</h3>
              <p className="mt-2 text-center text-slate-600">
                Reliable platform with enterprise-grade infrastructure
              </p>
            </div>

            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 5a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zm0 6a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm5-6a1 1 0 100 2 1 1 0 000-2zM9 9a1 1 0 000 2v2a1 1 0 100-2V9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900">24/7 Support</h3>
              <p className="mt-2 text-center text-slate-600">
                Dedicated support team available around the clock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Ready to transform healthcare delivery?
          </h2>
          <p className="text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Join the healthcare revolution with UPCHAR's comprehensive platform designed for better
            patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="flex items-center justify-center px-8 py-3 bg-white rounded-lg text-primary font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center px-8 py-3 bg-white/20 rounded-lg border border-white/20 hover:bg-white/30 transition-colors duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold text-white mb-4">UPCHAR</h3>
              <p className="mb-4">
                Transforming healthcare delivery through innovative technology solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C1.06 0 .642.418.33.732l-.01.01C0 1.178 0 12.786 2.55 15.04l1.153 1.153c.364.364.802.55 1.257.55h.003c.455 0 .893-.186 1.257-.55l2.707-2.707c1.708-1.708 4.19-1.758 6.24-.297l.13.13 2.238 2.238c.561.561.561 1.47 0 2.03l-1.855 1.855c-.364.364-.96.55-1.415.55H9.75l-1.014 10.03c-.163 1.614-.421 2.935-.797 4.165l.01.01c-.076.293-.014.589.125.806l2.03.678c.28.093.589.014.806-.125l1.384-8.588c.364-.456.184-.96.184-1.414V6.25h4.177c.455 0 .893-.186 1.257-.55l2.707-2.707c1.708-1.708 1.708-4.19.297-6.24L15.96 3.26c-.364-.364-.364-.96 0-1.322l1.473-1.473a.364.364 0 00.257-.642l-.01-.01c-.187-.41-.377-.828-.651-1.102z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645L12.832 8.24h-3.664v3.632h3.384v2.738h-3.384v3.65h3.76l-.18 3.664h-3.58l.18-3.664h3.4v-2.762h-3.4V12.292h3.428l.18-3.632h-3.608z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.24-2.12c-.38.65-.96 1.2-1.68 1.56a8.55 8.55 0 01-2.9 1.19c-.34-.41-.71-.79-1.1-1.06a13.94 13.94 0 00-7.02 4.34c-3.58 1.49-6.34 2.98-6.34 5.14A11.69 11.69 0 005 16.21c0 .33.03.65.09.95a4.37 4.37 0 01-2.13-.54v.05a4.37 4.37 0 003.5 4.29c-.21.08-.43.14-.65.16a4.38 4.38 0 004.04 3.04 8.85 8.85 0 01-7.98-.3v.05a4.37 4.37 0 004.37 4.37c2.39 0 4.48-1.36 5.59-3.43a10.8 10.8 0 001.65-.24h-.02c-.28.79-.89 2.08-1.79 3.26a8.57 8.57 0 01-3.33 1.5c-.24-.07-.49-.11-.74-.16v.05a4.37 4.37 0 001.31 3.63c.9-.07 1.75-.2 2.48-.45a11.75 11.75 0 017 3.12c-.19.53-.37 1-.49 1.42a11.77 11.77 0 01-5.59 2.27A16.04 16.04 0 0013 20.18c-3.33 1.83-6.11 2.32-7.53 1.42a11.92 11.92 0 006.16-1.91 11.9 11.9 0 003.13-.54c-.65-.35-1.2-.76-1.62-1.29z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">
                    Telemedicine
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">
                    Appointment Booking
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">
                    Medical Records
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">
                    Pharmacy
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">
                    Billing & Payments
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:text-white transition-colors duration-300">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:text-white transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white transition-colors duration-300">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
              <p className="mb-2">
                <span className="mr-2">📍</span> 123 Healthcare Ave, Medical City, MC 12345
              </p>
              <p className="mb-2">
                <span className="mr-2">📞</span> (555) 123-4567
              </p>
              <p className="mb-2">
                <span className="mr-2">✉️</span> info@upchar.com
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-1 rounded border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-1 bg-primary rounded hover:bg-primary/90 transition-colors duration-300 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} UPCHAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
