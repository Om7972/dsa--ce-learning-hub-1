
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Search, Activity, RotateCcw, Check, Bug } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { createBrowserClient } from '@supabase/ssr';

export default function MistakeAnalyzerPage() {
    return (
        <div className="container mx-auto p-6 max-w-6xl space-y-8">
            <div className="space-y-4 text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                    <Bug className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-4xl font-bold">DSA Mistake Analyzer</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Identify patterns in your wrong submissions and get AI-powered feedback to improve your logic.
                </p>
            </div>

            <Tabs defaultValue="analyze" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                    <TabsTrigger value="analyze">Analyze New Mistake</TabsTrigger>
                    <TabsTrigger value="history">Mistake History</TabsTrigger>
                </TabsList>

                <TabsContent value="analyze">
                    <AnalyzerForm />
                </TabsContent>

                <TabsContent value="history">
                    <HistoryView />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function AnalyzerForm() {
    const [code, setCode] = useState('');
    const [problemTitle, setProblemTitle] = useState('');
    const [errorType, setErrorType] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!code.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/mistakes/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, problemTitle, errorType })
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Submission Details</CardTitle>
                    <CardDescription>Paste your incorrect code snippet below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Problem Title</label>
                        <Input
                            placeholder="e.g. Two Sum, Merge Sort"
                            value={problemTitle}
                            onChange={e => setProblemTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Error Observed (Optional)</label>
                        <Input
                            placeholder="e.g. Wrong Answer on Test Case 3"
                            value={errorType}
                            onChange={e => setErrorType(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-1 block">Code Snippet</label>
                        <Textarea
                            className="font-mono h-64 text-sm"
                            placeholder="// Paste your code here..."
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleAnalyze} disabled={loading || !code} className="w-full">
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Activity className="animate-spin w-4 h-4" /> Analyzing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Search className="w-4 h-4" /> Detect Mistakes
                            </span>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <div className="space-y-6">
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Card className="border-l-4 border-l-red-500 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="w-5 h-5" />
                                    {result.mistakePattern || "Issue Detected"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-muted p-4 rounded-lg text-sm">
                                    <h4 className="font-semibold mb-2">Feedback:</h4>
                                    <p>{result.feedback}</p>
                                </div>

                                {result.suggestion && (
                                    <Alert className="bg-green-500/10 border-green-500/50 text-green-900 dark:text-green-100">
                                        <Check className="h-4 w-4 text-green-600" />
                                        <AlertTitle>Suggestion</AlertTitle>
                                        <AlertDescription>{result.suggestion}</AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {!result && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 border-2 border-dashed rounded-xl">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>Analysis results will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function HistoryView() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data } = await supabase
                .from('mistake_history')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) setHistory(data);
            setLoading(false);
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading history...</div>;

    if (history.length === 0) {
        return (
            <div className="text-center p-12 border rounded-xl bg-muted/20">
                <RotateCcw className="w-10 h-10 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium">No History Found</h3>
                <p className="text-muted-foreground">You haven't analyzed any mistakes yet.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {history.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg">{item.problem_title || 'Untitled Problem'}</CardTitle>
                                <CardDescription>
                                    {new Date(item.created_at).toLocaleDateString()}
                                </CardDescription>
                            </div>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                {item.mistake_pattern}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4 grid md:grid-cols-2 gap-4">
                        <div className="bg-black/5 rounded p-2 text-xs font-mono h-24 overflow-y-auto">
                            <pre>{item.submission_code}</pre>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium mb-1">Feedback:</p>
                            <p className="text-muted-foreground">{item.feedback}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
