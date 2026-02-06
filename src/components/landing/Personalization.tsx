'use client';

import './landing.css';

export default function Personalization() {
  return (
    <section className="landing-section-dark py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="landing-heading-md">Personalized to your goals</h3>
            <p className="landing-subtext mt-2">Our onboarding maps your background and goals to a tailored study plan.</p>

            <ul className="mt-4 space-y-2 text-sm">
              <li>• Goal-aware roadmaps</li>
              <li>• Adaptive problem selection</li>
              <li>• Daily bite-sized practice</li>
            </ul>
          </div>

          <div className="w-full">
            <div className="landing-card rounded-xl p-4">
              <div className="h-36 sm:h-44 rounded-md bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center text-sm text-muted-foreground">Dynamic content preview (based on onboarding)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
