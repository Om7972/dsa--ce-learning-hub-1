'use client';

import './landing.css';

const testimonials = [
  { name: 'Aanya Sharma', college: 'IIT Bombay', comment: 'This platform helped me crack interviews with clear visuals and practice.', rating: 5 },
  { name: 'Rohan Verma', college: 'NIT Trichy', comment: 'Adaptive practice kept me focused on weak areas.', rating: 5 },
  { name: 'Sana Patel', college: 'BITS Pilani', comment: 'Great roadmap and mentor support.', rating: 4 }
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" className="text-amber-400">
          <path strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 17.3L6.3 20l1.2-6.8L2 9.6l6.9-1L12 2l3.1 6.6L22 9.6l-5.5 3.6L17.7 20z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="landing-section-light py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h3 className="landing-heading-md">What learners say</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="landing-testimonial-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="landing-testimonial-avatar" aria-hidden />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.college}</div>
                </div>
              </div>
              <div className="mt-3 text-sm">{t.comment}</div>
              <div className="mt-3"><Stars n={t.rating} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
