
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const subjectCode = searchParams.get('subjectCode');

    const supabase = await createSupabaseServerClient();

    let query = supabase.from('exam_resources').select('*');

    if (subjectCode) {
        query = query.eq('subject_code', subjectCode);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
