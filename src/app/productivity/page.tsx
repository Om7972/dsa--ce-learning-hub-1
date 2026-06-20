"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock,
    CheckSquare,
    Flame,
    BarChart,
    Play,
    Pause,
    RotateCcw,
    Plus,
    Trash2,
    Calendar,
    Sparkles,
    Zap,
    Check,
    Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock Data
const INITIAL_HABITS = [
    { id: 1, name: "Solve 2 Leetcode Problems", streak: 12, completedToday: true },
    { id: 2, name: "Revise Computer Networks Notes", streak: 5, completedToday: false },
    { id: 3, name: "Read 1 System Design Blog", streak: 3, completedToday: false }
];

const INITIAL_GOALS = [
    { id: 1, text: "Finish Dynamic Programming video course module", completed: false },
    { id: 2, text: "Configure Supabase local database configurations", completed: true },
    { id: 3, text: "Complete mock resume audit profile", completed: false }
];

export default function ProductivityHubPage() {
    // Pomodoro Timer States
    const [timeLeft, setTimeLeft] = useState(1500); // 25 mins
    const [timerActive, setTimerActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Habits States
    const [habits, setHabits] = useState(INITIAL_HABITS);
    const [newHabitName, setNewHabitName] = useState("");

    // Goals States
    const [goals, setGoals] = useState(INITIAL_GOALS);
    const [newGoalText, setNewGoalText] = useState("");

    // Focus Session Logs States
    const [focusLogs, setFocusLogs] = useState<{ id: number, date: string, duration: string }[]>([]);

    useEffect(() => {
        const storedHabits = localStorage.getItem("productivity_habits");
        const storedGoals = localStorage.getItem("productivity_goals");
        const storedLogs = localStorage.getItem("productivity_focus_logs");

        if (storedHabits) setHabits(JSON.parse(storedHabits));
        if (storedGoals) setGoals(JSON.parse(storedGoals));
        if (storedLogs) setFocusLogs(JSON.parse(storedLogs));
    }, []);

    const saveHabits = (updated: any) => {
        setHabits(updated);
        localStorage.setItem("productivity_habits", JSON.stringify(updated));
    };

    const saveGoals = (updated: any) => {
        setGoals(updated);
        localStorage.setItem("productivity_goals", JSON.stringify(updated));
    };

    const saveLogs = (updated: any) => {
        setFocusLogs(updated);
        localStorage.setItem("productivity_focus_logs", JSON.stringify(updated));
    };

    // Pomodoro Timer Logic
    useEffect(() => {
        if (timerActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setTimerActive(false);
                        handleTimerComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timerActive, isBreak]);

    const handleTimerComplete = () => {
        if (!isBreak) {
            toast.success("Focus Session Complete! Take a 5-minute break.");
            setPomodoroCount(prev => prev + 1);
            setIsBreak(true);
            setTimeLeft(300); // 5 mins break
            // Log focus session
            const newLog = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                duration: "25 minutes"
            };
            saveLogs([newLog, ...focusLogs]);
        } else {
            toast.success("Break Finished! Get back to focus.");
            setIsBreak(false);
            setTimeLeft(1500); // 25 mins study
        }
    };

    const toggleTimer = () => setTimerActive(!timerActive);

    const resetTimer = () => {
        setTimerActive(false);
        setIsBreak(false);
        setTimeLeft(1500);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // Goals CRUD
    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoalText.trim()) return;
        const newGoal = {
            id: Date.now(),
            text: newGoalText.trim(),
            completed: false
        };
        const updated = [...goals, newGoal];
        saveGoals(updated);
        setNewGoalText("");
        toast.success("Goal added!");
    };

    const toggleGoal = (id: number) => {
        const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
        saveGoals(updated);
    };

    const deleteGoal = (id: number) => {
        const updated = goals.filter(g => g.id !== id);
        saveGoals(updated);
        toast.info("Goal removed");
    };

    // Habits CRUD
    const handleAddHabit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newHabitName.trim()) return;
        const newHabit = {
            id: Date.now(),
            name: newHabitName.trim(),
            streak: 0,
            completedToday: false
        };
        const updated = [...habits, newHabit];
        saveHabits(updated);
        setNewHabitName("");
        toast.success("Habit tracked!");
    };

    const toggleHabit = (id: number) => {
        const updated = habits.map(h => {
            if (h.id === id) {
                const completed = !h.completedToday;
                return {
                    ...h,
                    completedToday: completed,
                    streak: completed ? h.streak + 1 : Math.max(0, h.streak - 1)
                };
            }
            return h;
        });
        saveHabits(updated);
        toast.success("Habit status updated!");
    };

    const deleteHabit = (id: number) => {
        const updated = habits.filter(h => h.id !== id);
        saveHabits(updated);
        toast.info("Habit removed");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-orange-400 via-amber-500 to-rose-500 bg-clip-text text-transparent mb-2">
                        Productivity Hub
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Optimize study cycles with Pomodoro timers, habit streaks, and goal organizers.
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-2xl shadow-sm">
                    <Clock className="h-6 w-6 text-amber-500 animate-pulse" />
                    <div>
                        <span className="text-xs text-muted-foreground font-semibold block uppercase font-mono">Today's Focus Time</span>
                        <span className="text-lg font-bold text-foreground">{pomodoroCount * 25} minutes</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timer & Focus stats */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Pomodoro Card */}
                    <Card className="glass-card text-center relative overflow-hidden">
                        <div className={`absolute top-0 inset-x-0 h-1 ${isBreak ? 'bg-green-500' : 'bg-primary'}`} />
                        <CardHeader>
                            <Badge className="mx-auto mb-2" variant={isBreak ? "secondary" : "destructive"}>
                                {isBreak ? <Coffee className="h-3.5 w-3.5 mr-1" /> : <Clock className="h-3.5 w-3.5 mr-1" />}
                                {isBreak ? "Break Interval" : "Study Focus Mode"}
                            </Badge>
                            <CardTitle className="text-5xl font-black font-mono tracking-tight my-4">
                                {formatTime(timeLeft)}
                            </CardTitle>
                            <CardDescription>
                                {isBreak ? "Take a rest before your next sprint" : "Deep work sprint block"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pb-6">
                            <div className="flex gap-4 justify-center">
                                <Button onClick={toggleTimer} className="pink-glow font-bold px-6">
                                    {timerActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                                    {timerActive ? "Pause" : "Start Focus"}
                                </Button>
                                <Button onClick={resetTimer} variant="outline" size="icon">
                                    <RotateCcw className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <BarChart className="h-5 w-5 text-primary" /> Session History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {focusLogs.length === 0 ? (
                                <div className="p-8 text-center text-xs text-muted-foreground">
                                    No logged sessions yet today. Keep working!
                                </div>
                            ) : (
                                <div className="divide-y divide-border">
                                    {focusLogs.map((log) => (
                                        <div key={log.id} className="flex justify-between items-center p-4 text-xs font-semibold">
                                            <span className="text-muted-foreground">{log.date}</span>
                                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{log.duration}</Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Goals & Habits lists */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Goals Checklist */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <CheckSquare className="h-5 w-5 text-primary" /> Daily Goal Tracker
                            </CardTitle>
                            <CardDescription>Jot down your study tasks to build daily streaks</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={handleAddGoal} className="flex gap-3">
                                <Input
                                    placeholder="Add a focus objective..."
                                    value={newGoalText}
                                    onChange={(e) => setNewGoalText(e.target.value)}
                                    className="flex-1 text-sm"
                                />
                                <Button type="submit" className="pink-glow">
                                    <Plus className="h-4.5 w-4.5" />
                                </Button>
                            </form>

                            <div className="space-y-2 pt-2 border-t border-border">
                                {goals.map((g) => (
                                    <div
                                        key={g.id}
                                        className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                                            g.completed
                                                ? "bg-green-500/5 border-green-500/20 text-muted-foreground"
                                                : "bg-muted/30 border-border text-foreground"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleGoal(g.id)}>
                                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                                                g.completed ? "bg-green-500 border-green-600 text-white" : "border-muted-foreground/40"
                                            }`}>
                                                {g.completed && <Check className="h-3 w-3" />}
                                            </div>
                                            <span className={`text-sm ${g.completed ? 'line-through opacity-70' : ''}`}>{g.text}</span>
                                        </div>
                                        <button onClick={() => deleteGoal(g.id)} className="text-muted-foreground hover:text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Habit Tracker */}
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Flame className="h-5 w-5 text-orange-500 fill-orange-500" /> Habit Multipliers
                            </CardTitle>
                            <CardDescription>Build consistent routines and unlock XP rewards</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={handleAddHabit} className="flex gap-3">
                                <Input
                                    placeholder="Name a habit (e.g. Code 1 hour)..."
                                    value={newHabitName}
                                    onChange={(e) => setNewHabitName(e.target.value)}
                                    className="flex-1 text-sm"
                                />
                                <Button type="submit" className="pink-glow">
                                    <Plus className="h-4.5 w-4.5" />
                                </Button>
                            </form>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
                                {habits.map((h) => (
                                    <div
                                        key={h.id}
                                        className="flex items-center justify-between p-4 bg-muted/20 border border-border rounded-xl hover:border-primary/20 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleHabit(h.id)}
                                                className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs border ${
                                                    h.completedToday
                                                        ? "bg-orange-500 border-orange-600 text-white fill-white shadow-md"
                                                        : "border-border text-muted-foreground hover:border-orange-400"
                                                }`}
                                            >
                                                <Flame className="h-4.5 w-4.5" />
                                            </button>
                                            <div>
                                                <span className="font-bold text-sm block">{h.name}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{h.streak} day streak</span>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteHabit(h.id)} className="text-muted-foreground hover:text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
