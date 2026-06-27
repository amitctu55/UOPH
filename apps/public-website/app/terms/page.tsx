import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-slate-600 hover:text-slate-800">
              ← Home
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Acceptance of Terms</h2>
            <p className="text-slate-600 mb-6">
              By accessing or using UPCHAR's website, services, or applications, you agree to be
              bound by these Terms of Service ("Terms"), whether you are a visitor or a registered
              user.
            </p>
            <p className="text-slate-600 mb-6">
              Please read these Terms carefully before using our services. If you do not agree to
              any part of these terms, you may not access or use our services.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Description of Services</h2>
            <p className="text-slate-600 mb-6">
              UPCHAR provides a digital healthcare platform that includes telemedicine, appointment
              scheduling, electronic health records, pharmacy management, billing and payments,
              analytics, and related services ("Services"). We reserve the right to modify or
              discontinue any aspect of our Services at any time without notice.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">User Accounts</h2>
            <p className="text-slate-600 mb-6">
              To access certain features of our Services, you may be required to create an account.
              You agree to provide accurate, current, and complete information during the
              registration process and to update such information to keep it accurate, current, and
              complete.
            </p>
            <p className="text-slate-600 mb-6">
              You are responsible for maintaining the confidentiality of your account and password
              and for restricting access to your computer or device. You agree to accept
              responsibility for all activities that occur under your account or password.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">User Conduct</h2>
            <p className="text-slate-600 mb-6">
              You agree to use our Services only for lawful purposes and in accordance with these
              Terms. You agree not to use our Services to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>Violate any applicable local, state, national, or international law</li>
              <li>
                Transmit or facilitate the transmission of any virus, worm, or other harmful code
              </li>
              <li>Interfere with or disrupt the operation of our Services or servers</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with anyone</li>
              <li>Collect or harvest personal data about other users without consent</li>
              <li>
                Engage in any restrictive or prohibitive conduct that interferes with another user's
                enjoyment of our Services
              </li>
            </ul>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 mb-6">
              The Services and their original content, features, and functionality are and will
              remain the exclusive property of UPCHAR and its licensors. Our Services are protected
              by copyright, trademark, and other laws of both the United States and foreign
              countries.
            </p>
            <p className="text-slate-600 mb-6">
              Our trademarks and trade dress may not be used in connection with any product or
              service without the prior written consent of UPCHAR.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Third-Party Links</h2>
            <p className="text-slate-600 mb-6">
              Our Services may contain links to third-party websites or services that are not owned
              or controlled by UPCHAR. We have no control over, and assume no responsibility for,
              the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="text-slate-600 mb-6">
              You further acknowledge and agree that UPCHAR shall not be responsible or liable,
              directly or indirectly, for any damage or loss caused or alleged to be caused by or in
              connection with use of or reliance on any such content, goods, or services available
              on or through any such third-party websites or services.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-slate-600 mb-6">
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." WE AND OUR LICENSORS MAKE NO
              REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF
              OUR SERVICES OR THE INFORMATION, CONTENT, OR MATERIALS INCLUDED THEREIN.
            </p>
            <p className="text-slate-600 mb-6">
              TO THE MAXIMUM EXTENT PERMISSIBLE BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES,
              WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO THE IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 mb-6">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL UPCHAR, ITS OFFICERS,
              DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
              INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF USE, DATA, GOOD-WILL, OR OTHER
              INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
              <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES;</li>
              <li>
                ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS AND/OR ANY PERSONAL INFORMATION
                STORED THEREIN;
              </li>
              <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES;</li>
              <li>
                ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSFERRED TO OR THROUGH
                OUR SERVERS;
              </li>
              <li>ANY ERRORS, OMISSIONS, OR INACCURACIES IN THE SERVICES;</li>
              <li>OR ANY FAILURE OR DELAY IN PERFORMING ANY OF THE ABOVE.</li>
            </ul>
            <p className="text-slate-600 mb-6">
              THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY
              LAW IN THE APPLICABLE JURISDICTION.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-slate-600 mb-6">
              These Terms shall be governed and construed in accordance with the laws of the United
              States and the State of California, without regard to its conflict of law provisions.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-600 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any
              time. If a revision is material, we will provide at least 30 days' notice prior to any
              new terms taking effect. What constitutes a material change will be determined at our
              sole discretion.
            </p>

            <hr className="my-6" />

            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-slate-600 mb-4">
              <strong>Email:</strong> legal@upchar.com
              <br />
              <strong>Phone:</strong> (555) 123-4567
              <br />
              <strong>Mail:</strong> UPCHAR Legal Department, 123 Healthcare Avenue, Medical City,
              MC 12345
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
