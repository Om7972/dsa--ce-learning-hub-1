import Link from "next/link";
import { Code2, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background/50 backdrop-blur-sm pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                                <Code2 className="h-8 w-8 text-primary relative z-10" />
                            </div>
                            <span className="text-xl font-bold font-display tracking-tight">
                                DSA<span className="text-primary">Master</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            The ultimate platform for mastering Data Structures, Algorithms, and Computer Engineering subjects. Built for students, by engineers.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Link href="https://github.com" target="_blank">
                                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10" suppressHydrationWarning>
                                    <Github className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://twitter.com" target="_blank">
                                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10" suppressHydrationWarning>
                                    <Twitter className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank">
                                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10" suppressHydrationWarning>
                                    <Linkedin className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Platform</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li>
                                <Link href="/curriculum" className="hover:text-primary transition-colors">Curriculum</Link>
                            </li>
                            <li>
                                <Link href="/visualizer" className="hover:text-primary transition-colors">DSA Visualizer</Link>
                            </li>
                            <li>
                                <Link href="/problems" className="hover:text-primary transition-colors">Problem Bank</Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-primary transition-colors">Student Dashboard</Link>
                            </li>
                            <li>
                                <Link href="/roadmaps" className="hover:text-primary transition-colors">Career Roadmaps</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Resources</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">Engineering Blog</Link>
                            </li>
                            <li>
                                <Link href="/community" className="hover:text-primary transition-colors">Community Forum</Link>
                            </li>
                            <li>
                                <Link href="/cheatsheets" className="hover:text-primary transition-colors">Cheat Sheets</Link>
                            </li>
                            <li>
                                <Link href="/interview-prep" className="hover:text-primary transition-colors">Interview Prep</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
                        <p className="text-muted-foreground mb-4">
                            Subscribe to our newsletter for the latest algorithms and system design tips.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-secondary/50 border border-border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                suppressHydrationWarning
                            />
                            <Button size="icon" className="pink-glow shrink-0" suppressHydrationWarning>
                                <Mail className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} DSA Master. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <span>by Engineering Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
