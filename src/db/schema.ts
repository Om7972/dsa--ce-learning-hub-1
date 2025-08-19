import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('student'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const subjects = sqliteTable('subjects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  difficultyLevel: text('difficulty_level').notNull(),
  createdAt: text('created_at').notNull(),
});

export const topics = sqliteTable('topics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  subjectId: integer('subject_id').references(() => subjects.id),
  name: text('name').notNull(),
  description: text('description'),
  orderIndex: integer('order_index').notNull(),
  estimatedHours: integer('estimated_hours').notNull(),
});

export const assignments = sqliteTable('assignments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  subjectId: integer('subject_id').references(() => subjects.id),
  title: text('title').notNull(),
  description: text('description'),
  difficulty: text('difficulty').notNull(),
  dueDate: text('due_date').notNull(),
  points: integer('points').notNull(),
  createdAt: text('created_at').notNull(),
});

export const problems = sqliteTable('problems', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  difficulty: text('difficulty').notNull(),
  category: text('category').notNull(),
  solutionCode: text('solution_code'),
  testCases: text('test_cases', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});

export const userProgress = sqliteTable('user_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  topicId: integer('topic_id').references(() => topics.id),
  status: text('status').notNull().default('not_started'),
  completionDate: text('completion_date'),
});

export const studySchedules = sqliteTable('study_schedules', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  topicId: integer('topic_id').references(() => topics.id),
  scheduledDate: text('scheduled_date').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  status: text('status').notNull().default('scheduled'),
});

export const careerPaths = sqliteTable('career_paths', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  requirements: text('requirements', { mode: 'json' }),
  salaryRange: text('salary_range').notNull(),
  skillsNeeded: text('skills_needed', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  techStack: text('tech_stack', { mode: 'json' }),
  difficulty: text('difficulty').notNull(),
  githubUrl: text('github_url'),
  demoUrl: text('demo_url'),
  category: text('category').notNull(),
  createdAt: text('created_at').notNull(),
});

export const userSubmissions = sqliteTable('user_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  problemId: integer('problem_id').references(() => problems.id),
  code: text('code').notNull(),
  status: text('status').notNull().default('pending'),
  submittedAt: text('submitted_at').notNull(),
});