"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    BookOpen,
    Bookmark,
    Calendar,
    CheckCircle,
    Plus,
    FileText,
    ArrowRight,
    Star,
    Sparkles,
    Trash2,
    CalendarDays,
    AlertCircle,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock Data
const INITIAL_FLASHCARDS = [
    { id: 1, front: "What is the worst-case time complexity of Quick Sort, and when does it occur?", back: "O(n²). It occurs when the pivot chosen is consistently the smallest or largest element (e.g., when the array is already sorted and the first or last element is chosen as the pivot).", difficulty: "Medium", subject: "Algorithms" },
    { id: 2, front: "Explain the difference between TCP and UDP protocols.", back: "TCP is connection-oriented, reliable, and guarantees in-order packet delivery using acknowledgments and retransmissions. UDP is connectionless, lightweight, unreliable, and does not guarantee packet order, making it faster and ideal for video streaming/gaming.", difficulty: "Hard", subject: "Computer Networks" },
    { id: 3, front: "What is a transaction deadlock in Database Management Systems (DBMS)?", back: "A state where two or more transactions are unable to proceed because each is waiting for a lock held by another transaction, creating a circular dependency cycle.", difficulty: "Easy", subject: "DBMS" }
];

const INITIAL_SCHEDULE = [
    { id: "s-1", topic: "B-Trees & B+ Trees Indexing", time: "10:00 AM", date: "Today", difficulty: "Hard" },
    { id: "s-2", topic: "Process Synchronization & Semaphores", time: "02:00 PM", date: "Today", difficulty: "Medium" },
    { id: "s-3", topic: "Dijkstra's Shortest Path Algorithm", time: "05:00 PM", date: "Tomorrow", difficulty: "Hard" }
];

