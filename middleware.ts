// Middleware to protect admin routes with JWT cookie verification
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminCookie } from '@/lib/auth/admin';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to admin login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Verify admin authentication for all other admin routes
    const adminPayload = verifyAdminCookie(request);

    if (!adminPayload) {
      // Redirect to admin login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all admin routes except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/admin/:path*'
  ]
};