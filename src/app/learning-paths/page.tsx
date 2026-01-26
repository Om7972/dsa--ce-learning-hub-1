import { createSupabaseServerClient } from '@/lib/supabase-server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Database } from '@/lib/supabase';

type LearningPath = Database['public']['Tables']['learning_paths']['Row'];

async function getLearningPaths(): Promise<LearningPath[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from('learning_paths').select('*');

    if (error) {
        console.error('Error fetching learning paths:', error);
        return [];
    }
    return data || [];
}

export default async function LearningPathsPage() {
    const learningPaths = await getLearningPaths();

    const categoryColors: { [key: string]: string } = {
        DSA: 'bg-blue-100 text-blue-700',
        CE: 'bg-green-100 text-green-700',
    };

    const levelColors: { [key: string]: string } = {
        beginner: 'bg-emerald-100 text-emerald-700',
        intermediate: 'bg-amber-100 text-amber-700',
        advanced: 'bg-red-100 text-red-700',
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Learning Paths</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-2">
                    Structured paths to guide your learning journey in DSA and Computer Engineering.
                </p>
            </div>

            {learningPaths.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No learning paths available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {learningPaths.map((path) => (
                        <Link href={`/learning-paths/${path.id}`} key={path.id} className="block group">
                            <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge className={categoryColors[path.category] || 'bg-gray-100 text-gray-700'}>
                                            {path.category}
                                        </Badge>
                                        <Badge variant="outline" className={levelColors[path.level] || 'bg-gray-100 text-gray-700'}>
                                            {path.level}
                                        </Badge>
                                    </div>
                                    <CardTitle>{path.title}</CardTitle>
                                    <CardDescription>{path.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-end">
                                     <div className="mt-4 flex items-center text-primary font-bold text-sm group-hover:underline">
                                        View Path <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
