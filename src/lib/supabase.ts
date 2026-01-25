import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Server-side client (uses service role key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Client-side browser client (uses anon key)
export function createSupabaseBrowserClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
                    id: string;
                    full_name: string;
                    email: string;
                    role: 'student' | 'instructor' | 'admin';
                    college: string | null;
                    year: number | null;
                    avatar_url: string | null;
                    bio: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['users']['Insert']>;
            };
            subjects: {
                Row: {
                    id: string;
                    name: string;
                    description: string | null;
                    category: string;
                    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
                    icon_url: string | null;
                    order_index: number;
                    created_at: string;
                };
            };
            study_schedules: {
                Row: {
                    id: string;
                    user_id: string;
                    topic_id: string | null;
                    title: string;
                    description: string | null;
                    date: string;
                    start_time: string;
                    end_time: string;
                    status: 'scheduled' | 'completed' | 'missed' | 'cancelled';
                    created_at: string;
                };
            };
            user_progress: {
                Row: {
                    id: string;
                    user_id: string;
                    lesson_id: string;
                    status: 'not_started' | 'in_progress' | 'completed';
                    completed_at: string | null;
                    created_at: string;
                };
            };
        };
    };
}
