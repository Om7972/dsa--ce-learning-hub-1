'use client';

import { Check } from 'lucide-react';
import { ONBOARDING_STEPS } from '@/lib/onboarding-constants';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {ONBOARDING_STEPS.map((step, index) => (
            <div key={step.id} className="flex-1">
              <div className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                    index + 1 <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  aria-current={index + 1 === currentStep ? 'step' : undefined}
                  role="img"
                  aria-label={`Step ${index + 1}: ${step.title}`}
                >
                  {index + 1 < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Connecting Line */}
                {index < ONBOARDING_STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mb-5 mx-2 transition-all ${
                      index + 1 < currentStep
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Info */}
      <div className="text-center text-sm text-muted-foreground mb-6">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
