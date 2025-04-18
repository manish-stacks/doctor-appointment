import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;
    const isPublicPath = ['/login'].includes(path);

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    let userRole = 'user'; 

    if (token) {
        userRole = getUserRoleFromToken(token);
    }

    if (isPublicPath && token) {
        const redirectPath = userRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard';
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    if (!isPublicPath && token) {
        const isDoctorPath = path.startsWith('/doctor');
        const isPatientPath = path.startsWith('/patient');

        if (isDoctorPath && userRole !== 'doctor') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (isPatientPath && userRole !== 'user') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

function getUserRoleFromToken(token: string): string {
    try {
        const base64Payload = token.split('.')[1];
        const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
        const parsed = JSON.parse(payload);
        return parsed.role || 'user';
    } catch (error) {
        console.error('Error decoding token:', error);
        return 'user';
    }
}

export const config = {
    matcher: ['/doctor/:path*', '/patient/:path*', '/login'],
};
