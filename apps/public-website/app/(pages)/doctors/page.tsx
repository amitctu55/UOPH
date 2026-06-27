import Link from "next/link";

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Doctors
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Find the Right Doctor for You
              </h1>
            </div>
            <Link
              href="/doctors/new"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Find a Doctor
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by specialty, name, or condition..."
              className="flex-1 min-w-[200px] px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="dermatology">Dermatology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="gynecology">Gynecology</option>
              <option value="orthopedics">Orthopedics</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <span className="text-primary font-bold">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Dr. Sarah Chen</h3>
                  <p className="text-slate-600 mb-2">Cardiologist • 15 years experience</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Available
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      4.9 (127 reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>
                  Specializes in preventive cardiology, hypertension management, and cardiac
                  rehabilitation.
                </p>
                <p>
                  Available for video consultations and in-person visits at our downtown location.
                </p>
              </div>
              <div className="mt-4">
                <ButtonGroup>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                    Schedule Consultation
                    <span className="h-3 w-3 rotate-45 border-b border-r border-primary"></span>
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400">
                    View Profile
                    <span className="h-3 w-3 rotate-45 border-b border-r border-slate-600"></span>
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <span className="text-primary font-bold">👩‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Dr. Michael Rodriguez</h3>
                  <p className="text-slate-600 mb-2">Pediatrician • 12 years experience</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Available
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      4.8 (89 reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>
                  Focuses on preventive care, vaccinations, and childhood development from newborn
                  to adolescence.
                </p>
                <p>Offers same-day appointments for urgent pediatric concerns.</p>
              </div>
              <div className="mt-4">
                <ButtonGroup>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                    Schedule Consultation
                    <span className="h-3 w-3 rotate-45 border-b border-r border-primary"></span>
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400">
                    View Profile
                    <span className="h-3 w-3 rotate-45 border-b border-r border-slate-600"></span>
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <span className="text-primary font-bold">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Dr. Priya Patel</h3>
                  <p className="text-slate-600 mb-2">OB-GYN • 18 years experience</p>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Available
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      5.0 (203 reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>
                  Expert in maternal-fetal medicine, fertility treatments, and minimally invasive
                  gynecological surgery.
                </p>
                <p>Provides comprehensive care throughout pregnancy, childbirth, and postpartum.</p>
              </div>
              <div className="mt-4">
                <ButtonGroup>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                    Schedule Consultation
                    <span className="h-3 w-3 rotate-45 border-b border-r border-primary"></span>
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400">
                    View Profile
                    <span className="h-3 w-3 rotate-45 border-b border-r border-slate-600"></span>
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            See All Doctors ({totalDoctors} providers)
          </Link>
        </div>
      </section>
    </main>
  );
}

// Helper component for button group
function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-3">{children}</div>;
}
