import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.delete({ name, ...options });
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    const { pathname } = request.nextUrl;

    // Define public routes that don't require authentication
    const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/callback', '/auth/reset-password'];
    const isPublicRoute = publicRoutes.some(route => pathname === route) || pathname.startsWith('/api');

    // If the user is not logged in and trying to access a protected route, redirect to login
    if (!user && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // If the user is logged in, prevent them from accessing auth pages
    if (user && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Role-based access control for admin routes
    if (pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        const { data: userData, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (error || !userData || userData.role !== 'admin') {
            // Redirect to a 'not authorized' page or the dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
