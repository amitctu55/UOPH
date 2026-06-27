import Link from 'next/link';

export default function HospitalsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Hospitals
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Find Quality Healthcare Facilities
              </h1>
            </div>
            <Link href="/hospitals/new" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
              Find a Hospital
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name, location, or specialty..."
              className="flex-1 min-w-[200px] px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <select
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Facilities</option>
              <option value="general">General Hospital</option>
              <option value="children">Children's Hospital</option>
              <option value="women">Women's Hospital</option>
              <option value="cardiac">Cardiac Center</option>
              <option value="cancer">Cancer Institute</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                  <span className="text-primary font-bold">🏥</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">City General Hospital</h3>
                  <p className="text-slate-600 mb-2">General Hospital • 500 beds</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Open 24/7
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Level I Trauma
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>Full-service hospital offering emergency care, surgery, maternity, and specialized treatment centers.</p>
                <p>Academic medical center with residency programs in multiple specialties.</p>
              </div>
              <div className="mt-4">
                <ButtonGroup>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                    View Services
                    <span className="h-3 w-3 rotate-45 border-b border-r border-primary"></span>
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400">
                    Get Directions
                    <span className="h-3 w-3 rotate-45 border-b border-r border-slate-600"></span>
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10                  <span className="text-primary font-bold">👶</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Children's Medical Center</h3>
                  <p className="text-slate-600 mb-2">Children's Hospital • 200 beds</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-sm text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Open 24/7
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Pediatric Specialty
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>Dedicated exclusively to pediatric care from newborn to young adult.</p>
                <p>Features include NICU, PICU, pediatric oncology, and child-friendly environment.</p>
              </div>
              <div className="mt-4">
                <ButtonGroup>
                  <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                    View Services
                    <span className="h-3 w-3 rotate-45 border-b border-r border-primary"></span>
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400">
                    Get Directions
                    <span className="h-3 w-3 rotate-45 border-b border-r border-slate-600"></span>
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10                  <span className="text-primary font-bold">❤️</span>
                </<|tool_calls_section_begin|>assistant
