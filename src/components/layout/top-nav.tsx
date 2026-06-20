'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    Search,
    Menu,
    X,
    User,
    Settings,
    LogOut,
    Trophy,
    Flame,
    Star,
    ChevronDown,
    Sparkles,
    BookMarked,
    Zap,
    Code2,
    Target,
    LayoutDashboard,
    Map,
    Eye,
    List,
    FileText,
    Newspaper,
    HelpCircle,
    Briefcase,
    BookOpen,
    Users,
    Clock,
    Brain,
    Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { cn } from "@/lib/utils";

export function TopNav() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    // Mock data - will be replaced with real data from backend
    const userData = {
        name: user?.user_metadata?.full_name || 'Student',
        email: user?.email || 'student@example.com',
        avatar: '/avatars/01.png',
        streak: 7,
        points: 1250
    };

    const notifications = [
        { id: 1, text: 'New assignment posted', unread: true },
        { id: 2, text: 'You earned a new badge!', unread: true },
        { id: 3, text: 'Study reminder: Arrays topic', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo & Brand */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DSA</span>
                            </div>
                            <motion.div
                                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-20 blur-lg"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                        <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            CE Learning Hub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger suppressHydrationWarning className="bg-transparent hover:bg-accent/50">Platform</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid w-[520px] gap-4 p-5 md:w-[620px] md:grid-cols-2 lg:w-[720px]">
                                            <ListItem href="/dashboard" title="Dashboard" icon={<LayoutDashboard className="h-5 w-5 text-primary" />}>
                                                Your personal learning center and progress tracking.
                                            </ListItem>
                                            <ListItem href="/curriculum" title="Curriculum" icon={<BookOpen className="h-5 w-5 text-indigo-500" />}>
                                                Comprehensive structured learning paths.
                                            </ListItem>
                                            <ListItem href="/visualizer" title="DSA Visualizer" icon={<Eye className="h-5 w-5 text-emerald-500" />}>
                                                Interactive algorithm, BST, and graph visualizations.
                                            </ListItem>
                                            <ListItem href="/problems" title="Problem Bank" icon={<List className="h-5 w-5 text-sky-500" />}>
                                                Practice problems sorted by difficulty and topic.
                                            </ListItem>
                                            <ListItem href="/dsa-practice" title="DSA Practice" icon={<Code2 className="h-5 w-5 text-pink-500" />}>
                                                Hands-on practice problems and timed challenges.
                                            </ListItem>
                                            <ListItem href="/ce-subjects" title="CE Subjects" icon={<BookOpen className="h-5 w-5 text-violet-500" />}>
                                                Subject-wise curriculum and exam-focused materials.
                                            </ListItem>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger suppressHydrationWarning className="bg-transparent hover:bg-accent/50">Career & Prep</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid w-[520px] gap-4 p-5 md:w-[620px] md:grid-cols-2 lg:w-[720px]">
                                            <ListItem href="/placement" title="Placement Hub" icon={<Briefcase className="h-5 w-5 text-amber-500" />}>
                                                Company sheets, roadmaps, behavioral mock interviews, ATS scanner.
                                            </ListItem>
                                            <ListItem href="/career" title="Career Tools" icon={<FileText className="h-5 w-5 text-teal-500" />}>
                                                Drag-and-drop resume builder, AI cover letter writer, project portfolio.
                                            </ListItem>
                                            <ListItem href="/exam" title="Exam Mode" icon={<Target className="h-5 w-5 text-red-500" />}>
                                                Timed mock semester tests, PYQ resources catalog.
                                            </ListItem>
                                            <ListItem href="/roadmaps" title="Career Roadmaps" icon={<Compass className="h-5 w-5 text-blue-500" />}>
                                                Custom study planning checklists with streak tracking.
                                            </ListItem>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger suppressHydrationWarning className="bg-transparent hover:bg-accent/50">Arena & Focus</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid w-[520px] gap-4 p-5 md:w-[620px] md:grid-cols-2 lg:w-[720px]">
                                            <ListItem href="/contest" title="Contest Arena" icon={<Trophy className="h-5 w-5 text-amber-500" />}>
                                                Daily timed challenges, compilers, real-time leaderboard rankings.
                                            </ListItem>
                                            <ListItem href="/study-groups" title="Study Groups" icon={<Users className="h-5 w-5 text-purple-500" />}>
                                                Collaborative chat, shared markdown notes, group quiz lobbies.
                                            </ListItem>
                                            <ListItem href="/productivity" title="Productivity Hub" icon={<Clock className="h-5 w-5 text-rose-500" />}>
                                                Stateful Pomodoro timer, habit trackers, goals organizer.
                                            </ListItem>
                                            <ListItem href="/revision" title="Revision Hub" icon={<Brain className="h-5 w-5 text-emerald-500" />}>
                                                Spaced repetition flashcards, note logs, bookmarked topic trackers.
                                            </ListItem>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {user && (
                        <>
                            {/* Streak Badge */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 border border-orange-200 dark:border-orange-800"
                            >
                                <Flame className="h-4 w-4 text-orange-500" />
                                <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                                    {userData.streak} day streak
                                </span>
                            </motion.div>

                            {/* Points Badge */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800"
                            >
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">
                                    {userData.points}
                                </span>
                            </motion.div>
                        </>
                    )}

                    {/* Search */}
                    <AnimatePresence>
                        {isSearchOpen ? (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 200, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="hidden md:block"
                            >
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="h-9"
                                    autoFocus
                                    onBlur={() => setIsSearchOpen(false)}
                                />
                            </motion.div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden md:flex"
                                onClick={() => setIsSearchOpen(true)}
                                suppressHydrationWarning
                            >
                                <Search className="h-4 w-4" />
                            </Button>
                        )}
                    </AnimatePresence>

                    {user ? (
                        <>
                            {/* Notifications */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative" suppressHydrationWarning>
                                        <Bell className="h-4 w-4" />
                                        {unreadCount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center"
                                            >
                                                {unreadCount}
                                            </motion.span>
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {notifications.map((notification) => (
                                        <DropdownMenuItem key={notification.id} className="flex items-start gap-2 p-3">
                                            {notification.unread && (
                                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                                            )}
                                            <span className={notification.unread ? 'font-medium' : ''}>
                                                {notification.text}
                                            </span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2 px-2" suppressHydrationWarning>
                                        <Avatar className="h-8 w-8 border-2 border-primary">
                                            <AvatarImage src={userData.avatar} alt={userData.name} />
                                            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className="h-4 w-4 hidden sm:block" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{userData.name}</p>
                                            <p className="text-xs text-muted-foreground">{userData.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/progress" className="cursor-pointer">
                                            <Trophy className="mr-2 h-4 w-4" />
                                            Progress
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/bookmarks" className="cursor-pointer">
                                            <BookMarked className="mr-2 h-4 w-4" />
                                            Bookmarks
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center gap-2 ml-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        suppressHydrationWarning
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t overflow-hidden"
                    >
                        <div className="container py-4 space-y-2">
                            <MobileNavLink href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                Dashboard
                            </MobileNavLink>
                            <MobileNavLink href="/learning-paths" onClick={() => setIsMobileMenuOpen(false)}>
                                Learning Paths
                            </MobileNavLink>
                            <MobileNavLink href="/visualizer" onClick={() => setIsMobileMenuOpen(false)}>
                                DSA Visualizer
                            </MobileNavLink>
                            <MobileNavLink href="/placement" onClick={() => setIsMobileMenuOpen(false)}>
                                Placement Hub
                            </MobileNavLink>
                            <MobileNavLink href="/career" onClick={() => setIsMobileMenuOpen(false)}>
                                Career Tools
                            </MobileNavLink>
                            <MobileNavLink href="/exam" onClick={() => setIsMobileMenuOpen(false)}>
                                Exam Mode
                            </MobileNavLink>
                            <MobileNavLink href="/contest" onClick={() => setIsMobileMenuOpen(false)}>
                                Contest Arena
                            </MobileNavLink>
                            <MobileNavLink href="/study-groups" onClick={() => setIsMobileMenuOpen(false)}>
                                Study Groups
                            </MobileNavLink>
                            <MobileNavLink href="/productivity" onClick={() => setIsMobileMenuOpen(false)}>
                                Productivity Hub
                            </MobileNavLink>
                            <MobileNavLink href="/revision" onClick={() => setIsMobileMenuOpen(false)}>
                                Revision Hub
                            </MobileNavLink>

                            <div className="border-t my-2 pt-2">
                                {user ? (
                                    <div
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="cursor-pointer block px-4 py-2 text-sm font-medium rounded-md hover:bg-red-100 text-red-600 transition-colors"
                                    >
                                        Log out
                                    </div>
                                ) : (
                                    <>
                                        <MobileNavLink href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            Sign In
                                        </MobileNavLink>
                                        <MobileNavLink href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                            Sign Up
                                        </MobileNavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-3 py-2 text-sm font-medium transition-colors"
            >
                <span className={active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}>
                    {children}
                </span>
                {active && (
                    <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}
            </motion.div>
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link href={href} onClick={onClick}>
            <div className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors">
                {children}
            </div>
        </Link>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon: React.ReactNode }
>(({ className, title, icon, children, href, ...props }, ref) => {
    return (
        <div>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href || "/"}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center gap-2 text-sm font-medium leading-none">
                        {icon}
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </div>
    )
})
ListItem.displayName = "ListItem"
