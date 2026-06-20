"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    Search,
    BookOpen,
    FileText,
    Award,
    TrendingUp,
    CheckCircle,
    UserCheck,
    Cpu,
    Volume2,
    UploadCloud,
    ArrowRight,
    Star,
    Clock,
    Lock,
    Sparkles,
    AlertCircle,
    RotateCcw,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock Data
const COMPANIES = [
    { name: "Google", logo: "G", color: "from-red-500 to-yellow-500", rating: 4.8, count: 120, difficulty: "Hard" },
    { name: "Amazon", logo: "A", color: "from-orange-500 to-yellow-600", rating: 4.6, count: 145, difficulty: "Medium-Hard" },
    { name: "Microsoft", logo: "M", color: "from-blue-500 to-teal-500", rating: 4.7, count: 110, difficulty: "Hard" },
    { name: "TCS", logo: "T", color: "from-purple-500 to-indigo-500", rating: 3.8, count: 320, difficulty: "Easy-Medium" },
    { name: "Infosys", logo: "I", color: "from-sky-500 to-blue-600", rating: 3.9, count: 280, difficulty: "Easy-Medium" },
    { name: "Accenture", logo: "AC", color: "from-purple-600 to-pink-500", rating: 4.0, count: 250, difficulty: "Medium" }
];

const BEHAVIORAL_QUESTIONS = [
    { id: 1, question: "Tell me about a time you handled a conflict within a project team.", category: "Leadership" },
    { id: 2, question: "Describe a challenging technical problem you solved and how you approached it.", category: "Problem Solving" },
    { id: 3, question: "How do you handle tight deadlines or sudden plan changes?", category: "Adaptability" }
];

const APTITUDE_TESTS = [
    { id: "apt-1", title: "Quantitative Aptitude - Probability & Permutations", duration: "15 mins", qCount: 10, difficulty: "Medium" },
    { id: "apt-2", title: "Logical Reasoning - Syllogisms & Arrangements", duration: "20 mins", qCount: 15, difficulty: "Hard" },
    { id: "apt-3", title: "Verbal Ability - Contextual Comprehension", duration: "10 mins", qCount: 10, difficulty: "Easy" }
];

