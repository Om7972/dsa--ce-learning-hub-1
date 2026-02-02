
import { NextRequest, NextResponse } from 'next/server';
import { predictComplexity } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const { code, language } = await req.json();
        const result = await predictComplexity(code, language || 'python');
        return NextResponse.json(result);
    } catch (error) {
        console.error("Complexity prediction error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
