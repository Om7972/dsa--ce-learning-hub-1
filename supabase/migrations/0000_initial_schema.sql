-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'student',
    college TEXT,
    year INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create the learning_paths table
CREATE TABLE learning_paths (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'DSA' or 'CE'
    level TEXT NOT NULL, -- 'beginner', 'intermediate', 'advanced'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for learning_paths
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

-- Create the lessons table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    learning_path_id INT NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT, -- Markdown content
    order_index INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for lessons
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create the dsa_problems table
CREATE TABLE dsa_problems (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL, -- 'easy', 'medium', 'hard'
    topic TEXT NOT NULL,
    description TEXT,
    sample_input TEXT,
    sample_output TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for dsa_problems
ALTER TABLE dsa_problems ENABLE ROW LEVEL SECURITY;

-- Create the submissions table
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INT NOT NULL REFERENCES dsa_problems(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    status TEXT NOT NULL, -- 'accepted', 'wrong-answer', etc.
    language TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for submissions
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create the quizzes table
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    total_marks INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for quizzes
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Create the quiz_questions table
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB, -- {'a': 'option1', 'b': 'option2', ...}
    correct_answer TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for quiz_questions
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- Create the progress table
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security for progress
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Create the achievements table
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    condition TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for achievements
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create the certificates table
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    learning_path_id INT NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    certificate_url TEXT,
    UNIQUE(user_id, learning_path_id)
);

-- Enable Row Level Security for certificates
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
