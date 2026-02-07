
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

// Simplistic mock recommendation logic
export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Get user metrics
    let rating = 1000;
    if (user) {
        const { data: metrics } = await supabase.from('user_performance_metrics').select('current_rating').eq('user_id', user.id).single();
        // supabase typing can be narrow; safely access via any guard
        if (metrics && typeof (metrics as any).current_rating === 'number') {
            rating = (metrics as any).current_rating;
        }
    }

    // 2. Recommend based on rating
    // Simple band logic:
    // < 1200: Easy
    // 1200 - 1500: Medium
    // > 1500: Hard
    let difficulty = 'Easy';
    if (rating >= 1200 && rating < 1500) difficulty = 'Medium';
    if (rating >= 1500) difficulty = 'Hard';

    // 3. Fetch random problem of that difficulty
    const { data: problems } = await supabase
        .from('dsa_problems')
        .select('*')
        .eq('difficulty', difficulty)
        .limit(5); // Get a few to randomise client side or just return one

    return NextResponse.json({
        userRating: rating,
        recommendedDifficulty: difficulty,
        problems: problems || []
    });
}
