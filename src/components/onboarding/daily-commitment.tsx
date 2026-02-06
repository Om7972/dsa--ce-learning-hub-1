'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TIME_COMMITMENTS, type TimeCommitment } from '@/lib/onboarding-constants';

interface DailyCommitmentProps {
  selectedCommitment: TimeCommitment;
  onNext: (commitment: TimeCommitment) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function DailyCommitment({
  selectedCommitment,
  onNext,
  onBack,
  onSkip,
}: DailyCommitmentProps) {
  const [selected, setSelected] = useState<TimeCommitment>(selectedCommitment);
  const [errors, setErrors] = useState<string>('');

  const handleNext = () => {
    if (!selected) {
      setErrors('Please select a daily time commitment');
      return;
    }
    onNext(selected);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Daily Time Commitment</h2>
        <p className="text-muted-foreground">
          How much time can you dedicate daily? (Be realistic!)
        </p>
      </div>

      <RadioGroup value={selected} onValueChange={(value) => {
        setSelected(value as TimeCommitment);
        setErrors('');
      }}>
        <div className="space-y-3" role="group" aria-labelledby="commitment-legend">
          <legend id="commitment-legend" className="sr-only">
            Daily Time Commitment
          </legend>
          {TIME_COMMITMENTS.map((commitment) => (
            <Card
              key={commitment.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                const radio = document.getElementById(
                  `commitment-${commitment.id}`
                ) as HTMLInputElement;
                if (radio) radio.click();
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={commitment.id}
                    id={`commitment-${commitment.id}`}
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {commitment.label}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {commitment.description}
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
          aria-label="Complete onboarding"
        >
          Complete
        </Button>
      </div>
    </div>
  );
}
