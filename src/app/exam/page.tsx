"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Award,
    Clock,
    FileText,
    BookOpen,
    Play,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Search,
    ChevronRight,
    TrendingUp,
    DownloadCloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock Data
const EXAM_SETS = [
    { id: "set-1", subject: "Operating Systems", title: "Process Synchronization & Deadlocks", questionsCount: 15, duration: "30 mins", popularity: "High" },
    { id: "set-2", subject: "Compiler Design", title: "LR Parsers & Syntax Directed Translation", questionsCount: 10, duration: "20 mins", popularity: "Medium" },
    { id: "set-3", subject: "Computer Organization", title: "Cache Mapping & Pipelining Hazards", questionsCount: 15, duration: "30 mins", popularity: "High" }
];

const MOCK_QUESTIONS = [
    {
        id: 1,
        question: "Which of the following processes scheduling algorithms can lead to starvation?",
        options: ["First Come First Served", "Shortest Job First", "Round Robin", "Priority Scheduling"],
        correctAnswers: [1, 3] // Multiple choice/select
    },
    {
        id: 2,
        question: "In standard paging systems, if the page size is 4KB and logical address space is 32-bits, how many entries are present in a single-level page table?",
        options: ["2^20", "2^12", "2^32", "2^10"],
        correctAnswers: [0]
    },
    {
        id: 3,
        question: "Which semaphore operations are atomic?",
        options: ["wait() only", "signal() only", "both wait() and signal()", "neither"],
        correctAnswers: [2]
    }
];

const PYQ_RESOURCES = [
    { title: "GATE CS 2025 Original Question Paper", year: "2025", size: "2.4 MB" },
    { title: "University Semester End Exam - OS 2024", year: "2024", size: "1.1 MB" },
    { title: "Algorithms Master Semester Mock Pack", year: "2023", size: "1.8 MB" }
];

