import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Privacy Policy</h1>

            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to DSA & CE Learning Hub. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Data We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at support@dsa-ce-hub.com.
                    </p>
                </section>

                <div className="pt-8 text-sm text-muted-foreground text-center">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
