import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-slate-600 hover:text-slate-800">
              ← Home
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Introduction</h2>
            <p className="text-slate-600 mb-6">
              UPCHAR ("we," "our," or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website, use our services, or otherwise interact with us.
            </p>

            <p className="text-slate-600 mb-6">
              Please read this Privacy Policy carefully. If you do not agree with the terms of this
              Privacy Policy, please do not access our website or use our services.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Information We Collect</h2>

            <h3 className="text-lg font-medium text-slate-900 mb-2">Personal Information</h3>
            <p className="text-slate-600 mb-4">
              We may collect personal information that you voluntarily provide to us when you
              register on our website, use our services, or contact us. This information may
              include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Demographic information (age, gender, etc.)</li>
              <li>Health information (when using our healthcare services)</li>
              <li>Insurance information</li>
              <li>Employment information</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Automatically Collected Information
            </h3>
            <p className="text-slate-600 mb-4">
              When you visit our website, we may automatically collect certain information from your
              device, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referral URL</li>
              <li>Pages viewed and time spent on each page</li>
              <li>Cookie information</li>
            </ul>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-6">
              We may use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>To provide, maintain, and improve our services</li>
              <li>To process and manage your account</li>
              <li>To communicate with you about your account, services, and promotional offers</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To comply with legal obligations and protect our rights</li>
              <li>To analyze usage trends and improve our website and services</li>
              <li>To prevent fraud and ensure the security of our networks and systems</li>
            </ul>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Sharing Your Information</h2>
            <p className="text-slate-600 mb-6">
              We do not sell, trade, or otherwise transfer to outside parties your personally
              identifiable information except as described in this Privacy Policy. We may share your
              information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>Healthcare providers involved in your care</li>
              <li>Pharmacies for prescription processing</li>
              <li>Insurance companies for claims processing</li>
              <li>Laboratories and imaging centers for test ordering and results</li>
              <li>
                Third-party service providers who assist us in operating our website and providing
                our services (subject to confidentiality agreements)
              </li>
              <li>Regulatory authorities when required by law</li>
            </ul>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 mb-6">
              We implement appropriate technical and organizational measures to protect your
              personal information from accidental or unlawful destruction, loss, alteration,
              unauthorized disclosure, or access. Our security measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Network firewalls and intrusion detection systems</li>
              <li>Employee training on data protection and privacy practices</li>
            </ul>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Rights and Choices</h2>
            <p className="text-slate-600 mb-6">
              Depending on your jurisdiction, you may have certain rights regarding your personal
              information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>The right to access, correct, or delete your personal information</li>
              <li>The right to restrict or object to certain processing activities</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent (where processing is based on consent)</li>
            </ul>
            <p className="text-slate-600 mb-6">
              To exercise these rights, please contact us using the information provided below.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Children's Privacy</h2>
            <p className="text-slate-600 mb-6">
              Our services are not directed to children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If you are a parent or guardian
              and believe your child has provided us with personal information, please contact us.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-slate-600 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-slate-600 mb-4">
              <strong>Email:</strong> privacy@upchar.com
              <br />
              <strong>Phone:</strong> (555) 123-4567
              <br />
              <strong>Mail:</strong> UPCHAR Privacy Office, 123 Healthcare Avenue, Medical City, MC
              12345
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
