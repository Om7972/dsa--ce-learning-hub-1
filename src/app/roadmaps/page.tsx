"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Map,
    ArrowRight,
    Compass,
    Clock,
    Zap,
    TrendingUp,
    CheckCircle2,
    Calendar,
    Flame,
    BookOpen,
    Play,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Predefined roadmaps generator templates
const ROLE_TEMPLATES: Record<string, string[]> = {
    "Frontend Developer": [
        "Master HTML semantic tags & Advanced Layouts (CSS Grid, Flexbox)",
        "Deep dive into modern JS (ES6+, Promises, Async/Await)",
        "Understand React essentials (Hooks, Context, State Management)",
        "Build complex web pages using Next.js App Router",
        "Frontend performance tuning (SSR, code splitting, asset optimizations)"
    ],
    "Backend Engineer": [
        "Learn basic data structures and algorithms in Python/Go/Java",
        "Design relational databases & understand normalization (PostgreSQL)",
        "Build secure RESTful APIs with Node.js/Go",
        "Implement caching layer using Redis & basic queuing structures",
        "Deploy APIs to Cloud servers and configure basic CD pipelines"
    ],
    "Full Stack Master": [
        "Learn core frontend development tools (React, Tailwind)",
        "Build REST APIs and MVC controller paradigms",
        "Establish relational DB schemas and write complex SQL queries",
        "Implement authentication middleware using cookies and JWTs",
        "Deploy complete monorepos and manage server load diagnostics"
    ],
    "DSA & Competitive Coding": [
        "Practice core Arrays, Strings, Sorting & Binary Search algorithms",
        "Learn Linked Lists, Stacks, Queues, and implementation logic",
        "Deep dive into Trees and Graphs (BFS, DFS, Traversals)",
        "Learn Dynamic Programming & Greedy optimization paradigms",
        "Participate in timed contests on Codeforces & Leetcode"
    ],
    "GATE CS Prep": [
        "Review Theory of Computation & Compiler Design basics",
        "Understand Operating Systems (CPU Scheduling, Semaphores, Page Replacement)",
        "Study Computer Organization & Architecture schemas",
        "Solve last 10 years of GATE GATE CS past papers",
        "Practice mock tests daily to balance speed and accuracy metrics"
    ]
};

