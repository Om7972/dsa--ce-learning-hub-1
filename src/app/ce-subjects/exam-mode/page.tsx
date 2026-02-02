
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    FileText,
    AlertTriangle,
    TrendingUp,
    Clock,
    Bookmark,
    CheckCircle2,
    Search,
    Filter,
    PenTool
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExamResource {
    id: number;
    subject_code: string;
    title: string;
    content: string;
    resource_type: 'note' | 'question' | 'pyq';
    marks?: number;
    is_important: boolean;
    created_at: string;
}

const subjects = [
    { code: 'CE301', name: 'Computer Organization & Architecture' },
    { code: 'CE302', name: 'Database Management Systems' },
    { code: 'CE303', name: 'Computer Networks' },
    { code: 'CE304', name: 'Operating Systems' },
    { code: 'CE305', name: 'Software Engineering' },
    { code: 'CE306', name: 'Theory of Computation' },
];

export default function ExamModePage() {
    const [selectedSubject, setSelectedSubject] = useState('CE301');
    const [resources, setResources] = useState<ExamResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'note' | 'question' | 'pyq'>('all');

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/exam-resources?subjectCode=${selectedSubject}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setResources(data);
                }
            } catch (error) {
                console.error("Failed to fetch exam resources", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, [selectedSubject]);

    const filteredResources = resources.filter(
        r => filter === 'all' || r.resource_type === filter
    );

    const importantQuestions = resources.filter(r => r.is_important && r.resource_type === 'question');

    return (
        <div className="container mx-auto p-6 max-w-6xl space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600 flex items-center gap-3">
                        <TrendingUp className="text-red-500 w-10 h-10" />
                        Exam-Oriented Mode
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Focused revision for university exams. High-yield topics only.
                    </p>
                </div>

                <div className="w-full md:w-auto">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-[280px] h-12 text-lg border-2 border-primary/20 bg-card">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map(s => (
                                <SelectItem key={s.code} value={s.code}>{s.code} - {s.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </motion.div>

            {/* Quick Stats / Revision Dashboard */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase text-red-600/80">Top Priority</p>
                            <p className="text-2xl font-bold">{importantQuestions.length} Qs</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase text-blue-600/80">Revision Notes</p>
                            <p className="text-2xl font-bold">{resources.filter(r => r.resource_type === 'note').length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase text-amber-600/80">Avg. Rev Time</p>
                            <p className="text-2xl font-bold">~2h</p>
                        </div>
                    </CardContent>
                </Card>
                <Button className="h-full text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-xl shadow-red-500/20">
                    Start Rapid Fire <TrendingUp className="ml-2 w-5 h-5" />
                </Button>
            </div>

            <Tabs defaultValue="questions" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                    <TabsTrigger value="notes">Quick Notes</TabsTrigger>
                    <TabsTrigger value="pyq">Past Papers</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="space-y-6">
                    <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">2 Marks</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">5 Marks</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">10 Marks</Badge>
                    </div>
                    <div className="grid gap-4">
                        {loading ? <p>Loading resources...</p> :
                            resources.filter(r => r.resource_type === 'question').map((q) => (
                                <QuestionCard key={q.id} resource={q} />
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {loading ? <p>Loading notes...</p> :
                            resources.filter(r => r.resource_type === 'note').map((n) => (
                                <NoteCard key={n.id} resource={n} />
                            ))}
                    </div>
                </TabsContent>

                <TabsContent value="pyq" className="space-y-6">
                    <div className="p-12 text-center border-2 border-dashed rounded-xl text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Past Year Questions will appear here.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function QuestionCard({ resource }: { resource: ExamResource }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className={`border-l-4 ${resource.is_important ? 'border-l-red-500' : 'border-l-muted'}`}>
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            {resource.is_important && (
                                <Badge variant="destructive" className="flex items-center gap-1 text-[10px] px-1 py-0 h-5">
                                    <AlertTriangle className="w-3 h-3" /> IMPORTANT
                                </Badge>
                            )}
                            <Badge variant="secondary" className="text-[10px]">{resource.marks ? `${resource.marks} Marks` : 'Theory'}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{resource.content}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground hover:text-green-500" />
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function NoteCard({ resource }: { resource: ExamResource }) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base group-hover:text-blue-600 transition-colors flex items-start justify-between">
                        {resource.title}
                        <Bookmark className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-4">{resource.content}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-blue-500 font-medium">
                        Read full note <PenTool className="w-3 h-3" />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
