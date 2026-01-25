import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
    try {
        const { email, password, full_name } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const supabase = await createSupabaseServerClient();

        // Sign up the user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: full_name || email.split('@')[0],
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
            },
        });

        if (signUpError) {
            console.error('Sign up error:', signUpError);
            return NextResponse.json(
                { error: signUpError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'User created successfully. Please check your email to verify your account.',
            user: authData.user,
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Failed to sign up', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
