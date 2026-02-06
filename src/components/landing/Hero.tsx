'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import './landing.css';

export default function Hero() {
  return (
    <section className="landing-hero relative overflow-hidden pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Master DSA & Computer Engineering — Build the career you want
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Structured roadmaps, interactive visualizers, adaptive practice and
              mock tests — everything you need to learn, practice, and get
              certified. Start for free today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button className="w-full sm:w-auto">Get Started — It's Free</Button>
              <Button variant="outline" className="w-full sm:w-auto">Explore Courses</Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <span className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary"><path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Personalized recommendations
              </span>
              <span className="inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Trusted by learners worldwide
              </span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md"
              aria-hidden
            >
              {/* Animated illustration placeholder - lazy loaded SVG */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 shadow-lg">
                <svg viewBox="0 0 600 400" className="w-full h-56" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0" stopColor="#60a5fa" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#7c3aed" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <rect width="600" height="400" rx="24" fill="url(#g)" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
