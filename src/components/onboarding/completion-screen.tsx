'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Particles } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { getOnboardingCompletionMessage } from '@/lib/onboarding-utils';
import { type OnboardingData } from '@/lib/onboarding-constants';

interface CompletionScreenProps {
  data: OnboardingData;
  onContinue: () => void;
}

export function CompletionScreen({ data, onContinue }: CompletionScreenProps) {
  const [particlesReady, setParticlesReady] = useState(false);
  const message = getOnboardingCompletionMessage(
    data.fullName,
    data.skillLevel,
    data.learningGoals
  );

  // Ensure particles render; avoid passing `init` prop to Particles to satisfy typings.
  // loadSlim is optional; rendering without `init` works for included presets.
  useEffect(() => {
    setParticlesReady(true);
  }, []);

  const confettiOptions = {
    background: {
      color: 'transparent',
    },
    particles: {
      color: {
        value: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#a8e6cf'],
      },
      move: {
        enable: true,
        speed: 5,
        direction: 'top' as const,
        random: true,
        straight: false,
        outMode: 'out' as const,
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0,
          sync: false,
        },
      },
      size: {
        value: { min: 4, max: 12 },
        random: true,
      },
      shape: {
        type: 'circle',
      },
    },
    emitters: {
      position: {
        x: 50,
        y: 10,
      },
      rate: {
        delay: 0,
        quantity: 10,
      },
    },
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {/* Confetti Animation */}
      {particlesReady && (
        <Particles
          id="confetti"
          options={confettiOptions as any}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 py-12 px-4">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Success"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">🎉 Welcome Aboard!</h2>
          <div className="bg-accent p-6 rounded-lg">
            <p className="text-lg font-semibold whitespace-pre-line leading-relaxed">
              {message}
            </p>
          </div>
          <p className="text-muted-foreground">
            Your personalized learning experience is ready. Let's get started!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {data.learningGoals.length}
            </p>
            <p className="text-xs text-muted-foreground">Goals</p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {data.interests.length}
            </p>
            <p className="text-xs text-muted-foreground">Topics</p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {data.dailyTimeCommitment} min
            </p>
            <p className="text-xs text-muted-foreground">Daily</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full sm:w-auto"
          aria-label="Continue to dashboard"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
