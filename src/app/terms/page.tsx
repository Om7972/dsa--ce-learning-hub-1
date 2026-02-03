import React from 'react';

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Terms of Service</h1>

            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Use License</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Permission is granted to temporarily download one copy of the materials (information or software) on DSA & CE Learning Hub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disk pl-6 text-muted-foreground space-y-2">
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on the website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The materials on DSA & CE Learning Hub's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Limitations</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        In no event shall DSA & CE Learning Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if we have been notified orally or in writing of the possibility of such damage.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. User Accounts</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                </section>

                <div className="pt-8 text-sm text-muted-foreground text-center">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
}
