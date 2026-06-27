import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            About Us
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Our Mission & Vision
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            <p className="text-slate-700 leading-relaxed">
              To revolutionize healthcare delivery by providing accessible, affordable, and
              high-quality medical services through innovative technology and compassionate care.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Our Vision</h2>
            <p className="text-slate-700 leading-relaxed">
              To become the leading digital healthcare platform that connects patients, doctors,
              hospitals, and pharmacies in a seamless ecosystem, improving health outcomes for
              millions.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                <span className="text-primary font-bold">C</span>
              </div>
              <h3 className="font-semibold text-slate-900">Compassion</h3>
              <p className="text-slate-600 text-sm">
                We put patients at the heart of everything we do
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                <span className="text-primary font-bold">I</span>
              </div>
              <h3 className="font-semibold text-slate-900">Innovation</h3>
              <p className="text-slate-600 text-sm">
                We leverage cutting-edge technology to improve healthcare
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                <span className="text-primary font-bold">I</span>
              </div>
              <h3 className="font-semibold text-slate-900">Integrity</h3>
              <p className="text-slate-600 text-sm">
                We uphold the highest ethical standards in healthcare
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
