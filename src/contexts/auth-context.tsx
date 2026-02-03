'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes when Supabase keys are missing
const MOCK_USER: User = {
    id: 'mock-user-id',
    app_metadata: { provider: 'email' },
    user_metadata: { full_name: 'Demo Student' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: 'student@example.com',
    phone: '',
    confirmation_sent_at: '',
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    role: 'authenticated',
    updated_at: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createSupabaseBrowserClient();
    const isConfigured = isSupabaseConfigured();

    useEffect(() => {
        if (!isConfigured) {
            const mockSession = localStorage.getItem('mock-session');
            if (mockSession === 'active') {
                setUser(MOCK_USER);
            }
            setLoading(false);
            return;
        }

        // Real Supabase mode
        let mounted = true;

        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (mounted) {
                    setUser(session?.user ?? null);
                }
            } catch (error) {
                console.error("Supabase auth error:", error);
                if (mounted) setUser(null);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        checkSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [supabase, isConfigured]);

    const signIn = async (email: string, password: string) => {
        if (!isConfigured) {
            // Mock sign in
            setUser(MOCK_USER);
            localStorage.setItem('mock-session', 'active');
            router.push('/dashboard');
            return { error: null };
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (!error) {
            router.push('/dashboard');
        }

        return { error };
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        if (!isConfigured) {
            // Mock sign up
            const newUser = { ...MOCK_USER, email, user_metadata: { full_name: fullName } };
            setUser(newUser);
            localStorage.setItem('mock-session', 'active');
            router.push('/dashboard');
            return { error: null };
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (!error) {
            router.push('/dashboard');
        }

        return { error };
    };

    const signOut = async () => {
        if (!isConfigured) {
            // Mock sign out
            setUser(null);
            localStorage.removeItem('mock-session');
            router.push('/');
            return;
        }

        await supabase.auth.signOut();
        router.push('/');
    };

    const resetPassword = async (email: string) => {
        if (!isConfigured) {
            return { error: null };
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        return { error };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signIn,
                signUp,
                signOut,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
