/* eslint-disable import/no-unresolved */
import { describe, it, expect } from 'vitest';
import {
  validateOnboardingData,
  generatePersonalizedRecommendations,
  calculateStudySchedule,
  getOnboardingCompletionMessage,
} from '@/lib/onboarding-utils';
import type { OnboardingData, LearningGoal, DSATopic, CESubject, TimeCommitment, SkillLevel } from '@/lib/onboarding-constants';

describe('Onboarding Utilities', () => {
  const validData: OnboardingData = {
    fullName: 'John Doe',
    college: 'MIT',
    yearOfStudy: 2,
    preferredLanguage: 'en',
    learningGoals: ['interviews', 'dsa'] as LearningGoal[],
    skillLevel: 'intermediate',
    interests: ['arrays', 'trees', 'os'] as any as (DSATopic | CESubject)[],
    dailyTimeCommitment: '60' as TimeCommitment,
  };

  describe('validateOnboardingData', () => {
    it('should validate correct onboarding data', () => {
      const result = validateOnboardingData(validData);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty full name', () => {
      const data = { ...validData, fullName: '' };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Full name must be at least 2 characters');
    });

    it('should reject empty learning goals', () => {
      const data = { ...validData, learningGoals: [] };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Please select at least one learning goal');
    });

    it('should reject empty interests', () => {
      const data = { ...validData, interests: [] };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Please select at least one interest');
    });

    it('should reject empty skill level', () => {
      const data = { ...validData, skillLevel: '' as any };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(false);
    });

    it('should reject empty time commitment', () => {
      const data = { ...validData, dailyTimeCommitment: '' as any };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(false);
    });

    it('should allow optional college and year', () => {
      const data = {
        ...validData,
        college: '',
        yearOfStudy: 0,
      };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(true);
    });
  });

  describe('generatePersonalizedRecommendations', () => {
    it('should generate recommendations for interview goal', () => {
      const data = { ...validData, learningGoals: ['interviews'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.learningPath).toBe('Interview Preparation Track');
      expect(rec.focusAreas).toContain('Data Structures & Algorithms');
      expect(rec.recommendedTopics.length).toBeGreaterThan(0);
    });

    it('should generate recommendations for DSA goal', () => {
      const data = { ...validData, learningGoals: ['dsa'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.learningPath).toBe('Master DSA Foundation');
      expect(rec.focusAreas).toContain('Algorithm Fundamentals');
    });

    it('should generate recommendations for GATE goal', () => {
      const data = { ...validData, learningGoals: ['gate'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.learningPath).toBe('GATE Exam Preparation');
      expect(rec.estimatedDuration).toContain('6-8 months');
    });

    it('should generate recommendations for placement goal', () => {
      const data = { ...validData, learningGoals: ['placement'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.learningPath).toBe('Placement Ready Track');
      expect(rec.estimatedDuration).toContain('2-3 months');
    });

    it('should adjust duration for beginner level', () => {
      const data = { ...validData, skillLevel: 'beginner' as SkillLevel, learningGoals: ['gate'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.estimatedDuration).toContain('8 months');
    });

    it('should adjust duration for advanced level', () => {
      const data = { ...validData, skillLevel: 'advanced' as SkillLevel, learningGoals: ['gate'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.estimatedDuration).toContain('6 months');
    });

    it('should set correct daily pace minutes', () => {
      const data = { ...validData, dailyTimeCommitment: '120' as TimeCommitment };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.suggestedPaceMinutesPerDay).toBe(120);
    });

    it('should recommendation for university goal', () => {
      const data = { ...validData, learningGoals: ['university'] as LearningGoal[] };
      const rec = generatePersonalizedRecommendations(data);
      expect(rec.learningPath).toBe('General Learning Path');
    });
  });

  describe('calculateStudySchedule', () => {
    it('should divide time equally among focus areas', () => {
      const schedule = calculateStudySchedule('60', [
        'DSA',
        'System Design',
        'Soft Skills',
      ]);
      expect(schedule).toHaveLength(3);
      schedule.forEach((item) => {
        expect(item.minutesPerDay).toBe(20);
      });
    });

    it('should handle single focus area', () => {
      const schedule = calculateStudySchedule('90', ['DSA']);
      expect(schedule).toHaveLength(1);
      expect(schedule[0].minutesPerDay).toBe(90);
    });

    it('should distribute time for 30 minutes', () => {
      const schedule = calculateStudySchedule('30', ['A', 'B']);
      expect(schedule[0].minutesPerDay).toBe(15);
      expect(schedule[1].minutesPerDay).toBe(15);
    });

    it('should preserve focus area names', () => {
      const areas = ['Topic A', 'Topic B', 'Topic C'];
      const schedule = calculateStudySchedule('60', areas);
      schedule.forEach((item, i) => {
        expect(item.area).toBe(areas[i]);
      });
    });
  });

  describe('getOnboardingCompletionMessage', () => {
    it('should generate personalized message for beginner', () => {
      const message = getOnboardingCompletionMessage(
        'Alice',
        'beginner',
        ['interviews']
      );
      expect(message).toContain('Alice');
      expect(message).toContain('🎯');
      expect(message).toContain('from the basics');
    });

    it('should generate message for intermediate', () => {
      const message = getOnboardingCompletionMessage(
        'Bob',
        'intermediate',
        ['dsa', 'gate']
      );
      expect(message).toContain('Bob');
      expect(message).toContain('level up');
    });

    it('should generate message for advanced', () => {
      const message = getOnboardingCompletionMessage(
        'Charlie',
        'advanced',
        ['interviews', 'placement']
      );
      expect(message).toContain('Charlie');
      expect(message).toContain('polish');
    });

    it('should include all selected goals', () => {
      const message = getOnboardingCompletionMessage(
        'Diana',
        'intermediate',
        ['interviews', 'dsa', 'gate']
      );
      expect(message).toContain('🎯');
      expect(message).toContain('📊');
      expect(message).toContain('📚');
    });

    it('should handle single goal', () => {
      const message = getOnboardingCompletionMessage(
        'Eve',
        'beginner',
        ['placement']
      );
      expect(message).toContain('Eve');
      expect(message).toContain('🚀');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long full names', () => {
      const data = {
        ...validData,
        fullName: 'A'.repeat(100),
      };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle multiple interests', () => {
      const data = {
        ...validData,
        interests: ['arrays', 'trees', 'graphs', 'os', 'dbms', 'cn'] as any as (DSATopic | CESubject)[],
      };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle all learning goals', () => {
      const data = {
        ...validData,
        learningGoals: ['interviews', 'dsa', 'gate', 'university', 'placement'] as LearningGoal[],
      };
      const result = validateOnboardingData(data);
      expect(result.valid).toBe(true);
    });

    it('should handle minimum time commitment', () => {
      const rec = generatePersonalizedRecommendations({
        ...validData,
        dailyTimeCommitment: '15' as TimeCommitment,
      });
      expect(rec.suggestedPaceMinutesPerDay).toBe(15);
    });

    it('should handle maximum time commitment', () => {
      const rec = generatePersonalizedRecommendations({
        ...validData,
        dailyTimeCommitment: '120' as TimeCommitment,
      });
      expect(rec.suggestedPaceMinutesPerDay).toBe(120);
    });
  });
});
