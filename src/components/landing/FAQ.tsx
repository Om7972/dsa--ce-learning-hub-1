'use client';

import './landing.css';

const faqs = [
  { q: 'Is there a free plan?', a: 'Yes — the core learning paths and practice are free forever.' },
  { q: 'Can I get certificates?', a: 'Yes — certificates are provided for completed learning paths.' },
  { q: 'Do you offer mentorship?', a: 'Community mentors are available; premium mentor hours are planned.' }
];

export default function FAQ() {
  return (
    <section className="landing-section-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h3 className="landing-heading-md text-center mb-6">Frequently asked questions</h3>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="landing-faq-item">
              <summary>{f.q}</summary>
              <div className="mt-2 text-sm text-muted-foreground">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
