"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy,
    Flame,
    Clock,
    Zap,
    Users,
    ChevronRight,
    Star,
    Award,
    Terminal,
    Play,
    CheckCircle,
    User,
    Skull,
    History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock Data
const INITIAL_LEADERBOARD = [
    { rank: 1, name: "Alexander_CP", score: 2450, solved: 154, lang: "C++", avatar: "A" },
    { rank: 2, name: "NeetCoder_101", score: 2310, solved: 142, lang: "Python", avatar: "N" },
    { rank: 3, name: "RustEnthusiast", score: 2280, solved: 139, lang: "Rust", avatar: "R" },
    { rank: 4, name: "Byte_Surfer", score: 2150, solved: 125, lang: "Java", avatar: "B" },
    { rank: 5, name: "Go_Phan", score: 1980, solved: 110, lang: "Go", avatar: "G" }
];

const WEEKLY_CONTESTS = [
    { id: "wc-42", title: "Algorithmic Showdown #42", start: "In 2 hours", duration: "90 mins", prize: "500 XP", enrolled: 245 },
    { id: "wc-43", title: "Math & Logic Blitz #43", start: "June 24, 18:00", duration: "60 mins", prize: "400 XP", enrolled: 180 }
];

const HALL_OF_FAME = [
    { season: "Season 10", winner: "Alexander_CP", points: 8400, badge: "Grandmaster" },
    { season: "Season 9", winner: "NeetCoder_101", points: 7900, badge: "Master" },
    { season: "Season 8", winner: "Bug_Squasher", points: 7600, badge: "Master" }
];

