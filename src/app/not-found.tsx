'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-6">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    {/* 404 Number */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                        className="relative"
                    >
                        <h1 className="text-[200px] font-bold leading-none bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            404
                        </h1>
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
                        >
                            🤔
                        </motion.div>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl font-bold">Page Not Found</h2>
                        <p className="text-xl text-muted-foreground max-w-md mx-auto">
                            Oops! The page you're looking for seems to have wandered off into the void.
                            Let's get you back on track!
                        </p>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="/">
                            <Button size="lg" className="gap-2">
                                <Home className="h-5 w-5" />
                                Go Home
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" onClick={() => window.history.back()} className="gap-2">
                            <ArrowLeft className="h-5 w-5" />
                            Go Back
                        </Button>
                    </motion.div>

                    {/* Suggestions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="pt-8 border-t border-border/50"
                    >
                        <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm">Dashboard</Button>
                            </Link>
                            <Link href="/learning-paths">
                                <Button variant="ghost" size="sm">Learning Paths</Button>
                            </Link>
                            <Link href="/dsa-practice">
                                <Button variant="ghost" size="sm">DSA Practice</Button>
                            </Link>
                            <Link href="/ce-subjects">
                                <Button variant="ghost" size="sm">CE Subjects</Button>
                            </Link>
                            <Link href="/progress">
                                <Button variant="ghost" size="sm">Progress</Button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-20 left-20 text-6xl opacity-20"
                >
                    📚
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute bottom-20 right-20 text-6xl opacity-20"
                >
                    💻
                </motion.div>
            </div>
        </div>
    );
}
