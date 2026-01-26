'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Trophy,
    Target,
    Zap,
    Clock,
    CheckCircle2,
    XCircle,
    Filter,
    Search,
    TrendingUp,
    Award,
    Flame
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Problem {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    acceptance: number;
    solved: boolean;
    attempted: boolean;
    companies: string[];
}

const problems: Problem[] = [
    {
        id: '1',
        title: 'Two Sum',
        difficulty: 'easy',
        category: 'Array',
        acceptance: 48.5,
        solved: true,
        attempted: true,
        companies: ['Google', 'Amazon', 'Microsoft']
    },
    {
        id: '2',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'medium',
        category: 'String',
        acceptance: 33.8,
        solved: false,
        attempted: true,
        companies: ['Amazon', 'Adobe']
    },
    {
        id: '3',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'hard',
        category: 'Binary Search',
        acceptance: 35.3,
        solved: false,
        attempted: false,
        companies: ['Google', 'Microsoft']
    },
    {
        id: '4',
        title: 'Valid Parentheses',
        difficulty: 'easy',
        category: 'Stack',
        acceptance: 40.1,
        solved: true,
        attempted: true,
        companies: ['Facebook', 'Amazon']
    },
    {
        id: '5',
        title: 'Merge K Sorted Lists',
        difficulty: 'hard',
        category: 'Linked List',
        acceptance: 47.2,
        solved: false,
        attempted: false,
        companies: ['Google', 'Uber']
    }
];

const categories = ['All', 'Array', 'String', 'Linked List', 'Stack', 'Binary Search', 'Tree', 'Graph'];

const difficultyColors = {
    easy: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    hard: 'text-red-600 bg-red-50 border-red-200'
};

export default function DSAPracticePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

    const stats = {
        total: problems.length,
        solved: problems.filter(p => p.solved).length,
        attempted: problems.filter(p => p.attempted && !p.solved).length,
        streak: 5
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    DSA Practice Arena
                </h1>
                <p className="text-muted-foreground text-lg">
                    Sharpen your problem-solving skills with curated DSA challenges
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-4"
            >
                <StatCard
                    icon={Target}
                    label="Total Problems"
                    value={stats.total}
                    color="from-blue-500 to-cyan-500"
                />
                <StatCard
                    icon={CheckCircle2}
                    label="Solved"
                    value={stats.solved}
                    color="from-green-500 to-emerald-500"
                    percentage={(stats.solved / stats.total) * 100}
                />
                <StatCard
                    icon={Clock}
                    label="Attempted"
                    value={stats.attempted}
                    color="from-yellow-500 to-orange-500"
                />
                <StatCard
                    icon={Flame}
                    label="Current Streak"
                    value={`${stats.streak} days`}
                    color="from-orange-500 to-red-500"
                />
            </motion.div>

            {/* Filters & Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="whitespace-nowrap"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </motion.div>

            {/* Difficulty Tabs */}
            <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedDifficulty} className="space-y-4 mt-6">
                    {problems.map((problem, index) => (
                        <ProblemCard key={problem.id} problem={problem} index={index} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, percentage }: any) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${color}`} />
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">{label}</p>
                            <p className="text-3xl font-bold">{value}</p>
                            {percentage !== undefined && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {percentage.toFixed(1)}% complete
                                </p>
                            )}
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

function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 5 }}
        >
            <Card className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            {/* Status Icon */}
                            <div>
                                {problem.solved ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                ) : problem.attempted ? (
                                    <Clock className="h-6 w-6 text-yellow-500" />
                                ) : (
                                    <div className="h-6 w-6 rounded-full border-2 border-muted" />
                                )}
                            </div>

                            {/* Problem Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                                        {problem.title}
                                    </h3>
                                    <Badge variant="outline" className={difficultyColors[problem.difficulty]}>
                                        {problem.difficulty}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Code className="h-4 w-4" />
                                        {problem.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        {problem.acceptance}% acceptance
                                    </span>
                                    {problem.companies.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Award className="h-4 w-4" />
                                            <span className="truncate">
                                                {problem.companies.slice(0, 2).join(', ')}
                                                {problem.companies.length > 2 && ` +${problem.companies.length - 2}`}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <Button
                            variant={problem.solved ? 'outline' : 'default'}
                            className="group-hover:scale-105 transition-transform"
                        >
                            {problem.solved ? 'Review' : problem.attempted ? 'Continue' : 'Solve'}
                            <Zap className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
