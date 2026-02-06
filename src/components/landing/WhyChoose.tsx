'use client';

import { motion } from 'framer-motion';
import './landing.css';

const items = [
  {
    title: 'Structured Roadmaps',
    desc: 'Clear, goal-oriented study plans that guide you from basics to mastery.'
  },
  { title: 'DSA Visualizer', desc: 'Step-through visualizations to understand algorithms deeply.' },
  { title: 'Exam-Oriented CE Notes', desc: 'Concise notes targeted for university and competitive exams.' },
  { title: 'Adaptive Practice', desc: 'Problems adapt to your skill level and progress.' },
  { title: 'Career Readiness Score', desc: 'Track readiness for interviews and placements.' }
];

export default function WhyChoose() {
  return (
    <section className="landing-section-light py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="landing-heading-md">Why choose DSA & CE Learning?</h2>
          <p className="landing-subtext mt-2 max-w-2xl mx-auto">Designed for rapid skill growth and long-term retention.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className="landing-card rounded-xl p-5"
            >
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
