'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DSA_TOPICS, CE_SUBJECTS } from '@/lib/onboarding-constants';
import type { DSATopic, CESubject } from '@/lib/onboarding-constants';

interface InterestsProps {
  selectedInterests: (DSATopic | CESubject)[];
  onNext: (interests: (DSATopic | CESubject)[]) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function Interests({
  selectedInterests,
  onNext,
  onBack,
  onSkip,
}: InterestsProps) {
  const [interests, setInterests] = useState<Set<DSATopic | CESubject>>(
    new Set(selectedInterests)
  );
  const [errors, setErrors] = useState<string>('');

  const toggleInterest = (id: DSATopic | CESubject) => {
    const newInterests = new Set(interests);
    if (newInterests.has(id)) {
      newInterests.delete(id);
    } else {
      newInterests.add(id);
    }
    setInterests(newInterests);
    setErrors('');
  };

  const handleNext = () => {
    if (interests.size === 0) {
      setErrors('Please select at least one interest');
      return;
    }
    onNext(Array.from(interests));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">What Interests You Most?</h2>
        <p className="text-muted-foreground">
          Choose the topics you'd like to focus on
        </p>
      </div>

      <Tabs defaultValue="dsa" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dsa">Data Structures</TabsTrigger>
          <TabsTrigger value="ce">Computer Engineering</TabsTrigger>
        </TabsList>

        {/* DSA Topics Tab */}
        <TabsContent value="dsa" className="space-y-4">
          <div className="space-y-3" role="group" aria-labelledby="dsa-legend">
            <legend id="dsa-legend" className="sr-only">
              DSA Topics
            </legend>
            {DSA_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                onClick={() => {
                  const checkbox = document.getElementById(
                    `interest-${topic.id}`
                  ) as HTMLInputElement;
                  if (checkbox) checkbox.click();
                }}
              >
                <Checkbox
                  id={`interest-${topic.id}`}
                  checked={interests.has(topic.id)}
                  onCheckedChange={() => toggleInterest(topic.id)}
                  aria-label={topic.label}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`interest-${topic.id}`}
                    className="text-base font-semibold cursor-pointer block"
                  >
                    <span className="mr-2">{topic.icon}</span>
                    {topic.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* CE Subjects Tab */}
        <TabsContent value="ce" className="space-y-4">
          <div className="space-y-3" role="group" aria-labelledby="ce-legend">
            <legend id="ce-legend" className="sr-only">
              Computer Engineering Subjects
            </legend>
            {CE_SUBJECTS.map((subject) => (
              <div
                key={subject.id}
                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                onClick={() => {
                  const checkbox = document.getElementById(
                    `interest-${subject.id}`
                  ) as HTMLInputElement;
                  if (checkbox) checkbox.click();
                }}
              >
                <Checkbox
                  id={`interest-${subject.id}`}
                  checked={interests.has(subject.id)}
                  onCheckedChange={() => toggleInterest(subject.id)}
                  aria-label={subject.label}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`interest-${subject.id}`}
                    className="text-base font-semibold cursor-pointer block"
                  >
                    <span className="mr-2">{subject.icon}</span>
                    {subject.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground">
        Selected: <span className="font-semibold">{interests.size} topic(s)</span>
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
