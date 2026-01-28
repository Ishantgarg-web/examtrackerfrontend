// Careers Page
// This page displays career opportunities at ExamReady

export default function CareersPage() {
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
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're building the future of exam preparation. We believe in the power of consistent effort and disciplined learning.
            </p>
          </div>

          {/* Current Status */}
          <div className="bg-card/50 border border-border/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Current Openings</h2>
            <div className="text-lg text-muted-foreground">
              <p className="mb-2">
                There are no openings right now.
              </p>
              <p>
                We appreciate your interest in joining ExamReady. Please check back later or reach out to us if you'd like to stay updated about future opportunities.
              </p>
            </div>
          </div>

          {/* Company Values */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why ExamReady?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-border/50 rounded-lg p-6 bg-card/30">
                <h3 className="text-xl font-semibold mb-3">Meaningful Impact</h3>
                <p className="text-muted-foreground">
                  Help thousands of students prepare consistently for their competitive exams and achieve their goals.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-6 bg-card/30">
                <h3 className="text-xl font-semibold mb-3">Growth Mindset</h3>
                <p className="text-muted-foreground">
                  Work with a team that values continuous learning, innovation, and personal development.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-6 bg-card/30">
                <h3 className="text-xl font-semibold mb-3">Discipline-Focused</h3>
                <p className="text-muted-foreground">
                  Join people who understand the power of consistency and are committed to excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-border/50 pt-8 space-y-4">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              If you have questions about future opportunities or would like to connect with us, feel free to reach out:
            </p>
            <div className="bg-card/50 border border-border/50 rounded-lg p-6 space-y-2 text-muted-foreground">
              <p>
                <strong>Email:</strong> <a href="mailto:careers@examready.com" className="text-primary hover:text-accent transition-colors">careers@examready.com</a>
              </p>
              <p>
                <strong>Website:</strong> <a href="/" className="text-primary hover:text-accent transition-colors">ExamReady.com</a>
              </p>
            </div>
          </div>

          {/* Footer Message */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-foreground">
              We're excited about what's next and would love to hear from talented individuals who share our vision of making exam preparation more effective and sustainable.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
