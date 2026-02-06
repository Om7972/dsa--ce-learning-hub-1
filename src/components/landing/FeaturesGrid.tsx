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
    <section className="landing-section-dark py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h3 className="landing-heading-md">Platform Features</h3>
          <p className="landing-subtext mt-2">Everything learners need, in one cohesive platform.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {features.map((f) => (
            <div key={f} className="landing-card rounded-xl p-4 flex items-center justify-center text-center">
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
