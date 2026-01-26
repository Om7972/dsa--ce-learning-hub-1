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
                    condition: string;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    title: string;
                    condition: string;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    title?: string;
                    condition?: string;
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
                };
                Insert: {
                    id?: number;
                    user_id: string; // uuid
                    learning_path_id: number;
                    issued_at?: string;
                    certificate_url?: string | null;
                };
                Update: {
                    id?: number;
                    user_id?: string; // uuid
                    learning_path_id?: number;
                    issued_at?: string;
                    certificate_url?: string | null;
                };
            };
        };
        Views: { [_ in never]: never };
        Functions: { [_ in never]: never };
    };
}
