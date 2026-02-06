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
    const [avatarUrl, setAvatarUrl] = useState('');

    // New Fields
    const [website, setWebsite] = useState('');
    const [github, setGithub] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [skills, setSkills] = useState(''); // Comma separated

    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                setUserId(user.id);
                setEmail(user.email || '');

                const { data: profile, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    console.error("Error fetching profile:", error);
                    return;
                }

                if (profile) {
                    const names = (profile.full_name || '').split(' ');
                    setFirstName(names[0] || user.user_metadata?.full_name?.split(' ')[0] || '');
                    setLastName(names.slice(1).join(' ') || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '');
                    setPhone(profile.phone || '');
                    setBio(profile.bio || '');
                    setAvatarUrl(profile.avatar_url || '');

                    setWebsite(profile.website_url || '');
                    setGithub(profile.github_url || '');
                    setLinkedin(profile.linkedin_url || '');
                    setSkills(profile.skills ? profile.skills.join(', ') : '');
                }
            } catch (error) {
                console.error("Unexpected error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [supabase]);

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files || event.target.files.length === 0) return;
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            setUpdating(true);
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // Update user profile
            const { error: updateError } = await supabase
                .from('users')
                .update({ avatar_url: publicUrl })
                .eq('id', userId);

            if (updateError) throw updateError;

            setAvatarUrl(publicUrl);
            toast.success("Avatar updated!");
        } catch (error: any) {
            console.error("Error uploading avatar:", error);
            toast.error("Error uploading avatar: " + (error.message || "Unknown error"));
        } finally {
            setUpdating(false);
        }
    };

    const handleSaveProfile = async () => {
        setUpdating(true);
        try {
            const fullName = `${firstName} ${lastName}`.trim();
            const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);

            const { error } = await supabase
                .from('users')
                .update({
                    full_name: fullName,
                    phone,
                    bio,
                    website_url: website,
                    github_url: github,
                    linkedin_url: linkedin,
                    skills: skillsArray
                })
                .eq('id', userId);

            if (error) throw error;
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile: " + (error.message || "Check console"));
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
        return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading settings...</div>;
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
                                <CardDescription>Update your personal details and public profile.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* Avatar */}
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                                        <AvatarImage src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} />
                                        <AvatarFallback>{firstName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2 text-center sm:text-left">
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" className="relative cursor-pointer overflow-hidden">
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    accept="image/*"
                                                    onChange={handleAvatarUpload}
                                                    disabled={updating}
                                                />
                                                {updating ? 'Uploading...' : 'Change Avatar'}
                                            </Button>
                                            {avatarUrl && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => setAvatarUrl('')}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG or GIF. Max size 2MB.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    {/* Personal Info */}
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
                                                placeholder="+1 234 567 890"
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input
                                            id="bio"
                                            value={bio}
                                            placeholder="Tell us a little about yourself"
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>

                                    {/* Skills */}
                                    <div className="space-y-2">
                                        <Label htmlFor="skills">Skills</Label>
                                        <Input
                                            id="skills"
                                            value={skills}
                                            placeholder="React, Java, System Design (comma separated)"
                                            onChange={(e) => setSkills(e.target.value)}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Separate skills with commas.
                                        </p>
                                    </div>

                                    {/* Social Links */}
                                    <div className="space-y-4 pt-2">
                                        <h3 className="font-semibold text-sm">Social Profiles</h3>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="website">Website</Label>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="website"
                                                        value={website}
                                                        placeholder="https://your-site.com"
                                                        className="pl-9"
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="github">GitHub</Label>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="github"
                                                        value={github}
                                                        placeholder="https://github.com/..."
                                                        className="pl-9"
                                                        onChange={(e) => setGithub(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="linkedin">LinkedIn</Label>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="linkedin"
                                                        value={linkedin}
                                                        placeholder="https://linkedin.com/in/..."
                                                        className="pl-9"
                                                        onChange={(e) => setLinkedin(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button onClick={handleSaveProfile} disabled={updating} className="min-w-[120px]">
                                        <Save className="mr-2 h-4 w-4" />
                                        {updating ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
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
