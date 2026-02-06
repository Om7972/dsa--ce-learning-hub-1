'use client';

import { Button } from '@/components/ui/button';

export default function Pricing() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">Pricing</h3>
          <p className="text-muted-foreground mt-2">Start for free. Premium features coming soon.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-card p-6 shadow-sm">
            <div className="text-sm text-muted-foreground">Free</div>
            <div className="text-2xl font-bold mt-2">Forever</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Full access to core learning paths</li>
              <li>• Daily practice & quizzes</li>
              <li>• Progress tracking & certificates</li>
            </ul>
            <div className="mt-4">
              <Button suppressHydrationWarning className="w-full">Start Free</Button>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-muted p-6 flex flex-col justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Premium</div>
              <div className="text-2xl font-bold mt-2">Coming soon</div>
              <p className="text-sm text-muted-foreground mt-3">Advanced analytics, mentor hours, interview packs and more.</p>
            </div>
            <div className="mt-4">
              <Button suppressHydrationWarning variant="outline" className="w-full">Notify me</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
