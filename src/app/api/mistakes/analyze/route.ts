
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { analyzeMistake } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const { code, problemTitle, errorType } = await req.json();
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        const analysis = await analyzeMistake(code, problemTitle, errorType || 'Logic Error');

        if (user) {
            // Store in history
            const { error } = await supabase.from('mistake_history').insert({
                user_id: user.id,
                problem_title: problemTitle,
                submission_code: code,
                mistake_pattern: analysis.mistakePattern,
                feedback: analysis.feedback
            } as any);

            if (error) {
                console.error("Error saving mistake history:", error);
            }
        }

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("Mistake analysis error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
