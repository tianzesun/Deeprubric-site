import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Remove all dashboard route protection since we're removing dashboard functionality
  // Only protect the login page to redirect authenticated users to main site
  const isLoginPage = pathname === '/login';

  // If user is logged in and tries to access login page, redirect to main site
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on login page
export const config = {
  matcher: ['/login'],
};
