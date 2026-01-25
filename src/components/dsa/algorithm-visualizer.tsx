"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, Pause } from "lucide-react";
import { motion } from "framer-motion";

const ARRAY_SIZE = 50;
const MIN_VALUE = 10;
const MAX_VALUE = 100;

const ALGORITHMS = {
    BUBBLE: "Bubble Sort",
    SELECTION: "Selection Sort",
    INSERTION: "Insertion Sort",
    QUICK: "Quick Sort",
    MERGE: "Merge Sort",
};

export const AlgorithmVisualizer = () => {
    const [array, setArray] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("BUBBLE");
    const [speed, setSpeed] = useState(50);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const sortingRef = useRef<boolean>(false);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        if (isSorting) return;
        const newArray = Array.from({ length: ARRAY_SIZE }, () =>
            Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
        );
        setArray(newArray);
        setSortedIndices([]);
        setActiveIndices([]);
    };

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const getDelay = () => Math.max(1, 110 - speed);

    const bubbleSort = async () => {
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!sortingRef.current) return;

                setActiveIndices([j, j + 1]);
                await sleep(getDelay());

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                }
            }
            setSortedIndices((prev) => [...prev, n - i - 1]);
        }
        setSortedIndices(Array.from({ length: n }, (_, i) => i));
        setActiveIndices([]);
        setIsSorting(false);
        sortingRef.current = false;
    };

    const selectionSort = async () => {
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (!sortingRef.current) return;
                setActiveIndices([i, j]);
                await sleep(getDelay());
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                setArray([...arr]);
            }
            setSortedIndices((prev) => [...prev, i]);
        }
        setSortedIndices(Array.from({ length: n }, (_, i) => i));
        setActiveIndices([]);
        setIsSorting(false);
        sortingRef.current = false;
    };

    const insertionSort = async () => {
        const arr = [...array];
        const n = arr.length;
        setSortedIndices([0]);

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                if (!sortingRef.current) return;
                setActiveIndices([j, j + 1]);
                await sleep(getDelay());

                arr[j + 1] = arr[j];
                setArray([...arr]);
                j = j - 1;
            }
            arr[j + 1] = key;
            setArray([...arr]);
            setSortedIndices(prev => [...prev, i]);
        }
        setSortedIndices(Array.from({ length: n }, (_, i) => i));
        setActiveIndices([]);
        setIsSorting(false);
        sortingRef.current = false;
    };

    // Note: Quick and Merge sort are recursive and harder to animate in this simple iterative loop style without a custom stack or generator. 
    // For simplicity and robustness in this demo, implementing iterative Bubble, Selection, Insertion.

    const startSorting = async () => {
        if (isSorting) {
            // Stop
            sortingRef.current = false;
            setIsSorting(false);
            return;
        }

        setIsSorting(true);
        sortingRef.current = true;
        setSortedIndices([]);

        if (selectedAlgorithm === "BUBBLE") await bubbleSort();
        else if (selectedAlgorithm === "SELECTION") await selectionSort();
        else if (selectedAlgorithm === "INSERTION") await insertionSort();
        else {
            // Fallback for others
            setIsSorting(false);
            sortingRef.current = false;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">Algorithm</span>
                        <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm} disabled={isSorting}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Algorithm" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BUBBLE">Bubble Sort</SelectItem>
                                <SelectItem value="SELECTION">Selection Sort</SelectItem>
                                <SelectItem value="INSERTION">Insertion Sort</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1 min-w-[150px]">
                        <span className="text-sm font-medium text-muted-foreground">Speed</span>
                        <Slider
                            value={[speed]}
                            onValueChange={(value) => setSpeed(value[0])}
                            min={1}
                            max={100}
                            step={1}
                            disabled={isSorting}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={resetArray} disabled={isSorting}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        onClick={startSorting}
                        className={`${isSorting ? 'bg-destructive hover:bg-destructive/90' : 'pink-glow'} min-w-[120px]`}
                    >
                        {isSorting ? (
                            <>
                                <Pause className="h-4 w-4 mr-2" /> Stop
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4 mr-2" /> Start
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <Card className="h-[500px] flex items-end justify-center p-6 gap-[2px] overflow-hidden glass-card relative">
                <div className="absolute top-4 left-4 text-xs text-muted-foreground">
                    Comparison: <span className="text-primary font-bold">Pink</span> | Sorted: <span className="text-green-500 font-bold">Green</span>
                </div>
                {array.map((value, idx) => {
                    const isSorted = sortedIndices.includes(idx);
                    const isActive = activeIndices.includes(idx);

                    return (
                        <motion.div
                            layout
                            key={idx} // Using index as key for now since values aren't unique IDs, but effectively bars don't move just change height in this implement, actually with layout they might
                            className={`w-full rounded-t-sm transition-colors duration-100 ${isSorted
                                    ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    : isActive
                                        ? "bg-primary shadow-[0_0_15px_rgba(253,16,94,0.6)]"
                                        : "bg-secondary/80 hover:bg-secondary"
                                }`}
                            style={{
                                height: `${value}%`,
                            }}
                        />
                    );
                })}
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Algorithm Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2">
                        <div className="flex justify-between border-b pb-2">
                            <span>Time Complexity (Best)</span>
                            <span className="font-mono text-foreground">Ω(n)</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Time Complexity (Average)</span>
                            <span className="font-mono text-foreground">Θ(n²)</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Time Complexity (Worst)</span>
                            <span className="font-mono text-foreground">O(n²)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Space Complexity</span>
                            <span className="font-mono text-foreground">O(1)</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Code Snippet (Python)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded-lg text-xs font-mono overflow-x-auto">
                            {selectedAlgorithm === 'BUBBLE' && `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`}
                            {selectedAlgorithm === 'SELECTION' && `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`}
                            {selectedAlgorithm === 'INSERTION' && `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
