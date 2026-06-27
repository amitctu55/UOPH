import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/services" className="text-slate-600 hover:text-slate-800">
              ← Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-slate-900">Appointment Scheduling</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl">
            Streamline patient appointments with intelligent scheduling and automated reminders.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Optimize Your Practice's Schedule
              </h2>
              <p className="text-slate-600 mb-6">
                UPCHAR's appointment scheduling system reduces no-shows, maximizes provider
                productivity, and improves the patient experience through self-service booking and
                intelligent resource management.
              </p>
              <p className="text-slate-600 mb-6">
                From simple booking to complex multi-provider scheduling, our solution adapts to
                your practice's unique workflow and specialty requirements.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-80 h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-slate-500 text-center">Appointment Scheduling Interface</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-2xl">📅</span>
                </div>
                <h3 className="font-semibold text-slate-900">Self-Service Booking</h3>
              </div>
              <p className="text-slate-600">
                Patients can book, reschedule, or cancel appointments online 24/7, reducing call
                volume and front desk burden.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-2xl">⚠️</span>
                </div>
                <h3 className="font-semibold text-slate-900">Automated Reminders</h3>
              </div>
              <p className="text-slate-600">
                Customizable SMS and email reminders reduce no-show rates by up to 30%.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-2xl">👥</span>
                </div>
                <h3 className="font-semibold text-slate-900">Provider Schedule Management</h3>
              </div>
              <p className="text-slate-600">
                Real-time visibility into provider availability with drag-and-drop scheduling and
                blocked time management.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-slate-900">Reporting & Analytics</h3>
              </div>
              <p className="text-slate-600">
                Track key metrics like utilization rates, no-show percentages, and patient
                satisfaction with appointment scheduling.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-2xl">🔄</span>
                </div>
                <h3 className="font-semibold text-slate-900">Calendar Integration</h3>
              </div>
              <p className="text-slate-600">
                Sync with Google Calendar, Outlook, and other calendar systems for seamless schedule
                management.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-2xl">💳</span>
                </div>
                <h3 className="font-semibold text-slate-900">Payment Processing</h3>
              </div>
              <p className="text-slate-600">
                Collect copays and deposits at time of booking with secure payment processing
                integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Benefits for Your Practice
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-4xl">📈</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Increased Revenue</h3>
              <p className="text-slate-600">
                Reduce no-shows and fill last-minute cancellations with automated waitlist
                management.
              </p>
            </div>

            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-4xl">⏰</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Time Savings</h3>
              <p className="text-slate-600">
                Free up staff time spent on phone scheduling for higher-value patient interactions.
              </p>
            </div>

            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-4xl">😊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Better Patient Experience</h3>
              <p className="text-slate-600">
                Provide the convenience of online booking that modern patients expect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Optimize Your Appointment Workflow?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how UPCHAR's appointment scheduling solution can help your practice run more
            efficiently while improving patient satisfaction.
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
