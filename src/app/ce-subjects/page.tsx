'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Database,
    Network,
    Binary,
    Layers,
    Workflow,
    BookOpen,
    Video,
    FileText,
    Code,
    CheckCircle,
    Clock,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Subject {
    id: string;
    title: string;
    code: string;
    description: string;
    icon: any;
    color: string;
    semester: number;
    credits: number;
    topics: number;
    resources: {
        videos: number;
        notes: number;
        assignments: number;
    };
    upcomingExam?: string;
}

const subjects: Subject[] = [
    {
        id: '1',
        title: 'Computer Organization & Architecture',
        code: 'CE301',
        description: 'Study computer system organization, instruction sets, memory hierarchy, and processor design.',
        icon: Cpu,
        color: 'from-blue-500 to-cyan-500',
        semester: 3,
        credits: 4,
        topics: 12,
        resources: { videos: 24, notes: 15, assignments: 8 },
        upcomingExam: '2026-07-15'
    },
    {
        id: '2',
        title: 'Database Management Systems',
        code: 'CE302',
        description: 'Learn database design, SQL, normalization, transactions, and database administration.',
        icon: Database,
        color: 'from-purple-500 to-pink-500',
        semester: 3,
        credits: 4,
        topics: 10,
        resources: { videos: 20, notes: 12, assignments: 6 },
        upcomingExam: '2026-07-20'
    },
    {
        id: '3',
        title: 'Computer Networks',
        code: 'CE303',
        description: 'Explore network protocols, OSI model, TCP/IP, routing, and network security.',
        icon: Network,
        color: 'from-green-500 to-emerald-500',
        semester: 4,
        credits: 3,
        topics: 14,
        resources: { videos: 28, notes: 18, assignments: 10 }
    },
    {
        id: '4',
        title: 'Operating Systems',
        code: 'CE304',
        description: 'Understand process management, memory management, file systems, and OS design.',
        icon: Layers,
        color: 'from-orange-500 to-red-500',
        semester: 4,
        credits: 4,
        topics: 11,
        resources: { videos: 22, notes: 14, assignments: 7 },
        upcomingExam: '2026-07-18'
    },
    {
        id: '5',
        title: 'Software Engineering',
        code: 'CE305',
        description: 'Learn SDLC, agile methodologies, design patterns, and software project management.',
        icon: Workflow,
        color: 'from-yellow-500 to-amber-500',
        semester: 5,
        credits: 3,
        topics: 9,
        resources: { videos: 18, notes: 10, assignments: 5 }
    },
    {
        id: '6',
        title: 'Theory of Computation',
        code: 'CE306',
        description: 'Study automata theory, formal languages, computability, and complexity theory.',
        icon: Binary,
        color: 'from-indigo-500 to-purple-500',
        semester: 5,
        credits: 3,
        topics: 8,
        resources: { videos: 16, notes: 12, assignments: 4 }
    }
];

