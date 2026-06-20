"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    MessageSquare,
    FileText,
    Award,
    Plus,
    Send,
    LogOut,
    CheckCircle,
    UserPlus,
    Clock,
    Check,
    Share2,
    BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock Data
const INITIAL_MESSAGES = [
    { sender: "Saurav_S", text: "Hey team, did anyone finish the dynamic programming assignment?", time: "10:14 AM" },
    { sender: "Priya_N", text: "Working on it right now. The knapsack problem is a bit tricky.", time: "10:15 AM" },
    { sender: "Ankit_R", text: "I wrote a shared note explaining the optimal substructure. Check it out in the Notes tab!", time: "10:16 AM" }
];

const GROUP_MEMBERS = [
    { name: "You", role: "Organizer", status: "online", xp: 1250 },
    { name: "Ankit_R", role: "Contributor", status: "online", xp: 980 },
    { name: "Priya_N", role: "Contributor", status: "online", xp: 870 },
    { name: "Saurav_S", role: "Member", status: "offline", xp: 620 }
];

const LEADERBOARDS = [
    { rank: 1, name: "Bits & Bytes Study Group", score: 8500, members: 5 },
    { rank: 2, name: "GATE Warriors 2026", score: 7900, members: 4 },
    { rank: 3, name: "Algorithms Mastery Team", score: 7450, members: 3 }
];

