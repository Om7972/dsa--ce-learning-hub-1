'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { TopNav } from './top-nav';

export function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/auth') || pathname === '/login' || pathname === '/signup';
    const isLandingPage = pathname === '/';

    if (isAuthRoute) {
        return <>{children}</>;
    }

    if (isLandingPage) {
        return (
            <>
                <TopNav />
                <main>{children}</main>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <TopNav />
            <div className="flex-1 flex">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
