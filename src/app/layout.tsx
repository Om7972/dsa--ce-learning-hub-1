import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { MainLayout } from '@/components/layout/main-layout';
import { AuthProvider } from '@/contexts/auth-context';
import { AITutor } from '@/components/ai-tutor/AITutor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DSA & CE Learning Platform',
    description: 'A comprehensive platform for learning Data Structures, Algorithms, and Computer Engineering subjects.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <MainLayout>{children}</MainLayout>
                        <AITutor />
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}


