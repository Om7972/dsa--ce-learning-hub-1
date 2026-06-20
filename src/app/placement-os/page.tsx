"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Cell,
    Pie
} from "recharts";
import {
    LayoutDashboard,
    BookOpen,
    Compass,
    Trophy,
    Briefcase,
    FileText,
    Cpu,
    Sparkles,
    Clock,
    Target,
    Calendar,
    Award,
    Bell,
    Settings,
    HelpCircle,
    LogOut,
    CheckCircle2,
    Flame,
    Star,
    Search,
    Plus,
    Trash2,
    ArrowRight,
    Lock,
    Code,
    AlertCircle,
    RotateCcw,
    Volume2,
    UploadCloud,
    Check,
    Copy,
    ChevronRight,
    User,
    Shield,
    BookMarked,
    Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// ==========================================
// MOCK DATA & CONSTANTS
// ==========================================
const DSA_TOPICS = [
    { id: "arrays", name: "Arrays", desc: "Contiguous memory structures and indexing.", total: 25, easy: 10, medium: 10, hard: 5 },
    { id: "strings", name: "Strings", desc: "Character arrays and pattern algorithms.", total: 20, easy: 8, medium: 8, hard: 4 },
    { id: "linked-list", name: "Linked List", desc: "Linear nodes and pointer updates.", total: 15, easy: 5, medium: 7, hard: 3 },
    { id: "stack", name: "Stack", desc: "Last-In-First-Out data structures.", total: 12, easy: 4, medium: 6, hard: 2 },
    { id: "queue", name: "Queue", desc: "First-In-First-Out sequencing.", total: 12, easy: 4, medium: 6, hard: 2 },
    { id: "trees", name: "Trees", desc: "Hierarchical branching structures.", total: 25, easy: 6, medium: 12, hard: 7 },
    { id: "bst", name: "BST", desc: "Binary search tree lookups.", total: 15, easy: 5, medium: 7, hard: 3 },
    { id: "heap", name: "Heap", desc: "Priority queues and sorting heaps.", total: 10, easy: 3, medium: 5, hard: 2 },
    { id: "graph", name: "Graph", desc: "Network nodes and edge connections.", total: 30, easy: 5, medium: 15, hard: 10 },
    { id: "trie", name: "Trie", desc: "Prefix retrieval trees.", total: 8, easy: 2, medium: 4, hard: 2 },
    { id: "dp", name: "DP", desc: "Memoization and dynamic table optimization.", total: 35, easy: 5, medium: 18, hard: 12 },
    { id: "greedy", name: "Greedy", desc: "Local optimal choice selectors.", total: 18, easy: 6, medium: 8, hard: 4 },
    { id: "backtracking", name: "Backtracking", desc: "Combinatorial state permutations.", total: 15, easy: 3, medium: 8, hard: 4 }
];

const INITIAL_PROBLEMS = [
    { id: 101, topicId: "arrays", title: "Two Sum", difficulty: "Easy", platform: "Leetcode", link: "https://leetcode.com/problems/two-sum/", solved: true },
    { id: 102, topicId: "arrays", title: "Container With Most Water", difficulty: "Medium", platform: "Leetcode", link: "https://leetcode.com/problems/container-with-most-water/", solved: false },
    { id: 103, topicId: "arrays", title: "First Missing Positive", difficulty: "Hard", platform: "Leetcode", link: "https://leetcode.com/problems/first-missing-positive/", solved: false },
    { id: 201, topicId: "strings", title: "Valid Anagram", difficulty: "Easy", platform: "Leetcode", link: "https://leetcode.com/problems/valid-anagram/", solved: true },
    { id: 202, topicId: "strings", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", platform: "Leetcode", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", solved: false },
    { id: 901, topicId: "graph", title: "Number of Islands", difficulty: "Medium", platform: "Leetcode", link: "https://leetcode.com/problems/number-of-islands/", solved: false },
    { id: 1101, topicId: "dp", title: "Climbing Stairs", difficulty: "Easy", platform: "Leetcode", link: "https://leetcode.com/problems/climbing-stairs/", solved: true }
];

const COMPANIES = [
    { id: "google", name: "Google", logo: "G", color: "from-red-500 to-yellow-500" },
    { id: "amazon", name: "Amazon", logo: "A", color: "from-orange-500 to-yellow-600" },
    { id: "microsoft", name: "Microsoft", logo: "M", color: "from-blue-500 to-teal-500" },
    { id: "adobe", name: "Adobe", logo: "Ad", color: "from-rose-500 to-red-600" },
    { id: "goldman", name: "Goldman Sachs", logo: "GS", color: "from-amber-600 to-yellow-500" },
    { id: "uber", name: "Uber", logo: "U", color: "from-slate-700 to-slate-900" },
    { id: "walmart", name: "Walmart", logo: "W", color: "from-sky-400 to-blue-500" },
    { id: "atlassian", name: "Atlassian", logo: "At", color: "from-blue-600 to-indigo-500" },
    { id: "tcs", name: "TCS", logo: "T", color: "from-purple-500 to-indigo-600" },
    { id: "infosys", name: "Infosys", logo: "I", color: "from-sky-500 to-indigo-500" },
    { id: "accenture", name: "Accenture", logo: "Ac", color: "from-purple-600 to-pink-500" }
];

const MOCK_COMPANY_QUESTIONS: Record<string, any[]> = {
    google: [
        { id: 1001, title: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Arrays", solved: false },
        { id: 1002, title: "Find First and Last Position in Sorted Array", difficulty: "Medium", category: "Binary Search", solved: true },
        { id: 1003, title: "Word Ladder", difficulty: "Hard", category: "Graphs", solved: false }
    ],
    amazon: [
        { id: 2001, title: "Reorder Data in Log Files", difficulty: "Easy", category: "Strings", solved: true },
        { id: 2002, title: "LRU Cache", difficulty: "Medium", category: "Design", solved: false }
    ]
};

const INTERVIEW_QUESTIONS = [
    { id: 1, category: "Technical Interview", question: "Explain the difference between SQL and NoSQL databases.", answer: "SQL databases are relational, table-based, and use structured query languages with strict schemas. NoSQL databases are non-relational, document or key-value based, schema-free, and scale horizontally.", difficulty: "Medium", favorite: false },
    { id: 2, category: "CS Fundamentals", question: "What is page fault and how is it resolved in Operating Systems?", answer: "A page fault occurs when a program accesses a memory page not currently mapped in RAM. The OS swaps the required page from disk cache to main memory.", difficulty: "Hard", favorite: true },
    { id: 3, category: "HR Interview", question: "Why do you want to join our organization?", answer: "Highlight company values, product portfolios, growth tracks, and map your skills to their mission statements.", difficulty: "Easy", favorite: false },
    { id: 4, category: "System Design", question: "Design a URL shortener like TinyURL.", answer: "Use base62 encoding for IDs, write cache layers using Redis, database tables with unique ID auto-generators, and handle redirects with 301 Permanent Redirect tags.", difficulty: "Hard", favorite: false }
];

const INITIAL_NOTIFICATIONS = [
    { id: 1, type: "revision", message: "Revision overdue: Graph Traversals", is_read: false },
    { id: 2, type: "goals", message: "Daily Targets: Complete 3 DSA Problems", is_read: false },
    { id: 3, type: "streak", message: "Keep the flame burning! Log a solved problem today", is_read: true }
];

const INITIAL_ACHIEVEMENTS = [
    { id: "first", title: "First Solve", desc: "Submit your first correct solution", unlocked: true, type: "Bronze" },
    { id: "streak-7", title: "7-Day Consistent", desc: "Preserve consistency for 7 days", unlocked: true, type: "Silver" },
    { id: "solved-100", title: "DSA Centurion", desc: "Solve 100 total DSA problems", unlocked: false, type: "Gold" },
    { id: "master", title: "Interview Ready", desc: "Clear mock behavioral simulation", unlocked: false, type: "Diamond" }
];

export default function PlacementOSPage() {
    const [activeView, setActiveView] = useState("dashboard");

    // Global Stats
    const [problems, setProblems] = useState(INITIAL_PROBLEMS);
    const [xp, setXp] = useState(1450);
    const [streak, setStreak] = useState(8);
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);

    // 1. DSA Tracker View States
    const [selectedDsaTopic, setSelectedDsaTopic] = useState("arrays");
    const [dsaNotes, setDsaNotes] = useState<Record<string, string>>({
        arrays: "Use two pointers for sorted arrays optimization."
    });

    // 2. Company Sheets View States
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

    // 3. Interview Prep States
    const [intQuestions, setIntQuestions] = useState(INTERVIEW_QUESTIONS);
    const [searchInt, setSearchInt] = useState("");
    const [selectedIntCategory, setSelectedIntCategory] = useState("All");
    const [randomInterviewList, setRandomInterviewList] = useState<any[] | null>(null);
    const [randomInterviewTimer, setRandomInterviewTimer] = useState(60);

    // 4. Mock Interview States
    const [mockMode, setMockMode] = useState("Technical");
    const [mockActive, setMockActive] = useState(false);
    const [mockQuestionIdx, setMockQuestionIdx] = useState(0);
    const [mockTranscript, setMockTranscript] = useState("");
    const [mockDialog, setMockDialog] = useState<{ speaker: 'panel' | 'user', text: string }[]>([]);
    const [mockScorecard, setMockScorecard] = useState<any | null>(null);
    const [mockTimer, setMockTimer] = useState(300); // 5 mins

    // 5. Resume Analyzer States
    const [resumeContent, setResumeContent] = useState("");
    const [atsResult, setAtsResult] = useState<any | null>(null);
    const [scanningAts, setScanningAts] = useState(false);

    // 6. AI Mentor States
    const [aiConversations, setAiConversations] = useState([
        { id: 1, title: "Graph BFS Optimization" }
    ]);
    const [activeConvoId, setActiveConvoId] = useState(1);
    const [aiMessages, setAiMessages] = useState<Record<number, { role: string, content: string }[]>>({
        1: [{ role: "mentor", content: "Hi! How can I assist you with your DSA preparation or system design architectures today?" }]
    });
    const [aiInput, setAiInput] = useState("");

    // 7. Coding Calendar States
    const [calendarDays, setCalendarDays] = useState<number[]>(Array.from({ length: 30 }, (_, i) => i + 1));
    const [dailyActivity, setDailyActivity] = useState<Record<number, number>>({
        5: 3, 6: 1, 12: 5, 14: 2, 18: 4, 19: 1
    });

    // 8. Daily Targets States
    const [targetQs, setTargetQs] = useState(3);
    const [targetHrs, setTargetHrs] = useState(4);
    const [solvedToday, setSolvedToday] = useState(1);
    const [hoursToday, setHoursToday] = useState(2);

    // 9. Revision Hub States
    const [flashcards, setFlashcards] = useState([
        { id: 1, q: "What is the time complexity of Quick Select?", a: "O(n) on average, O(n²) worst case.", nextRev: "2026-06-21" },
        { id: 2, q: "Explain CAP theorem in distributed networks.", a: "Consistency, Availability, Partition tolerance. Choose any two.", nextRev: "2026-06-22" }
    ]);
    const [activeFlashcardIdx, setActiveFlashcardIdx] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState(false);

    // 10. Admin States
    const [isAdmin, setIsAdmin] = useState(true); // Default to true for local testing capability

    // Notification functions
    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, is_read: true })));
        toast.info("All alerts marked as read");
    };

    // XP & Level calculations
    const xpLevel = Math.floor(xp / 1000) + 1;
    const nextLevelXp = xpLevel * 1000;
    const currentLevelProgress = ((xp % 1000) / 1000) * 100;
    const getLevelBadge = () => {
        if (xp >= 3000) return { label: "Diamond", color: "bg-cyan-500 text-white" };
        if (xp >= 2000) return { label: "Gold", color: "bg-amber-500 text-white" };
        if (xp >= 1000) return { label: "Silver", color: "bg-slate-300 text-slate-800" };
        return { label: "Bronze", color: "bg-amber-700 text-white" };
    };

    // ==========================================
    // MOCK INTERVIEW CORE LOGIC
    // ==========================================
    const mockQuestionsList = [
        "Tell me about a time you resolved a major bug under short deadlines.",
        "What is the average time complexity of Heap Sort? Why is it chosen over Quick Sort in tight memory systems?",
        "How do you handle horizontal database sharding constraints?"
    ];

    const startMockSession = () => {
        setMockActive(true);
        setMockQuestionIdx(0);
        setMockTranscript("");
        setMockScorecard(null);
        setMockTimer(300);
        setMockDialog([
            { speaker: 'panel', text: `Welcome to your Placement OS mock interview. Let's begin. ${mockQuestionsList[0]}` }
        ]);
        toast.success("Mock Interview session started.");
    };

    const submitMockAnswer = () => {
        if (!mockTranscript.trim()) return;
        const newDialog = [...mockDialog, { speaker: 'user' as const, text: mockTranscript }];
        setMockDialog(newDialog);
        setMockTranscript("");

        if (mockQuestionIdx < mockQuestionsList.length - 1) {
            const nextIdx = mockQuestionIdx + 1;
            setMockQuestionIdx(nextIdx);
            setTimeout(() => {
                setMockDialog(prev => [
                    ...prev,
                    { speaker: 'panel', text: mockQuestionsList[nextIdx] }
                ]);
            }, 800);
        } else {
            // End interview
            setMockActive(false);
            setMockScorecard({
                technical: 82,
                communication: 78,
                confidence: 85,
                overall: 81,
                feedback: [
                    "Good algorithmic flow. You explained sharding criteria clearly.",
                    "Improve structural descriptions. Try using the STAR method for behavioral context."
                ]
            });
            setXp(prev => prev + 150);
            toast.success("Interview completed! Scorecard compiled.");
        }
    };

    // ==========================================
    // RESUME ANALYZER LOGIC
    // ==========================================
    const runResumeAtsScanner = () => {
        if (!resumeContent.trim()) {
            toast.error("Please enter resume details!");
            return;
        }
        setScanningAts(true);
        setTimeout(() => {
            setScanningAts(false);
            setAtsResult({
                score: 79,
                matched: ["React.js", "TypeScript", "Node.js", "SQL", "Git", "REST APIs"],
                missing: ["Docker", "Kubernetes", "Redis"],
                suggestions: [
                    "Highlight metrics in experience lines (e.g., Improved rendering speed by 30%).",
                    "Add cloud orchestration references to bypass enterprise filter tools."
                ]
            });
            setXp(prev => prev + 50);
            toast.success("Resume evaluation completed!");
        }, 1500);
    };

    // ==========================================
    // AI MENTOR LOGIC
    // ==========================================
    const sendAiMessage = () => {
        if (!aiInput.trim()) return;
        const currentMessages = aiMessages[activeConvoId] || [];
        const updatedUserMessages = [...currentMessages, { role: "user", content: aiInput }];
        
        setAiMessages({
            ...aiMessages,
            [activeConvoId]: updatedUserMessages
        });
        
        const query = aiInput;
        setAiInput("");

        setTimeout(() => {
            let replyContent = "I have analyzed your request. Let's trace the dynamic programming recurrence or memory constraints relative to the context.";
            if (query.toLowerCase().includes("dsa")) {
                replyContent = "In core Data Structures & Algorithms, we focus on time and space complexity optimizations. For arrays and tree structures, remember to trace recursive base states carefully.";
            } else if (query.toLowerCase().includes("code review")) {
                replyContent = "Code Review: Your algorithm looks sound, but consider optimizing memory layout parameters and avoiding redundant memory copies during sorting loops.";
            }

            setAiMessages(prev => ({
                ...prev,
                [activeConvoId]: [...(prev[activeConvoId] || []), { role: "mentor", content: replyContent }]
            }));
        }, 1000);
    };

    const handleCapabilityTrigger = (capability: string) => {
        setAiInput(`Can you help me with: ${capability}?`);
    };

    // ==========================================
    // REVISION FLASHCARDS SPACING ALGORITHM
    // ==========================================
    const handleFlashcardRating = (rating: 'easy' | 'medium' | 'hard') => {
        const currentCard = flashcards[activeFlashcardIdx];
        let daysToAdd = 1;
        if (rating === 'easy') daysToAdd = 7;
        if (rating === 'medium') daysToAdd = 3;

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysToAdd);

        const updated = [...flashcards];
        updated[activeFlashcardIdx] = {
            ...currentCard,
            nextRev: nextDate.toLocaleDateString()
        };

        setFlashcards(updated);
        setRevealAnswer(false);
        setXp(prev => prev + 20);

        if (activeFlashcardIdx < flashcards.length - 1) {
            setActiveFlashcardIdx(prev => prev + 1);
        } else {
            setActiveFlashcardIdx(0);
            toast.success("All flashcards processed for this interval!");
        }
    };

    // Chart mock data
    const weeklyData = [
        { name: "Mon", solved: 2, hours: 3 },
        { name: "Tue", solved: 4, hours: 5 },
        { name: "Wed", solved: 3, hours: 2 },
        { name: "Thu", solved: 5, hours: 6 },
        { name: "Fri", solved: 1, hours: 4 },
        { name: "Sat", solved: 6, hours: 7 },
        { name: "Sun", solved: 4, hours: 3 }
    ];

    const radarData = [
        { subject: "Recursion", A: 120, fullMark: 150 },
        { subject: "Arrays", A: 98, fullMark: 150 },
        { subject: "Trees", A: 86, fullMark: 150 },
        { subject: "Graphs", A: 99, fullMark: 150 },
        { subject: "DP", A: 85, fullMark: 150 }
    ];

    const pieData = [
        { name: "Easy", value: 35, color: "#10b981" },
        { name: "Medium", value: 45, color: "#f59e0b" },
        { name: "Hard", value: 20, color: "#ef4444" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
            {/* --------------------------------------------------
                SIDEBAR NAVIGATION (GLASSMORPHIC)
            -------------------------------------------------- */}
            <aside className="w-full md:w-64 bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between p-6">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center font-black text-xl shadow-lg">
                            P
                        </div>
                        <div>
                            <span className="font-extrabold text-lg block">Placement OS</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">Enterprise V1.0</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {[
                            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                            { id: "dsa", label: "DSA Tracker", icon: BookMarked },
                            { id: "companies", label: "Company Sheets", icon: Briefcase },
                            { id: "interview", label: "Interview Prep", icon: FileText },
                            { id: "mock", label: "Mock Interview", icon: Volume2 },
                            { id: "resume", label: "Resume Analyzer", icon: Cpu },
                            { id: "mentor", label: "AI Mentor", icon: Sparkles },
                            { id: "calendar", label: "Coding Calendar", icon: Calendar },
                            { id: "weak", label: "Weak Topics", icon: Target },
                            { id: "targets", label: "Daily Targets", icon: Clock },
                            { id: "revision", label: "Revision Hub", icon: RotateCcw },
                            { id: "progress", label: "Progress Dashboard", icon: Award },
                            { id: "admin", label: "Admin Panel", icon: Shield }
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveView(item.id);
                                        setSelectedCompany(null);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                        activeView === item.id
                                            ? "bg-primary text-primary-foreground shadow-md font-bold"
                                            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
                                    }`}
                                >
                                    <Icon className="h-4.5 w-4.5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center font-bold">
                            U
                        </div>
                        <div>
                            <span className="text-xs font-bold block">Developer Account</span>
                            <span className="text-[10px] text-muted-foreground">Local Admin Role</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full text-xs hover:bg-red-500/10 text-red-400 justify-start gap-2">
                        <LogOut className="h-3.5 w-3.5" /> Exit Session
                    </Button>
                </div>
            </aside>

            {/* --------------------------------------------------
                MAIN WORKSPACE
            -------------------------------------------------- */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header panel */}
                <header className="bg-slate-900/30 backdrop-blur-md border-b border-slate-800/60 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black font-display tracking-tight text-white capitalize">{activeView.replace("-", " ")}</h2>
                        <Badge className="bg-slate-800 text-slate-300 border-slate-700">Sandbox Active</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
                        {/* Streak Badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
                            <Flame className="h-4 w-4 fill-orange-500/20" /> {streak} Day Streak
                        </div>

                        {/* XP Progress indicator */}
                        <div className="flex items-center gap-3 bg-slate-900/60 px-4 py-2 border border-slate-800 rounded-2xl shadow-sm">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-slate-200">LVL {xpLevel}</span>
                                    <Badge className={getLevelBadge().color + " text-[8px] py-0 px-1.5"}>{getLevelBadge().label}</Badge>
                                </div>
                                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full transition-all duration-300" style={{ width: `${currentLevelProgress}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Notifications icon */}
                        <div className="relative cursor-pointer bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80 hover:bg-slate-800/60" onClick={markAllRead}>
                            <Bell className="h-4.5 w-4.5 text-slate-300" />
                            {notifications.some(n => !n.is_read) && (
                                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-primary border-2 border-slate-900 rounded-full flex items-center justify-center text-[8px] font-black text-white">
                                    {notifications.filter(n => !n.is_read).length}
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Workspace switcher */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 max-w-7xl w-full mx-auto space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-6"
                        >
                            {/* ==================================================
                                MODULE 1: PLACEMENT OS DASHBOARD
                            ================================================== */}
                            {activeView === "dashboard" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <Card className="glass-card">
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Solved Questions</span>
                                                        <span className="text-3xl font-black text-white">{problems.filter(p => p.solved).length} / {problems.length}</span>
                                                    </div>
                                                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Easy/Med/Hard</Badge>
                                                </div>
                                                <div className="mt-4 flex gap-1 items-center justify-between text-[10px] text-muted-foreground font-semibold">
                                                    <span className="text-green-500">3 Easy</span>
                                                    <span className="text-yellow-500">3 Medium</span>
                                                    <span className="text-red-500">1 Hard</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Interview Readiness</span>
                                                        <span className="text-3xl font-black text-white">82%</span>
                                                    </div>
                                                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Optimal</Badge>
                                                </div>
                                                <Progress className="mt-5 h-2" value={82} />
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Resume ATS Score</span>
                                                        <span className="text-3xl font-black text-white">{atsResult ? atsResult.score : 74}%</span>
                                                    </div>
                                                    <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Needs Audit</Badge>
                                                </div>
                                                <Progress className="mt-5 h-2" value={atsResult ? atsResult.score : 74} />
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardContent className="pt-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-xs text-muted-foreground font-semibold block uppercase">Streak Index</span>
                                                        <span className="text-3xl font-black text-white">{streak} Days</span>
                                                    </div>
                                                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">Burning</Badge>
                                                </div>
                                                <div className="mt-4 flex gap-1">
                                                    {Array.from({ length: 7 }).map((_, i) => (
                                                        <div key={i} className={`h-2.5 flex-1 rounded-full ${i < 5 ? 'bg-orange-500' : 'bg-slate-800'}`} />
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Charts Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <Card className="glass-card lg:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Weekly Solved vs Study Hours</CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[250px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={weeklyData}>
                                                        <XAxis dataKey="name" stroke="#475569" />
                                                        <YAxis stroke="#475569" />
                                                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b" }} />
                                                        <Area type="monotone" dataKey="solved" stroke="#fd105e" fillOpacity={0.1} fill="url(#colorSolved)" />
                                                        <Area type="monotone" dataKey="hours" stroke="#6366f1" fillOpacity={0.1} fill="url(#colorHours)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>

                                        {/* Distribution */}
                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">DSA Difficulty Distribution</CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[250px] flex items-center justify-center">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                                            {pieData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 2: DSA TRACKER
                            ================================================== */}
                            {activeView === "dsa" && (
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 border rounded-xl shadow-sm">
                                        <div className="space-y-1">
                                            <span className="text-xs text-muted-foreground uppercase font-bold">Topic category selection</span>
                                            <select
                                                value={selectedDsaTopic}
                                                onChange={(e) => setSelectedDsaTopic(e.target.value)}
                                                className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-bold text-slate-300"
                                            >
                                                {DSA_TOPICS.map((topic) => (
                                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <Badge variant="outline">Total questions: {DSA_TOPICS.find(t => t.id === selectedDsaTopic)?.total}</Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {/* Problems Lists */}
                                        <div className="lg:col-span-2 space-y-4">
                                            <Card className="glass-card">
                                                <CardHeader>
                                                    <CardTitle className="text-base font-bold">Concept Practice Queue</CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-0">
                                                    <div className="divide-y divide-slate-800/60">
                                                        {problems.filter(p => p.topicId === selectedDsaTopic).map((problem) => (
                                                            <div key={problem.id} className="p-4 flex items-center justify-between hover:bg-slate-800/10 transition-colors">
                                                                <div className="space-y-1">
                                                                    <span className="font-bold text-sm block">{problem.title}</span>
                                                                    <div className="flex gap-2">
                                                                        <Badge className={
                                                                            problem.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                                            problem.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                                                            "bg-red-500/10 text-red-400 border-red-500/20"
                                                                        }>
                                                                            {problem.difficulty}
                                                                        </Badge>
                                                                        <span className="text-[10px] text-muted-foreground">{problem.platform}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-3">
                                                                    <button
                                                                        onClick={() => {
                                                                            const updated = problems.map(pr => pr.id === problem.id ? { ...pr, solved: !pr.solved } : pr);
                                                                            setProblems(updated);
                                                                            toast.success("Problem status updated!");
                                                                        }}
                                                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                                                                            problem.solved ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-slate-800/40 border-slate-700 text-slate-400"
                                                                        }`}
                                                                    >
                                                                        {problem.solved ? "Solved" : "Solve"}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Notes panel */}
                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Personal study notes</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <textarea
                                                    value={dsaNotes[selectedDsaTopic] || ""}
                                                    onChange={(e) => setDsaNotes({ ...dsaNotes, [selectedDsaTopic]: e.target.value })}
                                                    placeholder="Jot down notes and observations for this DSA module..."
                                                    rows={6}
                                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none text-slate-300"
                                                />
                                                <Button onClick={() => toast.success("Notes saved locally!")} className="w-full pink-glow text-xs">
                                                    Save Notes
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 3: COMPANY SHEETS
                            ================================================== */}
                            {activeView === "companies" && (
                                <div className="space-y-6">
                                    {!selectedCompany ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {COMPANIES.map((company) => (
                                                <Card key={company.id} onClick={() => setSelectedCompany(company.id)} className="glass-card cursor-pointer hover:border-primary/40 transition-colors group">
                                                    <CardHeader className="flex flex-row items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${company.color} flex items-center justify-center font-bold text-white`}>
                                                            {company.logo}
                                                        </div>
                                                        <div>
                                                            <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">{company.name}</CardTitle>
                                                            <CardDescription className="text-xs">Prep curriculum sheet</CardDescription>
                                                        </div>
                                                    </CardHeader>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center bg-card p-4 border rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${COMPANIES.find(c => c.id === selectedCompany)?.color} flex items-center justify-center font-bold text-white text-xs`}>
                                                        {COMPANIES.find(c => c.id === selectedCompany)?.logo}
                                                    </div>
                                                    <h3 className="font-bold text-lg">{COMPANIES.find(c => c.id === selectedCompany)?.name} Preparation List</h3>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedCompany(null)}>Back to Companies</Button>
                                            </div>

                                            <Card className="glass-card">
                                                <CardContent className="p-0 divide-y divide-slate-800/60">
                                                    {(MOCK_COMPANY_QUESTIONS[selectedCompany] || []).map((q) => (
                                                        <div key={q.id} className="p-4 flex justify-between items-center">
                                                            <div>
                                                                    <span className="font-bold text-sm block">{q.title}</span>
                                                                    <div className="flex gap-2">
                                                                        <Badge className="bg-slate-800 text-slate-300">{q.category}</Badge>
                                                                        <Badge variant="outline">{q.difficulty}</Badge>
                                                                    </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant={q.solved ? "secondary" : "outline"}
                                                                onClick={() => {
                                                                    toast.success("Question completed check updated!");
                                                                }}
                                                            >
                                                                {q.solved ? "Solved" : "Practice"}
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 4: INTERVIEW PREP
                            ================================================== */}
                            {activeView === "interview" && (
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-4 bg-card p-4 border rounded-xl">
                                        <div className="flex-1 relative">
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search question bank..."
                                                value={searchInt}
                                                onChange={(e) => setSearchInt(e.target.value)}
                                                className="pl-9"
                                            />
                                        </div>
                                        <select
                                            value={selectedIntCategory}
                                            onChange={(e) => setSelectedIntCategory(e.target.value)}
                                            className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-bold text-slate-300"
                                        >
                                            <option value="All">All Categories</option>
                                            <option value="Technical Interview">Technical</option>
                                            <option value="CS Fundamentals">CS Fundamentals</option>
                                            <option value="HR Interview">HR</option>
                                            <option value="System Design">System Design</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {intQuestions
                                            .filter(q => selectedIntCategory === "All" || q.category === selectedIntCategory)
                                            .filter(q => q.question.toLowerCase().includes(searchInt.toLowerCase()))
                                            .map((q) => (
                                                <Card key={q.id} className="glass-card">
                                                    <CardHeader className="flex flex-row justify-between items-start gap-4 pb-2">
                                                        <div>
                                                            <Badge className="mb-2">{q.category}</Badge>
                                                            <CardTitle className="text-sm font-bold leading-relaxed">{q.question}</CardTitle>
                                                        </div>
                                                        <Badge variant="outline">{q.difficulty}</Badge>
                                                    </CardHeader>
                                                    <CardContent className="space-y-3">
                                                        <div className="p-3 bg-muted/40 rounded-xl text-xs text-muted-foreground leading-relaxed border border-border">
                                                            {q.answer}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 5: MOCK INTERVIEW SYSTEM
                            ================================================== */}
                            {activeView === "mock" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 space-y-6">
                                            <Card className="glass-card h-[500px] flex flex-col justify-between">
                                                <CardHeader className="border-b border-slate-800/80">
                                                    <CardTitle className="text-base font-bold">Live Board Chat Panel</CardTitle>
                                                    <CardDescription>Mixed panel questions</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                                                    {mockDialog.length === 0 ? (
                                                        <div className="text-center py-20 text-xs text-muted-foreground">
                                                            Select constraints and launch session.
                                                        </div>
                                                    ) : (
                                                        mockDialog.map((msg, i) => (
                                                            <div key={i} className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                                <div className={`max-w-[75%] rounded-xl p-3.5 text-xs ${
                                                                    msg.speaker === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-foreground"
                                                                }`}>
                                                                    <span className="text-[9px] font-black uppercase opacity-75 block mb-1">
                                                                        {msg.speaker === 'panel' ? "Interviewer" : "You"}
                                                                    </span>
                                                                    {msg.text}
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </CardContent>
                                                <div className="p-4 border-t border-slate-800/80 bg-slate-900/20 flex gap-2">
                                                    <Input
                                                        placeholder="Respond to the interviewer..."
                                                        value={mockTranscript}
                                                        onChange={(e) => setMockTranscript(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && submitMockAnswer()}
                                                        disabled={!mockActive}
                                                    />
                                                    <Button onClick={submitMockAnswer} disabled={!mockActive} className="pink-glow">Submit</Button>
                                                </div>
                                            </Card>
                                        </div>

                                        {/* Mock Controller & scorecards */}
                                        <div className="space-y-6">
                                            <Card className="glass-card">
                                                <CardHeader>
                                                    <CardTitle className="text-base font-bold">Simulator Controls</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    {!mockActive ? (
                                                        <Button onClick={startMockSession} className="w-full pink-glow font-bold">
                                                            Launch Assessment Session
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => setMockActive(false)} variant="destructive" className="w-full font-bold">
                                                            Cancel Session
                                                        </Button>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            {mockScorecard && (
                                                <Card className="glass-card bg-green-500/5 border-green-500/25">
                                                    <CardHeader>
                                                        <CardTitle className="text-base font-bold text-green-500">Evaluation Scorecard</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4 text-xs">
                                                        <div className="grid grid-cols-3 gap-2 text-center">
                                                            <div className="bg-slate-900/60 p-2 border rounded-lg">
                                                                <span className="text-[10px] text-muted-foreground block">Technical</span>
                                                                <span className="font-extrabold text-sm">{mockScorecard.technical}%</span>
                                                            </div>
                                                            <div className="bg-slate-900/60 p-2 border rounded-lg">
                                                                <span className="text-[10px] text-muted-foreground block">Comm.</span>
                                                                <span className="font-extrabold text-sm">{mockScorecard.communication}%</span>
                                                            </div>
                                                            <div className="bg-slate-900/60 p-2 border rounded-lg">
                                                                <span className="text-[10px] text-muted-foreground block">Confidence</span>
                                                                <span className="font-extrabold text-sm">{mockScorecard.confidence}%</span>
                                                            </div>
                                                        </div>
                                                        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                                                            <span className="font-bold text-[10px] uppercase text-primary block">Mentor Recommendations</span>
                                                            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                                                                {mockScorecard.feedback.map((f: string, i: number) => (
                                                                    <li key={i}>{f}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 6: RESUME ANALYZER
                            ================================================== */}
                            {activeView === "resume" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 space-y-6">
                                            <Card className="glass-card">
                                                <CardHeader>
                                                    <CardTitle className="text-base font-bold">ATS Resume Compiler Zone</CardTitle>
                                                    <CardDescription>Paste details to run parsing scan</CardDescription>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <textarea
                                                        value={resumeContent}
                                                        onChange={(e) => setResumeContent(e.target.value)}
                                                        placeholder="Paste your education, skills, metrics, and project outlines..."
                                                        rows={10}
                                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none text-slate-200"
                                                    />
                                                    <Button onClick={runResumeAtsScanner} disabled={scanningAts} className="w-full pink-glow font-bold">
                                                        {scanningAts ? "Scanning density matches..." : "Run ATS Scan"}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div>
                                            {atsResult ? (
                                                <Card className="glass-card bg-gradient-to-br from-green-500/5 to-slate-900/60 border-green-500/20">
                                                    <CardHeader className="text-center pb-2">
                                                        <CardTitle className="text-xs text-muted-foreground uppercase">ATS Audit Score</CardTitle>
                                                        <div className="text-5xl font-black text-green-500 my-2">{atsResult.score}%</div>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4 text-xs">
                                                        <div className="space-y-1">
                                                            <span className="font-bold block uppercase text-[10px] text-muted-foreground">Matched terms</span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {atsResult.matched.map((m: string) => (
                                                                    <Badge key={m} variant="secondary" className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20">{m}</Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <span className="font-bold block uppercase text-[10px] text-muted-foreground">Recommended Keywords</span>
                                                            <div className="flex flex-wrap gap-1">
                                                                {atsResult.missing.map((m: string) => (
                                                                    <Badge key={m} variant="secondary" className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20">{m}</Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                                                            <span className="font-bold text-[10px] text-primary block">Enhancements Suggestion</span>
                                                            <ul className="list-disc pl-4 space-y-1 text-slate-300">
                                                                {atsResult.suggestions.map((s: string, idx: number) => (
                                                                    <li key={idx}>{s}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ) : (
                                                <Card className="glass-card border-dashed flex flex-col items-center justify-center p-8 text-center h-[300px]">
                                                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-3 animate-pulse" />
                                                    <h4 className="font-bold text-sm">Waiting for Analysis</h4>
                                                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Paste content on the left pane and hit scan to start.</p>
                                                </Card>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 7: AI MENTOR
                            ================================================== */}
                            {activeView === "mentor" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                        <div className="lg:col-span-1 space-y-3">
                                            <Card className="glass-card p-4 space-y-2">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Capabilities Quick Access</span>
                                                <Button onClick={() => handleCapabilityTrigger("Explain binary search limits")} size="sm" variant="outline" className="w-full text-left justify-start text-[11px]">Explain DSA</Button>
                                                <Button onClick={() => handleCapabilityTrigger("Review code sorting loops")} size="sm" variant="outline" className="w-full text-left justify-start text-[11px]">Review Code</Button>
                                                <Button onClick={() => handleCapabilityTrigger("Suggest DBMS index schemes")} size="sm" variant="outline" className="w-full text-left justify-start text-[11px]">Explain CS Core</Button>
                                            </Card>
                                        </div>

                                        <div className="lg:col-span-3">
                                            <Card className="glass-card h-[500px] flex flex-col justify-between">
                                                <CardHeader className="border-b border-slate-800">
                                                    <CardTitle className="text-base font-bold">AI Assistant Chatroom</CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                                                    {(aiMessages[activeConvoId] || []).map((msg, i) => (
                                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                            <div className={`max-w-[80%] rounded-xl p-3.5 text-xs ${
                                                                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-foreground"
                                                            }`}>
                                                                {msg.content}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                                <div className="p-4 border-t border-slate-800 flex gap-2">
                                                    <Input
                                                        placeholder="Ask AI Mentor..."
                                                        value={aiInput}
                                                        onChange={(e) => setAiInput(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && sendAiMessage()}
                                                    />
                                                    <Button onClick={sendAiMessage} className="pink-glow">Ask</Button>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 8: CODING CALENDAR
                            ================================================== */}
                            {activeView === "calendar" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <Card className="glass-card lg:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Consistency Heatmap Grid</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-7 gap-2 max-w-md mx-auto">
                                                    {calendarDays.map((day) => {
                                                        const solvedCount = dailyActivity[day] || 0;
                                                        return (
                                                            <div
                                                                key={day}
                                                                onClick={() => {
                                                                    setDailyActivity({ ...dailyActivity, [day]: solvedCount + 1 });
                                                                    toast.success(`Logged problem solution on day ${day}`);
                                                                }}
                                                                className={`h-10 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer border transition-all ${
                                                                    solvedCount === 0 ? "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700" :
                                                                    solvedCount < 3 ? "bg-green-950 border-green-800 text-green-400" :
                                                                    "bg-green-500 border-green-600 text-slate-950"
                                                                }`}
                                                            >
                                                                {day}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="mt-4 flex gap-4 justify-center text-[10px] text-muted-foreground font-semibold">
                                                    <div className="flex items-center gap-1"><div className="h-3 w-3 bg-slate-900 border border-slate-800 rounded-sm" /> 0 Solved</div>
                                                    <div className="flex items-center gap-1"><div className="h-3 w-3 bg-green-950 border border-green-800 rounded-sm" /> 1-2 Solved</div>
                                                    <div className="flex items-center gap-1"><div className="h-3 w-3 bg-green-500 rounded-sm" /> 3+ Solved</div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Daily Challenge</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4 text-xs">
                                                <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-2">
                                                    <span className="font-bold text-sm block">Climbing Stairs (DP)</span>
                                                    <p className="text-muted-foreground">Find distinct ways to reach top of stairs taking 1 or 2 steps.</p>
                                                    <Badge className="bg-green-500/10 text-green-400 border border-green-500/20">Easy • +50 XP</Badge>
                                                </div>
                                                <Button onClick={() => {
                                                    setXp(prev => prev + 50);
                                                    setStreak(prev => prev + 1);
                                                    toast.success("Daily challenge completed successfully! +50 XP");
                                                }} className="w-full pink-glow font-bold">Solve Challenge</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 9: WEAK TOPIC ANALYSIS
                            ================================================== */}
                            {activeView === "weak" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <Card className="glass-card lg:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Concept Strength Radar</CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[300px] flex items-center justify-center">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                                        <PolarGrid stroke="#334155" />
                                                        <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                                                        <PolarRadiusAxis stroke="#334155" />
                                                        <Radar name="Accuracy Index" dataKey="A" stroke="#fd105e" fill="#fd105e" fillOpacity={0.15} />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Weak Topic Recovery Plan</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4 text-xs">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between font-bold">
                                                        <span>Weakness Index (DP)</span>
                                                        <span className="text-red-500">85% Weak</span>
                                                    </div>
                                                    <Progress className="h-2" value={85} />
                                                </div>
                                                <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-2">
                                                    <span className="font-bold text-sm block">Action Steps</span>
                                                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                                                        <li>Solve 5 Easy DP problems</li>
                                                        <li>Trace Fibonacci bottom-up logic</li>
                                                    </ul>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 10: DAILY TARGETS
                            ================================================== */}
                            {activeView === "targets" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Configure Targets</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4 text-xs">
                                                <div className="space-y-2">
                                                    <label className="font-bold">Daily Question Target</label>
                                                    <Input type="number" value={targetQs} onChange={(e) => setTargetQs(Number(e.target.value))} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-bold">Daily Study Hours Target</label>
                                                    <Input type="number" value={targetHrs} onChange={(e) => setTargetHrs(Number(e.target.value))} />
                                                </div>
                                                <Button onClick={() => toast.success("Daily targets updated!")} className="w-full pink-glow">Update Targets</Button>
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card flex flex-col justify-center items-center p-8">
                                            <span className="text-xs text-muted-foreground uppercase font-bold block mb-4">Daily Targets Progress</span>
                                            <div className="relative h-36 w-36 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="72" cy="72" r="60" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                                                    <circle cx="72" cy="72" r="60" stroke="#fd105e" strokeWidth="12" fill="transparent"
                                                        strokeDasharray={2 * Math.PI * 60}
                                                        strokeDashoffset={2 * Math.PI * 60 * (1 - Math.min(1, solvedToday / targetQs))}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute flex flex-col items-center">
                                                    <span className="text-3xl font-black">{solvedToday}/{targetQs}</span>
                                                    <span className="text-[10px] text-muted-foreground">Questions Solved</span>
                                                </div>
                                            </div>
                                            <Button onClick={() => {
                                                setSolvedToday(prev => prev + 1);
                                                setXp(prev => prev + 25);
                                                toast.success("Progress logged!");
                                            }} className="mt-6" size="sm">Log solved problem</Button>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 11: REVISION HUB
                            ================================================== */}
                            {activeView === "revision" && (
                                <div className="space-y-6">
                                    <div className="max-w-2xl mx-auto space-y-6">
                                        <Card className="glass-card min-h-[220px] flex flex-col justify-between text-center relative overflow-hidden">
                                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-indigo-500" />
                                            <CardHeader>
                                                <Badge className="mx-auto mb-2" variant="outline">Spaced Repetition Active</Badge>
                                                <CardTitle className="text-lg font-bold leading-relaxed">
                                                    {flashcards[activeFlashcardIdx].q}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                {revealAnswer ? (
                                                    <p className="text-xs text-muted-foreground leading-relaxed p-3 bg-muted/40 border border-border rounded-xl">
                                                        {flashcards[activeFlashcardIdx].a}
                                                    </p>
                                                ) : (
                                                    <Button onClick={() => setRevealAnswer(true)} variant="outline" size="sm" className="mx-auto">Reveal Answer</Button>
                                                )}
                                            </CardContent>

                                            {revealAnswer && (
                                                <div className="p-4 border-t border-slate-800 bg-slate-900/10 flex justify-center gap-2">
                                                    <Button onClick={() => handleFlashcardRating('easy')} size="sm" className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/25">Easy (7d)</Button>
                                                    <Button onClick={() => handleFlashcardRating('medium')} size="sm" className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/25">Medium (3d)</Button>
                                                    <Button onClick={() => handleFlashcardRating('hard')} size="sm" className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/25">Hard (1d)</Button>
                                                </div>
                                            )}
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 12: PROGRESS DASHBOARD (RECHARTS)
                            ================================================== */}
                            {activeView === "progress" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Solved problems index</CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[250px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={weeklyData}>
                                                        <XAxis dataKey="name" stroke="#475569" />
                                                        <YAxis stroke="#475569" />
                                                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b" }} />
                                                        <Bar dataKey="solved" fill="#fd105e" radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Coding contest rating curve</CardTitle>
                                            </CardHeader>
                                            <CardContent className="h-[250px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={[
                                                        { name: "C1", rating: 1450 },
                                                        { name: "C2", rating: 1520 },
                                                        { name: "C3", rating: 1490 },
                                                        { name: "C4", rating: 1610 }
                                                    ]}>
                                                        <XAxis dataKey="name" stroke="#475569" />
                                                        <YAxis stroke="#475569" />
                                                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b" }} />
                                                        <Line type="monotone" dataKey="rating" stroke="#10b981" strokeWidth={3} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================
                                MODULE 15: ADMIN PANEL
                            ================================================== */}
                            {activeView === "admin" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Configure DSA Questions</CardTitle>
                                                <CardDescription>Insert items into dsa_problems database table</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4 text-xs">
                                                <div className="space-y-1">
                                                    <label className="font-semibold text-muted-foreground">Title</label>
                                                    <Input placeholder="Enter title (e.g. Reverse Linked List)..." />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="font-semibold text-muted-foreground">Category Topic</label>
                                                    <select className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-bold text-slate-300 w-full">
                                                        {DSA_TOPICS.map((topic) => (
                                                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <Button onClick={() => toast.success("Question inserted to public.problems database table!")} className="w-full pink-glow font-bold mt-2">
                                                    Add Problem
                                                </Button>
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card">
                                            <CardHeader>
                                                <CardTitle className="text-base font-bold">Admin Platform Control</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-2 text-xs text-muted-foreground">
                                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                                    <span>Total registered students</span>
                                                    <span className="font-bold text-foreground">1,240</span>
                                                </div>
                                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                                    <span>Total mock interviews taken</span>
                                                    <span className="font-bold text-foreground">420</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Average ATS resume score</span>
                                                    <span className="font-bold text-foreground">78%</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
