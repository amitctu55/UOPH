import Link from 'next/link';

export default function MedicalRecordsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/services" className="text-slate-600 hover:text-slate-800">
              ← Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">
              Electronic Health Records (EHR)
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl">
            Secure, interoperable health records that follow patients across the care continuum.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Comprehensive Patient Health Records
              </h2>
              <p className="text-slate-600 mb-6">
                UPCHAR's EHR system provides a complete, longitudinal view of patient health
                information, enabling better clinical decision-making and coordinated care.
              </p>
              <p className="text-slate-600 mb-6">
                Our solution is designed for interoperability, allowing seamless exchange of
                information with other healthcare systems, labs, pharmacies, and providers.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-80 h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-slate-500 text-center">EHR Interface Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📋</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Clinical Documentation</h3>
              <p className="text-slate-600">
                Structured charting with templates, voice recognition, and smart phrases
                for efficient and accurate clinical notes.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">💉</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Medication Management</h3>
              <p className="text-slate-600">
                Electronic prescribing, medication reconciliation, and allergy alerts
                to enhance patient safety.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Lab & Results Management</h3>
              <p className="text-slate-600">
                Electronic lab ordering, result retrieval, and automatic posting to patient charts.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🖼️</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Imaging Integration</h3>
              <p className="text-slate-600">
                Seamless integration with PACS and RIS systems for viewing and managing
                medical images and reports.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🔐</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Patient Portal Access</h3>
              <p className="text-slate-600">
                Secure patient access to visit summaries, lab results, medications,
                and ability to request appointments and prescription refills.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📤</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Interoperability</h3>
              <p className="text-slate-600">
                FHIR and HL7 standards support for seamless data exchange with other systems.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">📈</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Reporting & Analytics</h3>
              <p className="text-slate-600">
                Built-in clinical dashboards, quality reporting, and population health analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Benefits for Healthcare Providers
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Improved Clinical Outcomes</h3>
              <p className="text-slate-600">
                Better access to complete patient information leads to more accurate diagnoses
                and personalized treatment plans.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Increased Efficiency</h3>
              <p className="text-slate-600">
                Streamlined workflows reduce documentation time and minimize duplicate testing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Enhanced Patient Safety</h3>
              <p className="text-slate-600">
                Medication alerts, allergy checks, and clinical decision support
                reduce adverse events and medical errors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interoperability */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Seamless Health Information Exchange
          </h2>
          <p className="text-center text-slate-600 max-w-4xl mb-8">
            UPCHAR's EHR is designed to connect with the broader healthcare ecosystem,
            ensuring that patient information follows them wherever they receive care.
          </p>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-primary text-xl">🏥</span>
              </div>
              <h4 className="font-semibold text-slate-900">Hospitals & Health Systems</h4>
              <p className="text-slate-600 text-center">
                Share patient records with affiliated hospitals and health systems
                for continuity of care.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-primary text-xl">💊</span>
              </div>
              <h4 className="font-semibold text-slate-900">Pharmacies</h4>
              <p className="text-slate-600 text-center">
                Electronic prescribing and medication history sharing
                to improve medication safety.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-primary text-xl">🔬</span>
              </div>
              <h4 className="font-semibold text-slate-900">Laboratories</h4>
              <p className="text-slate-600 text-center">
                Electronic lab ordering and results retrieval
                for faster diagnosis and treatment.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-primary text-xl">🚑</span>
              </div
              <h4 className="font-semibold text-slate-900">Emergency Services</h4>
              <p className="text-slate-600 text-center">
                Critical information access for emergency responders
                and ER providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Practice's Health Records?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how UPCHAR's EHR solution can improve clinical workflows,
            enhance patient safety, and support better health outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold hover:bg-white/90 transition-colors duration-300">
              Schedule a Demo
            </Link>
            <Link href="/signup" className="flex items-center justify-center px-8 py-3 bg-white/20 text-white border border-white/20 hover:bg-white/30 transition-colors duration-300">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}