import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold text-center text-slate-900 mb-6">
            About UPCHAR
          </h1>
          <p className="text-xl text-center text-slate-600 max-w-3xl mx-auto">
            Pioneering the future of healthcare through innovative technology solutions.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Our Mission & Vision
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                To empower healthcare providers with innovative technology that improves patient outcomes,
                enhances operational efficiency, and reduces the administrative burden so clinicians can focus
                on what matters most - patient care.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To create a seamlessly connected healthcare ecosystem where patients, providers,
                and administrators can access the information and tools they need, when they need it,
                to deliver the highest quality care possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Meet Our Leadership Team
          </h2>
          <p className="text-center text-slate-600 max-w-4xl mx-auto mb-16">
            Our diverse team of healthcare professionals, technologists, and innovators is dedicated
            to transforming healthcare delivery.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Founder 1 */}
            <div className="text-slate-600">
                <img src="/founder1.jpg" alt="Dr. Sarah Chen, CEO" className="rounded-full w-24 h-24 mb-4 object-cover" />
                <h3 className="font-semibold text-slate-900 mb-2">Dr. Sarah Chen</h3>
                <p className="text-sm text-slate-500 mb-2">Chief Executive Officer</p>
                <p className="text-slate-600">
                  Dr. Chen brings 15 years of experience as a practicing physician and healthcare
                  administrator to lead our mission of improving patient care through technology.
                </p>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="text-center">
                <img src="/founder2.jpg" alt="Michael Rodriguez, CTO" className="rounded-full w-24 h-24 mb-4 object-cover" />
                <h3 className="font-semibold text-slate-900 mb-2">Michael Rodriguez</h3>
                <p className="text-sm text-slate-500 mb-2">Chief Technology Officer</p>
                <p className="text-slate-600">
                  With expertise in healthcare IT and cloud architecture, Michael leads our technology
                  vision to build a scalable, secure, and interoperable platform.
                </p>
              </div>
            </div>

            {/* Founder 3 */}
            <div className="text-center">
                <img src="/founder3.jpg" alt="Jennifer Williams, COO" className="rounded-full w-24 h-24 mb-4 object-cover" />
                <h3 className="font-semibold text-slate-900 mb-2">Jennifer Williams</h3>
                <p className="text-sm text-slate-500 mb-2">Chief Operations Officer</p>
                <p className="text-slate-600">
                  Jennifer's background in healthcare operations ensures our solutions are practical,
                  user-friendly, and deliver measurable results for healthcare organizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🩺</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Patient-Centered</h3>
              <p className="text-slate-600">
                We put patients at the heart of everything we do, designing solutions that improve
                access, engagement, and health outcomes.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🔒</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Security & Privacy</h3>
              <p className="text-slate-600">
                We maintain the highest standards of data protection and compliance to safeguard
                sensitive health information.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">💡</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Innovation</h3>
              <p className="text-slate-600">
                We continuously innovate to bring the latest advancements in healthcare technology
                to our customers.
              </p>
            </div>

            <div className="text-center py-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-primary text-3xl">🤝</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Collaboration</h3>
              <p className="text-slate-600">
                We believe in partnership - with healthcare providers, patients, and technology
                companies to create better healthcare experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Trusted by Healthcare Leaders
          </h2>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex-shrink-0">
                <img src="/trust-badge-1.png" alt="HIPAA Compliant" className="h-12 w-auto" />
              </div>
              <div className="flex-shrink-0">
                <img src="/trust-badge-2.png" alt="KLAS Rated" className="h-12 w-auto" />
              </div>
              <div className="flex-shrink-0">
                <img src="/trust-badge-3.png" alt="Award Winning" className="h-12 w-auto" />
              </div>
              <div className="flex-shrink-0">
                <img src="/trust-badge-4.png" alt="Five Star Rated" className="h-12 w-auto" />
              </div>
            </div>
            <p className="text-center text-slate-600 max-w-3xl">
              Join thousands of healthcare organizations that trust UPCHAR to deliver secure,
              reliable, and innovative healthcare technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Mission-Driven Team
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're looking for passionate individuals who want to make a difference in healthcare
            through technology.
          </p>
          <Link href="/careers" className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-colors duration-300">
            View Open Positions
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}