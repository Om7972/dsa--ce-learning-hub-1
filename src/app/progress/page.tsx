'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Flame,
    Star,
    Award,
    TrendingUp,
    Calendar,
    Clock,
    Code,
    BookOpen,
    CheckCircle,
    Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    requirementType: 'solved' | 'streak' | 'paths';
    requirementValue: number;
}

const achievementsList: Achievement[] = [
    { id: '1', title: 'First Steps', description: 'Solve your first problem', icon: Star, color: 'text-yellow-500', requirementType: 'solved', requirementValue: 1 },
    { id: '2', title: 'Curriculum Scholar', description: 'Enroll in at least 2 learning paths', icon: BookOpen, color: 'text-blue-500', requirementType: 'paths', requirementValue: 2 },
    { id: '3', title: 'Problem Solver', description: 'Solve 3 problems in the practice arena', icon: CheckCircle, color: 'text-green-500', requirementType: 'solved', requirementValue: 3 },
    { id: '4', title: 'Dedicated Warrior', description: 'Maintain a 5-day coding streak', icon: Flame, color: 'text-orange-500', requirementType: 'streak', requirementValue: 5 },
    { id: '5', title: 'Centurion Coder', description: 'Solve 10 problems total', icon: Trophy, color: 'text-amber-500', requirementType: 'solved', requirementValue: 10 }
];

