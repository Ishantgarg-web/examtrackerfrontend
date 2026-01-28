// Disclaimer Page
// This page contains important disclaimers about ExamReady and its services

export default function DisclaimerPage() {
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
          <h1 className="text-4xl font-bold">Disclaimer</h1>
          <p className="text-muted-foreground text-lg">
            Last updated: January 26, 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. No Official Affiliation</h2>
            <p>
              ExamReady is an independent preparation platform and is not affiliated with, endorsed by, or officially associated with the Common Admission Test (CAT) or the Indian Institutes of Management (IIM). CAT is a registered trademark of the IIMs.
            </p>
            <p className="text-amber-600 bg-amber-950/30 border border-amber-900/50 rounded-lg p-4">
              <strong>Important:</strong> ExamReady provides preparation materials and tools independently developed and are not official study materials from CAT or IIM.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. No Guarantee of Success</h2>
            <p>
              While ExamReady is designed to help you prepare consistently, we make no guarantees regarding your exam performance or admission outcomes. Your success depends on various factors including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your personal effort and engagement</li>
              <li>Your background knowledge and aptitude</li>
              <li>External factors and circumstances</li>
              <li>Overall competition and selection criteria</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Content Accuracy</h2>
            <p>
              While we strive to provide accurate and up-to-date information, ExamReady does not warrant that all content is accurate, complete, or error-free. You should verify critical information with official sources.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Service Availability</h2>
            <p>
              ExamReady is provided on an "as available" basis. We do not guarantee continuous, uninterrupted service. The platform may experience downtime for maintenance, updates, or other reasons.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. User-Generated Content</h2>
            <p>
              If you submit feedback, suggestions, or content to ExamReady, you acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>You have the right to submit such content</li>
              <li>The content does not infringe any intellectual property rights</li>
              <li>We may use your feedback for service improvement</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, ExamReady shall not be liable for any:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of data, revenue, or business opportunities</li>
              <li>Damages arising from your use or inability to use the service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Third-Party Content</h2>
            <p>
              ExamReady may include references to or links to third-party resources. We are not responsible for the accuracy, content, or availability of these external resources. Use of third-party content is at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Medical and Professional Advice</h2>
            <p>
              ExamReady is designed for exam preparation only and should not be considered as professional, medical, or legal advice. Please consult appropriate professionals for such matters.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">9. Assumption of Risk</h2>
            <p>
              You use ExamReady at your own risk. You assume all risks associated with your use of the platform and accept that ExamReady shall not be liable for any damages resulting from your use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">10. Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time. Continued use of ExamReady constitutes acceptance of any modifications.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">11. Contact</h2>
            <p>
              For questions or concerns about this disclaimer, please contact us at:
            </p>
            <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-muted-foreground">
              <p>Email: disclaimer@examready.com</p>
              <p>Address: ExamReady, India</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
