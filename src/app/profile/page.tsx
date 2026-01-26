'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import {
    User,
    Mail,
    Calendar,
    MapPin,
    Link as LinkIcon,
    Twitter,
    Github,
    Linkedin,
    Trophy,
    Flame,
    Star,
    Target,
    Zap,
    Code
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfilePage() {
    const { user } = useAuth();

    // Mock user data augmented with real auth data
    const userData = {
        name: user?.user_metadata?.full_name || 'Student',
        email: user?.email || 'student@example.com',
        avatar: '/avatars/01.png',
        username: 'coder_one',
        joinDate: 'January 2026',
        location: 'Mumbai, India',
        bio: 'Computer Engineering student passionate about Algorithms and System Design. Currently learning Graph Theory.',
        role: 'Student',
        level: 12,
        xp: 12500,
        nextLevelXp: 15000,
        streak: 7
    };

    const stats = [
        { label: 'Global Rank', value: '#1,234', icon: Trophy, color: 'text-yellow-500' },
        { label: 'Problems Solved', value: '145', icon: Code, color: 'text-blue-500' },
        { label: 'Current Streak', value: '7 Days', icon: Flame, color: 'text-orange-500' },
        { label: 'Reputation', value: '850', icon: Star, color: 'text-purple-500' },
    ];

    const RecentActivity = [
        { action: 'Solved "Two Sum"', time: '2 hours ago', xp: '+50 XP' },
        { action: 'Completed "Arrays" Module', time: '1 day ago', xp: '+200 XP' },
        { action: 'Earned "Week Warrior" Badge', time: '2 days ago', xp: '+100 XP' },
        { action: 'Started "Graph Theory"', time: '3 days ago', xp: '' },
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header / Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-primary to-purple-600" />
                    <CardContent className="relative pt-0">
                        <div className="flex flex-col md:flex-row items-start gap-6 -mt-12 px-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                                    <AvatarImage src={userData.avatar} />
                                    <AvatarFallback className="text-4xl">{userData.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-green-500 border-2 border-background" />
                            </motion.div>

                            <div className="flex-1 mt-12 md:mt-14 space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold flex items-center gap-2">
                                            {userData.name}
                                            <Badge variant="secondary" className="ml-2">Lvl {userData.level}</Badge>
                                        </h1>
                                        <p className="text-muted-foreground">@{userData.username}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button>Edit Profile</Button>
                                        <Button variant="outline" size="icon">
                                            <LinkIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-muted-foreground max-w-2xl">
                                    {userData.bio}
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {userData.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Joined {userData.joinDate}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        {userData.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column - Stats & XP */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* XP Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">XP Progress</span>
                                    <span className="text-muted-foreground">{userData.xp} / {userData.nextLevelXp}</span>
                                </div>
                                <Progress value={(userData.xp / userData.nextLevelXp) * 100} className="h-2" />
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-3 bg-muted/50 rounded-lg text-center">
                                        <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                                        <div className="font-bold text-lg">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {['C++', 'Java', 'Python', 'React', 'Algorithms', 'Data Structures', 'System Design'].map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Main Column - Activity & Badges */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 space-y-6"
                >
                    <Tabs defaultValue="activity">
                        <TabsList>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="badges">Badges</TabsTrigger>
                            <TabsTrigger value="solved">Solved Problems</TabsTrigger>
                        </TabsList>

                        <TabsContent value="activity" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Your latest learning milestones</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {RecentActivity.map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                                <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.action}</p>
                                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                                </div>
                                                {item.xp && (
                                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                                        {item.xp}
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="badges" className="mt-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="text-center p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                                                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-3">
                                                    <Trophy className="h-8 w-8 text-yellow-600" />
                                                </div>
                                                <p className="font-semibold text-sm">Achievement {i}</p>
                                                <p className="text-xs text-muted-foreground">Unlocked</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