export default function SmartRevisionPage() {
    const [activeTab, setActiveTab] = useState("flashcards");
    
    // Flashcard States
    const [flashcards, setFlashcards] = useState(INITIAL_FLASHCARDS);
    const [currentCardIdx, setCurrentCardIdx] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [newFront, setNewFront] = useState("");
    const [newBack, setNewBack] = useState("");
    const [newSubject, setNewSubject] = useState("Algorithms");

    // Notes States
    const [notes, setNotes] = useState<{ id: number, title: string, text: string, date: string }[]>([]);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");

    // Bookmarks state
    const [bookmarks, setBookmarks] = useState<string[]>(["Red-Black Trees", "Sliding Window Pattern", "IP Addressing & Subnetting"]);
    const [newBookmark, setNewBookmark] = useState("");

    // Schedule state
    const [schedules, setSchedules] = useState(INITIAL_SCHEDULE);
    const [newTopic, setNewTopic] = useState("");
    const [newTime, setNewTime] = useState("");

    // Load custom notes and bookmarks from localstorage on mount
    useEffect(() => {
        const storedNotes = localStorage.getItem("revision_notes");
        if (storedNotes) setNotes(JSON.parse(storedNotes));

        const storedBookmarks = localStorage.getItem("revision_bookmarks");
        if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));

        const storedSchedules = localStorage.getItem("revision_schedule");
        if (storedSchedules) setSchedules(JSON.parse(storedSchedules));
    }, []);

    const saveNotes = (updated: any) => {
        setNotes(updated);
        localStorage.setItem("revision_notes", JSON.stringify(updated));
    };

    const saveBookmarks = (updated: any) => {
        setBookmarks(updated);
        localStorage.setItem("revision_bookmarks", JSON.stringify(updated));
    };

    const saveSchedules = (updated: any) => {
        setSchedules(updated);
        localStorage.setItem("revision_schedule", JSON.stringify(updated));
    };

    // Spaced repetition response handler
    const handleRating = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
        let text = "";
        if (difficulty === 'Easy') text = "Rescheduled in 7 days (Spaced Repetition Mode)";
        else if (difficulty === 'Medium') text = "Rescheduled in 3 days (Spaced Repetition Mode)";
        else text = "Rescheduled for tomorrow (Spaced Repetition Mode)";

        toast.success(`Card rated ${difficulty}. ${text}`);
        setShowAnswer(false);
        if (currentCardIdx < flashcards.length - 1) {
            setCurrentCardIdx(currentCardIdx + 1);
        } else {
            setCurrentCardIdx(0);
            toast.info("Completed all flashcards in current session queue!");
        }
    };

    // Create Flashcard
    const handleAddFlashcard = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFront.trim() || !newBack.trim()) return;
        const newCard = {
            id: Date.now(),
            front: newFront,
            back: newBack,
            difficulty: "Medium",
            subject: newSubject
        };
        setFlashcards([newCard, ...flashcards]);
        setNewFront("");
        setNewBack("");
        toast.success("New Flashcard added!");
    };

    // Create Note
    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!noteTitle.trim() || !noteText.trim()) return;
        const newNote = {
            id: Date.now(),
            title: noteTitle,
            text: noteText,
            date: new Date().toLocaleDateString()
        };
        const updated = [newNote, ...notes];
        saveNotes(updated);
        setNoteTitle("");
        setNoteText("");
        toast.success("Quick Note saved!");
    };

    // Add Schedule
    const handleAddSchedule = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTopic.trim() || !newTime.trim()) return;
        const newSched = {
            id: `s-${Date.now()}`,
            topic: newTopic,
            time: newTime,
            date: "Today",
            difficulty: "Medium"
        };
        const updated = [...schedules, newSched];
        saveSchedules(updated);
        setNewTopic("");
        setNewTime("");
        toast.success("Topic added to Revision planner!");
    };

    // Add Bookmark
    const handleAddBookmark = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBookmark.trim()) return;
        if (bookmarks.includes(newBookmark.trim())) {
            toast.error("Topic already bookmarked!");
            return;
        }
        const updated = [...bookmarks, newBookmark.trim()];
        saveBookmarks(updated);
        setNewBookmark("");
        toast.success("Topic bookmarked!");
    };

    // Delete handlers
    const deleteNote = (id: number) => {
        const updated = notes.filter(n => n.id !== id);
        saveNotes(updated);
        toast.info("Note removed");
    };

    const deleteBookmark = (item: string) => {
        const updated = bookmarks.filter(b => b !== item);
        saveBookmarks(updated);
        toast.info("Bookmark removed");
    };

    const deleteSchedule = (id: string) => {
        const updated = schedules.filter(s => s.id !== id);
        saveSchedules(updated);
        toast.info("Schedule item completed");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-border">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-teal-400 via-emerald-500 to-sky-500 bg-clip-text text-transparent mb-2">
                        Revision Hub
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Organize concepts using interactive flashcards, quick journals, and spaced repetition.
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-2xl shadow-sm">
                    <Brain className="h-6 w-6 text-emerald-500 animate-pulse" />
                    <div>
                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Due for Revision</span>
                        <span className="text-xl font-bold text-foreground">{schedules.length} Concepts Today</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-muted/30 p-1.5 rounded-xl border border-border max-w-fit">
                {[
                    { id: "flashcards", label: "Spaced Flashcards", icon: Brain },
                    { id: "planner", label: "Revision Schedule", icon: Calendar },
                    { id: "notes", label: "Quick Notes", icon: FileText },
                    { id: "bookmarks", label: "Bookmarks Tracker", icon: Bookmark }
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
                {/* Main Action Area */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Flashcards */}
                            {activeTab === "flashcards" && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold">Active Flashcard Deck</h3>
                                        <Badge variant="outline">{flashcards[currentCardIdx]?.subject}</Badge>
                                    </div>

                                    {/* Flashcard Simulator */}
                                    <div
                                        onClick={() => setShowAnswer(!showAnswer)}
                                        className="h-[280px] w-full bg-slate-900 border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-lg relative overflow-hidden"
                                    >
                                        <div className="absolute top-4 left-4 text-xs font-mono text-primary font-bold">
                                            Card {currentCardIdx + 1} of {flashcards.length}
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Badge className={`${
                                                flashcards[currentCardIdx]?.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                flashcards[currentCardIdx]?.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                                'bg-green-500/10 text-green-500 border border-green-500/20'
                                            }`}>
                                                {flashcards[currentCardIdx]?.difficulty}
                                            </Badge>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {!showAnswer ? (
                                                <motion.div
                                                    key="front"
                                                    initial={{ opacity: 0, rotateY: 90 }}
                                                    animate={{ opacity: 1, rotateY: 0 }}
                                                    exit={{ opacity: 0, rotateY: -90 }}
                                                    className="space-y-4"
                                                >
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Question</span>
                                                    <p className="text-lg md:text-xl font-semibold max-w-xl text-foreground">
                                                        {flashcards[currentCardIdx]?.front}
                                                    </p>
                                                    <span className="text-xs text-primary font-semibold block mt-4 animate-pulse">Click to Reveal Answer</span>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="back"
                                                    initial={{ opacity: 0, rotateY: -90 }}
                                                    animate={{ opacity: 1, rotateY: 0 }}
                                                    exit={{ opacity: 0, rotateY: 90 }}
                                                    className="space-y-4"
                                                >
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Solution Explanation</span>
                                                    <p className="text-sm md:text-base leading-relaxed max-w-xl text-foreground">
                                                        {flashcards[currentCardIdx]?.back}
                                                    </p>
                                                    <span className="text-xs text-muted-foreground block mt-4">Click to Flip Back</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Spaced repetition rating controls */}
                                    {showAnswer && (
                                        <div className="space-y-3 bg-muted/40 p-4 border border-border rounded-xl">
                                            <span className="text-xs font-semibold text-muted-foreground block text-center">Grade your recall difficulty to run scheduling algorithm:</span>
                                            <div className="flex gap-4">
                                                <Button onClick={() => handleRating('Easy')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold">
                                                    Easy (7 days)
                                                </Button>
                                                <Button onClick={() => handleRating('Medium')} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold">
                                                    Medium (3 days)
                                                </Button>
                                                <Button onClick={() => handleRating('Hard')} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold">
                                                    Hard (Tomorrow)
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Add Card Form */}
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-base font-bold">Add Custom Concept Card</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleAddFlashcard} className="space-y-4">
                                                <Input
                                                    placeholder="Question / Front side..."
                                                    value={newFront}
                                                    onChange={(e) => setNewFront(e.target.value)}
                                                    className="text-sm"
                                                />
                                                <textarea
                                                    placeholder="Explanation / Back side..."
                                                    value={newBack}
                                                    onChange={(e) => setNewBack(e.target.value)}
                                                    rows={3}
                                                    className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                                                />
                                                <div className="flex items-center justify-between gap-4">
                                                    <select
                                                        value={newSubject}
                                                        onChange={(e) => setNewSubject(e.target.value)}
                                                        className="bg-muted border border-border rounded-lg p-2 text-xs font-semibold"
                                                    >
                                                        <option value="Algorithms">Algorithms</option>
                                                        <option value="DBMS">DBMS</option>
                                                        <option value="Computer Networks">Computer Networks</option>
                                                        <option value="Operating Systems">Operating Systems</option>
                                                    </select>
                                                    <Button type="submit" className="pink-glow text-xs font-bold px-4 py-2">
                                                        Create Card
                                                    </Button>
                                                </div>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Planner & Schedule */}
                            {activeTab === "planner" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-bold">Add Scheduled Session</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleAddSchedule} className="flex flex-col md:flex-row gap-4">
                                                <Input
                                                    placeholder="Concept name (e.g. Red Black Trees)..."
                                                    value={newTopic}
                                                    onChange={(e) => setNewTopic(e.target.value)}
                                                    className="flex-1"
                                                />
                                                <Input
                                                    placeholder="Time (e.g. 10:00 AM)..."
                                                    value={newTime}
                                                    onChange={(e) => setNewTime(e.target.value)}
                                                    className="w-full md:w-48"
                                                />
                                                <Button type="submit" className="pink-glow shrink-0">
                                                    Add to Planner
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>

                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-bold">Upcoming Concepts Schedule</CardTitle>
                                            <CardDescription>Topics due for active revision sessions today</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {schedules.length === 0 ? (
                                                <div className="p-8 text-center text-muted-foreground text-sm">
                                                    All revisions clear for today!
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-border">
                                                    {schedules.map((sched) => (
                                                        <div key={sched.id} className="flex items-center justify-between p-4 hover:bg-muted/10 transition-colors">
                                                            <div className="flex items-center gap-3">
                                                                <CalendarDays className="h-5 w-5 text-primary" />
                                                                <div>
                                                                    <span className="font-bold text-sm block">{sched.topic}</span>
                                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                        <Calendar className="h-3 w-3" /> {sched.date} at {sched.time}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => deleteSchedule(sched.id)}
                                                                className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20 border-green-500/20"
                                                            >
                                                                <Check className="h-4 w-4 mr-1" /> Done
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Notes Workspace */}
                            {activeTab === "notes" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-bold font-display">Notes Editor Workspace</CardTitle>
                                            <CardDescription>Jot down quick key algorithms and proof steps.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleAddNote} className="space-y-4">
                                                <Input
                                                    placeholder="Note Title (e.g. Master Theorem formula)..."
                                                    value={noteTitle}
                                                    onChange={(e) => setNoteTitle(e.target.value)}
                                                    className="font-bold"
                                                />
                                                <textarea
                                                    placeholder="Detailed note content, formulas, pseudocode..."
                                                    value={noteText}
                                                    onChange={(e) => setNoteText(e.target.value)}
                                                    rows={4}
                                                    className="w-full bg-muted/40 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y"
                                                />
                                                <Button type="submit" className="pink-glow w-full">Save Note</Button>
                                            </form>
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {notes.map((note) => (
                                            <Card key={note.id} className="glass-card relative overflow-hidden group">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base font-bold pr-8">{note.title}</CardTitle>
                                                    <CardDescription className="text-xs">{note.date}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                        {note.text}
                                                    </p>
                                                    <button
                                                        onClick={() => deleteNote(note.id)}
                                                        className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bookmarks */}
                            {activeTab === "bookmarks" && (
                                <div className="space-y-6">
                                    <Card className="glass-card">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-bold">Add Topic Bookmark</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <form onSubmit={handleAddBookmark} className="flex gap-4">
                                                <Input
                                                    placeholder="Core Topic name (e.g. Graph BFS traversal)..."
                                                    value={newBookmark}
                                                    onChange={(e) => setNewBookmark(e.target.value)}
                                                    className="flex-1"
                                                />
                                                <Button type="submit" className="pink-glow">
                                                    Bookmark Topic
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {bookmarks.map((bm) => (
                                            <div key={bm} className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-xl hover:border-primary/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Bookmark className="h-4.5 w-4.5 text-primary fill-primary" />
                                                    <span className="font-semibold text-sm">{bm}</span>
                                                </div>
                                                <button
                                                    onClick={() => deleteBookmark(bm)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Diagnostics Sidebar */}
                <div className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Spaced Repetition Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 bg-muted/40 rounded-xl space-y-2.5 border border-border">
                                <div className="flex justify-between text-sm">
                                    <span>Active Cards in Deck</span>
                                    <span className="font-bold text-foreground">{flashcards.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Retention Metric</span>
                                    <span className="font-bold text-foreground">88%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Next Revision Due</span>
                                    <span className="font-bold text-foreground">Tomorrow, 09:00 AM</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-gradient-to-br from-primary/10 to-teal-500/10 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" /> Smart Scheduler AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <span className="text-xs text-muted-foreground block">
                                The system analyzes your card rating difficulty trends over time to adjust review intervals, ensuring memory consolidation occurs exactly before normal cognitive decay cycles.
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