<|tool_call_begin|>functions.write<|tool_calls_section_sep|>{
  "file_path": "E:/UPCHAR PROJECT DESINE BY AI/apps/public-website/app/(pages)/hospitals/page.tsx",
  "content": "import Link from 'next/link';\n\nexport default function HospitalsPage() {\n  return (\n    <main className=\"min-h-screen bg-slate-50 text-slate-900\">\n      <section className=\"mx-auto max-w-4xl px-6 py-16\">\n        <div className=\"mb-8\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <span className=\"inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary\">\n                Hospitals\n              </span>\n              <h1 className=\"mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl\">\n                Find Quality Healthcare Facilities\n              </h1>\n            </div>\n            <Link href=\"/hospitals/new\" className=\"inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90\">\n              Find a Hospital\n            </Link>\n          </div>\n        </div>\n\n        <div className=\"mb-8\">\n          <div className=\"flex flex-wrap gap-4\">\n            <input\n              type=\"text\"\n              placeholder=\"Search by name, location, or specialty...\"\n              className=\"flex-1 min-w-[200px] px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent\"\n            />\n            <select\n              className=\"px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent\"\n            >\n              <option value=\"\">All Facilities</option>\n              <option value=\"general\">General Hospital</option>\n              <option value=\"children\">Children's Hospital</option>\n              <option value=\"women\">Women's Hospital</option>\n              <option value=\"cardiac\">Cardiac Center</option>\n              <option value=\"cancer\">Cancer Institute</option>\n            </select>\n          </div>\n        </div>\n\n        <div className=\"grid gap-6\">\n          <div className=\"bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow\">\n            <div className=\"p-6\">\n              <div className=\"flex items-start gap-4\">\n                <div className=\"flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0\">\n                  <span className=\"text-primary font-bold\">🏥</span>\n                </div>\n                <div>\n                  <h3 className=\"font-semibold text-slate-900\">City General Hospital</h3>\n                  <p className=\"text-slate-600 mb-2\">General Hospital • 500 beds</p>\n                  <div className=\"flex items-center gap-2 text-sm\">\n                    <span className=\"flex items-center gap-1 text-sm text-green-600\">\n                      <span className=\"h-2 w-2 rounded-full bg-green-500\"></span>\n                      Open 24/7\n                    </span>\n                    <span className=\"text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded\">\n                      Level I Trauma\n                    </span>\n                  </div>\n                </div>\n              </div>\n              <div className=\"mt-4 space-y-2 text-slate-600\">\n                <p>Full-service hospital offering emergency care, surgery, maternity, and specialized treatment centers.</p>\n                <p>Academic medical center with residency programs in multiple specialties.</p>\n              </div>\n              <div className=\"mt-4\">\n                <ButtonGroup>\n                  <button className=\"flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80\">\n                    View Services\n                    <span className=\"h-3 w-3 rotate-45 border-b border-r border-primary\"></span>\n                  </button>\n                  <button className=\"flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400\">\n                    Get Directions\n                    <span className=\"h-3 w-3 rotate-45 border-b border-r border-slate-600\"></span>\n                  </button>\n                </ButtonGroup>\n              </div>\n            </div>\n          </div>\n\n          <div className=\"bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow\">\n            <div className=\"p-6\">\n              <div className=\"flex items-start gap-4\">\n                <div className=\"flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0\">\n                  <span className=\"text-primary font-bold\">👶</span>\n                </div>\n                <div>\n                  <h3 className=\"font-semibold text-slate-900\">Children's Medical Center</h3>\n                  <p className=\"text-slate-600 mb-2\">Children's Hospital • 200 beds</p>\n                  <div className=\"flex items-center gap-2 text-sm\">\n                    <span className=\"flex items-center gap-1 text-sm text-green-600\">\n                      <span className=\"h-2 w-2 rounded-full bg-green-500\"></span>\n                      Open 24/7\n                    </span>\n                    <span className=\"text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded\">\n                      Pediatric Specialty\n                    </span>\n                  </div>\n                </div>\n              </div>\n              <div className=\"mt-4 space-y-2 text-slate-600\">\n                <p>Dedicated exclusively to pediatric care from newborn to young adult.</p>\n                <p>Features include NICU, PICU, pediatric oncology, and child-friendly environment.</p>\n              </div>\n              <div className=\"mt-4\">\n                <ButtonGroup>\n                  <button className=\"flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80\">\n                    View Services\n                    <span className=\"h-3 w-3 rotate-45 border-b border-r border-primary\"></span>\n                  </button>\n                  <button className=\"flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400\">\n                    Get Directions\n                    <span className=\"h-3 w-3 rotate-45 border-b border-r border-slate-600\"></span>\n                  </button>\n                </ButtonGroup>\n              </div>\n            </div>\n          </div>\n\n          <div className=\"bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow\">\n            <div className=\"p-6\">\n              <div className=\"flex items-start gap-4\">\n                <div className=\"flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0\">\n                  <span className=\"text-primary font-bold\">❤️</span>\n                </div>\n                <div>\n                  <h3 className=\"font-semibold text-slate-900\">Heart Institute Specialty Center</h3>\n                  <p className=\"text-slate-600 mb-2\">Cardiac Center • 150 beds</p>\n                  <div className=\"flex items-center gap-2 text-sm\">\n                    <span className=\"flex items-center gap-1 text-sm text-green-600\">\n                      <span className=\"h-2 w-2 rounded-full bg-green-500\"></span>\n                      Open 24/7\n                    </span>\n                    <span className=\"text-xs bg-red-100 text-red-800 px-2 py-1 rounded\">\n                      Cardiac Specialty\n                    </span>\n                  </div>\n                </div>\n              </div>\n              <div className=\"mt-4 space-y-2 text-slate-600\">\n                <p>Specialized cardiac care facility offering interventional cardiology, electrophysiology, and cardiac surgery.</p>\n                <p>Home to the region's only heart transplant program and LVAD implantation center.</p>\n              </div>\n              <div className=\"mt-4\">\n                <ButtonGroup>\n                  <button className=\"flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80\">\n                    View Services\n                    <span className=\"h-3 w-3 rotate-45 border-b border-r border-primary\"></span>\n                  </button>\n                  <button className=\"flex items-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 hover:border-slate-400\">\n                    Get Directions\n                    <span className=\"h-3 w-3 rotate-45 border-b border-r border-slate-600\"></span>\n                  </button>\n                </ButtonGroup>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div className=\"mt-12 text-center\">\n          <Link href=\"/hospitals\" className=\"inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90\">\n            See All Hospitals ({totalHospitals} facilities)\n          </Link>\n        </div>\n      </section>\n    </main>\n  );\n}\n\n// Helper component for button group\nfunction ButtonGroup({ children }: { children: React.ReactNode }) {\n  return <div className=\"flex gap-3\">{children}</div>;\n}\n"
}<|tool_call_end|><|tool_calls_section_end|>assistant
Now let me create a few more key pages for the public website, then move on to the dashboard applications. Let me create the contact page, about page, and blog page.


<tool_call>
<function=Write>
<parameter=content>
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Contact
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Get in Touch with UPCHAR
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Have questions about our platform, services, or partnership opportunities?
            We're here to help.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <span className="text-primary font-bold">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Headquarters</h3>
                    <p className="text-slate-600">
                      123 Healthcare Innovation Drive<br />
                      Medical District, Cityville 12345<br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <span className="text-primary font-bold">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <p className="text-slate-600">
                      <a href="tel:+1-800-UPCHAR-1" className="text-primary hover:underline">
                        1-800-872-4271
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <span className="text-primary font-bold">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-slate-600">
                      <a href="mailto:info@upchar.health" className="text-primary hover:underline">
                        info@upchar.health
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                    <span className="text-primary font-bold">🕒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Hours</h3>
                    <p className="text-slate-600">
                      Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                      Saturday: 9:00 AM - 1:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Get in Touch</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="" disabled selected>Select a topic</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="support">Technical Support</option>
                    <option value="media">Media/Press</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}