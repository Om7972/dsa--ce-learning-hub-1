'use client';

import { Book, Code, CheckCircle, BarChart } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Lessons Completed" value="12 / 48" icon={Book} color="text-blue-500" />
                <StatsCard title="Problems Solved" value="5" icon={Code} color="text-green-500" />
                <StatsCard title="Quizzes Passed" value="3" icon={CheckCircle} color="text-yellow-500" />
                <StatsCard title="Average Score" value="88%" icon={BarChart} color="text-purple-500" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Continue Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Your next lesson is waiting for you.</p>
                        {/* Placeholder for next lesson */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