export default function ContestArenaPage() {
    const [activeTab, setActiveTab] = useState("challenge");
    
    // Leaderboard state & simulator
    const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);

    // Timed challenge state
    const [challengeTimeLeft, setChallengeTimeLeft] = useState(2700); // 45 mins
    const [userCode, setUserCode] = useState(`// Implement your dynamic programming solution here\nfunction solve(n, coins) {\n  const dp = new Array(n + 1).fill(Infinity);\n  dp[0] = 0;\n  \n  // Write optimization logic...\n  return dp[n] === Infinity ? -1 : dp[n];\n}`);
    const [submissionLogs, setSubmissionLogs] = useState<{ time: string, status: string, msg: string }[]>([]);
    const [isCompiling, setIsCompiling] = useState(false);
    const [challengeSubmitted, setChallengeSubmitted] = useState(false);

    // Simulated real-time leaderboard update
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly update someone's score to simulate active competitive coding
            setLeaderboard(prev => {
                const updated = [...prev];
                const randIndex = Math.floor(Math.random() * updated.length);
                const scoreAdd = Math.floor(Math.random() * 20) + 5;
                updated[randIndex] = {
                    ...updated[randIndex],
                    score: updated[randIndex].score + scoreAdd,
                    solved: updated[randIndex].solved + (Math.random() > 0.7 ? 1 : 0)
                };
                // Re-sort
                return updated.sort((a, b) => b.score - a.score).map((item, idx) => ({ ...item, rank: idx + 1 }));
            });
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    // Countdown timer for challenge
    useEffect(() => {
        const timer = setInterval(() => {
            setChallengeTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleRunCode = () => {
        setIsCompiling(true);
        setTimeout(() => {
            setIsCompiling(false);
            toast.success("All test cases passed! Sample inputs output diagnostic match: 100%");
        }, 1500);
    };

    const handleSubmitCode = () => {
        setIsCompiling(true);
        setTimeout(() => {
            setIsCompiling(false);
            setChallengeSubmitted(true);
            setSubmissionLogs(prev => [
                { time: new Date().toLocaleTimeString(), status: "AC", msg: "Passed 14/14 test cases." },
                ...prev
            ]);
            // Add user to leaderboard mockup
            setLeaderboard(prev => {
                const userExists = prev.some(item => item.name === "You");
                if (userExists) {
                    return prev.map(item => item.name === "You" ? { ...item, score: item.score + 100, solved: item.solved + 1 } : item)
                        .sort((a, b) => b.score - a.score)
                        .map((item, idx) => ({ ...item, rank: idx + 1 }));
                } else {
                    return [...prev, { rank: 6, name: "You", score: 1250 + 100, solved: 6, lang: "JavaScript", avatar: "Y" }]
                        .sort((a, b) => b.score - a.score)
                        .map((item, idx) => ({ ...item, rank: idx + 1 }));
                }
            });
            toast.success("Daily Challenge solved! +100 Points");
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-2">
                        Contest Arena
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Test your algorithmic reflexes in daily, weekly, and live competitive time constraints.
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-2xl shadow-sm">
                    <Zap className="h-6 w-6 text-amber-500 fill-amber-500 animate-pulse" />
                    <div>
                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Active CP Rank</span>
                        <span className="text-xl font-bold text-foreground">Candidate Master</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-muted/30 p-1.5 rounded-xl border border-border max-w-fit">
                {[
                    { id: "challenge", label: "Daily Challenge", icon: Flame },
                    { id: "weekly", label: "Weekly Contests", icon: Trophy },
                    { id: "leaderboard", label: "Live Leaderboard", icon: Users },
                    { id: "fame", label: "Hall of Fame", icon: Award }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main section */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Daily Challenge */}
                            {activeTab === "challenge" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                                            <div>
                                                <Badge variant="destructive" className="mb-2">Hard</Badge>
                                                <CardTitle className="text-2xl font-bold">144. Min Cost to Cut a Stick</CardTitle>
                                                <CardDescription className="mt-1">Dynamic Programming, Memoization</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2 bg-muted/60 p-2.5 rounded-xl border border-border">
                                                <Clock className="h-4 w-4 text-primary" />
                                                <span className="font-mono text-sm font-bold text-primary">{formatTime(challengeTimeLeft)}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-4">
                                            <div className="text-sm space-y-3 text-muted-foreground">
                                                <p>
                                                    Given a wooden stick of length <code>n</code> units. The stick is labelled from <code>0</code> to <code>n</code>.
                                                </p>
                                                <p>
                                                    Given an integer array <code>cuts</code> where <code>cuts[i]</code> denotes a position you should perform a cut at. You should perform the cuts in order, you can change the order of the cuts as you wish.
                                                </p>
                                                <p>
                                                    The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks.
                                                </p>
                                            </div>

                                            {/* Code Editor */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between bg-muted/80 p-2.5 rounded-t-lg border-t border-x border-border">
                                                    <span className="text-xs font-mono font-bold flex items-center gap-1.5">
                                                        <Terminal className="h-3.5 w-3.5" /> main.js (JavaScript)
                                                    </span>
                                                </div>
                                                <textarea
                                                    value={userCode}
                                                    onChange={(e) => setUserCode(e.target.value)}
                                                    rows={10}
                                                    className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-4 rounded-b-lg border-x border-b border-border focus:outline-none resize-none focus:ring-1 focus:ring-primary"
                                                />
                                            </div>

                                            <div className="flex gap-4">
                                                <Button
                                                    variant="outline"
                                                    onClick={handleRunCode}
                                                    disabled={isCompiling}
                                                    className="flex-1"
                                                >
                                                    Run Sample Tests
                                                </Button>
                                                <Button
                                                    onClick={handleSubmitCode}
                                                    disabled={isCompiling || challengeSubmitted}
                                                    className="flex-1 pink-glow font-bold"
                                                >
                                                    {challengeSubmitted ? "Challenge Solved ✓" : "Submit Code"}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Submissions log */}
                                    {submissionLogs.length > 0 && (
                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                                    <History className="h-4 w-4" /> Run diagnostics
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2">
                                                {submissionLogs.map((log, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm border border-border">
                                                        <span className="font-mono text-muted-foreground">{log.time}</span>
                                                        <Badge className="bg-green-500/10 text-green-500 border border-green-500/20">{log.status}</Badge>
                                                        <span className="font-semibold">{log.msg}</span>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            )}

                            {/* Weekly Contests */}
                            {activeTab === "weekly" && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold">Upcoming Contests</h3>
                                    <div className="grid gap-6">
                                        {WEEKLY_CONTESTS.map((contest) => (
                                            <Card key={contest.id} className="glass-card hover:border-primary/30 transition-colors">
                                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                    <div>
                                                        <CardTitle className="text-lg font-bold">{contest.title}</CardTitle>
                                                        <CardDescription>Starts {contest.start}</CardDescription>
                                                    </div>
                                                    <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                        {contest.prize}
                                                    </Badge>
                                                </CardHeader>
                                                <CardContent className="flex items-center justify-between pt-4 border-t border-border mt-4">
                                                    <div className="flex gap-6 text-sm text-muted-foreground">
                                                        <span>Duration: <strong className="text-foreground">{contest.duration}</strong></span>
                                                        <span>Enrolled: <strong className="text-foreground">{contest.enrolled} developers</strong></span>
                                                    </div>
                                                    <Button onClick={() => toast.success("Successfully registered for contest!")} className="pink-glow">
                                                        Register Now
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Live Leaderboard */}
                            {activeTab === "leaderboard" && (
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                            <Trophy className="h-5 w-5 text-amber-500" /> Active Arena Rankings
                                        </CardTitle>
                                        <CardDescription>Updates automatically in real-time as users submit solutions.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-border">
                                            {leaderboard.map((item) => (
                                                <div key={item.name} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <span className={`w-6 text-center font-bold text-sm ${
                                                            item.rank === 1 ? 'text-amber-500' : item.rank === 2 ? 'text-slate-400' : item.rank === 3 ? 'text-amber-700' : 'text-muted-foreground'
                                                        }`}>
                                                            #{item.rank}
                                                        </span>
                                                        <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                                            {item.avatar}
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-sm block">{item.name}</span>
                                                            <span className="text-xs text-muted-foreground">{item.lang}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-right">
                                                            <span className="text-xs text-muted-foreground block">Solved</span>
                                                            <span className="font-bold text-sm">{item.solved}</span>
                                                        </div>
                                                        <div className="text-right min-w-[70px]">
                                                            <span className="text-xs text-muted-foreground block">Rating Points</span>
                                                            <span className="font-bold text-sm text-primary">{item.score}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Hall of Fame */}
                            {activeTab === "fame" && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {HALL_OF_FAME.map((f, idx) => (
                                        <Card key={f.season} className="glass-card text-center relative overflow-hidden group">
                                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
                                            <CardHeader className="pt-6">
                                                <Badge className="mx-auto mb-2 bg-amber-500/10 text-amber-500 border border-amber-500/20">{f.season}</Badge>
                                                <CardTitle className="text-lg font-bold">{f.winner}</CardTitle>
                                                <CardDescription className="text-xs">{f.badge}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="pb-6">
                                                <div className="h-12 w-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <Award className="h-6 w-6" />
                                                </div>
                                                <span className="text-xs text-muted-foreground block">Winning score</span>
                                                <span className="text-xl font-bold text-primary">{f.points} XP</span>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Sidebar statistics */}
                <div className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Your Performance Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between border-b pb-2 text-sm">
                                <span className="text-muted-foreground">Global Rank</span>
                                <span className="font-bold text-foreground">#184</span>
                            </div>
                            <div className="flex justify-between border-b pb-2 text-sm">
                                <span className="text-muted-foreground">Total XP Earned</span>
                                <span className="font-bold text-foreground">1,250 XP</span>
                            </div>
                            <div className="flex justify-between border-b pb-2 text-sm">
                                <span className="text-muted-foreground">Daily Challenges Solved</span>
                                <span className="font-bold text-foreground">23</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Accuracy Metric</span>
                                <span className="font-bold text-foreground">84.5%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Zap className="h-5 w-5 text-amber-500 fill-amber-500" /> Active Coding Streak
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-black text-foreground">7 Days</span>
                                <Flame className="h-8 w-8 text-orange-500 fill-orange-500" />
                            </div>
                            <Progress value={70} className="h-1.5" />
                            <span className="text-xs text-muted-foreground block">Keep solving challenges daily to unlock the "Master Coder" achievement badge.</span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
