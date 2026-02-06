'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import type { OnboardingData } from '@/lib/onboarding-constants';

const STORAGE_KEY = 'onboarding_progress';

export function useOnboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const [onboardingStatus, setOnboardingStatus] = useState<{
    isOnboarded: boolean;
    currentStep: number;
    loading: boolean;
    error: string | null;
  }>({
    isOnboarded: false,
    currentStep: 0,
    loading: true,
    error: null,
  });

  // Check user onboarding status from API
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setOnboardingStatus((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const response = await fetch('/api/onboarding');
        
        if (response.ok) {
          const data = await response.json();
          setOnboardingStatus((prev) => ({
            ...prev,
            isOnboarded: data.onboarded,
            currentStep: data.onboarding_step,
            loading: false,
          }));
        } else {
          setOnboardingStatus((prev) => ({
            ...prev,
            loading: false,
            error: 'Failed to check onboarding status',
          }));
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setOnboardingStatus((prev) => ({
          ...prev,
          loading: false,
          error: 'Error checking onboarding status',
        }));
      }
    };

    checkOnboardingStatus();
  }, [user]);

  // Save progress locally
  const saveProgress = (data: OnboardingData, step: number) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, step })
    );
  };

  // Get saved progress
  const getSavedProgress = (): { data: OnboardingData; step: number } | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Failed to parse saved onboarding data:', error);
        return null;
      }
    }
    return null;
  };

  // Clear saved progress
  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  // Submit onboarding data
  const submitOnboarding = async (data: OnboardingData): Promise<boolean> => {
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        clearProgress();
        setOnboardingStatus((prev) => ({
          ...prev,
          isOnboarded: true,
        }));
        return true;
      } else {
        const error = await response.json();
        setOnboardingStatus((prev) => ({
          ...prev,
          error: error.error || 'Failed to complete onboarding',
        }));
        return false;
      }
    } catch (error) {
      console.error('Onboarding submission error:', error);
      setOnboardingStatus((prev) => ({
        ...prev,
        error: 'Error submitting onboarding data',
      }));
      return false;
    }
  };

  // Resume onboarding (redirect to onboarding page if not complete)
  const resumeOnboarding = () => {
    if (!onboardingStatus.isOnboarded) {
      router.push('/onboarding');
    }
  };

  // Complete onboarding (redirect to dashboard)
  const completeOnboarding = () => {
    router.push('/dashboard');
  };

  return {
    ...onboardingStatus,
    saveProgress,
    getSavedProgress,
    clearProgress,
    submitOnboarding,
    resumeOnboarding,
    completeOnboarding,
  };
}
