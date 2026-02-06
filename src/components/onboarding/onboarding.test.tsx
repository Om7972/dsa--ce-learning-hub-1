/* eslint-disable import/no-unresolved */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileSetup } from '@/components/onboarding/profile-setup';
import { LearningGoals } from '@/components/onboarding/learning-goals';
import { SkillLevelComponent } from '@/components/onboarding/skill-level';
import { Interests } from '@/components/onboarding/interests';
import { DailyCommitment } from '@/components/onboarding/daily-commitment';

describe('Onboarding Components', () => {
  describe('ProfileSetup', () => {
    it('should render profile setup form', () => {
      const mockOnNext = vi.fn();
      render(
        <ProfileSetup
          fullName=""
          college=""
          yearOfStudy={0}
          preferredLanguage="en"
          onNext={mockOnNext}
        />
      );

      expect(screen.getByText('Tell Us About Yourself')).toBeInTheDocument();
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('College')).toBeInTheDocument();
    });

    it('should show error for empty full name', () => {
      const mockOnNext = vi.fn();
      render(
        <ProfileSetup
          fullName=""
          college=""
          yearOfStudy={0}
          preferredLanguage="en"
          onNext={mockOnNext}
        />
      );

      fireEvent.click(screen.getByLabelText('Continue to next step'));
      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should call onNext with data when valid', () => {
      const mockOnNext = vi.fn();
      render(
        <ProfileSetup
          fullName="John Doe"
          college="MIT"
          yearOfStudy={2}
          preferredLanguage="en"
          onNext={mockOnNext}
        />
      );

      fireEvent.click(screen.getByLabelText('Continue to next step'));
      expect(mockOnNext).toHaveBeenCalledWith({
        fullName: 'John Doe',
        college: 'MIT',
        yearOfStudy: 2,
        preferredLanguage: 'en',
      });
    });
  });

  describe('LearningGoals', () => {
    it('should render all learning goal options', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <LearningGoals
          selectedGoals={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText('Crack coding interviews')).toBeInTheDocument();
      expect(screen.getByText('Master Data Structures & Algorithms')).toBeInTheDocument();
      expect(screen.getByText('Prepare for GATE exam')).toBeInTheDocument();
    });

    it('should show error when no goals selected', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <LearningGoals
          selectedGoals={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      fireEvent.click(screen.getByLabelText('Continue to next step'));
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(mockOnNext).not.toHaveBeenCalled();
    });

    it('should allow selecting multiple goals', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <LearningGoals
          selectedGoals={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      fireEvent.click(screen.getByLabelText('Continue to next step'));

      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  describe('SkillLevelComponent', () => {
    it('should render all skill levels', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <SkillLevelComponent
          selectedLevel="beginner"
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    it('should call onNext with selected skill level', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <SkillLevelComponent
          selectedLevel="intermediate"
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      fireEvent.click(screen.getByLabelText('Continue to next step'));
      expect(mockOnNext).toHaveBeenCalledWith('intermediate');
    });
  });

  describe('Interests', () => {
    it('should render DSA and CE tabs', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <Interests
          selectedInterests={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText('Data Structures')).toBeInTheDocument();
      expect(screen.getByText('Computer Engineering')).toBeInTheDocument();
    });

    it('should show error when no interests selected', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <Interests
          selectedInterests={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      fireEvent.click(screen.getByLabelText('Continue to next step'));
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should allow selecting interests from both tabs', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <Interests
          selectedInterests={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      // Select from DSA tab (already active)
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);

      // Switch to CE tab
      fireEvent.click(screen.getByText('Computer Engineering'));

      // Select from CE tab
      const ceCheckboxes = screen.getAllByRole('checkbox');
      fireEvent.click(ceCheckboxes[0]);

      fireEvent.click(screen.getByLabelText('Continue to next step'));
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  describe('DailyCommitment', () => {
    it('should render all time commitment options', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <DailyCommitment
          selectedCommitment="30"
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByText('15 minutes')).toBeInTheDocument();
      expect(screen.getByText('30 minutes')).toBeInTheDocument();
      expect(screen.getByText('1 hour')).toBeInTheDocument();
      expect(screen.getByText('2+ hours')).toBeInTheDocument();
    });

    it('should call onNext with selected commitment', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <DailyCommitment
          selectedCommitment="60"
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      fireEvent.click(screen.getByLabelText('Complete onboarding'));
      expect(mockOnNext).toHaveBeenCalledWith('60');
    });
  });

  describe('Navigation', () => {
    it('should call onBack when back button clicked', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <LearningGoals
          selectedGoals={['interviews']}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      fireEvent.click(screen.getByLabelText('Go back to previous step'));
      expect(mockOnBack).toHaveBeenCalled();
    });

    it('should call onSkip when skip button clicked', () => {
      const mockOnNext = vi.fn();
      const mockOnSkip = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <LearningGoals
          selectedGoals={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
          onSkip={mockOnSkip}
        />
      );

      fireEvent.click(screen.getByLabelText('Skip this step'));
      expect(mockOnSkip).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('ProfileSetup should have proper ARIA labels', () => {
      const mockOnNext = vi.fn();
      render(
        <ProfileSetup
          fullName=""
          college=""
          yearOfStudy={0}
          preferredLanguage="en"
          onNext={mockOnNext}
        />
      );

      expect(screen.getByLabelText('Full Name')).toHaveAttribute('aria-label');
      expect(screen.getByLabelText('College')).toHaveAttribute('aria-label');
    });

    it('LearningGoals should have proper role attributes', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <LearningGoals
          selectedGoals={[]}
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('SkillLevelComponent should have radio buttons', () => {
      const mockOnNext = vi.fn();
      const mockOnBack = vi.fn();
      render(
        <SkillLevelComponent
          selectedLevel="beginner"
          onNext={mockOnNext}
          onBack={mockOnBack}
        />
      );

      expect(screen.getAllByRole('radio')).toHaveLength(3);
    });
  });
});
