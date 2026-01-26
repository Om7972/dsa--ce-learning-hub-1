'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Book,
    Code,
    Brain,
    BarChart,
    User,
    Settings,
    LifeBuoy,
    LogOut,
    Sparkles,
    BookMarked,
    Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/learning-paths', icon: Book, label: 'Learning Paths' },
    { href: '/dsa-practice', icon: Code, label: 'DSA Practice' },
    { href: '/ce-subjects', icon: Brain, label: 'CE Subjects' },
    { href: '/ai-tutor', icon: Sparkles, label: 'AI Tutor', isNew: true },
    { href: '/progress', icon: BarChart, label: 'Progress' },
    { href: '/bookmarks', icon: BookMarked, label: 'Bookmarks' },
];

const bottomNavItems = [
    { href: '/support', icon: LifeBuoy, label: 'Support' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
    const pathname = usePathname();
    const { signOut } = useAuth();

    // Hide sidebar on landing page
    if (pathname === '/') return null;

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-background/95 backdrop-blur border-r h-[calc(100vh-4rem)] sticky top-16">
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <div className="mb-6 px-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Learning
                    </p>
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.label} href={item.href} passHref>
                            <div className="relative">
                                <Button
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    className={`w-full justify-start relative ${isActive ? 'bg-primary/10 text-primary hover:bg-primary/15' : 'hover:bg-muted'}`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                    {item.label}
                                    {item.isNew && (
                                        <span className="ml-auto flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                    )}
                                </Button>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>
            <div className="px-4 py-6 border-t bg-muted/20">
                <div className="space-y-2">
                    {bottomNavItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link key={item.label} href={item.href} passHref>
                                <Button
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    className="w-full justify-start"
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start mt-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => signOut()}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
