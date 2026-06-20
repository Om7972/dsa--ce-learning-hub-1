'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Brain,
    Trophy,
    Clock,
    Users,
    Star,
    CheckCircle,
    Lock,
    Play,
    ArrowRight,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface LearningPath {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    modules: number;
    enrolled: number;
    rating: number;
    topics: string[];
    icon: any;
    color: string;
}

const learningPaths: LearningPath[] = [
    {
        id: '1',
        title: 'Data Structures Fundamentals',
        description: 'Master the essential data structures including arrays, linked lists, stacks, queues, and hash tables.',
        difficulty: 'beginner',
        duration: '6 weeks',
        modules: 12,
        enrolled: 1234,
        rating: 4.8,
        topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables'],
        icon: BookOpen,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: '2',
        title: 'Algorithm Design & Analysis',
        description: 'Learn algorithmic thinking, complexity analysis, and problem-solving strategies.',
        difficulty: 'intermediate',
        duration: '8 weeks',
        modules: 16,
        enrolled: 987,
        rating: 4.9,
        topics: ['Sorting', 'Searching', 'Recursion', 'Dynamic Programming', 'Greedy'],
        icon: Brain,
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: '3',
        title: 'Advanced Trees & Graphs',
        description: 'Deep dive into tree and graph data structures with real-world applications.',
        difficulty: 'advanced',
        duration: '10 weeks',
        modules: 20,
        enrolled: 756,
        rating: 4.7,
        topics: ['Binary Trees', 'BST', 'AVL Trees', 'Graphs', 'Graph Algorithms'],
        icon: TrendingUp,
        color: 'from-orange-500 to-red-500'
    },
    {
        id: '4',
        title: 'Competitive Programming',
        description: 'Prepare for coding competitions with advanced problem-solving techniques.',
        difficulty: 'advanced',
        duration: '12 weeks',
        modules: 24,
        enrolled: 543,
        rating: 4.9,
        topics: ['Contest Strategies', 'Advanced DP', 'Number Theory', 'Geometry'],
        icon: Trophy,
        color: 'from-yellow-500 to-amber-500'
    }
];

