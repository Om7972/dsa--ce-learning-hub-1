'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Flame,
    Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface Problem {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    acceptance: number;
    companies: string[];
}

const INITIAL_PROBLEMS: Problem[] = [
    { id: '1', title: 'Two Sum', difficulty: 'easy', category: 'Array', acceptance: 48.5, companies: ['Google', 'Amazon', 'Microsoft'] },
    { id: '2', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', category: 'String', acceptance: 33.8, companies: ['Amazon', 'Adobe'] },
    { id: '3', title: 'Median of Two Sorted Arrays', difficulty: 'hard', category: 'Binary Search', acceptance: 35.3, companies: ['Google', 'Microsoft'] },
    { id: '4', title: 'Valid Parentheses', difficulty: 'easy', category: 'Stack', acceptance: 40.1, companies: ['Facebook', 'Amazon'] },
    { id: '5', title: 'Merge K Sorted Lists', difficulty: 'hard', category: 'Linked List', acceptance: 47.2, companies: ['Google', 'Uber'] },
    { id: '6', title: 'Binary Tree Inorder Traversal', difficulty: 'easy', category: 'Tree', acceptance: 74.2, companies: ['Amazon', 'Microsoft'] },
    { id: '7', title: 'Clone Graph', difficulty: 'medium', category: 'Graph', acceptance: 52.8, companies: ['Google', 'Facebook'] }
];

const categories = ['All', 'Array', 'String', 'Linked List', 'Stack', 'Binary Search', 'Tree', 'Graph'];

const difficultyColors = {
    easy: 'text-green-500 bg-green-500/10 border-green-500/20',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    hard: 'text-red-500 bg-red-500/10 border-red-500/20'
};

export default function DSAPracticePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

    // Interactive localStorage states
    const [solvedIds, setSolvedIds] = useState<string[]>([]);
    const [attemptedIds, setAttemptedIds] = useState<string[]>([]);
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
    const [xp, setXp] = useState(1200);
    const [streak, setStreak] = useState(5);

    useEffect(() => {
        const solved = localStorage.getItem('learning-hub:solved-problems');
        const attempted = localStorage.getItem('learning-hub:attempted-problems');
        const bookmarks = localStorage.getItem('learning-hub:bookmarks-problems');
        const userXp = localStorage.getItem('learning-hub:xp');
        const userStreak = localStorage.getItem('learning-hub:streak');

        if (solved) setSolvedIds(JSON.parse(solved));
        if (attempted) setAttemptedIds(JSON.parse(attempted));
        if (bookmarks) setBookmarkedIds(JSON.parse(bookmarks));
        if (userXp) setXp(Number(userXp));
        if (userStreak) setStreak(Number(userStreak));
    }, []);

    const toggleSolve = (id: string) => {
        let newSolved = [...solvedIds];
        let newAttempted = [...attemptedIds];

        if (solvedIds.includes(id)) {
            newSolved = newSolved.filter(x => x !== id);
            toast.info("Problem marked as unsolved");
        } else {
            newSolved.push(id);
            if (!newAttempted.includes(id)) {
                newAttempted.push(id);
            }
            // Reward XP
            const problem = INITIAL_PROBLEMS.find(p => p.id === id);
            const xpReward = problem?.difficulty === 'easy' ? 50 : problem?.difficulty === 'medium' ? 100 : 150;
            const updatedXp = xp + xpReward;
            setXp(updatedXp);
            localStorage.setItem('learning-hub:xp', String(updatedXp));
            toast.success(`Solved! +${xpReward} XP earned!`);
        }

        setSolvedIds(newSolved);
        setAttemptedIds(newAttempted);
        localStorage.setItem('learning-hub:solved-problems', JSON.stringify(newSolved));
        localStorage.setItem('learning-hub:attempted-problems', JSON.stringify(newAttempted));
    };

    const toggleBookmark = (id: string) => {
        let newBookmarks = [...bookmarkedIds];
        if (bookmarkedIds.includes(id)) {
            newBookmarks = newBookmarks.filter(x => x !== id);
            toast.info("Removed from bookmarks");
        } else {
            newBookmarks.push(id);
            toast.success("Added to bookmarks");
        }
        setBookmarkedIds(newBookmarks);
        localStorage.setItem('learning-hub:bookmarks-problems', JSON.stringify(newBookmarks));
    };

    const filteredProblems = INITIAL_PROBLEMS.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    const stats = {
        total: INITIAL_PROBLEMS.length,
        solved: solvedIds.length,
        attempted: attemptedIds.length,
        streak: streak
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
                    DSA Practice Arena
                </h1>
                <p className="text-muted-foreground text-lg">
                    Sharpen your problem-solving skills with curated DSA challenges. Track your answers in real-time.
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-4">
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
                    percentage={stats.total > 0 ? (stats.solved / stats.total) * 100 : 0}
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
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                    <Input
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-10 bg-slate-900/40 border-slate-800"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 max-w-full md:max-w-xl">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="whitespace-nowrap rounded-xl text-xs font-semibold"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Difficulty Tabs */}
            <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="space-y-6">
                <TabsList className="bg-slate-900 border border-slate-800/80 p-1">
                    <TabsTrigger value="all">All Levels</TabsTrigger>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedDifficulty} className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredProblems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10"
                            >
                                <Code className="h-12 w-12 text-slate-700 mx-auto mb-2" />
                                <h3 className="font-bold text-sm text-slate-400">No problems found</h3>
                                <p className="text-xs text-muted-foreground mt-1">Try resetting your filter parameters.</p>
                            </motion.div>
                        ) : (
                            filteredProblems.map((problem, index) => {
                                const isSolved = solvedIds.includes(problem.id);
                                const isAttempted = attemptedIds.includes(problem.id);
                                const isBookmarked = bookmarkedIds.includes(problem.id);

                                return (
                                    <motion.div
                                        key={problem.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <Card className="glass-card hover:border-slate-700/60 transition-all duration-300 group">
                                            <CardContent className="p-5 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    {/* Solved Checkbox */}
                                                    <button
                                                        onClick={() => toggleSolve(problem.id)}
                                                        className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all ${
                                                            isSolved 
                                                                ? "bg-green-500 border-green-500 text-white" 
                                                                : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                                                        }`}
                                                    >
                                                        {isSolved && <CheckCircle2 className="h-4 w-4" />}
                                                    </button>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-1.5">
                                                            <h3 className="font-bold text-base truncate group-hover:text-primary transition-colors text-slate-200">
                                                                {problem.title}
                                                            </h3>
                                                            <Badge className={`${difficultyColors[problem.difficulty]} capitalize py-0 px-2 text-[10px]`}>
                                                                {problem.difficulty}
                                                            </Badge>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                                            <span className="font-medium text-slate-500 uppercase font-mono tracking-wider">{problem.category}</span>
                                                            <span className="flex items-center gap-1">
                                                                <TrendingUp className="h-3.5 w-3.5" />
                                                                {problem.acceptance}% Acceptance
                                                            </span>
                                                            <div className="hidden sm:flex items-center gap-1.5">
                                                                {problem.companies.map((c) => (
                                                                    <Badge key={c} variant="outline" className="bg-slate-950/60 border-slate-800 text-slate-400 text-[10px]">
                                                                        {c}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => toggleBookmark(problem.id)}
                                                        className={`p-2.5 rounded-xl border transition-all ${
                                                            isBookmarked 
                                                                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" 
                                                                : "border-slate-800 hover:bg-slate-800/40 text-slate-500 hover:text-slate-300"
                                                        }`}
                                                    >
                                                        <Star className={`h-4.5 w-4.5 ${isBookmarked ? "fill-yellow-500" : ""}`} />
                                                    </button>

                                                    <Button
                                                        variant={isSolved ? 'outline' : 'default'}
                                                        onClick={() => toggleSolve(problem.id)}
                                                        className="font-bold text-xs"
                                                    >
                                                        {isSolved ? 'Review' : 'Solve Task'}
                                                        <Zap className="ml-1.5 h-3.5 w-3.5 fill-current" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, percentage }: any) {
    return (
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <Card className="glass-card overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${color}`} />
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">{label}</p>
                            <p className="text-3xl font-black text-white">{value}</p>
                            {percentage !== undefined && (
                                <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">
                                    {percentage.toFixed(1)}% complete
                                </p>
                            )}
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
