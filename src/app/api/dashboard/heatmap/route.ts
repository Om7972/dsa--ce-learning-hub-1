
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json([], { status: 401 });

    const { data } = await supabase.from('user_activity_log')
        .select('activity_date, count')
        .eq('user_id', user.id)
        .gte('activity_date', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()) // Last year
        .order('activity_date', { ascending: true });

    return NextResponse.json(data || []);
}
