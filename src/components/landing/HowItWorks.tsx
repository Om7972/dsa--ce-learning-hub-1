'use client';

import './landing.css';

const steps = [
  { title: 'Create Account', desc: 'Sign up in seconds and set your goals.' },
  { title: 'Choose Goal', desc: 'Pick interviews, exams, or coursework.' },
  { title: 'Learn & Practice', desc: 'Follow curated paths and solve problems.' },
  { title: 'Track Progress', desc: 'Dashboards show strengths and gaps.' },
  { title: 'Get Certified', desc: 'Earn certificates and showcase skills.' }
];

export default function HowItWorks() {
  return (
    <section className="landing-section-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="landing-heading-md">How it works</h3>
          <p className="landing-subtext mt-2">A simple, five-step journey to mastery.</p>
        </div>

        <ol className="space-y-4">
          {steps.map((s, idx) => (
            <li key={s.title} className="flex gap-4 items-start">
              <div className="flex-none">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold">{idx + 1}</div>
              </div>
              <div>
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
