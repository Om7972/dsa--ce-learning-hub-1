'use client';

import { motion } from 'framer-motion';
import {
    Trophy,
    Target,
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

const achievements = [
    { id: 1, title: 'First Steps', description: 'Solved your first problem', icon: Star, earned: true, color: 'text-yellow-500' },
    { id: 2, title: 'Week Warrior', description: '7 day streak', icon: Flame, earned: true, color: 'text-orange-500' },
    { id: 3, title: 'Problem Solver', description: 'Solved 10 problems', icon: CheckCircle, earned: true, color: 'text-green-500' },
    { id: 4, title: 'Speed Demon', description: 'Solved a hard problem in under 30 min', icon: Zap, earned: false, color: 'text-purple-500' },
    { id: 5, title: 'Dedicated Learner', description: 'Complete 5 learning paths', icon: BookOpen, earned: false, color: 'text-blue-500' },
    { id: 6, title: 'Master Coder', description: 'Solved 100 problems', icon: Trophy, earned: false, color: 'text-amber-500' }
];

const weeklyActivity = [
    { day: 'Mon', problems: 3, hours: 2.5 },
    { day: 'Tue', problems: 5, hours: 3.2 },
    { day: 'Wed', problems: 2, hours: 1.8 },
    { day: 'Thu', problems: 4, hours: 2.9 },
    { day: 'Fri', problems: 6, hours: 4.1 },
    { day: 'Sat', problems: 1, hours: 0.8 },
    { day: 'Sun', problems: 0, hours: 0 }
];

const skillProgress = [
    { skill: 'Arrays & Strings', progress: 75, problems: 15 },
    { skill: 'Linked Lists', progress: 60, problems: 12 },
    { skill: 'Trees & Graphs', progress: 45, problems: 9 },
    { skill: 'Dynamic Programming', progress: 30, problems: 6 },
    { skill: 'Sorting & Searching', progress: 85, problems: 17 }
];

export default function ProgressPage() {
    const totalProblems = 21;
    const currentStreak = 7;
    const longestStreak = 12;
    const totalHours = 45.3;

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Your Progress
                </h1>
                <p className="text-muted-foreground text-lg">
                    Track your learning journey and celebrate achievements
                </p>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-4"
            >
                <MetricCard
                    icon={Code}
                    label="Problems Solved"
                    value={totalProblems}
                    color="from-blue-500 to-cyan-500"
                />
                <MetricCard
                    icon={Flame}
                    label="Current Streak"
                    value={`${currentStreak} days`}
                    color="from-orange-500 to-red-500"
                />
                <MetricCard
                    icon={Trophy}
                    label="Longest Streak"
                    value={`${longestStreak} days`}
                    color="from-yellow-500 to-amber-500"
                />
                <MetricCard
                    icon={Clock}
                    label="Total Hours"
                    value={totalHours}
                    color="from-purple-500 to-pink-500"
                />
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Activity */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Weekly Activity
                            </CardTitle>
                            <CardDescription>Your problem-solving activity this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {weeklyActivity.map((day, index) => (
                                    <div key={day.day} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{day.day}</span>
                                            <div className="flex items-center gap-4 text-muted-foreground">
                                                <span>{day.problems} problems</span>
                                                <span>{day.hours}h</span>
                                            </div>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(day.problems / 6) * 100}%` }}
                                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                                className="h-full bg-gradient-to-r from-primary to-purple-600"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Skill Progress */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Skill Mastery
                            </CardTitle>
                            <CardDescription>Your progress across different topics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {skillProgress.map((skill, index) => (
                                    <div key={skill.skill} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{skill.skill}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground">{skill.problems} solved</span>
                                                <span className="font-bold">{skill.progress}%</span>
                                            </div>
                                        </div>
                                        <Progress value={skill.progress} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Achievements */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Achievements
                        </CardTitle>
                        <CardDescription>Unlock badges as you progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            {achievements.map((achievement, index) => (
                                <AchievementCard
                                    key={achievement.id}
                                    achievement={achievement}
                                    index={index}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${color}`} />
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">{label}</p>
                            <p className="text-3xl font-bold">{value}</p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
                            <Icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function AchievementCard({ achievement, index }: any) {
    const Icon = achievement.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg border-2 transition-all ${achievement.earned
                ? 'border-primary bg-primary/5'
                : 'border-muted bg-muted/50 opacity-60'
                }`}
        >
            <div className="flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-full ${achievement.earned ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Icon className={`h-8 w-8 ${achievement.earned ? achievement.color : 'text-muted-foreground'}`} />
                </div>
                <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                </div>
                {achievement.earned && (
                    <Badge variant="default" className="mt-2">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                    </Badge>
                )}
            </div>
        </motion.div>
    );
}