export default function ExamModePage() {
    const [activeTab, setActiveTab] = useState("papers");
    const [searchQuery, setSearchQuery] = useState("");

    // Active Exam States
    const [activeExam, setActiveExam] = useState<any>(null);
    const [examTimeLeft, setExamTimeLeft] = useState(1800); // 30 mins
    const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
    const [examCompleted, setExamCompleted] = useState(false);
    const [examScore, setExamScore] = useState(0);
    const [examDiagnostics, setExamDiagnostics] = useState<any>(null);

    // Active Timer countdown
    useEffect(() => {
        let timer: any;
        if (activeExam && !examCompleted) {
            timer = setInterval(() => {
                setExamTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        submitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeExam, examCompleted]);

    const startExam = (exam: any) => {
        setActiveExam(exam);
        setExamTimeLeft(1800);
        setUserAnswers({});
        setExamCompleted(false);
        setExamScore(0);
        setExamDiagnostics(null);
        toast.success(`Exam Started: ${exam.title}`);
    };

    const toggleOption = (qId: number, oIdx: number) => {
        const current = userAnswers[qId] || [];
        let next: number[];
        if (current.includes(oIdx)) {
            next = current.filter(idx => idx !== oIdx);
        } else {
            next = [...current, oIdx];
        }
        setUserAnswers({ ...userAnswers, [qId]: next });
    };

    const submitExam = () => {
        setExamCompleted(true);
        // Calculate Score
        let correctCount = 0;
        MOCK_QUESTIONS.forEach(q => {
            const answers = userAnswers[q.id] || [];
            const isCorrect = answers.length === q.correctAnswers.length &&
                answers.every(val => q.correctAnswers.includes(val));
            if (isCorrect) correctCount++;
        });

        const scorePercent = Math.round((correctCount / MOCK_QUESTIONS.length) * 100);
        setExamScore(scorePercent);
        
        // Build Diagnostics report
        setExamDiagnostics({
            accuracy: scorePercent,
            speed: "12 mins used",
            weakAreas: scorePercent < 70 ? ["Process synchronization bounds", "Paging offsets math"] : [],
            strongAreas: scorePercent >= 70 ? ["Atomic semaphore logic", "Logical mapping tables"] : ["Atomic semaphore logic"]
        });

        toast.success("Exam submitted for automatic grading!");
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent mb-2">
                        Exam Mode Simulator
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Test your knowledge against semester tests and historical papers under rigorous constraints.
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-2xl shadow-sm">
                    <Award className="h-6 w-6 text-indigo-500 animate-pulse" />
                    <div>
                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Average Accuracy</span>
                        <span className="text-lg font-bold text-foreground">78.4%</span>
                    </div>
                </div>
            </div>

            {/* Hub tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-muted/30 p-1.5 rounded-xl border border-border max-w-fit">
                {[
                    { id: "papers", label: "Mock Assessments", icon: BookOpen },
                    { id: "pyqs", label: "PYQs & Resources", icon: FileText }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearchQuery("");
                            }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* TAB CONTENTS */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Mock Assessments */}
                    {activeTab === "papers" && !activeExam && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
                                <Search className="h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Filter assessments by subject name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base p-0"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {EXAM_SETS.filter(set => set.subject.toLowerCase().includes(searchQuery.toLowerCase())).map((set) => (
                                    <Card key={set.id} className="glass-card hover:border-primary/30 transition-colors group">
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant="outline">{set.subject}</Badge>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" /> {set.duration}
                                                </span>
                                            </div>
                                            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{set.title}</CardTitle>
                                            <CardDescription>{set.questionsCount} multiple-choice problems</CardDescription>
                                        </CardHeader>
                                        <CardContent className="pt-4 border-t border-border flex items-center justify-between mt-4">
                                            <span className="text-xs text-muted-foreground">Popularity: {set.popularity}</span>
                                            <Button onClick={() => startExam(set)} className="pink-glow flex items-center gap-1 text-xs">
                                                Launch Exam <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Exam Running */}
                    {activeTab === "papers" && activeExam && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Exam Control Panel */}
                            <Card className="glass-card flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Active Assessment</span>
                                    <h3 className="text-lg font-bold">{activeExam.title}</h3>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl border border-border">
                                        <Clock className="h-4.5 w-4.5 text-primary" />
                                        <span className="font-mono text-sm font-bold text-primary">{formatTime(examTimeLeft)}</span>
                                    </div>
                                    <Button onClick={submitExam} disabled={examCompleted} className="pink-glow font-bold">
                                        Submit Exam
                                    </Button>
                                    {examCompleted && (
                                        <Button variant="outline" onClick={() => setActiveExam(null)}>
                                            Exit Simulator
                                        </Button>
                                    )}
                                </div>
                            </Card>

                            {/* Questions list */}
                            <div className="space-y-6">
                                {MOCK_QUESTIONS.map((q, idx) => {
                                    const selected = userAnswers[q.id] || [];
                                    return (
                                        <Card key={q.id} className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">
                                                    Question {idx + 1}: {q.question}
                                                </CardTitle>
                                                <CardDescription>Select all correct answers</CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {q.options.map((opt, oIdx) => {
                                                    const isChecked = selected.includes(oIdx);
                                                    return (
                                                        <button
                                                            key={opt}
                                                            disabled={examCompleted}
                                                            onClick={() => toggleOption(q.id, oIdx)}
                                                            className={`p-4 rounded-xl text-left text-sm border transition-all ${
                                                                isChecked
                                                                    ? "bg-primary/10 border-primary text-primary font-semibold"
                                                                    : "border-border hover:bg-muted"
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    );
                                                })}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Diagnostics Report */}
                            {examCompleted && examDiagnostics && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 bg-card border border-border rounded-2xl space-y-6 shadow-xl"
                                >
                                    <div className="flex items-center justify-between pb-4 border-b border-border">
                                        <div>
                                            <h3 className="text-xl font-bold">Diagnostic Performance Report</h3>
                                            <p className="text-xs text-muted-foreground">Auto-graded metrics</p>
                                        </div>
                                        <span className="text-4xl font-black text-primary">{examDiagnostics.accuracy}%</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border">
                                            <span className="text-xs font-semibold text-green-500 uppercase block tracking-wider">Concept Strengths</span>
                                            <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                                                {examDiagnostics.strongAreas.map((area: string) => (
                                                    <li key={area}>{area}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border">
                                            <span className="text-xs font-semibold text-red-500 uppercase block tracking-wider">Revision Opportunities</span>
                                            <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                                                {examDiagnostics.weakAreas.length === 0 ? (
                                                    <li>All concepts sound!</li>
                                                ) : (
                                                    examDiagnostics.weakAreas.map((area: string) => (
                                                        <li key={area}>{area}</li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* PYQ resources list */}
                    {activeTab === "pyqs" && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" /> Past Year Documents Catalog
                                    </CardTitle>
                                    <CardDescription>Direct PDF references for major university exams and GATE.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border">
                                        {PYQ_RESOURCES.map((r) => (
                                            <div key={r.title} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                                    <div>
                                                        <span className="font-bold text-sm block">{r.title}</span>
                                                        <span className="text-xs text-muted-foreground">Size: {r.size} • Year: {r.year}</span>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => toast.success(`Downloading ${r.title}`)} className="flex items-center gap-1">
                                                    <DownloadCloud className="h-4 w-4" /> Download PDF
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
