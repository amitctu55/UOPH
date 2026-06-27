import Link from "next/link";

export default function TelemedicinePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/services" className="text-slate-600 hover:text-slate-800">
              ← Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">Telemedicine Solutions</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl">
            Conduct secure video consultations with specialists and primary care physicians from
            anywhere.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Transforming Healthcare Delivery
              </h2>
              <p className="text-slate-600 mb-6">
                UPtelemedicine enables healthcare providers to deliver high-quality virtual care
                while maintaining the personal touch of in-person visits. Our secure,
                HIPAA-compliant platform connects patients with providers for consultations,
                follow-ups, and ongoing care management.
              </p>
              <p className="text-slate-600 mb-6">
                Whether you're a small practice looking to expand your reach or a large health
                system seeking to improve access to care, our telemedicine solution scales to meet
                your needs.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-80 h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-slate-500 text-center">Telemedicine Interface Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🎥</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">High-Quality Video</h3>
              <p className="text-slate-600">
                HD video and clear audio for effective communication during consultations.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🔒</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Security & Privacy</h3>
              <p className="text-slate-600">
                Fully HIPAA-compliant with end-to-end encryption to protect patient information.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📋</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Clinical Documentation</h3>
              <p className="text-slate-600">
                Integrated charting and note-taking during visits with EHR synchronization.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📤</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Document Sharing</h3>
              <p className="text-slate-600">
                Securely share images, test results, and other medical documents during visits.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📅</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Scheduling</h3>
              <p className="text-slate-600">
                Built-in appointment scheduling with automated reminders and waitlist management.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">💊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">E-Prescribing</h3>
              <p className="text-slate-600">
                Send prescriptions directly to pharmacies during or after virtual visits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center py-8">
              <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">Schedule Appointment</h3>
              <p className="text-slate-600">
                Patients schedule appointments through the patient portal or providers book directly
                in the system.
              </p>
            </div>

            <div className="text-center py-8">
              <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">Join Virtual Waiting Room</h3>
              <p className="text-slate-600">
                Both patients and providers join the secure virtual waiting room at the scheduled
                time.
              </p>
            </div>

            <div className="text-center py-8">
              <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">Begin Consultation</h3>
              <p className="text-slate-600">
                High-quality video visit begins with options for screen sharing, document sharing,
                and clinical notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Benefits for Healthcare Organizations
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Increased Access</h3>
              <p className="text-slate-600">
                Reach patients in rural or underserved areas, reduce no-show rates, and provide care
                to patients with mobility or transportation challenges.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Improved Efficiency</h3>
              <p className="text-slate-600">
                Optimize provider schedules, reduce overhead costs, and increase the number of
                patients seen per day without compromising care quality.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Enhanced Patient Satisfaction
              </h3>
              <p className="text-slate-600">
                Offer convenient, flexible care options that meet patients where they are — at home,
                work, or while traveling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Implement Telemedicine in Your Practice?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who are already delivering better care through our
            secure telemedicine platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold hover:bg-white/90 transition-colors duration-300"
            >
              Schedule a Demo
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
