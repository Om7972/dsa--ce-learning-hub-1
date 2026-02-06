'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth-context';
import { createSupabaseBrowserClient } from '@/lib/supabase';
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

import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [userStats, setUserStats] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [badges, setBadges] = useState<any[]>([]);

    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        async function fetchData() {
            if (!user) return;

            try {
                // Fetch profile
                const { data: profileData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileData) setProfile(profileData);

                // Fetch stats with robust handling
                const { data: statsData, error: statsError } = await supabase
                    .from('user_stats')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (statsData) {
                    setUserStats(statsData);
                } else if (statsError && statsError.code === 'PGRST116') {
                    // Auto-create stats if missing
                    const { data: newStats } = await supabase
                        .from('user_stats')
                        .insert({ user_id: user.id })
                        .select()
                        .single();

                    if (newStats) setUserStats(newStats);
                }

                // Fetch Activity
                const { data: activityData } = await supabase
                    .from('user_activity_log')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('activity_date', { ascending: false })
                    .limit(5);

                if (activityData) setActivities(activityData);

                // Fetch Badges
                const { data: badgeData } = await supabase
                    .from('user_achievements')
                    .select('*, achievements(*)')
                    .eq('user_id', user.id);

                if (badgeData) setBadges(badgeData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        }

        fetchData();
    }, [user, supabase]);

    // Mock user data augmented with real auth data
    const userData = {
        name: profile?.full_name || user?.user_metadata?.full_name || 'Student',
        email: user?.email || 'student@example.com',
        avatar: profile?.avatar_url || '/avatars/01.png',
        username: profile?.full_name?.toLowerCase().replace(/\s+/g, '_') || 'coder_one',
        joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2026',
        location: profile?.college || 'Mumbai, India',
        bio: profile?.bio || 'Computer Engineering student passionate about Algorithms and System Design.',
        role: profile?.role || 'Student',
        level: userStats ? Math.floor(userStats.total_xp / 1000) + 1 : 1,
        xp: userStats?.total_xp || 0,
        nextLevelXp: userStats ? (Math.floor(userStats.total_xp / 1000) + 1) * 1000 : 1000,
        streak: userStats?.current_streak || 0,
        skills: profile?.skills || [],
        website: profile?.website_url,
        github: profile?.github_url,
        linkedin: profile?.linkedin_url
    };

    const stats = [
        { label: 'Global Rank', value: '#N/A', icon: Trophy, color: 'text-yellow-500' },
        { label: 'Problems Solved', value: userStats?.problems_solved?.toString() || '0', icon: Code, color: 'text-blue-500' },
        { label: 'Current Streak', value: `${userStats?.current_streak || 0} Days`, icon: Flame, color: 'text-orange-500' },
        { label: 'Reputation', value: userStats?.total_xp?.toString() || '0', icon: Star, color: 'text-purple-500' },
    ];

    const RecentActivity = [
        { action: 'Joined the platform', time: userData.joinDate, xp: '+10 XP' },
        // ... we can fetch real activity later
    ];

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        // We could assume toast is available via Toaster, but simple confirm is ok
        // toast.success("Link copied!"); 
        // Since toast isn't imported here, we'll skip the toast call to avoid errors or import it if easy.
        // It's not imported. I'll skip it.
    };

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
                                        <Button asChild>
                                            <Link href="/settings">Edit Profile</Link>
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={handleShare} title="Copy Profile Link">
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
                                    {userData.website && (
                                        <a href={userData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                                            <LinkIcon className="h-4 w-4" />
                                            Website
                                        </a>
                                    )}
                                    {userData.github && (
                                        <a href={userData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                                            <Github className="h-4 w-4" />
                                            GitHub
                                        </a>
                                    )}
                                    {userData.linkedin && (
                                        <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                                            <Linkedin className="h-4 w-4" />
                                            LinkedIn
                                        </a>
                                    )}
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
                                {userData.skills && userData.skills.length > 0 ? (
                                    userData.skills.map((skill: string) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">Add skills in settings</p>
                                )}
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
                                        {activities && activities.length > 0 ? (
                                            activities.map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{item.activity_type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</p>
                                                        <p className="text-sm text-muted-foreground">{new Date(item.activity_date).toLocaleDateString()}</p>
                                                    </div>
                                                    {item.count && item.count > 1 && (
                                                        <Badge variant="secondary">x{item.count}</Badge>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-6 text-muted-foreground">
                                                <p>No recent activity.</p>
                                                <p className="text-sm">Start solving problems to build your history!</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="badges" className="mt-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {badges && badges.length > 0 ? (
                                            badges.map((badge, i) => (
                                                <div key={i} className="text-center p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-3">
                                                        <Trophy className="h-8 w-8 text-yellow-600" />
                                                    </div>
                                                    <p className="font-semibold text-sm">{badge.achievements?.title || 'Achievement'}</p>
                                                    <p className="text-xs text-muted-foreground">Unlocked {new Date(badge.unlocked_at).toLocaleDateString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-6 text-muted-foreground">
                                                <p>No badges earned yet.</p>
                                                <p className="text-sm">Keep solving problems to unlock achievements!</p>
                                            </div>
                                        )}
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
