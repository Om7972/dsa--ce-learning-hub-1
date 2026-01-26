'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookMarked,
    Code,
    BookOpen,
    Video,
    FileText,
    Trash2,
    ExternalLink,
    Filter,
    Search,
    Star,
    Clock,
    Tag
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Bookmark {
    id: string;
    title: string;
    type: 'problem' | 'lesson' | 'video' | 'note';
    category: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    savedAt: Date;
    url: string;
    tags: string[];
}

const bookmarks: Bookmark[] = [
    {
        id: '1',
        title: 'Two Sum Problem',
        type: 'problem',
        category: 'Arrays',
        difficulty: 'easy',
        savedAt: new Date('2024-01-20'),
        url: '/problems/two-sum',
        tags: ['Hash Table', 'Array']
    },
    {
        id: '2',
        title: 'Binary Search Trees Explained',
        type: 'lesson',
        category: 'Trees',
        savedAt: new Date('2024-01-19'),
        url: '/lessons/bst',
        tags: ['Trees', 'BST']
    },
    {
        id: '3',
        title: 'Dynamic Programming Masterclass',
        type: 'video',
        category: 'Algorithms',
        savedAt: new Date('2024-01-18'),
        url: '/videos/dp-masterclass',
        tags: ['DP', 'Advanced']
    },
    {
        id: '4',
        title: 'Graph Algorithms Cheat Sheet',
        type: 'note',
        category: 'Graphs',
        savedAt: new Date('2024-01-17'),
        url: '/notes/graph-cheatsheet',
        tags: ['Graphs', 'Reference']
    },
    {
        id: '5',
        title: 'Longest Palindromic Substring',
        type: 'problem',
        category: 'Strings',
        difficulty: 'medium',
        savedAt: new Date('2024-01-16'),
        url: '/problems/longest-palindrome',
        tags: ['String', 'DP']
    }
];

const typeIcons = {
    problem: Code,
    lesson: BookOpen,
    video: Video,
    note: FileText
};

const typeColors = {
    problem: 'text-blue-500',
    lesson: 'text-green-500',
    video: 'text-purple-500',
    note: 'text-orange-500'
};

const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
};

export default function BookmarksPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');

    const filteredBookmarks = bookmarks.filter(bookmark => {
        const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = selectedType === 'all' || bookmark.type === selectedType;
        return matchesSearch && matchesType;
    });

    const stats = {
        total: bookmarks.length,
        problems: bookmarks.filter(b => b.type === 'problem').length,
        lessons: bookmarks.filter(b => b.type === 'lesson').length,
        videos: bookmarks.filter(b => b.type === 'video').length,
        notes: bookmarks.filter(b => b.type === 'note').length
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-purple-600">
                        <BookMarked className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            My Bookmarks
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Quick access to your saved problems, lessons, and resources
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-5"
            >
                <StatCard icon={BookMarked} label="Total" value={stats.total} color="from-primary to-purple-600" />
                <StatCard icon={Code} label="Problems" value={stats.problems} color="from-blue-500 to-cyan-500" />
                <StatCard icon={BookOpen} label="Lessons" value={stats.lessons} color="from-green-500 to-emerald-500" />
                <StatCard icon={Video} label="Videos" value={stats.videos} color="from-purple-500 to-pink-500" />
                <StatCard icon={FileText} label="Notes" value={stats.notes} color="from-orange-500 to-red-500" />
            </motion.div>

            {/* Search and Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search bookmarks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </motion.div>

            {/* Tabs */}
            <Tabs value={selectedType} onValueChange={setSelectedType}>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="problem">Problems</TabsTrigger>
                    <TabsTrigger value="lesson">Lessons</TabsTrigger>
                    <TabsTrigger value="video">Videos</TabsTrigger>
                    <TabsTrigger value="note">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value={selectedType} className="space-y-4 mt-6">
                    {filteredBookmarks.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-16">
                                <BookMarked className="h-16 w-16 text-muted-foreground mb-4" />
                                <p className="text-lg font-medium mb-2">No bookmarks found</p>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery ? 'Try a different search term' : 'Start bookmarking your favorite content'}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredBookmarks.map((bookmark, index) => (
                                <BookmarkCard key={bookmark.id} bookmark={bookmark} index={index} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: any) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="overflow-hidden">
                <div className={`h-1 bg-gradient-to-r ${color}`} />
                <CardContent className="p-6 text-center">
                    <Icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function BookmarkCard({ bookmark, index }: { bookmark: Bookmark; index: number }) {
    const Icon = typeIcons[bookmark.type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
        >
            <Card className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg bg-muted ${typeColors[bookmark.type]}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors truncate">
                                    {bookmark.title}
                                </h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="secondary" className="text-xs">
                                        {bookmark.category}
                                    </Badge>
                                    {bookmark.difficulty && (
                                        <Badge variant="outline" className={`text-xs ${difficultyColors[bookmark.difficulty]}`}>
                                            {bookmark.difficulty}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        {bookmark.tags.map((tag, i) => (
                            <span key={i} className="text-xs text-muted-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Saved {bookmark.savedAt.toLocaleDateString()}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-2">
                            Open
                            <ExternalLink className="h-3 w-3" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
