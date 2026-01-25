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

    // Fetch user's study schedules
    const { data, error } = await supabaseAdmin
      .from('study_schedules')
      .select(`
        *,
        topics (
          id,
          name,
          subject_id
        )
      `)
      .eq('user_id', user.id)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Supabase error fetching schedules:', error);
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedules', details: error instanceof Error ? error.message : 'Unknown error' },
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
      .from('study_schedules')
      .insert([
        {
          ...body,
          user_id: user.id,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating schedule:', error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to create schedule:', error);
    return NextResponse.json(
      { error: 'Failed to create schedule', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
