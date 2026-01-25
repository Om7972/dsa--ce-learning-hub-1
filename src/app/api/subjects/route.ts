import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('subjects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Supabase error fetching subjects:', error);
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Failed to fetch subjects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from('subjects')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating subject:', error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to create subject:', error);
    return NextResponse.json(
      { error: 'Failed to create subject', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
