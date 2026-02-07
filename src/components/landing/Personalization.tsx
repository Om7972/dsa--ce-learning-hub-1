'use client';

import { motion } from 'framer-motion';
import './landing.css';

export default function Personalization() {
  return (
    <section className="landing-section-dark py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="landing-heading-md">Personalized to your goals</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-[#ff4d88] mt-3 rounded-full" />
            <p className="landing-subtext mt-4">Our onboarding maps your background and goals to a tailored study plan.</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">✓</span>
                <span>Goal-aware roadmaps</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">✓</span>
                <span>Adaptive problem selection</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">✓</span>
                <span>Daily bite-sized practice</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="landing-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl" />
              <div className="h-40 sm:h-52 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-sm text-muted-foreground relative z-10">
                Dynamic content preview (based on onboarding)
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
