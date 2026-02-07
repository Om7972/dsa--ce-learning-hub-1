'use client';

import './landing.css';

const features = [
  'Learning Paths',
  'Coding Practice',
  'Quizzes & Mock Tests',
  'Progress Tracking',
  'Certificates',
  'Community & Mentorship'
];

export default function FeaturesGrid() {
  return (
    <section className="landing-section-dark py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="landing-heading-md">Platform Features</h3>
          <p className="landing-subtext mt-2">Everything learners need, in one cohesive platform.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {features.map((f, i) => (
            <div key={f} className="landing-feature-card rounded-2xl p-6 flex items-center justify-center text-center" role="group" aria-label={f}>
              <div>
                <div className="text-base font-medium">{f}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
