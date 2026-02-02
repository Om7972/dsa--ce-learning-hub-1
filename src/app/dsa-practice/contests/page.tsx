
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Timer, Calendar, ChevronRight, BarChart2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contest {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    status: 'upcoming' | 'active' | 'ended';
}

export default function ContestsPage() {
    const [contests, setContests] = useState<Contest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await fetch('/api/contests');
                const data = await res.json();
                if (Array.isArray(data)) setContests(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchContests();
    }, []);

    const activeContests = contests.filter(c => c.status === 'active');
    const upcomingContests = contests.filter(c => c.status === 'upcoming');
    const pastContests = contests.filter(c => c.status === 'ended');

    return (
        <div className="container mx-auto p-6 max-w-6xl space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                        Timed Contests
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2">
                        Compete in real-time. Rise up the leaderboard.
                    </p>
                </div>
                <div className="flex gap-4 text-center">
                    <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-2xl font-bold">1200</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Rating</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-2xl font-bold">#42</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Global Rank</p>
                    </div>
                </div>
            </motion.div>

            {/* Active Contest Hero */}
            {activeContests.length > 0 && (
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="p-1 rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
                >
                    <Card className="border-0">
                        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4">
                                <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">LIVE NOW</Badge>
                                <h2 className="text-3xl font-bold">{activeContests[0].title}</h2>
                                <p className="text-lg text-muted-foreground">{activeContests[0].description}</p>
                                <div className="flex items-center gap-6 text-sm font-medium">
                                    <span className="flex items-center gap-2">
                                        <Timer className="w-4 h-4 text-primary" /> Ends in 02:45:00
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <BarChart2 className="w-4 h-4 text-primary" /> 1,204 Participants
                                    </span>
                                </div>
                            </div>
                            <Button size="lg" className="w-full md:w-auto h-14 text-lg px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700">
                                Enter Contest <ChevronRight className="ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="w-full max-w-md grid grid-cols-2 mb-8 mx-auto">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past Contests</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {upcomingContests.length === 0 && <p className="text-center text-muted-foreground p-8">No upcoming contests scheduled.</p>}
                    {upcomingContests.map(contest => (
                        <ContestCard key={contest.id} contest={contest} />
                    ))}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                    {pastContests.map(contest => (
                        <ContestCard key={contest.id} contest={contest} isPast />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ContestCard({ contest, isPast = false }: { contest: Contest, isPast?: boolean }) {
    const startDate = new Date(contest.start_time).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    const startTime = new Date(contest.start_time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-secondary text-secondary-foreground font-bold">
                        <span className="text-xs uppercase">{new Date(contest.start_time).toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-2xl">{new Date(contest.start_time).getDate()}</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">{contest.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {startDate}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {startTime}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {isPast ? (
                        <Button variant="outline" className="w-full">View Results</Button>
                    ) : (
                        <Button className="w-full">Register</Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

function Clock(props: any) {
    return <Timer {...props} />;
}
