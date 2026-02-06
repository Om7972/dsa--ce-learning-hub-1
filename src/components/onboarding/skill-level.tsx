'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { SKILL_LEVELS, type SkillLevel } from '@/lib/onboarding-constants';
import { useState } from 'react';

interface SkillLevelProps {
  selectedLevel: SkillLevel;
  onNext: (level: SkillLevel) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function SkillLevelComponent({
  selectedLevel,
  onNext,
  onBack,
  onSkip,
}: SkillLevelProps) {
  const [selected, setSelected] = useState<SkillLevel>(selectedLevel);
  const [errors, setErrors] = useState<string>('');

  const handleNext = () => {
    if (!selected) {
      setErrors('Please select a skill level');
      return;
    }
    onNext(selected);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">What's Your Current Skill Level?</h2>
        <p className="text-muted-foreground">
          This helps us recommend content at the right difficulty
        </p>
      </div>

      <RadioGroup value={selected} onValueChange={(value) => {
        setSelected(value as SkillLevel);
        setErrors('');
      }}>
        <div className="space-y-3" role="group" aria-labelledby="skill-legend">
          <legend id="skill-legend" className="sr-only">
            Skill Level
          </legend>
          {SKILL_LEVELS.map((level) => (
            <Card
              key={level.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                const radio = document.getElementById(`skill-${level.id}`) as HTMLInputElement;
                if (radio) radio.click();
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={level.id} id={`skill-${level.id}`} />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{level.label}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {level.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </RadioGroup>

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
