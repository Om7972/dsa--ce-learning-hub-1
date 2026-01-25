"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Code2, LayoutDashboard, BookOpen, Brain, Trophy, LogOut, User, Settings, GraduationCap } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MainNav() {
    const pathname = usePathname();
    const isLanding = pathname === "/";

    const appLinks = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/curriculum", label: "Curriculum", icon: BookOpen },
        { href: "/visualizer", label: "Visualizer", icon: Brain },
        { href: "/problems", label: "Problems", icon: Code2 },
    ];

    const landingLinks = [
        { href: "/#features", label: "Features" },
        { href: "/#curriculum", label: "Curriculum" },
        { href: "/#pricing", label: "Pricing" },
    ];

    const links = isLanding ? landingLinks : appLinks;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="mr-8 flex items-center gap-2">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                        <Code2 className="h-7 w-7 text-primary relative z-10" />
                    </div>
                    <span className="text-xl font-bold font-display tracking-tight">
                        DSA<span className="text-primary">Master</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {links.map((link) => {
                        // For landing page links (hash links), simple styling
                        if ('icon' in link === false) {
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            )
                        }

                        // For app links
                        const AppLink = link as { href: string; label: string; icon: any };
                        const Icon = AppLink.icon;
                        const isActive = pathname === AppLink.href || pathname.startsWith(`${AppLink.href}/`);

                        return (
                            <Link
                                key={AppLink.href}
                                href={AppLink.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80 flex items-center gap-2",
                                    isActive ? "text-primary font-bold" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{AppLink.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    {isLanding ? (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" className="hover:text-primary">Log in</Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="font-bold pink-glow">Get Started</Button>
                            </Link>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8 border border-primary/20">
                                        <AvatarImage src="/avatars/01.png" alt="@user" />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">OM</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Om Graphique</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            om@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <GraduationCap className="mr-2 h-4 w-4" />
                                        <span>My Certificates</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </header>
    );
}
