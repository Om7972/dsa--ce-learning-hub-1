import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Fallback values to prevent crash during build/dev without env vars
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

// Check if valid configuration exists
export const isSupabaseConfigured = () => {
    return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

// Server-side client (uses service role key)
export const supabaseAdmin = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Client-side browser client (uses anon key)
export function createSupabaseBrowserClient() {
    return createBrowserClient(
        NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}

// TypeScript Database Types
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string; // uuid
                    full_name: string | null;
                    role: string;
                    college: string | null;
                    year: number | null;
                    created_at: string;
                };
                Insert: {
                    id: string; // uuid
                    full_name?: string | null;
                    role?: string;
                    college?: string | null;
                    year?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: string; // uuid
                    full_name?: string | null;
                    role?: string;
                    college?: string | null;
                    year?: number | null;
                    created_at?: string;
                };
            };
            learning_paths: {
                Row: {
                    id: number;
                    title: string;
                    description: string | null;
                    category: string;
                    level: string;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    title: string;
                    description?: string | null;
                    category: string;
                    level: string;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    title?: string;
                    description?: string | null;
                    category?: string;
                    level?: string;
                    created_at?: string;
                };
            };
            lessons: {
                Row: {
                    id: number;
                    learning_path_id: number;
                    title: string;
                    content: string | null;
                    order_index: number;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    learning_path_id: number;
                    title: string;
                    content?: string | null;
                    order_index: number;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    learning_path_id?: number;
                    title?: string;
                    content?: string | null;
                    order_index?: number;
                    created_at?: string;
                };
            };
            dsa_problems: {
                Row: {
                    id: number;
                    title: string;
                    difficulty: string;
                    topic: string;
                    description: string | null;
                    sample_input: string | null;
                    sample_output: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    title: string;
                    difficulty: string;
                    topic: string;
                    description?: string | null;
                    sample_input?: string | null;
                    sample_output?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    title?: string;
                    difficulty?: string;
                    topic?: string;
                    description?: string | null;
                    sample_input?: string | null;
                    sample_output?: string | null;
                    created_at?: string;
                };
            };
            submissions: {
                Row: {
                    id: number;
                    user_id: string; // uuid
                    problem_id: number;
                    code: string;
                    status: string;
                    language: string;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    user_id: string; // uuid
                    problem_id: number;
                    code: string;
                    status: string;
                    language: string;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    user_id?: string; // uuid
                    problem_id?: number;
                    code?: string;
                    status?: string;
                    language?: string;
                    created_at?: string;
                };
            };
            quizzes: {
                Row: {
                    id: number;
                    subject: string;
                    title: string;
                    total_marks: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    subject: string;
                    title: string;
                    total_marks?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    subject?: string;
                    title?: string;
                    total_marks?: number | null;
                    created_at?: string;
                };
            };
            quiz_questions: {
                Row: {
                    id: number;
                    quiz_id: number;
                    question: string;
                    options: Json | null;
                    correct_answer: string;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    quiz_id: number;
                    question: string;
                    options?: Json | null;
                    correct_answer: string;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    quiz_id?: number;
                    question?: string;
                    options?: Json | null;
                    correct_answer?: string;
                    created_at?: string;
                };
            };
            progress: {
                Row: {
                    id: number;
                    user_id: string; // uuid
                    lesson_id: number;
                    completed: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    user_id: string; // uuid
                    lesson_id: number;
                    completed?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    user_id?: string; // uuid
                    lesson_id?: number;
                    completed?: boolean;
                    created_at?: string;
                };
            };
            achievements: {
                Row: {
                    id: number;
                    title: string;
                    condition_type: string;
                    description: string | null;
                    icon_name: string | null;
                    xp_reward: number;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    title: string;
                    condition_type: string;
                    description?: string | null;
                    icon_name?: string | null;
                    xp_reward?: number;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    title?: string;
                    condition_type?: string;
                    description?: string | null;
                    icon_name?: string | null;
                    xp_reward?: number;
                    created_at?: string;
                };
            };
            certificates: {
                Row: {
                    id: number;
                    user_id: string; // uuid
                    learning_path_id: number;
                    issued_at: string;
                    certificate_url: string | null;
                    unique_code: string; // uuid
                    user_name: string | null;
                };
                Insert: {
                    id?: number;
                    user_id: string; // uuid
                    learning_path_id: number;
                    issued_at?: string;
                    certificate_url?: string | null;
                    unique_code?: string;
                    user_name?: string | null;
                };
                Update: {
                    id?: number;
                    user_id?: string; // uuid
                    learning_path_id?: number;
                    issued_at?: string;
                    certificate_url?: string | null;
                    unique_code?: string;
                    user_name?: string | null;
                };
            };
            discussions: {
                Row: {
                    id: number;
                    user_id: string;
                    title: string;
                    content: string;
                    topic: string;
                    category: string;
                    upvotes: number;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    title: string;
                    content: string;
                    topic: string;
                    category?: string;
                    upvotes?: number;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    user_id?: string;
                    title?: string;
                    content?: string;
                    topic?: string;
                    category?: string;
                    upvotes?: number;
                    created_at?: string;
                };
            };
            discussion_replies: {
                Row: {
                    id: number;
                    discussion_id: number;
                    user_id: string;
                    content: string;
                    upvotes: number;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    discussion_id: number;
                    user_id: string;
                    content: string;
                    upvotes?: number;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    discussion_id?: number;
                    user_id?: string;
                    content?: string;
                    upvotes?: number;
                    created_at?: string;
                };
            };
            discussion_votes: {
                Row: {
                    id: number;
                    user_id: string;
                    item_id: number;
                    item_type: 'discussion' | 'reply';
                    vote_type: number;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    item_id: number;
                    item_type: 'discussion' | 'reply';
                    vote_type: number;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    user_id?: string;
                    item_id?: number;
                    item_type?: 'discussion' | 'reply';
                    vote_type?: number;
                    created_at?: string;
                };
            };
            user_achievements: {
                Row: {
                    id: number;
                    user_id: string;
                    achievement_id: number;
                    unlocked_at: string;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    achievement_id: number;
                    unlocked_at?: string;
                };
                Update: {
                    id?: number;
                    user_id?: string;
                    achievement_id?: number;
                    unlocked_at?: string;
                };
            };
            user_stats: {
                Row: {
                    user_id: string;
                    problems_solved: number;
                    current_streak: number;
                    last_activity_date: string | null;
                    total_xp: number;
                    updated_at: string;
                };
                Insert: {
                    user_id: string;
                    problems_solved?: number;
                    current_streak?: number;
                    last_activity_date?: string | null;
                    total_xp?: number;
                    updated_at?: string;
                };
                Update: {
                    user_id?: string;
                    problems_solved?: number;
                    current_streak?: number;
                    last_activity_date?: string | null;
                    total_xp?: number;
                    updated_at?: string;
                };
            };
            algorithm_metadata: {
                Row: {
                    id: number;
                    name: string;
                    slug: string;
                    description: string | null;
                    complexity_time_best: string | null;
                    complexity_time_average: string | null;
                    complexity_time_worst: string | null;
                    complexity_space: string | null;
                    use_cases: string[] | null;
                    pseudocode: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    name: string;
                    slug: string;
                    description?: string | null;
                    complexity_time_best?: string | null;
                    complexity_time_average?: string | null;
                    complexity_time_worst?: string | null;
                    complexity_space?: string | null;
                    use_cases?: string[] | null;
                    pseudocode?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    name?: string;
                    slug?: string;
                    description?: string | null;
                    complexity_time_best?: string | null;
                    complexity_time_average?: string | null;
                    complexity_time_worst?: string | null;
                    complexity_space?: string | null;
                    use_cases?: string[] | null;
                    pseudocode?: string | null;
                    created_at?: string;
                };
            };
            mistake_history: {
                Row: {
                    id: number;
                    user_id: string;
                    problem_title: string | null;
                    submission_code: string | null;
                    mistake_pattern: string | null;
                    feedback: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    problem_title?: string | null;
                    submission_code?: string | null;
                    mistake_pattern?: string | null;
                    feedback?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    user_id?: string;
                    problem_title?: string | null;
                    submission_code?: string | null;
                    mistake_pattern?: string | null;
                    feedback?: string | null;
                    created_at?: string;
                };
            };
            exam_resources: {
                Row: {
                    id: number;
                    subject_code: string;
                    title: string;
                    content: string | null;
                    resource_type: 'note' | 'question' | 'pyq';
                    marks: number | null;
                    is_important: boolean | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    subject_code: string;
                    title: string;
                    content?: string | null;
                    resource_type: 'note' | 'question' | 'pyq';
                    marks?: number | null;
                    is_important?: boolean | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    subject_code?: string;
                    title?: string;
                    content?: string | null;
                    resource_type?: 'note' | 'question' | 'pyq';
                    marks?: number | null;
                    is_important?: boolean | null;
                    created_at?: string;
                };
            };
            subject_dependencies: {
                Row: {
                    id: number;
                    subject_code: string;
                    prerequisite_code: string;
                };
                Insert: {
                    id?: number;
                    subject_code: string;
                    prerequisite_code: string;
                };
                Update: {
                    id?: number;
                    subject_code?: string;
                    prerequisite_code?: string;
                };
            };
            user_performance_metrics: {
                Row: {
                    user_id: string;
                    current_rating: number;
                    average_accuracy: number;
                    average_speed_ms: number;
                    problems_attempted: number;
                    updated_at: string;
                };
                Insert: {
                    user_id: string;
                    current_rating?: number;
                    average_accuracy?: number;
                    average_speed_ms?: number;
                    problems_attempted?: number;
                    updated_at?: string;
                };
                Update: {
                    user_id?: string;
                    current_rating?: number;
                    average_accuracy?: number;
                    average_speed_ms?: number;
                    problems_attempted?: number;
                    updated_at?: string;
                };
            };
            contests: {
                Row: {
                    id: number;
                    title: string;
                    description: string | null;
                    start_time: string;
                    end_time: string;
                    status: 'upcoming' | 'active' | 'ended' | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    title: string;
                    description?: string | null;
                    start_time: string;
                    end_time: string;
                    status?: 'upcoming' | 'active' | 'ended' | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    title?: string;
                    description?: string | null;
                    start_time?: string;
                    end_time?: string;
                    status?: 'upcoming' | 'active' | 'ended' | null;
                    created_at?: string;
                };
            };
            user_activity_log: {
                Row: {
                    id: number;
                    user_id: string;
                    activity_type: string;
                    activity_date: string;
                    count: number;
                };
                Insert: {
                    id?: number;
                    user_id: string;
                    activity_type: string;
                    activity_date?: string;
                    count?: number;
                };
                Update: {
                    id?: number;
                    user_id?: string;
                    activity_type?: string;
                    activity_date?: string;
                    count?: number;
                };
            };
            mentors: {
                Row: {
                    user_id: string;
                    headline: string | null;
                    bio: string | null;
                    skills: string[] | null;
                    hourly_rate: number | null;
                    is_verified: boolean | null;
                };
            };
            skill_nodes: {
                Row: {
                    id: string;
                    label: string;
                    category: string | null;
                    parent_id: string | null;
                    position_x: number | null;
                    position_y: number | null;
                };
            };
        };
        Views: { [_ in never]: never };
        Functions: { [_ in never]: never };
    };
}