export default function RoadmapsPage() {
    const [targetRole, setTargetRole] = useState("Frontend Developer");
    const [hoursPerDay, setHoursPerDay] = useState("3-4 hours");
    const [experienceLevel, setExperienceLevel] = useState("Beginner");
    const [generatedRoadmap, setGeneratedRoadmap] = useState<string[] | null>(null);
    const [completedTasks, setCompletedTasks] = useState<number[]>([]);
    
    // Streaks & Stats
    const [streak, setStreak] = useState(5);

    useEffect(() => {
        const storedRoadmap = localStorage.getItem("generated_roadmap_tasks");
        const storedCompleted = localStorage.getItem("completed_roadmap_tasks");
        
        if (storedRoadmap) {
            setGeneratedRoadmap(JSON.parse(storedRoadmap));
        }
        if (storedCompleted) {
            setCompletedTasks(JSON.parse(storedCompleted));
        }
    }, []);

    const generateRoadmap = () => {
        const tasks = ROLE_TEMPLATES[targetRole] || ROLE_TEMPLATES["Frontend Developer"];
        // Adjust task prefixes depending on hours and experience level
        const experienceAdjustment = experienceLevel === "Beginner" ? "Learn fundamentals of: " : experienceLevel === "Intermediate" ? "Reinforce and build project on: " : "Optimize and audit scalability of: ";
        const hoursPrefix = hoursPerDay === "1-2 hours" ? "[Slow pace] " : hoursPerDay === "3-4 hours" ? "[Standard pace] " : "[Accelerated pace] ";

        const customTasks = tasks.map(task => `${hoursPrefix}${experienceAdjustment}${task}`);
        
        setGeneratedRoadmap(customTasks);
        setCompletedTasks([]);
        localStorage.setItem("generated_roadmap_tasks", JSON.stringify(customTasks));
        localStorage.setItem("completed_roadmap_tasks", JSON.stringify([]));
        
        toast.success(`Generated personalized roadmap for ${targetRole}!`);
    };

    const toggleTask = (index: number) => {
        let nextCompleted = [...completedTasks];
        if (nextCompleted.includes(index)) {
            nextCompleted = nextCompleted.filter(idx => idx !== index);
        } else {
            nextCompleted.push(index);
        }
        setCompletedTasks(nextCompleted);
        localStorage.setItem("completed_roadmap_tasks", JSON.stringify(nextCompleted));

        if (nextCompleted.length === generatedRoadmap?.length) {
            toast.success("Congratulations! You have completed the entire roadmap. Badge unlocked: Roadmap Conqueror!");
            setStreak(prev => prev + 1);
        }
    };

    const resetRoadmap = () => {
        setGeneratedRoadmap(null);
        setCompletedTasks([]);
        localStorage.removeItem("generated_roadmap_tasks");
        localStorage.removeItem("completed_roadmap_tasks");
    };

    const progressValue = generatedRoadmap && generatedRoadmap.length > 0
        ? Math.round((completedTasks.length / generatedRoadmap.length) * 100)
        : 0;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-4">
                    Career Locations & <span className="text-gradient">Roadmaps</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Generate step-by-step personalized learning roadmaps based on your target engineering role, experience, and commitment.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration form */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Compass className="h-5 w-5 text-primary" /> Roadmap Designer
                            </CardTitle>
                            <CardDescription>Customize your path below</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Role Select */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Target Role</label>
                                <select
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    className="w-full bg-muted border border-border rounded-xl p-3 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    {Object.keys(ROLE_TEMPLATES).map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Hours select */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Available Hours / Day</label>
                                <select
                                    value={hoursPerDay}
                                    onChange={(e) => setHoursPerDay(e.target.value)}
                                    className="w-full bg-muted border border-border rounded-xl p-3 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="1-2 hours">1-2 hours</option>
                                    <option value="3-4 hours">3-4 hours</option>
                                    <option value="5+ hours">5+ hours</option>
                                </select>
                            </div>

                            {/* Experience select */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase">Experience Level</label>
                                <select
                                    value={experienceLevel}
                                    onChange={(e) => setExperienceLevel(e.target.value)}
                                    className="w-full bg-muted border border-border rounded-xl p-3 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            <Button onClick={generateRoadmap} className="w-full pink-glow font-bold mt-2">
                                Generate Roadmap
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Streaks Card */}
                    <Card className="glass-card bg-gradient-to-br from-primary/10 to-orange-500/10 border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Flame className="h-5 w-5 text-orange-500 fill-orange-500" /> Active Streaks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-3xl font-black text-foreground">{streak} Days Consistent</div>
                            <span className="text-xs text-muted-foreground block">Complete at least one task everyday to preserve your streak multiplier!</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Generated roadmap display */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        {generatedRoadmap ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6"
                            >
                                <Card className="glass-card relative overflow-hidden">
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-purple-600" />
                                    <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                                <Map className="h-6 w-6 text-primary" /> {targetRole} Roadmap
                                            </CardTitle>
                                            <CardDescription className="text-sm mt-1">
                                                Customized for {experienceLevel} • {hoursPerDay} daily commitment
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={resetRoadmap}>
                                                Clear & Redesign
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm font-semibold">
                                                <span>Roadmap Completeness</span>
                                                <span className="text-primary">{progressValue}%</span>
                                            </div>
                                            <Progress value={progressValue} />
                                        </div>

                                        {/* Tasks list */}
                                        <div className="space-y-3 pt-4 border-t border-border">
                                            {generatedRoadmap.map((task, idx) => {
                                                const isCompleted = completedTasks.includes(idx);
                                                return (
                                                    <div
                                                        key={idx}
                                                        onClick={() => toggleTask(idx)}
                                                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                                                            isCompleted
                                                                ? "bg-green-500/5 border-green-500/25 text-muted-foreground"
                                                                : "bg-muted/30 border-border text-foreground hover:border-primary/30"
                                                        }`}
                                                    >
                                                        <div className="mt-0.5">
                                                            {isCompleted ? (
                                                                <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10" />
                                                            ) : (
                                                                <div className="h-5 w-5 rounded-full border border-muted-foreground/50 hover:border-primary shrink-0" />
                                                            )}
                                                        </div>
                                                        <div className="space-y-1">
                                                            <span className={`text-sm font-semibold block ${isCompleted ? 'line-through opacity-70' : ''}`}>
                                                                Milestone #{idx + 1}
                                                            </span>
                                                            <p className={`text-sm leading-relaxed ${isCompleted ? 'line-through opacity-60' : 'text-muted-foreground'}`}>
                                                                {task}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[400px] border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-muted/10"
                            >
                                <Compass className="h-16 w-16 text-muted-foreground mb-4 animate-pulse" />
                                <h3 className="text-xl font-bold mb-2">No Active Roadmap Generated</h3>
                                <p className="text-sm text-muted-foreground max-w-sm">
                                    Configure your target engineering role, available times, and experience constraints on the left pane to build a custom career checklist.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
