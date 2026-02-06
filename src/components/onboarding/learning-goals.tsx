'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LEARNING_GOALS, type LearningGoal } from '@/lib/onboarding-constants';

interface LearningGoalsProps {
  selectedGoals: LearningGoal[];
  onNext: (goals: LearningGoal[]) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function LearningGoals({
  selectedGoals,
  onNext,
  onBack,
  onSkip,
}: LearningGoalsProps) {
  const [goals, setGoals] = useState<Set<LearningGoal>>(
    new Set(selectedGoals)
  );
  const [errors, setErrors] = useState<string>('');

  const toggleGoal = (goalId: LearningGoal) => {
    const newGoals = new Set(goals);
    if (newGoals.has(goalId)) {
      newGoals.delete(goalId);
    } else {
      newGoals.add(goalId);
    }
    setGoals(newGoals);
    setErrors('');
  };

  const handleNext = () => {
    if (goals.size === 0) {
      setErrors('Please select at least one learning goal');
      return;
    }
    onNext(Array.from(goals));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">What Are Your Learning Goals?</h2>
        <p className="text-muted-foreground">
          Select all that apply. We'll customize your experience accordingly.
        </p>
      </div>

      <div className="space-y-4" role="group" aria-labelledby="goals-legend">
        <legend id="goals-legend" className="sr-only">
          Learning Goals
        </legend>
        {LEARNING_GOALS.map((goal) => (
          <div key={goal.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
            onClick={() => {
              const checkbox = document.getElementById(`goal-${goal.id}`) as HTMLInputElement;
              if (checkbox) checkbox.click();
            }}
          >
            <Checkbox
              id={`goal-${goal.id}`}
              checked={goals.has(goal.id)}
              onCheckedChange={() => toggleGoal(goal.id)}
              aria-label={goal.label}
              className="mt-1"
            />
            <div className="flex-1">
              <Label
                htmlFor={`goal-${goal.id}`}
                className="text-base font-semibold cursor-pointer block"
              >
                <span className="mr-2">{goal.icon}</span>
                {goal.label}
              </Label>
            </div>
          </div>
        ))}
      </div>

      {errors && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
        >
          {errors}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          aria-label="Go back to previous step"
        >
          Back
        </Button>
        {onSkip && (
          <Button
            variant="outline"
            onClick={onSkip}
            className="flex-1"
            aria-label="Skip this step"
          >
            Skip
          </Button>
        )}
        <Button
          onClick={handleNext}
          className="flex-1"
          aria-label="Continue to next step"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
