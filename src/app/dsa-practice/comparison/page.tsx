
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Scale, Code, BookOpen, Clock, Database, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Algorithm {
    id: number;
    name: string;
    description: string;
    complexity_time_best: string;
    complexity_time_average: string;
    complexity_time_worst: string;
    complexity_space: string;
    use_cases: string[];
    pseudocode: string;
}

export default function AlgorithmComparisonPage() {
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
    const [algo1Id, setAlgo1Id] = useState<string>('');
    const [algo2Id, setAlgo2Id] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlgorithms = async () => {
            try {
                const res = await fetch('/api/algorithms');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAlgorithms(data);
                    if (data.length >= 2) {
                        setAlgo1Id(data[0].id.toString());
                        setAlgo2Id(data[1].id.toString());
                    }
                }
            } catch (error) {
                console.error("Failed to fetch algorithms", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAlgorithms();
    }, []);

    const algo1 = algorithms.find(a => a.id.toString() === algo1Id);
    const algo2 = algorithms.find(a => a.id.toString() === algo2Id);

    if (loading) return <div className="p-8 text-center">Loading algorithms...</div>;

    return (
        <div className="container mx-auto p-6 space-y-8 max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
                    <ArrowRightLeft className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Algorithm Comparison
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Compare algorithms side-by-side to understand their trade-offs in time complexity, space usage, and implementation.
                </p>
            </motion.div>

            {/* Selection Area */}
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center bg-card p-6 rounded-xl border shadow-sm">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Algorithm A</label>
                    <Select value={algo1Id} onValueChange={setAlgo1Id}>
                        <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {algorithms.map(a => (
                                <SelectItem key={a.id} value={a.id.toString()}>{a.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-center">
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 bg-muted" onClick={() => {
                        const temp = algo1Id;
                        setAlgo1Id(algo2Id);
                        setAlgo2Id(temp);
                    }}>
                        <ArrowRightLeft className="w-5 h-5" />
                    </Button>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Algorithm B</label>
                    <Select value={algo2Id} onValueChange={setAlgo2Id}>
                        <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Select Algorithm" />
                        </SelectTrigger>
                        <SelectContent>
                            {algorithms.map(a => (
                                <SelectItem key={a.id} value={a.id.toString()}>{a.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Comparison Grid */}
            {algo1 && algo2 && (
                <div className="grid md:grid-cols-2 gap-6">
                    <AlgorithmCard algorithm={algo1} color="blue" />
                    <AlgorithmCard algorithm={algo2} color="purple" />
                </div>
            )}

            {/* Detailed Comparison Table */}
            {algo1 && algo2 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="w-5 h-5" />
                            Direct Comparison
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="font-semibold text-muted-foreground">Metric</div>
                            <div className="font-bold text-center text-blue-600">{algo1.name}</div>
                            <div className="font-bold text-center text-purple-600">{algo2.name}</div>

                            <div className="col-span-3 border-b my-2" />

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Best Time
                            </div>
                            <div className="text-center bg-green-500/10 p-1 rounded font-mono">{algo1.complexity_time_best}</div>
                            <div className="text-center bg-green-500/10 p-1 rounded font-mono">{algo2.complexity_time_best}</div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Average Time
                            </div>
                            <div className="text-center bg-yellow-500/10 p-1 rounded font-mono">{algo1.complexity_time_average}</div>
                            <div className="text-center bg-yellow-500/10 p-1 rounded font-mono">{algo2.complexity_time_average}</div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Worst Time
                            </div>
                            <div className="text-center bg-red-500/10 p-1 rounded font-mono">{algo1.complexity_time_worst}</div>
                            <div className="text-center bg-red-500/10 p-1 rounded font-mono">{algo2.complexity_time_worst}</div>

                            <div className="flex items-center gap-2">
                                <Database className="w-4 h-4" /> Space Complexity
                            </div>
                            <div className="text-center bg-blue-500/10 p-1 rounded font-mono">{algo1.complexity_space}</div>
                            <div className="text-center bg-blue-500/10 p-1 rounded font-mono">{algo2.complexity_space}</div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function AlgorithmCard({ algorithm, color }: { algorithm: Algorithm, color: 'blue' | 'purple' }) {
    const borderColor = color === 'blue' ? 'border-primary/50' : 'border-purple-500/50';
    const textColor = color === 'blue' ? 'text-primary' : 'text-purple-500';

    return (
        <Card className={`border-2 ${borderColor} shadow-lg transition-all hover:shadow-xl`}>
            <CardHeader>
                <CardTitle className={`text-2xl ${textColor}`}>{algorithm.name}</CardTitle>
                <CardDescription>{algorithm.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Use Cases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {algorithm.use_cases?.map((useCase, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-secondary/50">
                                {useCase}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="bg-muted rounded-lg p-4 overflow-hidden">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Code className="w-4 h-4" /> Pseudocode
                    </h3>
                    <div className="text-xs font-mono overflow-x-auto">
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: 0 }}>
                            {algorithm.pseudocode || '// No code available'}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
