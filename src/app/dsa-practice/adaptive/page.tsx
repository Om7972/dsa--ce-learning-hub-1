
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Trophy, ArrowRight, Zap, Target, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function AdaptivePracticePage() {
    const [rating, setRating] = useState(1000);
    const [difficulty, setDifficulty] = useState('Loading...');
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecommendation = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/adaptive/recommend');
            const data = await res.json();
            setRating(data.userRating);
            setDifficulty(data.recommendedDifficulty);
            setRecommendations(data.problems);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendation();
    }, []);

    return (
        <div className="container mx-auto p-6 max-w-5xl space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
            >
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-2">
                    <Crosshair className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                    Adaptive Difficulty Engine
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    A personalized practice mode that adapts to your speed and accuracy in real-time.
                </p>
            </motion.div>

            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-t-4 border-t-indigo-500 shadow-md">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Gauge className="w-8 h-8 text-indigo-500 mb-2" />
                        <p className="text-sm font-medium text-muted-foreground uppercase">Current Rating</p>
                        <h2 className="text-4xl font-bold mt-1">{rating}</h2>
                        <Badge variant="secondary" className="mt-2">Top 45%</Badge>
                    </CardContent>
                </Card>
                <Card className="border-t-4 border-t-cyan-500 shadow-md">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Target className="w-8 h-8 text-cyan-500 mb-2" />
                        <p className="text-sm font-medium text-muted-foreground uppercase">Accuracy Rate</p>
                        <h2 className="text-4xl font-bold mt-1">78%</h2>
                        <Progress value={78} className="w-full mt-3 h-2" />
                    </CardContent>
                </Card>
                <Card className="border-t-4 border-t-pink-500 shadow-md">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Zap className="w-8 h-8 text-pink-500 mb-2" />
                        <p className="text-sm font-medium text-muted-foreground uppercase">Streak</p>
                        <h2 className="text-4xl font-bold mt-1">5 Days</h2>
                        <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Recommendation Area */}
            <Card className="overflow-hidden border-2 border-primary/10 shadow-xl">
                <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <CardHeader className="bg-muted/10">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                Recommended for You
                            </CardTitle>
                            <CardDescription>
                                Based on your rating, we suggest focusing on <strong>{difficulty}</strong> problems.
                            </CardDescription>
                        </div>
                        <Button variant="outline" onClick={fetchRecommendation} disabled={loading}>
                            Refresh
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-12 text-center text-muted-foreground">
                            Analyzing your performance history...
                        </div>
                    ) : recommendations.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground">
                            No problems found for this difficulty level yet.
                        </div>
                    ) : (
                        <div className="divide-y">
                            {recommendations.map((prob, idx) => (
                                <div key={idx} className="p-6 flex items-center justify-between hover:bg-muted/5 transition-colors group">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">{prob.title}</h3>
                                            <Badge className={
                                                prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' :
                                                    prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200' :
                                                        'bg-red-100 text-red-700 hover:bg-red-200 border-red-200'
                                            }>
                                                {prob.difficulty}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {prob.description || "Solve this problem to increase your rating."}
                                        </p>
                                    </div>
                                    <Button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        Solve Now <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="bg-muted/10 p-4 justify-center">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Trophy className="w-3 h-3" /> Solving these will increase your rating by ~15 points
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
