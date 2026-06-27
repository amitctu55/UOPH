import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Services
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Comprehensive Healthcare Services
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-primary font-bold">🩺</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Telemedicine</h3>
              <p className="text-slate-600">
                Video consultations with certified doctors from the comfort of your home
              </p>
              <Link
                href="/services/telemedicine"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-primary font-bold">📅</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Appointment Booking</h3>
              <p className="text-slate-600">
                Schedule appointments with specialists and primary care physicians
              </p>
              <Link
                href="/services/appointments"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-primary font-bold">📋</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Medical Records</h3>
              <p className="text-slate-600">
                Securely store, access, and share your health records with providers
              </p>
              <Link
                href="/services/medical-records"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-primary font-bold">💊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Pharmacy Delivery</h3>
              <p className="text-slate-600">
                Get prescriptions delivered to your doorstep with online pharmacy services
              </p>
              <Link
                href="/services/pharmacy"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-primary font-bold">🧪</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Diagnostic Testing</h3>
              <p className="text-slate-600">
                Book lab tests, imaging, and other diagnostic services online
              </p>
              <Link
                href="/services/diagnostics"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="text-primary font-bold">💳</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Billing & Insurance</h3>
              <p className="text-slate-600">
                Transparent billing, insurance claims, and flexible payment options
              </p>
              <Link
                href="/services/billing"
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
