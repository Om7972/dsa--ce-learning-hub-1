import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    // Get authenticated user
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user progress
    const { data, error } = await supabaseAdmin
      .from('user_progress')
      .select(`
        *,
        lessons (
          id,
          title,
          learning_path_id
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Supabase error fetching user progress:', error);
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Failed to fetch user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user progress', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('user_progress')
      .upsert([
        {
          ...body,
          user_id: user.id,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error updating progress:', error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to update progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
