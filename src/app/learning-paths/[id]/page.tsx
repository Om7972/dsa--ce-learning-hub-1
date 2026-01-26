import { createSupabaseServerClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database } from '@/lib/supabase';

type LearningPath = Database['public']['Tables']['learning_paths']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];
type LearningPathWithLessons = LearningPath & { lessons: Lesson[] };

async function getLearningPathDetails(id: string): Promise<LearningPathWithLessons | null> {
    const supabase = await createSupabaseServerClient();
    const { data: pathData, error: pathError } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('id', id)
        .single();

    if (pathError || !pathData) {
        console.error('Error fetching learning path:', pathError || `Path with id ${id} not found.`);
        return null;
    }

    const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('learning_path_id', id)
        .order('order_index', { ascending: true });

    if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
    }

    return { ...pathData, lessons: lessonsData || [] };
}

export default async function LearningPathDetailPage({ params }: { params: { id: string } }) {
    const path = await getLearningPathDetails(params.id);

    if (!path) {
        notFound();
    }

    const levelColors: { [key: string]: string } = {
        beginner: 'bg-emerald-100 text-emerald-700',
        intermediate: 'bg-amber-100 text-amber-700',
        advanced: 'bg-red-100 text-red-700',
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <Badge variant="outline" className={levelColors[path.level] || 'bg-gray-100 text-gray-700'}>
                    {path.level}
                </Badge>
                <h1 className="text-4xl font-bold mt-2">{path.title}</h1>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-2">
                    {path.description}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lessons</CardTitle>
                    <CardDescription>Follow these lessons in order to complete the path.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {path.lessons.map((lesson: Lesson, index: number) => (
                            <div key={lesson.id} className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                                        {index + 1}
                                    </div>
                                    {index < path.lessons.length - 1 && (
                                        <div className="w-px h-8 bg-border mt-2" />
                                    )}
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="font-semibold">{lesson.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
