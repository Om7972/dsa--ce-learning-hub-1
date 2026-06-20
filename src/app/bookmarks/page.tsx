'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookMarked,
    Code,
    BookOpen,
    Video,
    FileText,
    Trash2,
    ExternalLink,
    Search,
    Clock,
    Tag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface Problem {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    acceptance: number;
    companies: string[];
}

const PROBLEMS_DATA: Problem[] = [
    { id: '1', title: 'Two Sum', difficulty: 'easy', category: 'Array', acceptance: 48.5, companies: ['Google', 'Amazon', 'Microsoft'] },
    { id: '2', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', category: 'String', acceptance: 33.8, companies: ['Amazon', 'Adobe'] },
    { id: '3', title: 'Median of Two Sorted Arrays', difficulty: 'hard', category: 'Binary Search', acceptance: 35.3, companies: ['Google', 'Microsoft'] },
    { id: '4', title: 'Valid Parentheses', difficulty: 'easy', category: 'Stack', acceptance: 40.1, companies: ['Facebook', 'Amazon'] },
    { id: '5', title: 'Merge K Sorted Lists', difficulty: 'hard', category: 'Linked List', acceptance: 47.2, companies: ['Google', 'Uber'] },
    { id: '6', title: 'Binary Tree Inorder Traversal', difficulty: 'easy', category: 'Tree', acceptance: 74.2, companies: ['Amazon', 'Microsoft'] },
    { id: '7', title: 'Clone Graph', difficulty: 'medium', category: 'Graph', acceptance: 52.8, companies: ['Google', 'Facebook'] }
];

interface BookmarkItem {
    id: string;
    title: string;
    type: 'problem' | 'lesson' | 'video' | 'note';
    category: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    savedAt: string;
    url: string;
    tags: string[];
}

const defaultBookmarks: BookmarkItem[] = [
    {
        id: 'bst-lesson',
        title: 'Binary Search Trees Explained',
        type: 'lesson',
        category: 'Trees',
        savedAt: '2026-06-19',
        url: '/curriculum',
        tags: ['Trees', 'BST']
    },
    {
        id: 'dp-video',
        title: 'Dynamic Programming Masterclass',
        type: 'video',
        category: 'Algorithms',
        savedAt: '2026-06-18',
        url: '/placement-os',
        tags: ['DP', 'Advanced']
    },
    {
        id: 'graph-note',
        title: 'Graph Algorithms Cheat Sheet',
        type: 'note',
        category: 'Graphs',
        savedAt: '2026-06-17',
        url: '/placement-os',
        tags: ['Graphs', 'Reference']
    }
];

const typeIcons = {
    problem: Code,
    lesson: BookOpen,
    video: Video,
    note: FileText
};

const typeColors = {
    problem: 'text-blue-500 bg-blue-500/10',
    lesson: 'text-green-500 bg-green-500/10',
    video: 'text-purple-500 bg-purple-500/10',
    note: 'text-orange-500 bg-orange-500/10'
};

const difficultyColors = {
    easy: 'text-green-500 bg-green-500/10 border-green-500/20',
    medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    hard: 'text-red-500 bg-red-500/10 border-red-500/20'
};

export default function BookmarksPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    // State compiled from localStorage and defaults
    const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState<string[]>([]);
    const [extraBookmarks, setExtraBookmarks] = useState<BookmarkItem[]>(defaultBookmarks);

    useEffect(() => {
        const storedProbBookmarks = localStorage.getItem('learning-hub:bookmarks-problems');
        if (storedProbBookmarks) {
            setBookmarkedProblemIds(JSON.parse(storedProbBookmarks));
        }
    }, []);

    // Combine problems bookmarked with static resources bookmarks
    const bookmarkedProblems: BookmarkItem[] = bookmarkedProblemIds.map(id => {
        const prob = PROBLEMS_DATA.find(p => p.id === id);
        if (!prob) return null;
        return {
            id: prob.id,
            title: prob.title,
            type: 'problem' as const,
            category: prob.category,
            difficulty: prob.difficulty,
            savedAt: new Date().toISOString().split('T')[0],
            url: '/dsa-practice',
            tags: [prob.category, 'Practice']
        };
    }).filter(Boolean) as BookmarkItem[];

    const allBookmarks = [...bookmarkedProblems, ...extraBookmarks];

    const removeBookmark = (id: string, type: string) => {
        if (type === 'problem') {
            const updated = bookmarkedProblemIds.filter(x => x !== id);
            setBookmarkedProblemIds(updated);
            localStorage.setItem('learning-hub:bookmarks-problems', JSON.stringify(updated));
            toast.info("Problem removed from bookmarks");
        } else {
            const updated = extraBookmarks.filter(x => x.id !== id);
            setExtraBookmarks(updated);
            toast.info("Resource removed from bookmarks");
        }
    };

    const filteredBookmarks = allBookmarks.filter(bookmark => {
        const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = selectedType === 'all' || bookmark.type === selectedType;
        return matchesSearch && matchesType;
    });

    const stats = {
        total: allBookmarks.length,
        problems: allBookmarks.filter(b => b.type === 'problem').length,
        lessons: allBookmarks.filter(b => b.type === 'lesson').length,
        videos: allBookmarks.filter(b => b.type === 'video').length,
        notes: allBookmarks.filter(b => b.type === 'note').length
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-md">
                        <BookMarked className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            My Bookmarks
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Quick access to your saved problems, lessons, videos, and cheat sheets.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
                <StatCard icon={BookMarked} label="Total Bookmarks" value={stats.total} color="from-primary to-purple-650" />
                <StatCard icon={Code} label="Problems" value={stats.problems} color="from-blue-500 to-cyan-500" />
                <StatCard icon={BookOpen} label="Lessons" value={stats.lessons} color="from-green-500 to-emerald-500" />
                <StatCard icon={Video} label="Videos" value={stats.videos} color="from-purple-500 to-pink-500" />
                <StatCard icon={FileText} label="Notes" value={stats.notes} color="from-orange-500 to-red-500" />
            </div>

            {/* Search and Filter */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
                <Input
                    placeholder="Search bookmarks by title, category, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-slate-900/40 border-slate-800"
                />
            </div>

            {/* Tabs */}
            <Tabs value={selectedType} onValueChange={setSelectedType} className="space-y-6">
                <TabsList className="bg-slate-900 border border-slate-800/80 p-1">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="problem">Problems</TabsTrigger>
                    <TabsTrigger value="lesson">Lessons</TabsTrigger>
                    <TabsTrigger value="video">Videos</TabsTrigger>
                    <TabsTrigger value="note">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedType} className="mt-6">
                    <AnimatePresence mode="popLayout">
                        {filteredBookmarks.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Card className="glass-card">
                                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                        <BookMarked className="h-16 w-16 text-slate-700 mb-4 animate-pulse" />
                                        <p className="text-lg font-bold text-slate-300">No bookmarks found</p>
                                        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                                            {searchQuery ? 'Try matching another phrase or criteria.' : 'Bookmark questions from the Practice Arena or Sheets to see them here.'}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {filteredBookmarks.map((bookmark, index) => {
                                    const BookmarkIcon = typeIcons[bookmark.type];

                                    return (
                                        <motion.div
                                            key={bookmark.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                        >
                                            <Card className="group hover:shadow-lg transition-all duration-300 glass-card hover:border-slate-700/60 h-full flex flex-col justify-between">
                                                <CardContent className="p-6 space-y-4">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                                            <div className={`p-2.5 rounded-xl ${typeColors[bookmark.type]}`}>
                                                                <BookmarkIcon className="h-5 w-5" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors truncate text-slate-200">
                                                                    {bookmark.title}
                                                                </h3>
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <Badge variant="secondary" className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 font-medium">
                                                                        {bookmark.category}
                                                                    </Badge>
                                                                    {bookmark.difficulty && (
                                                                        <Badge className={`text-[10px] capitalize ${difficultyColors[bookmark.difficulty]}`}>
                                                                            {bookmark.difficulty}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeBookmark(bookmark.id, bookmark.type)}
                                                            className="text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Tags */}
                                                    <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
                                                        <Tag className="h-3.5 w-3.5 text-slate-500" />
                                                        {bookmark.tags.map((tag, i) => (
                                                            <Badge key={i} variant="outline" className="border-slate-850 text-slate-400 text-[9px] font-medium py-0">
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                                                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                                                            <Clock className="h-3.5 w-3.5 text-slate-500" />
                                                            <span>Saved {bookmark.savedAt}</span>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="gap-1.5 text-xs text-slate-300 hover:text-slate-100 hover:bg-slate-800/40 font-semibold"
                                                            onClick={() => window.open(bookmark.url, '_self')}
                                                        >
                                                            Launch Resource
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: any) {
    return (
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <Card className="glass-card overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${color}`} />
                <CardContent className="p-5 text-center flex flex-col items-center">
                    <Icon className="h-5 w-5 mb-2 text-slate-550" />
                    <div className="text-2xl font-black text-white">{value}</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{label}</div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