const difficultyConfig = {
    beginner: { label: 'Beginner', color: 'text-green-500 bg-green-500/10 border-green-500/20' },
    intermediate: { label: 'Intermediate', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
    advanced: { label: 'Advanced', color: 'text-red-500 bg-red-500/10 border-red-500/20' }
};

export default function LearningPathsPage() {
    const [selectedTab, setSelectedTab] = useState('all');

    // Shared state stored in LocalStorage
    const [enrolledIds, setEnrolledIds] = useState<string[]>(['1', '2']);
    const [progressMap, setProgressMap] = useState<Record<string, number>>({
        '1': 45,
        '2': 20
    });
    const [xp, setXp] = useState(1200);

    useEffect(() => {
        const enrolled = localStorage.getItem('learning-hub:enrolled-paths');
        const progress = localStorage.getItem('learning-hub:path-progress');
        const userXp = localStorage.getItem('learning-hub:xp');

        if (enrolled) setEnrolledIds(JSON.parse(enrolled));
        if (progress) setProgressMap(JSON.parse(progress));
        if (userXp) setXp(Number(userXp));
    }, []);

    const handleEnroll = (id: string) => {
        if (enrolledIds.includes(id)) return;
        const newEnrolled = [...enrolledIds, id];
        const newProgress = { ...progressMap, [id]: 0 };

        setEnrolledIds(newEnrolled);
        setProgressMap(newProgress);
        localStorage.setItem('learning-hub:enrolled-paths', JSON.stringify(newEnrolled));
        localStorage.setItem('learning-hub:path-progress', JSON.stringify(newProgress));

        // Add small XP reward for enrolling
        const updatedXp = xp + 100;
        setXp(updatedXp);
        localStorage.setItem('learning-hub:xp', String(updatedXp));

        toast.success("Enrolled successfully! Good luck with your study path. +100 XP");
    };

    const handleSimulateStudy = (id: string) => {
        const currentProgress = progressMap[id] || 0;
        if (currentProgress >= 100) {
            toast.info("Path already 100% completed!");
            return;
        }

        const addedProgress = Math.min(100 - currentProgress, 15);
        const newProgress = { ...progressMap, [id]: currentProgress + addedProgress };
        setProgressMap(newProgress);
        localStorage.setItem('learning-hub:path-progress', JSON.stringify(newProgress));

        const updatedXp = xp + 80;
        setXp(updatedXp);
        localStorage.setItem('learning-hub:xp', String(updatedXp));

        if (currentProgress + addedProgress === 100) {
            toast.success("Congratulations! You completed this learning path. +200 XP Bonus!");
            localStorage.setItem('learning-hub:xp', String(updatedXp + 200));
            setXp(prev => prev + 200);
        } else {
            toast.success(`Studied! Progress increased by ${addedProgress}%. +80 XP`);
        }
    };

    const filteredPaths = learningPaths.filter(path => {
        if (selectedTab === 'all') return true;
        if (selectedTab === 'enrolled') return enrolledIds.includes(path.id);
        if (selectedTab === 'recommended') return !enrolledIds.includes(path.id);
        return true;
    });

    const completedCount = Object.keys(progressMap).filter(id => enrolledIds.includes(id) && progressMap[id] === 100).length;
    const inProgressCount = enrolledIds.length - completedCount;
    const totalHoursEstimate = enrolledIds.reduce((acc, id) => {
        const path = learningPaths.find(p => p.id === id);
        if (!path) return acc;
        const weeks = parseInt(path.duration) || 0;
        return acc + Math.round(weeks * 4 * ((progressMap[id] || 0) / 100));
    }, 12);

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Learning Paths
                </h1>
                <p className="text-muted-foreground text-lg">
                    Structured learning journeys to master DSA concepts step by step. Enroll to track progress.
                </p>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-4">
                <StatsCard
                    icon={BookOpen}
                    label="Total Paths"
                    value={learningPaths.length}
                    color="text-blue-500"
                />
                <StatsCard
                    icon={Play}
                    label="In Progress"
                    value={inProgressCount}
                    color="text-yellow-500"
                />
                <StatsCard
                    icon={CheckCircle}
                    label="Completed Paths"
                    value={completedCount}
                    color="text-green-500"
                />
                <StatsCard
                    icon={Clock}
                    label="Est. Study Hours"
                    value={`${totalHoursEstimate} hrs`}
                    color="text-orange-500"
                />
            </div>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <TabsList className="bg-slate-900 border border-slate-800/80 p-1">
                    <TabsTrigger value="all">All Paths</TabsTrigger>
                    <TabsTrigger value="enrolled">My Enrolled Paths</TabsTrigger>
                    <TabsTrigger value="recommended">Recommended Paths</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <AnimatePresence mode="popLayout">
                            {filteredPaths.map((path, index) => {
                                const isEnrolled = enrolledIds.includes(path.id);
                                const progress = progressMap[path.id] || 0;
                                const PathIcon = path.icon;

                                return (
                                    <motion.div
                                        key={path.id}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="overflow-hidden h-full flex flex-col glass-card hover:border-slate-700/60 transition-all duration-300">
                                            {/* Gradient Header */}
                                            <div className={`h-1.5 bg-gradient-to-r ${path.color}`} />

                                            <CardHeader>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${path.color} shadow-lg shadow-black/20`}>
                                                            <PathIcon className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-xl font-bold text-slate-100">{path.title}</CardTitle>
                                                            <div className="flex items-center gap-2 mt-1.5">
                                                                <Badge variant="outline" className={difficultyConfig[path.difficulty].color}>
                                                                    {difficultyConfig[path.difficulty].label}
                                                                </Badge>
                                                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                                                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                                                                    <span>{path.rating}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="flex-1 flex flex-col justify-between space-y-5">
                                                <div className="space-y-4">
                                                    <CardDescription className="text-slate-400 text-sm leading-relaxed">{path.description}</CardDescription>

                                                    {/* Topics */}
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {path.topics.map((topic) => (
                                                            <Badge key={topic} variant="secondary" className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300">
                                                                {topic}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {/* Meta Info */}
                                                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5 text-slate-500" />
                                                            <span>{path.duration}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                                                            <span>{path.modules} Modules</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-3.5 w-3.5 text-slate-500" />
                                                            <span>{path.enrolled} Enrolled</span>
                                                        </div>
                                                    </div>

                                                    {/* Progress */}
                                                    {isEnrolled && (
                                                        <div className="space-y-2 p-3 bg-slate-900/40 border border-slate-850 rounded-xl">
                                                            <div className="flex items-center justify-between text-xs font-semibold">
                                                                <span className="text-slate-400">Curriculum Progress</span>
                                                                <span className="text-primary">{progress}%</span>
                                                            </div>
                                                            <Progress value={progress} className="h-2" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Button */}
                                                <div className="pt-2">
                                                    {isEnrolled ? (
                                                        <div className="flex gap-2">
                                                            <Button
                                                                className="flex-1 font-bold text-xs"
                                                                onClick={() => handleSimulateStudy(path.id)}
                                                            >
                                                                Study Module
                                                                <Play className="ml-1.5 h-3.5 w-3.5 fill-current" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            className="w-full font-bold text-xs"
                                                            variant="outline"
                                                            onClick={() => handleEnroll(path.id)}
                                                        >
                                                            Enroll in Path
                                                            <Lock className="ml-1.5 h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatsCard({ icon: Icon, label, value, color }: any) {
    return (
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <Card className="glass-card">
                <CardContent className="flex items-center gap-4 p-6">
                    <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${color}`}>
                        <Icon className="h-5.5 w-5.5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
                        <p className="text-2xl font-black text-white mt-1">{value}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
