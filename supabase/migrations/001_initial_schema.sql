-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE submission_status AS ENUM ('pending', 'accepted', 'rejected', 'running');
CREATE TYPE progress_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE schedule_status AS ENUM ('scheduled', 'completed', 'missed', 'cancelled');

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'student',
  college TEXT,
  year INTEGER,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SUBJECTS TABLE
-- =====================================================
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'DSA', 'CE', 'Programming'
  difficulty_level difficulty_level DEFAULT 'beginner',
  icon_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- LEARNING PATHS TABLE
-- =====================================================
CREATE TABLE public.learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'DSA', 'CE'
  level difficulty_level DEFAULT 'beginner',
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  duration_hours INTEGER,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- LESSONS TABLE
-- =====================================================
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT, -- Markdown content
  video_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TOPICS TABLE
-- =====================================================
CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  estimated_hours INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DSA PROBLEMS TABLE
-- =====================================================
CREATE TABLE public.dsa_problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty difficulty_level DEFAULT 'beginner',
  topic TEXT NOT NULL, -- 'Array', 'Tree', 'Graph', etc.
  sample_input TEXT,
  sample_output TEXT,
  constraints TEXT,
  test_cases JSONB, -- Array of test cases
  hints JSONB, -- Array of hints
  solution_code TEXT,
  time_complexity TEXT,
  space_complexity TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- QUIZZES TABLE
-- =====================================================
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  total_marks INTEGER DEFAULT 100,
  duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- QUIZ QUESTIONS TABLE
-- =====================================================
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of options
  correct_answer INTEGER NOT NULL, -- Index of correct option
  explanation TEXT,
  marks INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USER PROGRESS TABLE
-- =====================================================
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  status progress_status DEFAULT 'not_started',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- =====================================================
-- STUDY SCHEDULES TABLE
-- =====================================================
CREATE TABLE public.study_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status schedule_status DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SUBMISSIONS TABLE (for DSA problems)
-- =====================================================
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES public.dsa_problems(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL, -- 'python', 'javascript', 'cpp', etc.
  status submission_status DEFAULT 'pending',
  test_results JSONB, -- Results of test cases
  execution_time INTEGER, -- in milliseconds
  memory_used INTEGER, -- in KB
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  condition TEXT NOT NULL, -- e.g., 'solve_10_problems', 'complete_path'
  badge_color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USER ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =====================================================
-- CERTIFICATES TABLE
-- =====================================================
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pdf_url TEXT,
  UNIQUE(user_id, learning_path_id)
);

-- =====================================================
-- DISCUSSION THREADS TABLE (Community/Doubts)
-- =====================================================
CREATE TABLE public.discussion_threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  upvotes INTEGER DEFAULT 0,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DISCUSSION REPLIES TABLE
-- =====================================================
CREATE TABLE public.discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES public.discussion_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_subjects_category ON public.subjects(category);
CREATE INDEX idx_learning_paths_category ON public.learning_paths(category);
CREATE INDEX idx_dsa_problems_difficulty ON public.dsa_problems(difficulty);
CREATE INDEX idx_dsa_problems_topic ON public.dsa_problems(topic);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_study_schedules_user_id ON public.study_schedules(user_id);
CREATE INDEX idx_study_schedules_date ON public.study_schedules(date);
CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON public.submissions(problem_id);
CREATE INDEX idx_discussion_threads_topic_id ON public.discussion_threads(topic_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dsa_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- USERS policies
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- SUBJECTS policies (public read, admin write)
CREATE POLICY "Anyone can view subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Admins can insert subjects" ON public.subjects FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update subjects" ON public.subjects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can delete subjects" ON public.subjects FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- LEARNING PATHS policies (public read, admin write)
CREATE POLICY "Anyone can view learning paths" ON public.learning_paths FOR SELECT USING (true);
CREATE POLICY "Admins can manage learning paths" ON public.learning_paths FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
);

-- LESSONS policies (public read, admin write)
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Admins can manage lessons" ON public.lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
);

-- TOPICS policies (public read, admin write)
CREATE POLICY "Anyone can view topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Admins can manage topics" ON public.topics FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
);

-- DSA PROBLEMS policies (public read, admin write)
CREATE POLICY "Anyone can view problems" ON public.dsa_problems FOR SELECT USING (true);
CREATE POLICY "Admins can manage problems" ON public.dsa_problems FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
);

-- QUIZZES policies (public read, admin write)
CREATE POLICY "Anyone can view quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Admins can manage quizzes" ON public.quizzes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
);

-- QUIZ QUESTIONS policies (public read, admin write)
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Admins can manage quiz questions" ON public.quiz_questions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'instructor'))
);

-- USER PROGRESS policies (users can only see/manage their own)
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- STUDY SCHEDULES policies (users can only see/manage their own)
CREATE POLICY "Users can view own schedules" ON public.study_schedules FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own schedules" ON public.study_schedules FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own schedules" ON public.study_schedules FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own schedules" ON public.study_schedules FOR DELETE USING (auth.uid() = user_id);

-- SUBMISSIONS policies (users can only see/manage their own)
CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ACHIEVEMENTS policies
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Admins can manage achievements" ON public.achievements FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- USER ACHIEVEMENTS policies
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can grant achievements" ON public.user_achievements FOR INSERT WITH CHECK (true);

-- CERTIFICATES policies
CREATE POLICY "Users can view own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can issue certificates" ON public.certificates FOR INSERT WITH CHECK (true);

-- DISCUSSION THREADS policies
CREATE POLICY "Anyone can view threads" ON public.discussion_threads FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create threads" ON public.discussion_threads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own threads" ON public.discussion_threads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own threads" ON public.discussion_threads FOR DELETE USING (auth.uid() = user_id);

-- DISCUSSION REPLIES policies
CREATE POLICY "Anyone can view replies" ON public.discussion_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create replies" ON public.discussion_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own replies" ON public.discussion_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own replies" ON public.discussion_replies FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discussion_threads_updated_at BEFORE UPDATE ON public.discussion_threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation (sync with auth.users)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SEED DATA (Optional - for testing)
-- =====================================================

-- Insert some default subjects
INSERT INTO public.subjects (name, description, category, difficulty_level, order_index) VALUES
('Data Structures & Algorithms', 'Core DSA concepts and problem-solving', 'DSA', 'beginner', 1),
('Operating Systems', 'OS concepts, processes, memory management', 'CE', 'intermediate', 2),
('Database Management Systems', 'DBMS fundamentals, SQL, normalization', 'CE', 'intermediate', 3),
('Computer Networks', 'Networking concepts, protocols, OSI model', 'CE', 'intermediate', 4),
('Object-Oriented Programming', 'OOP principles and design patterns', 'Programming', 'beginner', 5);

-- Insert default achievements
INSERT INTO public.achievements (title, description, condition, badge_color) VALUES
('First Steps', 'Complete your first lesson', 'complete_first_lesson', '#10b981'),
('Problem Solver', 'Solve 10 DSA problems', 'solve_10_problems', '#3b82f6'),
('Consistency King', 'Maintain a 7-day streak', '7_day_streak', '#f59e0b'),
('DSA Master', 'Complete all DSA topics', 'complete_dsa_path', '#8b5cf6'),
('Quiz Champion', 'Score 100% in any quiz', 'perfect_quiz_score', '#ec4899');
