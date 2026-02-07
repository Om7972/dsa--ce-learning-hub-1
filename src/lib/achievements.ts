import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase";

// Need a service role client to insert achievements securely or standard client if RLS allows
// Assuming we use the standard client context usually, but for automatic checks we might need admin if RLS is strict.
// For now, we use standard client passed in or a new one if environment keys are available.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function checkAchievements(userId: string, eventType: 'problem_solved' | 'streak_check') {
    if (!userId) return;

    // 1. First Problem Solved
    if (eventType === 'problem_solved') {
        const { count } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('status', 'accepted'); // Assuming 'accepted' is the status

        if (count === 1) {
            await unlockAchievement(userId, 'First Problem Solved');
        }

        // Check for DSA Master (simplification: 100 problems)
        if ((count || 0) >= 100) {
            await unlockAchievement(userId, 'DSA Master');
        }
    }

    // 2. Streak Check (Called on login or activity)
    if (eventType === 'streak_check') {
        // Logic to calculate streak would go here.
        // For now, let's assume we update user_stats elsewhere and just check value.
        const { data: stats } = await supabase
            .from('user_stats')
            .select('current_streak')
            .eq('user_id', userId)
            .single();

        if (stats && (stats as any).current_streak >= 7) {
            await unlockAchievement(userId, '7-Day Streak');
        }
    }
}

async function unlockAchievement(userId: string, achievementTitle: string) {
    // Get achievement ID
    const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('title', achievementTitle)
        .single();

    if (!achievement) return;

    // Check if already unlocked
    const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_id', (achievement as any).id)
        .single();

    if (existing) return;

    // Unlock - cast payloads/ids to any to avoid narrow typing
    await supabase.from('user_achievements').insert({
        user_id: userId,
        achievement_id: (achievement as any).id
    } as any);
}
