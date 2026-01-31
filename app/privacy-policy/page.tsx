// Privacy Policy Page
// This page outlines how ExamReady collects, uses, and protects user data

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExamReady
            </a>
            <nav className="ml-auto">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to Home
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: January 31, 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p>
              ExamReady ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Information We Collect</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">2.1 Personal Information</h3>
              <p>
                When you sign up using Google authentication, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Your name and email address from Google</li>
                <li>Your username (created during onboarding)</li>
                <li>Phone number (provided by you)</li>
                <li>Working status (provided by you)</li>
                <li>Bachelor's degree information (provided by you)</li>
                <li>Timezone information (provided by you)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">2.2 Usage Information</h3>
              <p>
                We automatically collect information about your interactions with ExamReady:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Daily task completion records</li>
                <li>Streak information and timestamps</li>
                <li>Exam selections and progress</li>
                <li>Feedback and feature requests you submit</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your exam preparation experience</li>
              <li>Track your progress and streaks</li>
              <li>Send you notifications about your tasks and streaks</li>
              <li>Respond to your feedback and inquiries</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information only:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or legal process</li>
              <li>To protect the rights and safety of ExamReady and our users</li>
            </ul>
          </section>

          {/* <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. These include session cookies (which are deleted when you close your browser) and authentication cookies that maintain your login session.
            </p>
          </section> */}

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
            </ul>
            <p>
              To exercise these rights, please contact us through Feedback page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last Updated" date and posting the new version on this page.
            </p>
          </section>

          {/* <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-muted-foreground">
              <p>Email: privacy@examready.com</p>
              <p>Address: ExamReady, India</p>
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
}
