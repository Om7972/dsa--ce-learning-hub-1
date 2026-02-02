
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Award, Briefcase, Zap, TrendingUp, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function DashboardStatsPage() {
    const [scoreData, setScoreData] = useState<any>(null);
    const [heatmapData, setHeatmapData] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Career Score
        fetch('/api/dashboard/career-score')
            .then(res => res.json())
            .then(data => setScoreData(data));

        // Fetch Heatmap (User activity)
        fetch('/api/dashboard/heatmap')
            .then(res => res.json())
            .then(data => setHeatmapData(data));
    }, []);

    return (
        <div className="container mx-auto p-6 max-w-5xl space-y-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Performance Dashboard
            </h1>

            {/* Career Readiness Score */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-card border-indigo-200 dark:border-indigo-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-indigo-600" />
                            Career Readiness Score
                        </CardTitle>
                        <CardDescription>Based on your overall platform activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <span className="text-5xl font-extrabold text-indigo-600">{scoreData?.totalScore || 0}</span>
                                <span className="text-xl text-muted-foreground">/100</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-lg font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                                    {scoreData?.readinessLevel || 'Calculating...'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <SkillBar label="DSA Proficiency" value={scoreData?.breakdown?.dsa || 0} max={40} color="bg-blue-500" />
                            <SkillBar label="Dev Skills" value={scoreData?.breakdown?.development || 0} max={30} color="bg-green-500" />
                            <SkillBar label="CS Fundamentals" value={scoreData?.breakdown?.csFundamentals || 0} max={20} color="bg-yellow-500" />
                            <SkillBar label="Consistency" value={scoreData?.breakdown?.consistency || 0} max={10} color="bg-purple-500" />
                        </div>
                    </CardContent>
                </Card>

                {/* Streaks & Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                <Zap className="w-8 h-8 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-medium">Current Streak</p>
                                <h3 className="text-3xl font-bold">{scoreData?.breakdown?.consistency / 2 || 0} Days</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <TrendingUp className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-medium">Activity This Month</p>
                                <h3 className="text-3xl font-bold">{heatmapData.length} Actions</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Heatmap Visualization (Mock Grid) */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" /> Learning Heatmap
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-1">
                        {/* Render significant number of boxes to simulate a year */}
                        {Array.from({ length: 365 }).map((_, i) => {
                            // Randomize for visual effect if no data, else use data matches
                            const active = Math.random() > 0.7;
                            const intensity = Math.random();
                            return (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm ${active
                                            ? intensity > 0.6 ? 'bg-green-600' : intensity > 0.3 ? 'bg-green-400' : 'bg-green-300'
                                            : 'bg-muted'
                                        }`}
                                    title={`Day ${i + 1}`}
                                />
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SkillBar({ label, value, max, color }: any) {
    const percentage = Math.min((value / max) * 100, 100);
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-mono text-muted-foreground">{value}/{max}</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    )
}