export default function ProgressPage() {
    // Dynamic states synced with LocalStorage
    const [solvedCount, setSolvedCount] = useState(0);
    const [enrolledPathsCount, setEnrolledPathsCount] = useState(0);
    const [streak, setStreak] = useState(5);
    const [xp, setXp] = useState(1200);
    const [studyHours, setStudyHours] = useState(45.3);

    useEffect(() => {
        const solved = localStorage.getItem('learning-hub:solved-problems');
        const enrolled = localStorage.getItem('learning-hub:enrolled-paths');
        const userStreak = localStorage.getItem('learning-hub:streak');
        const userXp = localStorage.getItem('learning-hub:xp');

        if (solved) setSolvedCount(JSON.parse(solved).length);
        if (enrolled) setEnrolledPathsCount(JSON.parse(enrolled).length);
        if (userStreak) setStreak(Number(userStreak));
        if (userXp) {
            const parsedXp = Number(userXp);
            setXp(parsedXp);
            // Simulate hours based on XP
            setStudyHours(Math.round((parsedXp / 100) * 2.5 * 10) / 10);
        }
    }, []);

    const weeklyActivity = [
        { day: 'Mon', problems: Math.min(6, Math.max(1, Math.round(solvedCount * 0.15))), hours: 2.5 },
        { day: 'Tue', problems: Math.min(6, Math.max(2, Math.round(solvedCount * 0.25))), hours: 3.2 },
        { day: 'Wed', problems: Math.min(6, Math.max(1, Math.round(solvedCount * 0.1))), hours: 1.8 },
        { day: 'Thu', problems: Math.min(6, Math.max(2, Math.round(solvedCount * 0.2))), hours: 2.9 },
        { day: 'Fri', problems: Math.min(6, Math.max(3, Math.round(solvedCount * 0.3))), hours: 4.1 },
        { day: 'Sat', problems: Math.min(6, Math.max(1, Math.round(solvedCount * 0.08))), hours: 0.8 },
        { day: 'Sun', problems: 0, hours: 0 }
    ];

    const skillProgress = [
        { skill: 'Arrays & Strings', progress: Math.min(100, 30 + solvedCount * 10), solved: Math.min(15, solvedCount) },
        { skill: 'Linked Lists', progress: Math.min(100, 15 + solvedCount * 8), solved: Math.min(12, Math.max(0, solvedCount - 2)) },
        { skill: 'Trees & Graphs', progress: Math.min(100, 5 + solvedCount * 5), solved: Math.min(9, Math.max(0, solvedCount - 4)) },
        { skill: 'Dynamic Programming', progress: Math.min(100, solvedCount * 4), solved: Math.min(6, Math.max(0, solvedCount - 5)) }
    ];

    const isAchievementEarned = (ach: Achievement) => {
        if (ach.requirementType === 'solved') return solvedCount >= ach.requirementValue;
        if (ach.requirementType === 'paths') return enrolledPathsCount >= ach.requirementValue;
        if (ach.requirementType === 'streak') return streak >= ach.requirementValue;
        return false;
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Your Progress
                </h1>
                <p className="text-muted-foreground text-lg">
                    Track your learning metrics, analyze topic masteries, and celebrate unlocked achievements.
                </p>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid gap-6 md:grid-cols-4">
                <MetricCard
                    icon={Code}
                    label="Problems Solved"
                    value={solvedCount}
                    color="from-blue-500 to-cyan-500"
                />
                <MetricCard
                    icon={Flame}
                    label="Current Streak"
                    value={`${streak} days`}
                    color="from-orange-500 to-red-500"
                />
                <MetricCard
                    icon={Trophy}
                    label="XP Earned"
                    value={`${xp} XP`}
                    color="from-yellow-500 to-amber-500"
                />
                <MetricCard
                    icon={Clock}
                    label="Est. Study Hours"
                    value={`${studyHours}h`}
                    color="from-purple-500 to-pink-500"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Activity */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-100 font-bold">
                            <Calendar className="h-5 w-5 text-primary" />
                            Weekly Activity
                        </CardTitle>
                        <CardDescription>Your problem-solving density and hours</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {weeklyActivity.map((day, index) => (
                            <div key={day.day} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-slate-350">{day.day}</span>
                                    <div className="flex items-center gap-4 text-slate-400">
                                        <span>{day.problems} solved</span>
                                        <span>{day.hours}h spent</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/40">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, (day.problems / 6) * 100)}%` }}
                                        transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                                        className="h-full bg-gradient-to-r from-primary to-purple-600"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Skill Progress */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-100 font-bold">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Topic Mastery Breakdown
                        </CardTitle>
                        <CardDescription>Mastery stats calculated from solved problems</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        {skillProgress.map((skill, index) => (
                            <div key={skill.skill} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-slate-300">{skill.skill}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">{skill.solved} solved</span>
                                        <span className="text-primary">{skill.progress}%</span>
                                    </div>
                                </div>
                                <Progress value={skill.progress} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Achievements */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-100 font-bold">
                        <Award className="h-5 w-5 text-primary" />
                        Platform Achievements
                    </CardTitle>
                    <CardDescription>Badges unlock automatically as criteria are met</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <AnimatePresence>
                            {achievementsList.map((achievement, index) => {
                                const earned = isAchievementEarned(achievement);
                                const Icon = achievement.icon;

                                return (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -4 }}
                                        className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-3 ${
                                            earned
                                                ? 'border-primary/40 bg-gradient-to-br from-primary/5 to-slate-900/40 shadow-md'
                                                : 'border-slate-800 bg-slate-950/20 opacity-40'
                                        }`}
                                    >
                                        <div className={`p-3.5 rounded-full ${earned ? 'bg-primary/10' : 'bg-slate-900'}`}>
                                            <Icon className={`h-7 w-7 ${earned ? achievement.color : 'text-slate-650'}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm text-slate-200">{achievement.title}</h3>
                                            <p className="text-[11px] text-slate-400 mt-1">{achievement.description}</p>
                                        </div>
                                        {earned && (
                                            <Badge className="bg-primary/25 text-primary border border-primary/20 text-[10px] mt-2">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Unlocked
                                            </Badge>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
    return (
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <Card className="glass-card overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${color}`} />
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">{label}</p>
                            <p className="text-3xl font-black text-white">{value}</p>
                        </div>
                        <div className={`p-3.5 rounded-xl bg-gradient-to-br ${color} shadow-lg shadow-black/20`}>
                            <Icon className="h-5.5 w-5.5 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
