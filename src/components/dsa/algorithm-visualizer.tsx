"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, RotateCcw, Pause, ChevronRight, FastForward, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Categories Tab
const CATEGORIES = [
    { id: "sorting", name: "Sorting Algorithms" },
    { id: "searching", name: "Searching (Binary/Linear)" },
    { id: "stack-queue", name: "Stack & Queue Operations" },
    { id: "bst", name: "BST Trees (Traversals)" },
    { id: "graphs", name: "Graphs (BFS & DFS)" }
];

export const AlgorithmVisualizer = () => {
    const [activeTab, setActiveTab] = useState("sorting");
    const [speed, setSpeed] = useState(50);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<boolean>(false);

    // Common helper sleep
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const getDelay = () => Math.max(10, 200 - speed * 2);

    // ==========================================
    // 1. SORTING STATES & METHODS
    // ==========================================
    const [sortArray, setSortArray] = useState<number[]>([]);
    const [sortActive, setSortActive] = useState<number[]>([]);
    const [sortSorted, setSortSorted] = useState<number[]>([]);
    const [selectedSort, setSelectedSort] = useState("BUBBLE");

    const resetSortArray = () => {
        const arr = Array.from({ length: 25 }, () => Math.floor(Math.random() * 80) + 15);
        setSortArray(arr);
        setSortActive([]);
        setSortSorted([]);
        setIsAnimating(false);
        animationRef.current = false;
    };

    useEffect(() => {
        resetSortArray();
    }, []);

    const runBubbleSort = async () => {
        const arr = [...sortArray];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!animationRef.current) return;
                setSortActive([j, j + 1]);
                await sleep(getDelay());
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setSortArray([...arr]);
                }
            }
            setSortSorted(prev => [...prev, n - i - 1]);
        }
        setSortSorted(Array.from({ length: n }, (_, i) => i));
        setSortActive([]);
        setIsAnimating(false);
    };

    const runSelectionSort = async () => {
        const arr = [...sortArray];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (!animationRef.current) return;
                setSortActive([i, j, minIdx]);
                await sleep(getDelay());
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                setSortArray([...arr]);
            }
            setSortSorted(prev => [...prev, i]);
        }
        setSortSorted(Array.from({ length: n }, (_, i) => i));
        setSortActive([]);
        setIsAnimating(false);
    };

    // ==========================================
    // 2. SEARCHING STATES & METHODS
    // ==========================================
    const [searchArray, setSearchArray] = useState<number[]>([]);
    const [searchTarget, setSearchTarget] = useState<number>(45);
    const [searchActive, setSearchActive] = useState<number[]>([]);
    const [searchFound, setSearchFound] = useState<number | null>(null);
    const [searchMode, setSearchMode] = useState("BINARY"); // BINARY or LINEAR
    const [searchPointers, setSearchPointers] = useState<{ low?: number, mid?: number, high?: number }>({});

    const resetSearchArray = () => {
        const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 10).sort((a, b) => a - b);
        setSearchArray(arr);
        // Randomly pick target from array
        setSearchTarget(arr[Math.floor(Math.random() * arr.length)]);
        setSearchActive([]);
        setSearchFound(null);
        setSearchPointers({});
        setIsAnimating(false);
        animationRef.current = false;
    };

    useEffect(() => {
        resetSearchArray();
    }, [activeTab]);

    const runLinearSearch = async () => {
        setIsAnimating(true);
        animationRef.current = true;
        setSearchFound(null);
        setSearchPointers({});

        for (let i = 0; i < searchArray.length; i++) {
            if (!animationRef.current) return;
            setSearchActive([i]);
            await sleep(getDelay() * 2);
            if (searchArray[i] === searchTarget) {
                setSearchFound(i);
                setIsAnimating(false);
                return;
            }
        }
        setIsAnimating(false);
    };

    const runBinarySearch = async () => {
        setIsAnimating(true);
        animationRef.current = true;
        setSearchFound(null);

        let low = 0;
        let high = searchArray.length - 1;

        while (low <= high) {
            if (!animationRef.current) return;
            const mid = Math.floor((low + high) / 2);
            setSearchPointers({ low, mid, high });
            setSearchActive([mid]);
            await sleep(getDelay() * 3);

            if (searchArray[mid] === searchTarget) {
                setSearchFound(mid);
                setIsAnimating(false);
                return;
            }
            if (searchArray[mid] < searchTarget) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        setIsAnimating(false);
    };

    // ==========================================
    // 3. STACK & QUEUE STATES
    // ==========================================
    const [sqData, setSqData] = useState<number[]>([12, 45, 78]);
    const [sqInputValue, setSqInputValue] = useState("");

    const pushStack = () => {
        const val = Number(sqInputValue) || Math.floor(Math.random() * 90) + 10;
        if (sqData.length >= 8) {
            alert("Stack/Queue Container is Full!");
            return;
        }
        setSqData([val, ...sqData]);
        setSqInputValue("");
    };

    const popStack = () => {
        if (sqData.length === 0) return;
        setSqData(sqData.slice(1));
    };

    const enqueueQueue = () => {
        const val = Number(sqInputValue) || Math.floor(Math.random() * 90) + 10;
        if (sqData.length >= 8) {
            alert("Stack/Queue Container is Full!");
            return;
        }
        setSqData([...sqData, val]);
        setSqInputValue("");
    };

    const dequeueQueue = () => {
        if (sqData.length === 0) return;
        setSqData(sqData.slice(1));
    };

    // ==========================================
    // 4. BST TREE STATES
    // ==========================================
    const [bstNodes, setBstNodes] = useState<any>({
        val: 50,
        left: {
            val: 30,
            left: { val: 20 },
            right: { val: 40 }
        },
        right: {
            val: 70,
            left: { val: 60 },
            right: { val: 80 }
        }
    });
    const [bstActiveNode, setBstActiveNode] = useState<number | null>(null);

    const bstTraverseInorder = async () => {
        setIsAnimating(true);
        animationRef.current = true;
        const order = [20, 30, 40, 50, 60, 70, 80];
        for (const val of order) {
            if (!animationRef.current) break;
            setBstActiveNode(val);
            await sleep(getDelay() * 3);
        }
        setBstActiveNode(null);
        setIsAnimating(false);
    };

    const bstTraversePreorder = async () => {
        setIsAnimating(true);
        animationRef.current = true;
        const order = [50, 30, 20, 40, 70, 60, 80];
        for (const val of order) {
            if (!animationRef.current) break;
            setBstActiveNode(val);
            await sleep(getDelay() * 3);
        }
        setBstActiveNode(null);
        setIsAnimating(false);
    };

    // ==========================================
    // 5. GRAPH STATES
    // ==========================================
    const graphNodes = [
        { id: 0, x: 100, y: 150, label: "A" },
        { id: 1, x: 220, y: 70, label: "B" },
        { id: 2, x: 220, y: 230, label: "C" },
        { id: 3, x: 340, y: 150, label: "D" }
    ];
    const graphEdges = [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 3 }
    ];
    const [graphActive, setGraphActive] = useState<number[]>([]);

    const runGraphBFS = async () => {
        setIsAnimating(true);
        animationRef.current = true;
        const order = [0, 1, 2, 3];
        for (const node of order) {
            if (!animationRef.current) break;
            setGraphActive(prev => [...prev, node]);
            await sleep(getDelay() * 4);
        }
        setIsAnimating(false);
    };

    const resetGraph = () => {
        setGraphActive([]);
        setIsAnimating(false);
        animationRef.current = false;
    };

    // Global animator controller
    const handleStartAnimation = async () => {
        if (isAnimating) {
            animationRef.current = false;
            setIsAnimating(false);
            return;
        }

        setIsAnimating(true);
        animationRef.current = true;

        if (activeTab === "sorting") {
            if (selectedSort === "BUBBLE") await runBubbleSort();
            else await runSelectionSort();
        } else if (activeTab === "searching") {
            if (searchMode === "BINARY") await runBinarySearch();
            else await runLinearSearch();
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 bg-muted/40 p-1 rounded-xl border border-border">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveTab(cat.id);
                            setIsAnimating(false);
                            animationRef.current = false;
                        }}
                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            activeTab === cat.id
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Global speed slider controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-6 flex-1 w-full">
                    {activeTab === "sorting" && (
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Algorithm</span>
                            <select
                                value={selectedSort}
                                onChange={(e) => setSelectedSort(e.target.value)}
                                className="bg-muted border border-border rounded-lg p-2 text-xs font-bold"
                            >
                                <option value="BUBBLE">Bubble Sort</option>
                                <option value="SELECTION">Selection Sort</option>
                            </select>
                        </div>
                    )}
                    {activeTab === "searching" && (
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground uppercase font-bold">Search Type</span>
                            <select
                                value={searchMode}
                                onChange={(e) => setSearchMode(e.target.value)}
                                className="bg-muted border border-border rounded-lg p-2 text-xs font-bold"
                            >
                                <option value="BINARY">Binary Search</option>
                                <option value="LINEAR">Linear Search</option>
                            </select>
                        </div>
                    )}

                    <div className="flex-1 space-y-1 max-w-[200px]">
                        <span className="text-xs text-muted-foreground uppercase font-bold">Speed: {speed}%</span>
                        <Slider value={[speed]} onValueChange={(val) => setSpeed(val[0])} min={10} max={100} />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => {
                        if (activeTab === "sorting") resetSortArray();
                        else if (activeTab === "searching") resetSearchArray();
                        else if (activeTab === "graphs") resetGraph();
                    }}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>

                    {["sorting", "searching"].includes(activeTab) && (
                        <Button onClick={handleStartAnimation} className="pink-glow font-bold min-w-[120px]">
                            {isAnimating ? "Pause" : "Visualize"}
                        </Button>
                    )}
                </div>
            </div>

            {/* Animation Canvas */}
            <Card className="h-[400px] flex items-center justify-center p-6 border border-border relative overflow-hidden glass-card">
                <AnimatePresence mode="wait">
                    {/* Sorting Array visual */}
                    {activeTab === "sorting" && (
                        <motion.div
                            key="sort"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-end justify-center w-full h-full gap-[3px]"
                        >
                            {sortArray.map((val, idx) => {
                                const isSorted = sortSorted.includes(idx);
                                const isActive = sortActive.includes(idx);
                                return (
                                    <motion.div
                                        key={idx}
                                        layout
                                        className={`w-full rounded-t-sm transition-colors duration-100 ${
                                            isSorted ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" :
                                            isActive ? "bg-primary shadow-[0_0_12px_rgba(253,16,94,0.6)]" :
                                            "bg-secondary hover:bg-secondary/90"
                                        }`}
                                        style={{ height: `${val}%` }}
                                    />
                                );
                            })}
                        </motion.div>
                    )}

                    {/* Searching Visual */}
                    {activeTab === "searching" && (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center w-full h-full gap-8"
                        >
                            <div className="flex gap-2">
                                {searchArray.map((val, idx) => {
                                    const isActive = searchActive.includes(idx);
                                    const isFound = searchFound === idx;
                                    const isLow = searchPointers.low === idx;
                                    const isHigh = searchPointers.high === idx;
                                    const isMid = searchPointers.mid === idx;

                                    return (
                                        <div key={idx} className="flex flex-col items-center">
                                            <motion.div
                                                animate={{ scale: isFound ? 1.15 : 1 }}
                                                className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold border transition-colors ${
                                                    isFound ? "bg-green-500 border-green-600 text-white shadow-lg" :
                                                    isActive ? "bg-primary border-primary text-white" :
                                                    "bg-muted border-border text-foreground"
                                                }`}
                                            >
                                                {val}
                                            </motion.div>
                                            <div className="h-6 mt-1 flex flex-col items-center text-[10px] font-bold font-mono">
                                                {isLow && <span className="text-blue-500">L</span>}
                                                {isMid && <span className="text-primary">M</span>}
                                                {isHigh && <span className="text-yellow-500">H</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-sm font-semibold">
                                Target Value: <span className="text-primary font-black">{searchTarget}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Stack & Queue Visual */}
                    {activeTab === "stack-queue" && (
                        <motion.div
                            key="stack-queue"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center w-full h-full gap-6"
                        >
                            <div className="flex items-center gap-4 bg-muted/30 p-4 border rounded-xl">
                                <Input
                                    type="number"
                                    placeholder="Value..."
                                    value={sqInputValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSqInputValue(e.target.value)}
                                    className="w-24 text-center"
                                />
                                <Button onClick={pushStack} size="sm" className="pink-glow">Push Stack</Button>
                                <Button onClick={popStack} size="sm" variant="outline">Pop Stack</Button>
                                <Button onClick={enqueueQueue} size="sm" className="pink-glow">Enqueue</Button>
                                <Button onClick={dequeueQueue} size="sm" variant="outline">Dequeue</Button>
                            </div>

                            {/* Stack visualization box */}
                            <div className="flex items-center gap-2 min-h-[60px] bg-muted/20 border border-border p-4 rounded-xl min-w-[300px] justify-center">
                                <AnimatePresence>
                                    {sqData.map((val, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ scale: 0, y: -20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            exit={{ scale: 0, y: 20 }}
                                            className="h-10 w-10 bg-primary/20 border border-primary/45 rounded-lg flex items-center justify-center font-bold text-xs shadow-inner text-primary"
                                        >
                                            {val}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {sqData.length === 0 && <span className="text-xs text-muted-foreground">Empty Container</span>}
                            </div>
                        </motion.div>
                    )}

                    {/* BST Tree visual */}
                    {activeTab === "bst" && (
                        <motion.div
                            key="bst"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center w-full h-full gap-4"
                        >
                            {/* Actions panel */}
                            <div className="flex gap-4">
                                <Button onClick={bstTraverseInorder} size="sm" className="pink-glow">Inorder traversal</Button>
                                <Button onClick={bstTraversePreorder} size="sm" variant="outline">Preorder traversal</Button>
                            </div>

                            {/* Node layout graph using SVG */}
                            <svg className="w-[400px] h-[220px] border border-border/40 rounded-xl bg-muted/10">
                                {/* Lines */}
                                <line x1="200" y1="40" x2="100" y2="100" stroke="#4b5563" strokeWidth="2" />
                                <line x1="200" y1="40" x2="300" y2="100" stroke="#4b5563" strokeWidth="2" />
                                <line x1="100" y1="100" x2="50" y2="160" stroke="#4b5563" strokeWidth="2" />
                                <line x1="100" y1="100" x2="150" y2="160" stroke="#4b5563" strokeWidth="2" />
                                <line x1="300" y1="100" x2="250" y2="160" stroke="#4b5563" strokeWidth="2" />
                                <line x1="300" y1="100" x2="350" y2="160" stroke="#4b5563" strokeWidth="2" />

                                {/* Root Node */}
                                <circle cx="200" cy="40" r="18" fill={bstActiveNode === 50 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="2" />
                                <text x="200" y="44" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">50</text>

                                {/* Left Child */}
                                <circle cx="100" cy="100" r="18" fill={bstActiveNode === 30 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="2" />
                                <text x="100" y="104" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">30</text>

                                {/* Right Child */}
                                <circle cx="300" cy="100" r="18" fill={bstActiveNode === 70 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="2" />
                                <text x="300" y="104" fill="white" fontSize="11" textAnchor="middle" fontWeight="bold">70</text>

                                {/* Leaves */}
                                <circle cx="50" cy="160" r="14" fill={bstActiveNode === 20 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="1.5" />
                                <text x="50" y="163" fill="white" fontSize="9" textAnchor="middle">20</text>

                                <circle cx="150" cy="160" r="14" fill={bstActiveNode === 40 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="1.5" />
                                <text x="150" y="163" fill="white" fontSize="9" textAnchor="middle">40</text>

                                <circle cx="250" cy="160" r="14" fill={bstActiveNode === 60 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="1.5" />
                                <text x="250" y="163" fill="white" fontSize="9" textAnchor="middle">60</text>

                                <circle cx="350" cy="160" r="14" fill={bstActiveNode === 80 ? "#fd105e" : "#1f2937"} stroke="#fd105e" strokeWidth="1.5" />
                                <text x="350" y="163" fill="white" fontSize="9" textAnchor="middle">80</text>
                            </svg>
                        </motion.div>
                    )}

                    {/* Graphs visual */}
                    {activeTab === "graphs" && (
                        <motion.div
                            key="graphs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center w-full h-full gap-4"
                        >
                            <div className="flex gap-4">
                                <Button onClick={runGraphBFS} size="sm" className="pink-glow">Run BFS Traversal</Button>
                                <Button onClick={resetGraph} size="sm" variant="outline">Reset Graph</Button>
                            </div>

                            <svg className="w-[400px] h-[220px] border border-border/40 rounded-xl bg-muted/10">
                                {/* Connect Edges */}
                                {graphEdges.map((e, idx) => {
                                    const fromNode = graphNodes.find(n => n.id === e.from)!;
                                    const toNode = graphNodes.find(n => n.id === e.to)!;
                                    return (
                                        <line
                                            key={idx}
                                            x1={fromNode.x}
                                            y1={fromNode.y}
                                            x2={toNode.x}
                                            y2={toNode.y}
                                            stroke="#4b5563"
                                            strokeWidth="2.5"
                                        />
                                    );
                                })}

                                {/* Draw Nodes */}
                                {graphNodes.map((n) => {
                                    const isActive = graphActive.includes(n.id);
                                    return (
                                        <g key={n.id}>
                                            <circle
                                                cx={n.x}
                                                cy={n.y}
                                                r="18"
                                                fill={isActive ? "#fd105e" : "#1f2937"}
                                                stroke="#fd105e"
                                                strokeWidth="2.5"
                                            />
                                            <text
                                                x={n.x}
                                                y={n.y + 4}
                                                fill="white"
                                                fontSize="11"
                                                textAnchor="middle"
                                                fontWeight="bold"
                                            >
                                                {n.label}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>

            {/* Complexity Table & Metadata Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Complexity Matrix</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <div className="flex justify-between border-b pb-2">
                            <span>Bubble Sort Time (Worst)</span>
                            <span className="font-mono text-foreground">O(n²)</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Binary Search Time (Worst)</span>
                            <span className="font-mono text-foreground">O(log n)</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Graph BFS/DFS Time (Worst)</span>
                            <span className="font-mono text-foreground">O(V + E)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>BST Insert Time (Average)</span>
                            <span className="font-mono text-foreground">O(log n)</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Interactive Debug Monitor</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs font-mono space-y-2 bg-slate-950 p-4 rounded-xl border border-border text-slate-300">
                        <div>[Init] Simulator mounted successfully.</div>
                        {isAnimating && <div className="text-primary animate-pulse">[Active] Algorithm running...</div>}
                        {!isAnimating && <div>[Idle] Select an algorithm and click visualize to begin.</div>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
