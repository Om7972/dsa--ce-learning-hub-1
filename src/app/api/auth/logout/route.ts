import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST() {
    try {
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Failed to logout', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
