// Onboarding constants and configuration
export const ONBOARDING_STEPS = [
  { id: 1, title: 'Profile Setup', subtitle: 'Tell us about yourself' },
  { id: 2, title: 'Learning Goals', subtitle: 'What do you want to achieve?' },
  { id: 3, title: 'Skill Level', subtitle: 'What\'s your current level?' },
  { id: 4, title: 'Interests', subtitle: 'Choose your preferred topics' },
  { id: 5, title: 'Daily Commitment', subtitle: 'How much time can you dedicate?' },
] as const;

export const LEARNING_GOALS = [
  { id: 'interviews', label: 'Crack coding interviews', icon: '🎯' },
  { id: 'dsa', label: 'Master Data Structures & Algorithms', icon: '📊' },
  { id: 'gate', label: 'Prepare for GATE exam', icon: '📚' },
  { id: 'university', label: 'Excel in university exams', icon: '🎓' },
  { id: 'placement', label: 'Get placed in top companies', icon: '🚀' },
] as const;

export const SKILL_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: 'Just getting started with programming' },
  { id: 'intermediate', label: 'Intermediate', description: 'Comfortable with basics, learning advanced concepts' },
  { id: 'advanced', label: 'Advanced', description: 'Strong foundation, refining expertise' },
] as const;

export const DSA_TOPICS = [
  { id: 'arrays', label: 'Arrays & Strings', icon: '📦' },
  { id: 'linked-lists', label: 'Linked Lists', icon: '🔗' },
  { id: 'stacks-queues', label: 'Stacks & Queues', icon: '📚' },
  { id: 'trees', label: 'Trees & Binary Trees', icon: '🌳' },
  { id: 'graphs', label: 'Graphs', icon: '🕸️' },
  { id: 'heaps', label: 'Heaps', icon: '⛰️' },
  { id: 'sorting', label: 'Sorting Algorithms', icon: '⚙️' },
  { id: 'searching', label: 'Searching Algorithms', icon: '🔍' },
  { id: 'dp', label: 'Dynamic Programming', icon: '🎯' },
  { id: 'greedy', label: 'Greedy Algorithms', icon: '🍃' },
] as const;

export const CE_SUBJECTS = [
  { id: 'os', label: 'Operating Systems', icon: '💻' },
  { id: 'dbms', label: 'Database Management Systems', icon: '🗄️' },
  { id: 'cn', label: 'Computer Networks', icon: '🌐' },
  { id: 'oop', label: 'Object-Oriented Programming', icon: '🎨' },
  { id: 'se', label: 'Software Engineering', icon: '⚡' },
  { id: 'compiler', label: 'Compiler Design', icon: '🛠️' },
  { id: 'aoa', label: 'Analysis of Algorithms', icon: '📈' },
  { id: 'cd', label: 'Computer Design', icon: '🖥️' },
  { id: 'ai', label: 'Artificial Intelligence', icon: '🤖' },
  { id: 'ml', label: 'Machine Learning', icon: '🧠' },
] as const;

export const TIME_COMMITMENTS = [
  { id: '15', label: '15 minutes', description: 'Quick daily practice' },
  { id: '30', label: '30 minutes', description: 'Regular learning' },
  { id: '60', label: '1 hour', description: 'Dedicated study' },
  { id: '120', label: '2+ hours', description: 'Serious preparation' },
] as const;

export const YEAR_OF_STUDY = [
  { label: 'First Year', value: 1 },
  { label: 'Second Year', value: 2 },
  { label: 'Third Year', value: 3 },
  { label: 'Fourth Year', value: 4 },
  { label: 'Not in college yet', value: 0 },
  { label: 'Already graduated', value: 5 },
] as const;

export const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Chinese', value: 'zh' },
] as const;

// Export type helpers
export type LearningGoal = (typeof LEARNING_GOALS)[number]['id'];
export type SkillLevel = (typeof SKILL_LEVELS)[number]['id'];
export type DSATopic = (typeof DSA_TOPICS)[number]['id'];
export type CESubject = (typeof CE_SUBJECTS)[number]['id'];
export type TimeCommitment = (typeof TIME_COMMITMENTS)[number]['id'];

export interface OnboardingData {
  fullName: string;
  college: string;
  yearOfStudy: number;
  preferredLanguage: string;
  learningGoals: LearningGoal[];
  skillLevel: SkillLevel;
  interests: (DSATopic | CESubject)[];
  dailyTimeCommitment: TimeCommitment;
}
