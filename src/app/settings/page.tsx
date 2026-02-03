'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Save,
    Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import { toast } from 'sonner';

export default function SettingsPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Profile State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [userId, setUserId] = useState('');

    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                setUserId(user.id);
                setEmail(user.email || '');

                const { data: profile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    const names = (profile.full_name || '').split(' ');
                    setFirstName(names[0] || '');
                    setLastName(names.slice(1).join(' ') || '');
                    setPhone(profile.phone || '');
                    setBio(profile.bio || '');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveProfile = async () => {
        setUpdating(true);
        try {
            const fullName = `${firstName} ${lastName}`.trim();
            const { error } = await supabase
                .from('users')
                .update({
                    full_name: fullName,
                    phone,
                    bio
                })
                .eq('id', userId);

            if (error) throw error;
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        } finally {
            setUpdating(false);
        }
    };

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        achievements: true,
        reminders: false,
        newsletter: true
    });

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading settings...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-muted-foreground text-lg">
                    Manage your account settings and preferences
                </p>
            </motion.div>

            {/* Settings Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="profile">
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="notifications">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="security">
                            <Shield className="h-4 w-4 mr-2" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger value="preferences">
                            <Palette className="h-4 w-4 mr-2" />
                            Preferences
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Avatar */}
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} />
                                        <AvatarFallback>{firstName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button variant="outline" size="sm">Change Avatar</Button>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG or GIF. Max size 2MB.
                                        </p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            disabled
                                            className="bg-muted text-muted-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input
                                            id="bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button onClick={handleSaveProfile} disabled={updating}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Choose what notifications you want to receive</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <NotificationToggle
                                    icon={Mail}
                                    title="Email Notifications"
                                    description="Receive updates via email"
                                    checked={notifications.email}
                                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, email: checked })}
                                />
                                <NotificationToggle
                                    icon={Bell}
                                    title="Push Notifications"
                                    description="Receive push notifications in browser"
                                    checked={notifications.push}
                                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, push: checked })}
                                />
                                <NotificationToggle
                                    icon={Badge}
                                    title="Achievement Alerts"
                                    description="Get notified when you earn new badges"
                                    checked={notifications.achievements}
                                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, achievements: checked })}
                                />
                                <NotificationToggle
                                    icon={Bell}
                                    title="Study Reminders"
                                    description="Daily reminders to keep your streak"
                                    checked={notifications.reminders}
                                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, reminders: checked })}
                                />
                                <NotificationToggle
                                    icon={Mail}
                                    title="Newsletter"
                                    description="Monthly newsletter with tips and updates"
                                    checked={notifications.newsletter}
                                    onCheckedChange={(checked: boolean) => setNotifications({ ...notifications, newsletter: checked })}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>Update your password to keep your account secure</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showPassword ? 'text' : 'password'}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                                <Button>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200 dark:border-red-900">
                            <CardHeader>
                                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                <CardDescription>Irreversible actions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Delete Account</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Permanently delete your account and all data
                                        </p>
                                    </div>
                                    <Button variant="destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize how the app looks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Palette className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">Theme</p>
                                            <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Light</Button>
                                        <Button variant="outline" size="sm">Dark</Button>
                                        <Button variant="default" size="sm">System</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Language & Region</CardTitle>
                                <CardDescription>Set your language and timezone</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Input id="language" defaultValue="English (US)" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
}

function NotificationToggle({ icon: Icon, title, description, checked, onCheckedChange }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
        </div>
    );
}
