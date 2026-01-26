"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X } from "lucide-react";

export function WelcomeToast() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Show toast after a brief delay
        const timer = setTimeout(() => setShow(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-background border border-border shadow-lg rounded-xl p-4 flex items-start gap-4"
                >
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full shrink-0">
                        <Flame className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">Welcome back, Student!</h4>
                        <p className="text-sm text-muted-foreground">
                            You're on a <span className="text-orange-500 font-bold">7-day streak</span>! Keep it up by completing a lesson today.
                        </p>
                    </div>
                    <button
                        onClick={() => setShow(false)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
