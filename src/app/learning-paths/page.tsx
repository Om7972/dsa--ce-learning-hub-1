'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Code,
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

interface LearningPath {
    id: string;
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    modules: number;
    enrolled: number;
    rating: number;
    progress: number;
    isEnrolled: boolean;
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
        progress: 45,
        isEnrolled: true,
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
        progress: 20,
        isEnrolled: true,
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
        progress: 0,
        isEnrolled: false,
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
        progress: 0,
        isEnrolled: false,
        topics: ['Contest Strategies', 'Advanced DP', 'Number Theory', 'Geometry'],
        icon: Trophy,
        color: 'from-yellow-500 to-amber-500'
    }
];

const difficultyConfig = {
    beginner: { label: 'Beginner', color: 'bg-green-100 text-green-700 border-green-200' },
    intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    advanced: { label: 'Advanced', color: 'bg-red-100 text-red-700 border-red-200' }
};

export default function LearningPathsPage() {
    const [selectedTab, setSelectedTab] = useState('all');

    const filteredPaths = learningPaths.filter(path => {
        if (selectedTab === 'all') return true;
        if (selectedTab === 'enrolled') return path.isEnrolled;
        if (selectedTab === 'recommended') return !path.isEnrolled;
        return true;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Learning Paths
                </h1>
                <p className="text-muted-foreground text-lg">
                    Structured learning journeys to master DSA concepts step by step
                </p>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-4"
            >
                <StatsCard
                    icon={BookOpen}
                    label="Total Paths"
                    value="4"
                    color="text-blue-500"
                />
                <StatsCard
                    icon={Play}
                    label="In Progress"
                    value="2"
                    color="text-green-500"
                />
                <StatsCard
                    icon={CheckCircle}
                    label="Completed"
                    value="0"
                    color="text-purple-500"
                />
                <StatsCard
                    icon={Clock}
                    label="Total Hours"
                    value="36"
                    color="text-orange-500"
                />
            </motion.div>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                <TabsList>
                    <TabsTrigger value="all">All Paths</TabsTrigger>
                    <TabsTrigger value="enrolled">My Paths</TabsTrigger>
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedTab} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredPaths.map((path, index) => (
                            <PathCard key={path.id} path={path} index={index} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatsCard({ icon: Icon, label, value, color }: any) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card>
                <CardContent className="flex items-center gap-4 p-6">
                    <div className={`p-3 rounded-lg bg-muted ${color}`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function PathCard({ path, index }: { path: LearningPath; index: number }) {
    const Icon = path.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <Card className="overflow-hidden h-full flex flex-col">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${path.color}`} />

                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${path.color}`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{path.title}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className={difficultyConfig[path.difficulty].color}>
                                        {difficultyConfig[path.difficulty].label}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{path.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                    <CardDescription className="text-sm">{path.description}</CardDescription>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2">
                        {path.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                            </Badge>
                        ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{path.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{path.modules} modules</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{path.enrolled}</span>
                        </div>
                    </div>

                    {/* Progress */}
                    {path.isEnrolled && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-2" />
                        </div>
                    )}

                    {/* Action Button */}
                    <Button
                        className="w-full group"
                        variant={path.isEnrolled ? 'default' : 'outline'}
                    >
                        {path.isEnrolled ? (
                            <>
                                Continue Learning
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        ) : (
                            <>
                                Enroll Now
                                <Lock className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
