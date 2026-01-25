"use client";

import { MainNav } from "@/components/layout/main-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Link as LinkIcon, Twitter, Github, Linkedin, Award, Clock, BookOpen, Flame } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-background">
            <MainNav />
            <div className="container mx-auto py-8 lg:py-12 px-4">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 space-y-6">
                        <Card className="glass-card border-primary/20">
                            <CardContent className="pt-6 text-center">
                                <div className="relative inline-block mb-4">
                                    <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                                        <AvatarImage src="/avatars/01.png" />
                                        <AvatarFallback className="text-4xl">OM</AvatarFallback>
                                    </Avatar>
                                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md">
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <h2 className="text-2xl font-bold font-display">Om Graphique</h2>
                                <p className="text-muted-foreground mb-4">Computer Engineering Student</p>
                                <div className="flex justify-center gap-2 mb-6">
                                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">Level 12</Badge>
                                    <Badge variant="outline" className="border-amber-500/20 bg-amber-500/5 text-amber-500">Pro Member</Badge>
                                </div>

                                <div className="space-y-3 text-left text-sm">
                                    <div className="flex items-center text-muted-foreground">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        Mumbai, India
                                    </div>
                                    <div className="flex items-center text-muted-foreground">
                                        <LinkIcon className="h-4 w-4 mr-2" />
                                        <a href="#" className="hover:text-primary hover:underline">omgraphique.com</a>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 mt-6">
                                    <Button variant="ghost" size="icon" className="hover:text-primary">
                                        <Github className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:text-primary">
                                        <Twitter className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:text-primary">
                                        <Linkedin className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                            <Flame className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium">Streak</span>
                                    </div>
                                    <span className="font-mono font-bold text-lg">14 Days</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium">Study Time</span>
                                    </div>
                                    <span className="font-mono font-bold text-lg">42.5 Hrs</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium">Topics</span>
                                    </div>
                                    <span className="font-mono font-bold text-lg">24/150</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                            <Award className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium">Badges</span>
                                    </div>
                                    <span className="font-mono font-bold text-lg">8</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <Tabs defaultValue="profile" className="space-y-6">
                            <TabsList>
                                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Update your personal details here.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input id="firstName" defaultValue="Om" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input id="lastName" defaultValue="Graphique" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" defaultValue="om@example.com" disabled />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input id="phone" placeholder="+1 234 567 890" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea id="bio" placeholder="Tell us about yourself" className="min-h-[100px]" defaultValue="Passionate about learning Algorithms and System Design." />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button className="pink-glow">Save Changes</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Change Password</CardTitle>
                                        <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input id="current-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                            <Input id="confirm-password" type="password" />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button>Update Password</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="notifications">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Email Notifications</CardTitle>
                                        <CardDescription>Manage your email preferences.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">Notification settings coming soon.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
