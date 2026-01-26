'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Book, Code, Brain, BarChart, User, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/learning-paths', icon: Book, label: 'Learning Paths' },
    { href: '/dsa-practice', icon: Code, label: 'DSA Practice' },
    { href: '/ce-subjects', icon: Brain, label: 'CE Subjects' },
    { href: '/progress', icon: BarChart, label: 'Progress' },
    { href: '/profile', icon: User, label: 'Profile' },
];

const bottomNavItems = [
    { href: '/support', icon: LifeBuoy, label: 'Support' },
    { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0">
            <div className="flex items-center justify-center h-16 border-b">
                <Link href="/dashboard" className="text-xl font-bold text-primary">
                    DSA & CE Hub
                </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <Link key={item.label} href={item.href} passHref>
                        <Button
                            variant={pathname.startsWith(item.href) ? 'default' : 'ghost'}
                            className="w-full justify-start"
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </nav>
            <div className="px-4 py-6 border-t">
                <div className="space-y-2">
                    {bottomNavItems.map((item) => (
                        <Link key={item.label} href={item.href} passHref>
                            <Button
                                variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </div>
                <Button variant="outline" className="w-full justify-start mt-4">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}
