import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        // Get full user profile from users table
        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        return NextResponse.json({
            user: {
                ...user,
                profile,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Failed to get user', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
