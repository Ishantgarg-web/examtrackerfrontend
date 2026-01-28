'use client';

import React from "react"

// Feedback Form Page
// This page allows signed-in users to submit feedback about ExamReady
// Unauthenticated users are redirected to login

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { apiClient } from '@/lib/api-client';

export default function FeedbackPage() {
  const { isAuthenticated, user, loading } = useAuth();
  const [feedbackType, setFeedbackType] = useState<string>('bug');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Redirect unauthenticated users to login
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

  if (!isAuthenticated) {
    redirect('/login');
  }

  // Handle form submission - sends feedback to backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!subject.trim() || !message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Call the API to submit feedback
      await apiClient.submitFeedback({
        feedbackType,
        subject,
        message,
      });
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your feedback! We appreciate your input.');
      // Reset form fields
      setFeedbackType('bug');
      setSubject('');
      setMessage('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error: any) {
      setSubmitStatus('error');
      setSubmitMessage(error.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExamReady
            </a>
            <nav className="ml-auto">
              <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to Dashboard
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Send Us Your Feedback</h1>
            <p className="text-muted-foreground text-lg">
              We value your input and use your feedback to improve ExamReady. Help us build a better platform.
            </p>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="bg-green-950/40 border border-green-900/50 text-green-200 rounded-lg p-4">
              {submitMessage}
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="bg-red-950/40 border border-red-900/50 text-red-200 rounded-lg p-4">
              {submitMessage}
            </div>
          )}

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Info Display */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                <strong>Submitting as:</strong> {user?.username || user?.email}
              </p>
            </div>

            {/* Feedback Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">
                Feedback Type
              </label>
              <select
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="improvement">Improvement Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Subject Field */}
            <div className="space-y-3">
              <label htmlFor="subject" className="block text-sm font-semibold text-foreground">
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                placeholder="Briefly describe your feedback"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={100}
                className="bg-input border-border"
                disabled={submitting}
              />
              <p className="text-xs text-muted-foreground">{subject.length}/100</p>
            </div>

            {/* Message Field */}
            <div className="space-y-3">
              <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Please provide detailed feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                rows={6}
                className="bg-input border-border"
                disabled={submitting}
              />
              <p className="text-xs text-muted-foreground">{message.length}/1000</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </form>

          {/* Help Text */}
          <div className="bg-card/30 border border-border/50 rounded-lg p-6 text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">Tips for helpful feedback:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Be specific about what you experienced or want to suggest</li>
              <li>Include steps to reproduce if reporting a bug</li>
              <li>Share what you expected vs what happened</li>
              <li>Let us know how a feature would help your preparation</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
