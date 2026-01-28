'use client'; // This component uses React hooks and client-side features

// Imports for UI components and utilities
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

/**
 * HomeContent Component
 * Main landing page content that uses authentication context
 * Handles redirects for authenticated users and displays marketing content for new users
 * This is separated into its own client component to ensure auth context is available
 */
export function HomeContent() {
  // Get authentication state from context
  // This hook is safe to use here because this component is wrapped by AuthProvider via Providers
  const { isAuthenticated, hasExamSelected, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect authenticated users who have selected an exam to dashboard
  if (isAuthenticated && hasExamSelected) {
    redirect('/dashboard');
  }

  // Redirect authenticated users who haven't selected an exam to onboarding
  if (isAuthenticated && !hasExamSelected) {
    redirect('/onboarding');
  }

  // Render landing page for unauthenticated users
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Header Navigation */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExamReady
            </div>
            {/* Navigation Links */}
            <nav className="hidden md:flex gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Main value proposition */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Headline and CTA */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-balance">
                  Master Your Exam Preparation
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg text-balance">
                  Build an unbreakable streak of consistent study habits. Daily focused tasks designed for competitive exam excellence.
                </p>
              </div>

              {/* Key Benefits List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Daily Structured Tasks</h3>
                    <p className="text-sm text-muted-foreground">Carefully curated exam-specific challenges delivered every day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Streak-Based Consistency</h3>
                    <p className="text-sm text-muted-foreground">Track your preparation journey with current and longest streak metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Professional Discipline</h3>
                    <p className="text-sm text-muted-foreground">Built for serious candidates who demand serious preparation tools</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  onClick={() => window.location.href = '/login'}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Start Today's Tasks for CAT
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Secure Google authentication • No credit card required
                </p>
              </div>
            </div>

            {/* Right Image - Hero visual */}
            <div className="hidden lg:block">
              <div className="relative h-96 rounded-xl overflow-hidden border border-border/50 shadow-2xl">
                <Image
                  src="/hero-image.jpg"
                  alt="Professional exam preparation environment"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Why choose ExamReady */}
      <section id="features" className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ExamReady?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A purpose-built platform for serious exam candidates who understand that consistency is the foundation of success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Daily Focus */}
            <div className="border border-border/50 rounded-lg p-8 bg-card/50 backdrop-blur hover:border-border transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <div className="w-6 h-6 border-2 border-primary rounded-full" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Daily Focus</h3>
              <p className="text-muted-foreground">
                One day at a time. Complete your daily tasks and watch your consistency compound over weeks and months.
              </p>
            </div>

            {/* Feature 2: Streak Tracking */}
            <div className="border border-border/50 rounded-lg p-8 bg-card/50 backdrop-blur hover:border-border transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <div className="text-lg font-bold text-primary">🔥</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Streak Tracking</h3>
              <p className="text-muted-foreground">
                Build your current streak and watch for your personal record. Every day completed is progress toward your goal.
              </p>
            </div>

            {/* Feature 3: Progress Insights */}
            <div className="border border-border/50 rounded-lg p-8 bg-card/50 backdrop-blur hover:border-border transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <div className="text-lg font-bold text-primary">📊</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Insights</h3>
              <p className="text-muted-foreground">
                View your 7-day calendar of achievements. See which tasks you completed and identify patterns in your preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Step-by-step onboarding flow */}
      <section id="how-it-works" className="py-20 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">The ExamReady Method</h2>

          <div className="space-y-8">
            {/* Step 1: Sign In */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  1
                </div>
                <div className="w-0.5 h-24 bg-gradient-to-b from-primary to-primary/30 mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold mb-2">Sign In with Google</h3>
                <p className="text-muted-foreground">
                  Secure, fast authentication that respects your privacy. No passwords to remember.
                </p>
              </div>
            </div>

            {/* Step 2: Complete Profile */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  2
                </div>
                <div className="w-0.5 h-24 bg-gradient-to-b from-primary to-primary/30 mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
                <p className="text-muted-foreground">
                  Tell us about your background, work status, and timezone so we can personalize your experience.
                </p>
              </div>
            </div>

            {/* Step 3: Select Exam */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  3
                </div>
                <div className="w-0.5 h-24 bg-gradient-to-b from-primary to-primary/30 mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold mb-2">Select Your Exam</h3>
                <p className="text-muted-foreground">
                  Choose CAT as your exam target. This selection shapes your personalized preparation path.
                </p>
              </div>
            </div>

            {/* Step 4: Start Streak */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start Your Streak</h3>
                <p className="text-muted-foreground">
                  Complete daily tasks, build your streak, and prepare with focus and intention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section - Contact CTA */}
      <section id="contact" className="py-20 border-t border-border/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/50 border border-border/50 rounded-lg p-8 sm:p-12 backdrop-blur">
            <h2 className="text-3xl font-bold mb-4">Share Your Feedback</h2>
            <p className="text-muted-foreground mb-8">
              We're building ExamReady based on feedback from serious exam candidates. Tell us what you think.
            </p>
            <Button
              onClick={() => window.location.href = '/feedback'}
              variant="outline"
              size="lg"
            >
              Send Feedback
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Links and copyright */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/careers" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="mailto:contact@examready.com" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-and-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</a></li>
                <li><a href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:support@examready.com" className="hover:text-foreground transition-colors">Help & Support</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2026 ExamReady. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-4 md:mt-0 text-center md:text-right max-w-md">
              ExamReady is an independent preparation platform and is not affiliated with or endorsed by CAT or any official examining body.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
