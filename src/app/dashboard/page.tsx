'use client';

import { Book, Code, CheckCircle, BarChart, PlayCircle, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WelcomeToast } from '@/components/dashboard/welcome-toast';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <WelcomeToast />
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Welcome back to your learning journey
                </p>
            </div>

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
                <div className="space-y-6">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlayCircle className="h-5 w-5 text-primary" />
                                Continue Learning
                            </CardTitle>
                            <CardDescription>Pick up where you left off</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between gap-4">
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-muted/50 border">
                                    <h4 className="font-semibold mb-1">Binary Search Algorithm</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Module 3 • Advanced Algorithms
                                    </p>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span>Progress</span>
                                            <span>65%</span>
                                        </div>
                                        <Progress value={65} className="h-1.5" />
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full group">
                                Resume Lesson
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

