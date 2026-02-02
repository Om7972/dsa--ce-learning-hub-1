
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

// Simplistic career readiness calculation
export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ score: 0 }, { status: 401 });

    // In a real app, query multiple tables. Here we simulate based on mocks or basics.
    // 1. DSA Score (from user_stats)
    const { data: stats } = await supabase.from('user_stats').select('problems_solved, current_streak').eq('user_id', user.id).single();

    let dsaScore = 0;
    if (stats) {
        dsaScore = Math.min(stats.problems_solved * 2, 40); // Max 40 points for 20 problems
    }

    // 2. Consistency Bonus
    const consistency = stats ? Math.min(stats.current_streak * 2, 10) : 0; // Max 10 points

    // 3. Mock data for others
    const devScore = 20; // assumed
    const csFundamentals = 15; // assumed

    const totalScore = dsaScore + devScore + csFundamentals + consistency;

    return NextResponse.json({
        totalScore,
        breakdown: {
            dsa: dsaScore,
            development: devScore,
            csFundamentals,
            consistency
        },
        readinessLevel: totalScore > 80 ? 'Placement Ready' : totalScore > 50 ? 'Internship Ready' : 'Prepare Harder'
    });
}
