'use client';

import { Button } from '@/components/ui/button';
import './landing.css';

export default function FinalCTA() {
  return (
    <section className="landing-section-light py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="landing-heading-lg">Ready to start learning?</h2>
        <p className="landing-subtext mt-2">Join thousands of learners and take the next step in your career.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Button suppressHydrationWarning className="landing-button">Get Started — It's Free</Button>
          <Button suppressHydrationWarning variant="outline" className="landing-button">Explore Courses</Button>
        </div>
      </div>
    </section>
  );
}