const TECHNICAL_MCQS = [
    { id: 1, question: "What is the time complexity of searching in a self-balancing binary search tree?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 1 },
    { id: 2, question: "Which protocol operates at the Transport Layer of the OSI model?", options: ["IP", "HTTP", "TCP", "DNS"], answer: 2 },
    { id: 3, question: "In SQL, which join returns all rows from the left table even if there are no matches in the right table?", options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL OUTER JOIN"], answer: 2 }
];

export default function PlacementPrepPage() {
    const [activeTab, setActiveTab] = useState("companies");
    const [searchQuery, setSearchQuery] = useState("");
    
    // Mock Interview Simulator State
    const [interviewActive, setInterviewActive] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [interviewTranscript, setInterviewTranscript] = useState("");
    const [chatHistory, setChatHistory] = useState<{ sender: 'interviewer' | 'user', text: string }[]>([]);
    const [feedback, setFeedback] = useState("");

    // Resume Analyzer State
    const [resumeText, setResumeText] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    // Aptitude Test State
    const [activeTest, setActiveTest] = useState<any>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [testCompleted, setTestCompleted] = useState(false);
    const [score, setScore] = useState(0);

    // Local Storage for Progress Tracking
    const [completionPercentage, setCompletionPercentage] = useState(25);
    const [savedQuestions, setSavedQuestions] = useState<number[]>([]);

    useEffect(() => {
        const storedPercent = localStorage.getItem("placement_completion_percentage");
        if (storedPercent) setCompletionPercentage(Number(storedPercent));
    }, []);

    const updateCompletion = (newPercent: number) => {
        setCompletionPercentage(newPercent);
        localStorage.setItem("placement_completion_percentage", String(newPercent));
    };

    // Interview functions
    const startInterview = () => {
        setInterviewActive(true);
        setChatHistory([
            { sender: 'interviewer', text: `Hello! Welcome to your mock interview. Let's start. ${BEHAVIORAL_QUESTIONS[0].question}` }
        ]);
        setCurrentQuestionIndex(0);
        setFeedback("");
    };

    const submitAnswer = () => {
        if (!interviewTranscript.trim()) return;

        const newHistory = [...chatHistory, { sender: 'user' as const, text: interviewTranscript }];
        setChatHistory(newHistory);
        setInterviewTranscript("");

        setTimeout(() => {
            if (currentQuestionIndex < BEHAVIORAL_QUESTIONS.length - 1) {
                const nextIdx = currentQuestionIndex + 1;
                setCurrentQuestionIndex(nextIdx);
                setChatHistory(prev => [
                    ...prev,
                    { sender: 'interviewer', text: `Excellent. Now, next question: ${BEHAVIORAL_QUESTIONS[nextIdx].question}` }
                ]);
            } else {
                setInterviewActive(false);
                setFeedback("Interview complete! Analysis: Good communication structure. Try to use the STAR method (Situation, Task, Action, Result) more explicitly when describing technical problem solving.");
                updateCompletion(Math.min(100, completionPercentage + 15));
            }
        }, 1000);
    };

    // Resume Analysis
    const handleAnalyze = () => {
        if (!resumeText.trim()) {
            toast.error("Please enter your resume content!");
            return;
        }
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setAnalysisResult({
                atsScore: 78,
                keywordsMatched: ["React", "TypeScript", "SQL", "Next.js", "Algorithms"],
                missingKeywords: ["CI/CD", "Docker", "Unit Testing"],
                suggestions: "Add projects demonstrating REST APIs and system integration. Include metric-driven highlights (e.g. 'Improved efficiency by 20%')."
            });
            updateCompletion(Math.min(100, completionPercentage + 10));
            toast.success("Resume Analyzed successfully!");
        }, 2000);
    };

    // Aptitude quiz submit
    const submitQuiz = () => {
        let correctCount = 0;
        answers.forEach((ans, idx) => {
            if (ans === TECHNICAL_MCQS[idx].answer) correctCount++;
        });
        setScore(correctCount);
        setTestCompleted(true);
        updateCompletion(Math.min(100, completionPercentage + 10));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                        Placement Preparation Hub
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Accelerate your technical prep with industry roadmaps, mock tests, and smart analytics.
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-4 bg-card/60 backdrop-blur border border-border p-4 rounded-2xl shadow-sm">
                    <div className="text-right">
                        <span className="text-xs text-muted-foreground font-semibold uppercase block">Overall Progress</span>
                        <span className="text-2xl font-black text-primary">{completionPercentage}%</span>
                    </div>
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-primary h-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Hub Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-muted/30 p-1.5 rounded-xl border border-border max-w-fit">
                {[
                    { id: "companies", label: "Company Sheets", icon: Briefcase },
                    { id: "aptitude", label: "Aptitude Arenas", icon: BookOpen },
                    { id: "mcq", label: "Technical MCQs", icon: FileText },
                    { id: "mock", label: "Mock Interviews", icon: UserCheck },
                    { id: "resume", label: "ATS Resume Checker", icon: Cpu }
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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Companies Sheet */}
                    {activeTab === "companies" && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-sm">
                                <Search className="h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Filter by company name (e.g. Google, Amazon)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-base p-0"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {COMPANIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((company) => (
                                    <Card key={company.name} className="hover:border-primary/50 transition-all duration-300 group hover:shadow-lg overflow-hidden glass-card">
                                        <div className={`h-2 bg-gradient-to-r ${company.color}`} />
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center text-white font-extrabold text-lg`}>
                                                    {company.logo}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl font-bold">{company.name}</CardTitle>
                                                    <CardDescription className="text-xs">Difficulty: {company.difficulty}</CardDescription>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                {company.rating}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-4">
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <span>Prep Modules</span>
                                                <span className="font-semibold text-foreground">{company.count} Questions</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span>Your Progress</span>
                                                    <span>{company.name === "Google" ? "40%" : company.name === "TCS" ? "80%" : "0%"}</span>
                                                </div>
                                                <Progress value={company.name === "Google" ? 40 : company.name === "TCS" ? 80 : 0} />
                                            </div>
                                            <Button className="w-full pink-glow group-hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2">
                                                Start Prep Sheet <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Aptitude Arenas */}
                    {activeTab === "aptitude" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" /> Active Test Arena
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {APTITUDE_TESTS.map((test) => (
                                        <Card key={test.id} className="glass-card hover:border-primary/40 transition-colors">
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <Badge variant="outline">{test.difficulty}</Badge>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3.5 w-3.5" /> {test.duration}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-lg font-bold mt-2">{test.title}</CardTitle>
                                                <CardDescription>{test.qCount} aptitude problems</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button className="w-full" onClick={() => {
                                                    setActiveTest(test);
                                                    setTestCompleted(false);
                                                    setAnswers([]);
                                                    toast.info(`Started ${test.title}`);
                                                }}>
                                                    Launch Timer & Solve
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Aptitude Performance</CardTitle>
                                    <CardDescription>Visualizing your quantitative metrics</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border">
                                        <div className="flex justify-between text-sm">
                                            <span>Average Accuracy</span>
                                            <span className="font-bold text-foreground">72%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Total Tests Taken</span>
                                            <span className="font-bold text-foreground">12</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Time / Question</span>
                                            <span className="font-bold text-foreground">58 seconds</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground text-center">
                                        🚀 Take a new test to update analytics model!
                                    </div>
                                </CardContent>
                            </Card>

                            {activeTest && (
                                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
                                    <Card className="w-full max-w-2xl bg-card border border-border shadow-2xl">
                                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                                            <div>
                                                <CardTitle className="text-xl font-bold">{activeTest.title}</CardTitle>
                                                <CardDescription>Aptitude Assessment Simulator</CardDescription>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => setActiveTest(null)}>
                                                <X className="h-5 w-5" />
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="py-6 space-y-4">
                                            <div className="p-4 bg-muted/40 rounded-xl flex items-center gap-3">
                                                <AlertCircle className="h-5 w-5 text-primary" />
                                                <span className="text-sm">This is a mock timer test. Answer all questions to view completion diagnostics.</span>
                                            </div>
                                            <Button onClick={() => {
                                                setActiveTest(null);
                                                updateCompletion(Math.min(100, completionPercentage + 8));
                                                toast.success("Test submitted!");
                                            }} className="w-full pink-glow">Submit Assessment</Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Technical MCQs */}
                    {activeTab === "mcq" && (
                        <div className="max-w-3xl mx-auto space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Core Computer Science MCQ Checkpoint</CardTitle>
                                    <CardDescription>Assess your skills in DSA, Networking, and Databases.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {!testCompleted ? (
                                        <>
                                            {TECHNICAL_MCQS.map((q, idx) => (
                                                <div key={q.id} className="space-y-3">
                                                    <h4 className="font-semibold text-base">{idx + 1}. {q.question}</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {q.options.map((opt, oIdx) => (
                                                            <button
                                                                key={opt}
                                                                onClick={() => {
                                                                    const nextAnswers = [...answers];
                                                                    nextAnswers[idx] = oIdx;
                                                                    setAnswers(nextAnswers);
                                                                }}
                                                                className={`p-3 rounded-lg text-left text-sm transition-all border ${
                                                                    answers[idx] === oIdx
                                                                        ? "bg-primary/10 border-primary text-primary font-semibold"
                                                                        : "border-border hover:bg-muted"
                                                                }`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                            <Button onClick={submitQuiz} className="w-full pink-glow">Submit Answers</Button>
                                        </>
                                    ) : (
                                        <div className="text-center space-y-4 py-8">
                                            <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="h-10 w-10" />
                                            </div>
                                            <h3 className="text-2xl font-bold">Evaluation Complete</h3>
                                            <p className="text-3xl font-extrabold text-primary">Score: {score} / {TECHNICAL_MCQS.length}</p>
                                            <p className="text-sm text-muted-foreground">Progress logged. Keep practicing to hit 100% mastery!</p>
                                            <Button onClick={() => {
                                                setTestCompleted(false);
                                                setAnswers([]);
                                            }} variant="outline">
                                                <RotateCcw className="h-4 w-4 mr-2" /> Retake Quiz
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Mock Interview */}
                    {activeTab === "mock" && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <Card className="glass-card">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold">Interactive Mock Interview Simulator</CardTitle>
                                    <CardDescription>Simulate interactive behavioral panel interviews and evaluate responses instantly.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {!interviewActive ? (
                                        <div className="text-center py-10 space-y-6">
                                            <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                                                <UserCheck className="h-10 w-10" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold">AI Interview Panel Ready</h3>
                                                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                                                    You will face three scenario questions. Input your responses and receive constructive feedback mapped directly to STAR metrics.
                                                </p>
                                            </div>
                                            {feedback && (
                                                <div className="p-4 bg-muted rounded-xl border border-border text-left text-sm max-w-xl mx-auto">
                                                    <span className="font-bold text-primary block mb-1">Previous Attempt Feedback:</span>
                                                    {feedback}
                                                </div>
                                            )}
                                            <Button onClick={startInterview} className="pink-glow px-8 py-6 text-lg font-bold">
                                                Start Session
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {/* Chat log */}
                                            <div className="h-[350px] bg-muted/30 border border-border rounded-xl p-4 overflow-y-auto space-y-4">
                                                {chatHistory.map((chat, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`flex ${chat.sender === 'interviewer' ? 'justify-start' : 'justify-end'}`}
                                                    >
                                                        <div className={`max-w-[80%] rounded-xl p-3.5 text-sm shadow-sm ${
                                                            chat.sender === 'interviewer'
                                                                ? 'bg-card border border-border text-foreground'
                                                                : 'bg-primary text-primary-foreground'
                                                        }`}>
                                                            <span className="text-[10px] uppercase tracking-wider block opacity-70 mb-1">
                                                                {chat.sender === 'interviewer' ? 'Interviewer' : 'You'}
                                                            </span>
                                                            {chat.text}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Input and Controls */}
                                            <div className="flex gap-3">
                                                <Input
                                                    placeholder="Type your response here..."
                                                    value={interviewTranscript}
                                                    onChange={(e) => setInterviewTranscript(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                                                    className="flex-1"
                                                />
                                                <Button onClick={submitAnswer} className="pink-glow">
                                                    Send Response
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Resume Analyzer */}
                    {activeTab === "resume" && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">ATS Resume Scanner</CardTitle>
                                    <CardDescription>Paste your markdown or plain text resume to analyze key term densities.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-muted-foreground block">Resume Text Content</label>
                                        <textarea
                                            placeholder="Paste your resume details, highlights, skills, and projects here..."
                                            value={resumeText}
                                            onChange={(e) => setResumeText(e.target.value)}
                                            rows={8}
                                            className="w-full bg-muted/40 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={analyzing}
                                        className="w-full pink-glow"
                                    >
                                        {analyzing ? (
                                            <>
                                                <Cpu className="h-4 w-4 animate-spin mr-2" /> Scanning Keywords...
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud className="h-4 w-4 mr-2" /> Analyze Resume
                                            </>
                                        )}
                                    </Button>

                                    {analysisResult && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-6 bg-card border border-border rounded-xl space-y-4 shadow-inner"
                                        >
                                            <div className="flex items-center justify-between pb-2 border-b border-border">
                                                <span className="font-bold text-lg">ATS Optimization Score</span>
                                                <span className="text-3xl font-black text-green-500">{analysisResult.atsScore}%</span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <span className="text-xs font-semibold text-muted-foreground block uppercase">Matched Keywords</span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {analysisResult.keywordsMatched.map((kw: string) => (
                                                            <Badge key={kw} variant="secondary" className="bg-green-500/10 text-green-500 border border-green-500/20">
                                                                {kw}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <span className="text-xs font-semibold text-muted-foreground block uppercase">Recommended Additions</span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {analysisResult.missingKeywords.map((kw: string) => (
                                                            <Badge key={kw} variant="secondary" className="bg-red-500/10 text-red-500 border border-red-500/20">
                                                                {kw}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-3 bg-muted rounded-lg text-sm border-l-4 border-primary">
                                                <span className="font-bold block mb-1">Feedback Summary:</span>
                                                {analysisResult.suggestions}
                                            </div>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
