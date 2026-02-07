"use client";

import { Button } from '@/components/ui/button';
import './landing.css';

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="landing-heading-md">Pricing</h3>
          <p className="landing-subtext mt-2">Start for free. Premium features coming soon.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="landing-card rounded-2xl p-8">
            <div className="text-sm text-muted-foreground">Free</div>
            <div className="text-3xl font-bold mt-2">Forever</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Full access to core learning paths</li>
              <li>• Daily practice & quizzes</li>
              <li>• Progress tracking & certificates</li>
            </ul>
            <div className="mt-6">
              <Button suppressHydrationWarning className="w-full landing-button">Start Free</Button>
            </div>
          </div>

          <div className="landing-card rounded-2xl border border-dashed border-muted p-8 flex flex-col justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Premium</div>
              <div className="text-3xl font-bold mt-2">Coming soon</div>
              <p className="text-sm text-muted-foreground mt-3">Advanced analytics, mentor hours, interview packs and more.</p>
            </div>
            <div className="mt-6">
              <Button suppressHydrationWarning variant="outline" className="w-full landing-button">Notify me</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
