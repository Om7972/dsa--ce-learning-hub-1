'use client';

import { useState, useEffect } from 'react';
import { Book, Code, CheckCircle, BarChart, PlayCircle, ArrowRight, Flame, Trophy, Award, Clock } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WelcomeToast } from '@/components/dashboard/welcome-toast';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    // LocalStorage states
    const [solvedCount, setSolvedCount] = useState(0);
    const [enrolledCount, setEnrolledCount] = useState(0);
    const [streak, setStreak] = useState(5);
    const [xp, setXp] = useState(1200);
    const [averageScore, setAverageScore] = useState(88);
    const [lastStudiedPath, setLastStudiedPath] = useState({
        title: 'Binary Search Algorithm',
        module: 'Module 3 • Advanced Algorithms',
        progress: 65,
        url: '/learning-paths'
    });

    useEffect(() => {
        const solved = localStorage.getItem('learning-hub:solved-problems');
        const enrolled = localStorage.getItem('learning-hub:enrolled-paths');
        const userStreak = localStorage.getItem('learning-hub:streak');
        const userXp = localStorage.getItem('learning-hub:xp');
        const progress = localStorage.getItem('learning-hub:path-progress');

        if (solved) {
            const parsed = JSON.parse(solved);
            setSolvedCount(parsed.length);
        }
        if (enrolled) {
            const parsedEnrolled = JSON.parse(enrolled);
            setEnrolledCount(parsedEnrolled.length);
            if (parsedEnrolled.length > 0) {
                // If there's an enrolled path, show it as continue learning
                const progressMap = progress ? JSON.parse(progress) : {};
                const lastId = parsedEnrolled[parsedEnrolled.length - 1];
                const pathProgressVal = progressMap[lastId] || 0;

                // Path title simulation mapping
                const pathTitles: Record<string, string> = {
                    '1': 'Data Structures Fundamentals',
                    '2': 'Algorithm Design & Analysis',
                    '3': 'Advanced Trees & Graphs',
                    '4': 'Competitive Programming'
                };
                setLastStudiedPath({
                    title: pathTitles[lastId] || 'Data Structures Fundamentals',
                    module: 'Module 1 • Current Prep Session',
                    progress: pathProgressVal,
                    url: '/learning-paths'
                });
            }
        }
        if (userStreak) setStreak(Number(userStreak));
        if (userXp) setXp(Number(userXp));
    }, []);

    const xpLevel = Math.floor(xp / 1000) + 1;
    const currentLevelProgress = ((xp % 1000) / 1000) * 100;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <WelcomeToast />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">
                        Welcome back to your learning journey. Trace your activity stats below.
                    </p>
                </div>

                {/* Level indicators */}
                <div className="flex items-center gap-3 bg-slate-900/60 px-4 py-2 border border-slate-800 rounded-2xl shadow-sm">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-200">LVL {xpLevel}</span>
                            <Badge className="bg-primary/20 text-primary border border-primary/20 text-[9px] py-0 px-1.5">
                                Scholar Status
                            </Badge>
                        </div>
                        <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full transition-all duration-300" style={{ width: `${currentLevelProgress}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Enrolled Paths" value={`${enrolledCount} active`} icon={Book} color="text-blue-500" />
                <StatsCard title="Problems Solved" value={`${solvedCount} solved`} icon={Code} color="text-green-500" />
                <StatsCard title="Current Streak" value={`${streak} days`} icon={Flame} color="text-orange-500" />
                <StatsCard title="Performance XP" value={`${xp} pts`} icon={Trophy} color="text-purple-500" />
            </div>

            {/* Layout Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Activity graph */}
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>

                {/* Continue Learning card */}
                <div className="space-y-6">
                    <Card className="glass-card h-full flex flex-col justify-between">
                        <div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-100 font-bold text-base">
                                    <PlayCircle className="h-5 w-5 text-primary" />
                                    Continue Learning
                                </CardTitle>
                                <CardDescription>Pick up where you left off</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 space-y-3">
                                    <h4 className="font-bold text-sm text-slate-200">{lastStudiedPath.title}</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {lastStudiedPath.module}
                                    </p>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[11px] font-bold">
                                            <span className="text-slate-400">Section Progress</span>
                                            <span className="text-primary">{lastStudiedPath.progress}%</span>
                                        </div>
                                        <Progress value={lastStudiedPath.progress} className="h-1.5" />
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                        <div className="p-6 pt-0">
                            <Button onClick={() => router.push(lastStudiedPath.url)} className="w-full group font-bold text-xs">
                                Resume Lesson
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