export default function StudyGroupsPage() {
    const [activeTab, setActiveTab] = useState("chat");
    const [chatGroup, setChatGroup] = useState<string | null>("Bits & Bytes Study Group");
    
    // Group creation/joining state
    const [groupsList, setGroupsList] = useState([
        { id: "g-1", name: "Bits & Bytes Study Group", description: "Focused on core DSA challenges", code: "BB-DSA" },
        { id: "g-2", name: "GATE Warriors 2026", description: "Preparing for GATE CS exams", code: "GATE-26" }
    ]);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDesc, setNewGroupDesc] = useState("");
    const [joinCode, setJoinCode] = useState("");

    // Message states
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [typedMsg, setTypedMsg] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Shared note state
    const [sharedNote, setSharedNote] = useState(`// Collaborative Notes on Knapsack Problem\n\n1. State Definition: dp[i][w] represents the maximum value obtained with items 1..i and capacity w.\n2. Transition Formula:\n   dp[i][w] = Math.max(dp[i-1][w], dp[i-1][w - wt[i-1]] + val[i-1])\n3. Space optimization is possible down to O(capacity) using a single 1D array.`);
    const [editingNote, setEditingNote] = useState(false);

    // Group Quiz State
    const [quizStarted, setQuizStarted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState(false);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Send Message Simulator
    const sendMessage = () => {
        if (!typedMsg.trim()) return;

        const newMsg = {
            sender: "You",
            text: typedMsg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMsg]);
        setTypedMsg("");

        // Simulated replies to make chat feel live
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    sender: "Ankit_R",
                    text: "Nice catch! I'll test that logic out on Leetcode.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        }, 1500);
    };

    // Create Group Handler
    const handleCreateGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroupName.trim() || !newGroupDesc.trim()) return;
        const newGroup = {
            id: `g-${Date.now()}`,
            name: newGroupName,
            description: newGroupDesc,
            code: `GR-${Math.floor(100 + Math.random() * 900)}`
        };
        setGroupsList([newGroup, ...groupsList]);
        setChatGroup(newGroupName);
        setNewGroupName("");
        setNewGroupDesc("");
        toast.success(`Group "${newGroup.name}" created! Share code: ${newGroup.code}`);
    };

    // Join Group Handler
    const handleJoinGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!joinCode.trim()) return;
        const group = groupsList.find(g => g.code.toUpperCase() === joinCode.toUpperCase().trim());
        if (group) {
            setChatGroup(group.name);
            setJoinCode("");
            toast.success(`Joined ${group.name}!`);
        } else {
            toast.error("Invalid invitation code!");
        }
    };

    // Shared note save
    const saveSharedNote = () => {
        setEditingNote(false);
        toast.success("Shared notes updated in database repository!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                        Collaborative Study Groups
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Engage in real-time chat, collaborate on markdown notes, and solve team challenges.
                    </p>
                </div>

                {chatGroup && (
                    <div className="mt-4 md:mt-0 flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-2xl shadow-sm">
                        <Users className="h-6 w-6 text-purple-500 animate-pulse" />
                        <div>
                            <span className="text-xs text-muted-foreground font-semibold block uppercase">Active Group</span>
                            <span className="text-sm font-bold text-foreground">{chatGroup}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Hub Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-muted/30 p-1.5 rounded-xl border border-border max-w-fit">
                {[
                    { id: "chat", label: "Group Chat", icon: MessageSquare },
                    { id: "notes", label: "Shared Notes", icon: FileText },
                    { id: "quiz", label: "Group Quiz", icon: BookOpen },
                    { id: "leaderboard", label: "Group Leaderboard", icon: Award }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            disabled={!chatGroup && tab.id !== "leaderboard"}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Workspace */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Chat Interface */}
                            {activeTab === "chat" && chatGroup && (
                                <Card className="glass-card flex flex-col h-[520px]">
                                    <CardHeader className="border-b border-border pb-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle className="text-xl font-bold">{chatGroup}</CardTitle>
                                                <CardDescription>Live real-time messaging workspace</CardDescription>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => setChatGroup(null)}>
                                                <LogOut className="h-5 w-5 text-muted-foreground hover:text-red-500" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                                        {messages.map((msg, idx) => (
                                            <div key={idx} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                                                <div className={`max-w-[70%] rounded-xl p-3.5 text-sm shadow-sm ${
                                                    msg.sender === "You"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted border border-border text-foreground"
                                                }`}>
                                                    <span className="text-[10px] uppercase tracking-wider font-bold block opacity-70 mb-1">
                                                        {msg.sender}
                                                    </span>
                                                    {msg.text}
                                                    <span className="text-[9px] block text-right opacity-60 mt-1">{msg.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </CardContent>
                                    <div className="p-4 border-t border-border bg-muted/20 flex gap-2">
                                        <Input
                                            placeholder="Write to your group members..."
                                            value={typedMsg}
                                            onChange={(e) => setTypedMsg(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                            className="flex-1"
                                        />
                                        <Button onClick={sendMessage} className="pink-glow">
                                            <Send className="h-4.5 w-4.5" />
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            {/* Shared Notes collaborative */}
                            {activeTab === "notes" && chatGroup && (
                                <Card className="glass-card">
                                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                                        <div>
                                            <CardTitle className="text-xl font-bold">Collaborative Notes</CardTitle>
                                            <CardDescription>Live synchronized document sharing</CardDescription>
                                        </div>
                                        <Button onClick={() => editingNote ? saveSharedNote() : setEditingNote(true)} variant={editingNote ? "default" : "outline"} className={editingNote ? "pink-glow" : ""}>
                                            {editingNote ? "Save Notes" : "Edit Notes"}
                                        </Button>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {editingNote ? (
                                            <textarea
                                                value={sharedNote}
                                                onChange={(e) => setSharedNote(e.target.value)}
                                                rows={12}
                                                className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-4 rounded-xl border border-border focus:outline-none resize-none focus:ring-1 focus:ring-primary"
                                            />
                                        ) : (
                                            <pre className="bg-muted p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed border border-border">
                                                {sharedNote}
                                            </pre>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Group Quiz */}
                            {activeTab === "quiz" && chatGroup && (
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">Collaborative Quiz Session</CardTitle>
                                        <CardDescription>Assemble your team to solve high-yield timed MCQs</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {!quizStarted ? (
                                            <div className="text-center py-8 space-y-4">
                                                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                                                    <Clock className="h-8 w-8" />
                                                </div>
                                                <h3 className="text-lg font-bold">Collaborative Assessment Ready</h3>
                                                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                                                    Start the session to test your team's coordination on a series of questions.
                                                </p>
                                                <Button onClick={() => {
                                                    setQuizStarted(true);
                                                    setQuizResult(false);
                                                    setSelectedAnswer(null);
                                                }} className="pink-glow">
                                                    Launch Group Quiz
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-muted rounded-xl border border-border">
                                                    <h4 className="font-bold text-sm block mb-2">Question:</h4>
                                                    <p className="text-base font-semibold">Which of the following sorting algorithms is stable and runs in O(n log n) worst-case time?</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"].map((opt, idx) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => setSelectedAnswer(idx)}
                                                            className={`p-3 rounded-lg text-left text-sm border transition-all ${
                                                                selectedAnswer === idx
                                                                    ? "bg-primary/10 border-primary text-primary font-bold"
                                                                    : "border-border hover:bg-muted"
                                                            }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                                <Button onClick={() => {
                                                    setQuizResult(true);
                                                    toast.success("Team score uploaded to Leaderboard!");
                                                }} disabled={selectedAnswer === null} className="w-full pink-glow mt-4">
                                                    Submit Group Answer
                                                </Button>
                                                {quizResult && (
                                                    <div className="p-4 bg-green-500/10 border border-green-500/25 rounded-xl text-center">
                                                        <span className="font-bold text-green-500 block mb-1">Correct Answer!</span>
                                                        <p className="text-xs text-muted-foreground">Merge Sort is both stable and has a guaranteed O(n log n) upper bound. Your group gained +20 Points!</p>
                                                        <Button onClick={() => setQuizStarted(false)} className="mt-4" variant="outline">Back to lobby</Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Group Leaderboards */}
                            {activeTab === "leaderboard" && (
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                                            <Award className="h-5 w-5 text-amber-500" /> Study Group Standings
                                        </CardTitle>
                                        <CardDescription>Global group scores updated hourly.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-border">
                                            {LEADERBOARDS.map((group) => (
                                                <div key={group.name} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-primary">#{group.rank}</span>
                                                        <div>
                                                            <span className="font-bold text-sm block">{group.name}</span>
                                                            <span className="text-xs text-muted-foreground">{group.members} active members</span>
                                                        </div>
                                                    </div>
                                                    <span className="font-extrabold text-sm">{group.score} Points</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Join / Create Lobby if no group selected */}
                    {!chatGroup && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Create Group */}
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Create New Study Group</CardTitle>
                                    <CardDescription>Setup a private workspace for your friends</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleCreateGroup} className="space-y-4">
                                        <Input
                                            placeholder="Group Name (e.g. Algo-Warriors)..."
                                            value={newGroupName}
                                            onChange={(e) => setNewGroupName(e.target.value)}
                                        />
                                        <Input
                                            placeholder="Brief description..."
                                            value={newGroupDesc}
                                            onChange={(e) => setNewGroupDesc(e.target.value)}
                                        />
                                        <Button type="submit" className="w-full pink-glow">Create Group</Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Join Group */}
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Join Existing Group</CardTitle>
                                    <CardDescription>Enter invitation invite code to join workspace</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleJoinGroup} className="space-y-4">
                                        <Input
                                            placeholder="Invite Code (e.g. BB-DSA)..."
                                            value={joinCode}
                                            onChange={(e) => setJoinCode(e.target.value)}
                                        />
                                        <Button type="submit" className="w-full">Join Workspace</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Sidebar details */}
                <div className="space-y-6">
                    {chatGroup && (
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="text-base font-bold">Group Members</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border">
                                    {GROUP_MEMBERS.map((m) => (
                                        <div key={m.name} className="flex items-center justify-between p-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-2.5 w-2.5 rounded-full ${m.status === 'online' ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
                                                <div>
                                                    <span className="font-bold block">{m.name}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase">{m.role}</span>
                                                </div>
                                            </div>
                                            <span className="font-mono text-xs">{m.xp} XP</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="glass-card bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Share2 className="h-5 w-5 text-primary" /> Share & Study
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <span className="text-xs text-muted-foreground block">
                                Group study environments increase success margins by 42% through interactive explanation cycles and accountability tracking.
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
