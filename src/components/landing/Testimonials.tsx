"use client";

import { motion } from 'framer-motion';
import './landing.css';

const testimonials = [
  { name: 'Aanya Sharma', college: 'IIT Bombay', comment: 'This platform helped me crack interviews with clear visuals and practice. The structured approach made all the difference!', rating: 5, role: 'Software Engineer' },
  { name: 'Rohan Verma', college: 'NIT Trichy', comment: 'Adaptive practice kept me focused on weak areas. I improved my speed significantly in 3 months.', rating: 5, role: 'Full Stack Developer' },
  { name: 'Sana Patel', college: 'BITS Pilani', comment: 'Great roadmap and mentor support. Highly recommend for GATE preparation!', rating: 4, role: 'CS Graduate' }
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" className={i < n ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 17.3L6.3 20l1.2-6.8L2 9.6l6.9-1L12 2l3.1 6.6L22 9.6l-5.5 3.6L17.7 20z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="landing-section-light py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="landing-heading-md">What learners say</h3>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-[#ff4d88] mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name} 
              initial={{ y: 12, opacity: 0 }} 
              whileInView={{ y: 0, opacity: 1 }} 
              whileHover={{ y: -8 }}
              transition={{ delay: i * 0.06 }}
              className="landing-testimonial-card rounded-2xl p-6 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="landing-testimonial-avatar ring-2 ring-primary/20" aria-hidden />
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-primary">{t.role}</div>
                  <div className="text-xs text-muted-foreground">{t.college}</div>
                </div>
              </div>
              <div className="text-sm leading-relaxed mb-4 text-foreground/90">{t.comment}</div>
              <Stars n={t.rating} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
