'use client';

import { useState } from 'react';
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
    Target
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';

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
                        <NavLink href="/dashboard" active={pathname === '/dashboard'}>
                            Dashboard
                        </NavLink>
                        <NavLink href="/learning-paths" active={pathname.startsWith('/learning-paths')}>
                            Learning Paths
                        </NavLink>
                        <NavLink href="/dsa-practice" active={pathname.startsWith('/dsa-practice')}>
                            DSA Practice
                        </NavLink>
                        <NavLink href="/ce-subjects" active={pathname.startsWith('/ce-subjects')}>
                            CE Subjects
                        </NavLink>
                        <NavLink href="/ai-tutor" active={pathname.startsWith('/ai-tutor')}>
                            <Sparkles className="h-4 w-4 mr-1 inline" />
                            AI Tutor
                        </NavLink>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
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
                            >
                                <Search className="h-4 w-4" />
                            </Button>
                        )}
                    </AnimatePresence>

                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
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
                            <Button variant="ghost" className="gap-2 px-2">
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

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                            <MobileNavLink href="/dsa-practice" onClick={() => setIsMobileMenuOpen(false)}>
                                DSA Practice
                            </MobileNavLink>
                            <MobileNavLink href="/ce-subjects" onClick={() => setIsMobileMenuOpen(false)}>
                                CE Subjects
                            </MobileNavLink>
                            <MobileNavLink href="/ai-tutor" onClick={() => setIsMobileMenuOpen(false)}>
                                <Sparkles className="h-4 w-4 mr-2 inline" />
                                AI Tutor
                            </MobileNavLink>
                            <MobileNavLink href="/progress" onClick={() => setIsMobileMenuOpen(false)}>
                                Progress
                            </MobileNavLink>
                            <MobileNavLink href="/bookmarks" onClick={() => setIsMobileMenuOpen(false)}>
                                Bookmarks
                            </MobileNavLink>
                            <MobileNavLink href="/support" onClick={() => setIsMobileMenuOpen(false)}>
                                Support
                            </MobileNavLink>
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
