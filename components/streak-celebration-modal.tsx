'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface StreakCelebrationModalProps {
  isOpen: boolean;
  currentStreak: number;
  longestStreak: number;
  onClose: () => void;
}

export function StreakCelebrationModal({
  isOpen,
  currentStreak,
  longestStreak,
  onClose,
}: StreakCelebrationModalProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      const timer = setTimeout(() => {
        setAnimateIn(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-card border-2 border-primary rounded-xl p-8 sm:p-12 max-w-md mx-auto shadow-2xl transition-all duration-300 ${
          animateIn
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {/* Confetti-like elements */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `-10px`,
                animation: `fall ${2 + i * 0.2}s linear infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>

        <div className="relative z-10 text-center space-y-6">
          {/* Fire Emoji */}
          <div className="text-6xl animate-bounce" style={{ animationDuration: '1s' }}>
            🔥
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold">
            Excellent Work!
          </h2>

          {/* Motivational Message */}
          <p className="text-muted-foreground text-lg">
            You completed today's tasks and maintained your momentum.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="text-2xl font-bold text-primary">
                {currentStreak}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Current Streak
              </div>
            </div>
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <div className="text-2xl font-bold text-accent">
                {longestStreak}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Longest Streak
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="bg-card/50 border border-border/50 rounded-lg p-4">
            <p className="text-sm text-foreground italic">
              "Consistency is the foundation of excellence. Keep pushing."
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
