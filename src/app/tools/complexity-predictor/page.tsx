'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Zap, Database, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function ComplexityPredictorPage() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handlePredict = async () => {
        if (!code.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch('/api/complexity/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language })
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
        <div className="container mx-auto p-6 max-w-5xl space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                    <Calculator className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-4xl font-bold">Complexity Predictor</h1>
                <p className="text-xl text-muted-foreground">
                    Analyze your code snippet to predict Time and Space Complexity instantly.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-[1.5fr,1fr] gap-8">
                {/* Input Section */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Source Code</CardTitle>
                        <CardDescription>Select language and paste your code.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1">
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="java">Java</SelectItem>
                                <SelectItem value="cpp">C++</SelectItem>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                            </SelectContent>
                        </Select>

                        <Textarea
                            className="font-mono h-[400px] text-sm resize-none"
                            placeholder={`def example(n):\n    for i in range(n):\n        print(i)`}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />

                        <Button
                            onClick={handlePredict}
                            disabled={loading || !code}
                            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                            {loading ? <Zap className="animate-spin mr-2" /> : <Zap className="mr-2" />}
                            {loading ? 'Analyzing Structure...' : 'Predict Complexity'}
                        </Button>
                    </CardContent>
                </Card>

                {/* Output Section */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                {/* Time Complexity */}
                                <Card className="border-l-4 border-l-orange-500 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Clock className="w-24 h-24" />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-muted-foreground text-sm uppercase tracking-wider">Time Complexity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-5xl font-mono font-bold text-orange-600 dark:text-orange-400">
                                            {result.timeComplexity}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Space Complexity */}
                                <Card className="border-l-4 border-l-blue-500 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Database className="w-24 h-24" />
                                    </div>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-muted-foreground text-sm uppercase tracking-wider">Space Complexity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-5xl font-mono font-bold text-blue-600 dark:text-blue-400">
                                            {result.spaceComplexity}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Explanation */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <ArrowRight className="w-5 h-5 text-primary" /> Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {result.explanation}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!result && !loading && (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 border-2 border-dashed rounded-xl opacity-50">
                            <Calculator className="w-16 h-16 mb-4" />
                            <p>Enter code to see prediction</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