export default function CESubjectsPage() {
    const router = useRouter();
    const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');

    // LocalStorage backed interactive states
    const [progressMap, setProgressMap] = useState<Record<string, number>>({
        '1': 65,
        '2': 45,
        '3': 30,
        '4': 55,
        '5': 20,
        '6': 40
    });
    const [xp, setXp] = useState(1200);

    useEffect(() => {
        const progress = localStorage.getItem('learning-hub:subject-progress');
        const userXp = localStorage.getItem('learning-hub:xp');

        if (progress) setProgressMap(JSON.parse(progress));
        if (userXp) setXp(Number(userXp));
    }, []);

    const handleStudy = (id: string) => {
        const currentProgress = progressMap[id] || 0;
        if (currentProgress >= 100) {
            toast.info("Subject material is fully mastered!");
            return;
        }

        const nextProgress = Math.min(100, currentProgress + 10);
        const newProgress = { ...progressMap, [id]: nextProgress };
        setProgressMap(newProgress);
        localStorage.setItem('learning-hub:subject-progress', JSON.stringify(newProgress));

        const updatedXp = xp + 50;
        setXp(updatedXp);
        localStorage.setItem('learning-hub:xp', String(updatedXp));

        if (nextProgress === 100) {
            toast.success("Incredible! Subject coursework completed! +150 XP Bonus");
            localStorage.setItem('learning-hub:xp', String(updatedXp + 150));
            setXp(prev => prev + 150);
        } else {
            toast.success(`Studied Subject! Coursework increased to ${nextProgress}%. +50 XP`);
        }
    };

    const filteredSubjects = subjects.filter(subject =>
        selectedSemester === 'all' || subject.semester === selectedSemester
    );

    const totalProgress = subjects.reduce((sum, s) => sum + (progressMap[s.id] || 0), 0) / subjects.length;
    const totalCompleted = subjects.filter(s => (progressMap[s.id] || 0) === 100).length;
    const totalInProgress = subjects.filter(s => (progressMap[s.id] || 0) > 0 && (progressMap[s.id] || 0) < 100).length;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Computer Engineering Subjects
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Master core CE concepts with comprehensive study materials, notes, and tasks.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => router.push('/roadmaps')}>
                            <Network className="mr-2 h-4 w-4" /> View Roadmaps
                        </Button>
                        <Button className="bg-gradient-to-r from-red-650 to-orange-600 hover:from-red-700 hover:to-orange-700 font-bold" onClick={() => router.push('/exam')}>
                            <TrendingUp className="mr-2 h-4 w-4" /> Exam Mode (Beta)
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Overall Stats */}
            <div className="grid gap-6 md:grid-cols-4">
                <StatCard
                    icon={BookOpen}
                    label="Total Subjects"
                    value={subjects.length}
                    color="text-blue-500"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Completed"
                    value={totalCompleted}
                    color="text-green-500"
                />
                <StatCard
                    icon={Clock}
                    label="In Progress"
                    value={totalInProgress}
                    color="text-yellow-500"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Overall Completion"
                    value={`${Math.round(totalProgress)}%`}
                    color="text-purple-500"
                />
            </div>

            {/* Semester Filter */}
            <Tabs value={String(selectedSemester)} onValueChange={(v) => setSelectedSemester(v === 'all' ? 'all' : Number(v))} className="space-y-6">
                <TabsList className="bg-slate-900 border border-slate-800/80 p-1">
                    <TabsTrigger value="all">All Semesters</TabsTrigger>
                    <TabsTrigger value="3">Semester 3</TabsTrigger>
                    <TabsTrigger value="4">Semester 4</TabsTrigger>
                    <TabsTrigger value="5">Semester 5</TabsTrigger>
                </TabsList>

                <TabsContent value={String(selectedSemester)} className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <AnimatePresence mode="popLayout">
                            {filteredSubjects.map((subject, index) => {
                                const currentProgress = progressMap[subject.id] || 0;
                                const SubjectIcon = subject.icon;
                                const completedTopics = Math.round(subject.topics * (currentProgress / 100));

                                return (
                                    <motion.div
                                        key={subject.id}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <Card className="overflow-hidden h-full flex flex-col glass-card hover:border-slate-700/60 transition-all duration-300">
                                            {/* Gradient Header */}
                                            <div className={`h-1.5 bg-gradient-to-r ${subject.color}`} />

                                            <CardHeader>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${subject.color} shadow-lg shadow-black/20`}>
                                                            <SubjectIcon className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-xl font-bold text-slate-100">{subject.title}</CardTitle>
                                                            <div className="flex items-center gap-2 mt-1.5">
                                                                <Badge variant="outline" className="border-slate-800 text-slate-400">{subject.code}</Badge>
                                                                <Badge variant="secondary" className="bg-slate-900 text-slate-300">Sem {subject.semester}</Badge>
                                                                <Badge variant="secondary" className="bg-slate-900 text-slate-300">{subject.credits} Credits</Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="flex-1 flex flex-col justify-between space-y-5">
                                                <div className="space-y-4">
                                                    <CardDescription className="text-slate-450 text-sm leading-relaxed">{subject.description}</CardDescription>

                                                    {/* Progress */}
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between text-xs font-semibold">
                                                            <span className="text-slate-400">
                                                                {completedTopics} / {subject.topics} topics mastered
                                                            </span>
                                                            <span className="text-primary">{currentProgress}%</span>
                                                        </div>
                                                        <Progress value={currentProgress} className="h-2" />
                                                    </div>

                                                    {/* Resources */}
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                                                            <Video className="h-4.5 w-4.5 text-slate-500 mb-1" />
                                                            <span className="text-base font-bold text-slate-200">{subject.resources.videos}</span>
                                                            <span className="text-[10px] text-slate-400">Videos</span>
                                                        </div>
                                                        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                                                            <FileText className="h-4.5 w-4.5 text-slate-500 mb-1" />
                                                            <span className="text-base font-bold text-slate-200">{subject.resources.notes}</span>
                                                            <span className="text-[10px] text-slate-400">Notes</span>
                                                        </div>
                                                        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900/60 border border-slate-850">
                                                            <Code className="h-4.5 w-4.5 text-slate-500 mb-1" />
                                                            <span className="text-base font-bold text-slate-200">{subject.resources.assignments}</span>
                                                            <span className="text-[10px] text-slate-400">Tasks</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <Button className="w-full font-bold text-xs" onClick={() => handleStudy(subject.id)}>
                                                    Study Coursework
                                                </Button>
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

function StatCard({ icon: Icon, label, value, color }: any) {
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
