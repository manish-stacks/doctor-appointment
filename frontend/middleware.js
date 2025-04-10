import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('user_role')?.value;

    const pathname = request.nextUrl.pathname;

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (['/login', '/register', '/'].includes(pathname)) {
        if (role === 'user') {
            return NextResponse.redirect(new URL('/user-dashboard/dashboard', request.url));
        }
        if (role === 'doctor' || role === 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }
    

    if (pathname.startsWith('/user-dashboard') && role !== 'user') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (pathname.startsWith('/dashboard') && !['doctor', 'admin'].includes(role)) {
        return NextResponse.redirect(new URL('/user-dashboard/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/user-dashboard/:path*',
        '/login',
        '/register',
        '/',
    ],
};
