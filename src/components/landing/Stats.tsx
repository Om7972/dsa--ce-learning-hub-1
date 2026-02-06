'use client';

import './landing.css';

const stats = [
  { label: 'Learners enrolled', value: '180k+' },
  { label: 'Problems solved', value: '2.4M+' },
  { label: 'Certificates issued', value: '45k+' },
  { label: 'Success rate', value: '87%' }
];

export default function Stats() {
  return (
    <section className="landing-section-dark py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="landing-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="landing-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
