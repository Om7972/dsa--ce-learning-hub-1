'use client';

import { motion } from 'framer-motion';
import './landing.css';

const items = [
  {
    title: 'Structured Roadmaps',
    desc: 'Clear, goal-oriented study plans that guide you from basics to mastery.',
    icon: '🗺️'
  },
  { 
    title: 'DSA Visualizer', 
    desc: 'Step-through visualizations to understand algorithms deeply.',
    icon: '📊'
  },
  { 
    title: 'Exam-Oriented CE Notes', 
    desc: 'Concise notes targeted for university and competitive exams.',
    icon: '📝'
  },
  { 
    title: 'Adaptive Practice', 
    desc: 'Problems adapt to your skill level and progress.',
    icon: '🎯'
  },
  { 
    title: 'Career Readiness Score', 
    desc: 'Track readiness for interviews and placements.',
    icon: '⭐'
  }
];

export default function WhyChoose() {
  return (
    <section className="landing-section-light py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="landing-heading-lg">Why choose DSA & CE Learning?</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-[#ff4d88] mx-auto mt-4 rounded-full" />
          <p className="landing-subtext mt-4 max-w-2xl mx-auto">Designed for rapid skill growth and long-term retention — curriculum, visuals and practice in one place.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 120 }}
              className="landing-feature-card rounded-2xl p-6 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{it.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
