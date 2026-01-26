'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Database,
    Network,
    Binary,
    Layers,
    GitBranch,
    Shield,
    Workflow,
    BookOpen,
    Video,
    FileText,
    Code,
    CheckCircle,
    Clock,
    Star,
    Users,
    TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Subject {
    id: string;
    title: string;
    code: string;
    description: string;
    icon: any;
    color: string;
    semester: number;
    credits: number;
    progress: number;
    topics: number;
    completedTopics: number;
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
        progress: 65,
        topics: 12,
        completedTopics: 8,
        resources: { videos: 24, notes: 15, assignments: 8 },
        upcomingExam: '2026-02-15'
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
        progress: 45,
        topics: 10,
        completedTopics: 5,
        resources: { videos: 20, notes: 12, assignments: 6 },
        upcomingExam: '2026-02-20'
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
        progress: 30,
        topics: 14,
        completedTopics: 4,
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
        progress: 55,
        topics: 11,
        completedTopics: 6,
        resources: { videos: 22, notes: 14, assignments: 7 },
        upcomingExam: '2026-02-18'
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
        progress: 20,
        topics: 9,
        completedTopics: 2,
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
        progress: 40,
        topics: 8,
        completedTopics: 3,
        resources: { videos: 16, notes: 12, assignments: 4 }
    }
];

export default function CESubjectsPage() {
    const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');

    const filteredSubjects = subjects.filter(subject =>
        selectedSemester === 'all' || subject.semester === selectedSemester
    );

    const totalProgress = subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length;
    const totalCompleted = subjects.filter(s => s.progress === 100).length;
    const totalInProgress = subjects.filter(s => s.progress > 0 && s.progress < 100).length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Computer Engineering Subjects
                </h1>
                <p className="text-muted-foreground text-lg">
                    Master core CE concepts with comprehensive study materials and practice
                </p>
            </motion.div>

            {/* Overall Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-4 md:grid-cols-4"
            >
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
                    label="Overall Progress"
                    value={`${Math.round(totalProgress)}%`}
                    color="text-purple-500"
                />
            </motion.div>

            {/* Semester Filter */}
            <Tabs value={String(selectedSemester)} onValueChange={(v) => setSelectedSemester(v === 'all' ? 'all' : Number(v))}>
                <TabsList>
                    <TabsTrigger value="all">All Semesters</TabsTrigger>
                    <TabsTrigger value="3">Semester 3</TabsTrigger>
                    <TabsTrigger value="4">Semester 4</TabsTrigger>
                    <TabsTrigger value="5">Semester 5</TabsTrigger>
                </TabsList>

                <TabsContent value={String(selectedSemester)} className="space-y-6 mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredSubjects.map((subject, index) => (
                            <SubjectCard key={subject.id} subject={subject} index={index} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: any) {
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

function SubjectCard({ subject, index }: { subject: Subject; index: number }) {
    const Icon = subject.icon;
    const daysUntilExam = subject.upcomingExam
        ? Math.ceil((new Date(subject.upcomingExam).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <Card className="overflow-hidden h-full flex flex-col">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${subject.color}`} />

                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${subject.color}`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{subject.title}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline">{subject.code}</Badge>
                                    <Badge variant="secondary">Sem {subject.semester}</Badge>
                                    <Badge variant="secondary">{subject.credits} Credits</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                    <CardDescription>{subject.description}</CardDescription>

                    {/* Progress */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                {subject.completedTopics} / {subject.topics} topics completed
                            </span>
                            <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                    </div>

                    {/* Resources */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                            <Video className="h-5 w-5 text-muted-foreground mb-1" />
                            <span className="text-lg font-bold">{subject.resources.videos}</span>
                            <span className="text-xs text-muted-foreground">Videos</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                            <FileText className="h-5 w-5 text-muted-foreground mb-1" />
                            <span className="text-lg font-bold">{subject.resources.notes}</span>
                            <span className="text-xs text-muted-foreground">Notes</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-lg bg-muted">
                            <Code className="h-5 w-5 text-muted-foreground mb-1" />
                            <span className="text-lg font-bold">{subject.resources.assignments}</span>
                            <span className="text-xs text-muted-foreground">Tasks</span>
                        </div>
                    </div>

                    {/* Upcoming Exam Alert */}
                    {daysUntilExam && daysUntilExam <= 30 && (
                        <div className={`p-3 rounded-lg ${daysUntilExam <= 7 ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                            <div className="flex items-center gap-2">
                                <Clock className={`h-4 w-4 ${daysUntilExam <= 7 ? 'text-red-500' : 'text-yellow-500'}`} />
                                <span className={`text-sm font-medium ${daysUntilExam <= 7 ? 'text-red-700' : 'text-yellow-700'}`}>
                                    Exam in {daysUntilExam} days
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <Button className="w-full">
                        Continue Learning
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
