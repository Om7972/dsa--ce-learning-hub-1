import { OnboardingData, type LearningGoal, type SkillLevel } from './onboarding-constants';

export interface PersonalizedRecommendation {
  learningPath: string;
  recommendedTopics: string[];
  estimatedDuration: string;
  focusAreas: string[];
  suggestedPaceMinutesPerDay: number;
}

/**
 * Generate personalized learning recommendations based on onboarding data
 */
export function generatePersonalizedRecommendations(
  data: OnboardingData
): PersonalizedRecommendation {
  const recommendations: PersonalizedRecommendation = {
    learningPath: '',
    recommendedTopics: [],
    estimatedDuration: '',
    focusAreas: [],
    suggestedPaceMinutesPerDay: parseInt(data.dailyTimeCommitment),
  };

  // Determine primary learning path based on goals
  const primaryGoal = data.learningGoals[0];
  
  if (primaryGoal === 'interviews') {
    recommendations.learningPath = 'Interview Preparation Track';
    recommendations.focusAreas = [
      'Data Structures & Algorithms',
      'System Design',
      'Behavioral Questions',
    ];
    recommendations.estimatedDuration = '3-4 months';
  } else if (primaryGoal === 'dsa') {
    recommendations.learningPath = 'Master DSA Foundation';
    recommendations.focusAreas = [
      'Algorithm Fundamentals',
      'Problem-Solving Patterns',
      'Optimization Techniques',
    ];
    recommendations.estimatedDuration = '4-6 months';
  } else if (primaryGoal === 'gate') {
    recommendations.learningPath = 'GATE Exam Preparation';
    recommendations.focusAreas = [
      'Discrete Mathematics',
      'Core CS Subjects',
      'Previous Year Papers',
    ];
    recommendations.estimatedDuration = '6-8 months';
  } else if (primaryGoal === 'placement') {
    recommendations.learningPath = 'Placement Ready Track';
    recommendations.focusAreas = [
      'DSA Fundamentals',
      'Resume Building',
      'Interview Soft Skills',
    ];
    recommendations.estimatedDuration = '2-3 months';
  } else {
    recommendations.learningPath = 'General Learning Path';
    recommendations.focusAreas = [
      'CS Fundamentals',
      'Practical Skills',
      'Project Building',
    ];
    recommendations.estimatedDuration = 'Variable';
  }

  // Add recommended topics based on interests and skill level
  recommendations.recommendedTopics = getRecommendedTopics(
    data.interests,
    data.skillLevel,
    data.learningGoals
  );

  // Adjust estimated duration based on skill level
  if (data.skillLevel === 'advanced') {
    recommendations.estimatedDuration = recommendations.estimatedDuration.split('-')[0] + ' months';
  } else if (data.skillLevel === 'beginner') {
    recommendations.estimatedDuration = recommendations.estimatedDuration.split('-')[1] + ' months';
  }

  return recommendations;
}

/**
 * Generate list of recommended learning topics
 */
function getRecommendedTopics(
  interests: string[],
  skillLevel: SkillLevel,
  goals: LearningGoal[]
): string[] {
  const topics: string[] = [];

  // Fundamental topics for all skill levels
  const fundamentals = ['Arrays', 'Strings', 'Linked Lists'];

  if (skillLevel === 'beginner') {
    topics.push(...fundamentals, 'Basic Sorting', 'Searching');
  } else if (skillLevel === 'intermediate') {
    topics.push(...fundamentals, 'Trees', 'Graphs', 'Sorting Algorithms');
  } else {
    topics.push(...fundamentals, 'Graphs', 'Dynamic Programming', 'Advanced Data Structures');
  }

  // Add topics based on goals
  if (goals.includes('interviews')) {
    topics.push('System Design', 'Problem Solving Patterns');
  }

  if (goals.includes('gate')) {
    topics.push('Discrete Mathematics', 'Complexity Analysis');
  }

  // Remove duplicates and return
  return [...new Set(topics)];
}

/**
 * Calculate a personalized study schedule
 */
export function calculateStudySchedule(
  dailyMinutes: string,
  focusAreas: string[]
): { area: string; minutesPerDay: number }[] {
  const totalMinutes = parseInt(dailyMinutes);
  const minutesPerArea = Math.floor(totalMinutes / focusAreas.length);

  return focusAreas.map((area) => ({
    area,
    minutesPerDay: minutesPerArea,
  }));
}

/**
 * Get onboarding completion message based on goals and skill level
 */
export function getOnboardingCompletionMessage(
  fullName: string,
  skillLevel: SkillLevel,
  goals: LearningGoal[]
): string {
  const goalEmojis: Record<LearningGoal, string> = {
    interviews: '🎯',
    dsa: '📊',
    gate: '📚',
    university: '🎓',
    placement: '🚀',
  };

  const skillMessages: Record<SkillLevel, string> = {
    beginner: "Let's start from the basics and build a strong foundation!",
    intermediate: "Time to level up and master advanced concepts!",
    advanced: "Let's polish your expertise and tackle complex problems!",
  };

  const goalTitles = goals
    .map((goal) => {
      const found = { interviews: 'secure interviews', dsa: 'master DSA', gate: 'pass GATE', university: 'ace exams', placement: 'get placed' }[goal];
      return `${goalEmojis[goal]} ${found}`;
    })
    .join(', ');

  return `Welcome ${fullName}! 🎉\n\nYour goals: ${goalTitles}\n${skillMessages[skillLevel]}\n\nLet's start your journey!`;
}

/**
 * Validate onboarding data
 */
export function validateOnboardingData(data: OnboardingData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters');
  }

  if (data.learningGoals.length === 0) {
    errors.push('Please select at least one learning goal');
  }

  if (!data.skillLevel) {
    errors.push('Please select a skill level');
  }

  if (data.interests.length === 0) {
    errors.push('Please select at least one interest');
  }

  if (!data.dailyTimeCommitment) {
    errors.push('Please select a daily time commitment');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
