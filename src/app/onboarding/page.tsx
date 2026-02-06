'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Stepper } from '@/components/onboarding/stepper';
import { ProfileSetup } from '@/components/onboarding/profile-setup';
import { LearningGoals } from '@/components/onboarding/learning-goals';
import { SkillLevelComponent } from '@/components/onboarding/skill-level';
import { Interests } from '@/components/onboarding/interests';
import { DailyCommitment } from '@/components/onboarding/daily-commitment';
import { CompletionScreen } from '@/components/onboarding/completion-screen';
import { ONBOARDING_STEPS } from '@/lib/onboarding-constants';
import type { OnboardingData, LearningGoal, SkillLevel, TimeCommitment } from '@/lib/onboarding-constants';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const TOTAL_STEPS = ONBOARDING_STEPS.length;
const STORAGE_KEY = 'onboarding_progress';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const [formData, setFormData] = useState<OnboardingData>({
    fullName: '',
    college: '',
    yearOfStudy: 0,
    preferredLanguage: 'en',
    learningGoals: [] as LearningGoal[],
    skillLevel: 'beginner' as SkillLevel,
    interests: [],
    dailyTimeCommitment: '30' as TimeCommitment,
  });

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed.data);
        setCurrentStep(parsed.step);
      } catch (error) {
        console.error('Failed to parse saved onboarding data:', error);
      }
    }
  }, []);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data: formData, step: currentStep })
    );
  }, [formData, currentStep]);

  const handleNext = (stepData: Partial<OnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleComplete = async (finalData: Partial<OnboardingData>) => {
    const completeData: OnboardingData = { ...formData, ...finalData };

    try {
      setIsSubmitting(true);

      // Validate data
      if (!completeData.fullName) {
        toast.error('Full name is required');
        return;
      }

      if (completeData.learningGoals.length === 0) {
        toast.error('Please select at least one learning goal');
        return;
      }

      // Submit to API
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to complete onboarding');
        return;
      }

      // Show completion screen
      setShowCompletion(true);
      toast.success('Welcome to your learning journey!');

      // Clear saved progress
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Onboarding error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueToDashboard = () => {
    router.push('/dashboard');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (showCompletion) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center p-4">
        <div className="w-full">
          <CompletionScreen
            data={formData}
            onContinue={handleContinueToDashboard}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Stepper */}
        <div className="mb-12">
          <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-lg shadow-lg p-8 mb-8 border">
          {currentStep === 1 && (
            <ProfileSetup
              fullName={formData.fullName}
              college={formData.college}
              yearOfStudy={formData.yearOfStudy}
              preferredLanguage={formData.preferredLanguage}
              onNext={(data) => {
                handleNext(data);
              }}
              onSkip={handleSkip}
            />
          )}

          {currentStep === 2 && (
            <LearningGoals
              selectedGoals={formData.learningGoals}
              onNext={(goals) => {
                handleNext({ learningGoals: goals });
              }}
              onBack={handleBack}
              onSkip={handleSkip}
            />
          )}

          {currentStep === 3 && (
            <SkillLevelComponent
              selectedLevel={formData.skillLevel}
              onNext={(level) => {
                handleNext({ skillLevel: level });
              }}
              onBack={handleBack}
              onSkip={handleSkip}
            />
          )}

          {currentStep === 4 && (
            <Interests
              selectedInterests={formData.interests}
              onNext={(interests) => {
                handleNext({ interests });
              }}
              onBack={handleBack}
              onSkip={handleSkip}
            />
          )}

          {currentStep === 5 && (
            <DailyCommitment
              selectedCommitment={formData.dailyTimeCommitment}
              onNext={(commitment) => {
                handleComplete({ dailyTimeCommitment: commitment });
              }}
              onBack={handleBack}
            />
          )}
        </div>

        {/* Progress Text */}
        <div className="text-center text-sm text-muted-foreground">
          {currentStep} of {TOTAL_STEPS} steps
        </div>

        {/* Submission Status */}
        {isSubmitting && (
          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Saving your preferences...</span>
          </div>
        )}
      </div>
    </main>
  );
}
