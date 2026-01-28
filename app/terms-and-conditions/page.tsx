// Terms and Conditions Page
// This page contains the legal terms governing use of ExamReady

export default function TermsAndConditionsPage() {
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
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: January 26, 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ExamReady, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Use License</h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use ExamReady for the purpose of exam preparation. You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Engage in any unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. User Responsibilities</h2>
            <p>
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate information during registration</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Disclaimer of Warranties</h2>
            <p>
              ExamReady is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the service. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>The service will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The service is suitable for your specific needs</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Limitation of Liability</h2>
            <p>
              In no event shall ExamReady, its officers, directors, or employees be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Intellectual Property</h2>
            <p>
              All content on ExamReady, including text, graphics, logos, and software, is the property of ExamReady or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit the content without prior written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Third-Party Links</h2>
            <p>
              ExamReady may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites. Your use of third-party websites is at your own risk and subject to their terms and conditions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Termination of Service</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to ExamReady without notice if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You violate these terms</li>
              <li>You engage in unauthorized access or illegal activities</li>
              <li>We determine it necessary to protect the service and users</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">9. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the jurisdiction of the courts located in India.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of ExamReady constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">11. Contact Information</h2>
            <p>
              If you have questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-muted-foreground">
              <p>Email: legal@examready.com</p>
              <p>Address: ExamReady, India</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
