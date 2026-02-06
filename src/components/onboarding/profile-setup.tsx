'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { YEAR_OF_STUDY, LANGUAGES } from '@/lib/onboarding-constants';

interface ProfileSetupProps {
  fullName: string;
  college: string;
  yearOfStudy: number;
  preferredLanguage: string;
  onNext: (data: {
    fullName: string;
    college: string;
    yearOfStudy: number;
    preferredLanguage: string;
  }) => void;
  onSkip?: () => void;
}

export function ProfileSetup({
  fullName,
  college,
  yearOfStudy,
  preferredLanguage,
  onNext,
  onSkip,
}: ProfileSetupProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localFullName, setLocalFullName] = useState(fullName);
  const [localCollege, setLocalCollege] = useState(college);
  const [localYearOfStudy, setLocalYearOfStudy] = useState(yearOfStudy.toString());
  const [localPreferredLanguage, setLocalPreferredLanguage] = useState(preferredLanguage);

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!localFullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext({
      fullName: localFullName,
      college: localCollege,
      yearOfStudy: parseInt(localYearOfStudy, 10),
      preferredLanguage: localPreferredLanguage,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
        <p className="text-muted-foreground">
          Let's personalize your learning experience
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={localFullName}
            onChange={(e) => {
              setLocalFullName(e.target.value);
              setErrors({ ...errors, fullName: '' });
            }}
            className={errors.fullName ? 'border-red-500' : ''}
            aria-label="Full Name"
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-red-500 text-sm">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* College */}
        <div className="space-y-2">
          <Label htmlFor="college" className="text-base">
            College/University
          </Label>
          <Input
            id="college"
            placeholder="Enter your college name (optional)"
            value={localCollege}
            onChange={(e) => {
              setLocalCollege(e.target.value);
            }}
            aria-label="College"
          />
          <p className="text-xs text-muted-foreground">
            Help us recommend relevant content for your institution
          </p>
        </div>

        {/* Year of Study */}
        <div className="space-y-2">
          <Label htmlFor="yearOfStudy" className="text-base">
            Year of Study
          </Label>
          <Select value={localYearOfStudy} onValueChange={setLocalYearOfStudy}>
            <SelectTrigger id="yearOfStudy" aria-label="Year of Study">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEAR_OF_STUDY.map((year) => (
                <SelectItem key={year.value} value={year.value.toString()}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Language */}
        <div className="space-y-2">
          <Label htmlFor="language" className="text-base">
            Preferred Language
          </Label>
          <Select value={localPreferredLanguage} onValueChange={setLocalPreferredLanguage}>
            <SelectTrigger id="language" aria-label="Preferred Language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6">
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
