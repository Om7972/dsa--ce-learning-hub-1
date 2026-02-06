import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { validateOnboardingData } from '@/lib/onboarding-utils';
import type { OnboardingData } from '@/lib/onboarding-constants';

/**
 * POST /api/onboarding
 * Save user onboarding data and mark user as onboarded
 */
export async function POST(request: NextRequest) {
  try {
    // Get session and verify authentication
    let response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.delete({ name, ...options });
          },
        },
      }
    );

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: OnboardingData = await request.json();

    // Validate onboarding data
    const validation = validateOnboardingData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Update user with onboarding data
    const { error: updateError } = await supabase
      .from('users')
      .update({
        full_name: body.fullName,
        college: body.college || null,
        year: body.yearOfStudy || null,
        learning_goals: body.learningGoals,
        skill_level: body.skillLevel,
        interests: body.interests,
        daily_time_commitment: body.dailyTimeCommitment,
        preferred_language: body.preferredLanguage,
        onboarded: true,
        onboarding_completed_at: new Date().toISOString(),
      })
      .eq('id', session.user.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to save onboarding data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Onboarding completed successfully',
        userId: session.user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Onboarding API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/onboarding
 * Get user's current onboarding status
 */
export async function GET(request: NextRequest) {
  try {
    let response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.delete({ name, ...options });
          },
        },
      }
    );

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user onboarding status
    const { data: user, error } = await supabase
      .from('users')
      .select('id, onboarded, onboarding_step')
      .eq('id', session.user.id)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        onboarded: user.onboarded,
        onboarding_step: user.onboarding_step,
        user_id: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Onboarding status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
