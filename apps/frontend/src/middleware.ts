import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';

// Define the 4 primary entry points for your specific roles
const ROLE_DASHBOARDS: Record<string, string> = {
  admin: '/admin/dashboard',
  professor: '/professor/dashboard',
  instructor: '/professor/dashboard', // Maps to professor folder
  grader: '/grader/dashboard',
  ta: '/grader/dashboard',           // Maps to grader folder
  student: '/student/dashboard',
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Identify protected dashboard routes and the login page
  const isDashboardRoute = /^\/(admin|student|professor|grader)/.test(pathname);
  const isLoginPage = pathname === '/login';

  // 2. LOGIC: Not logged in
  if (!token) {
    if (isDashboardRoute) {
      // Redirect to login if trying to access a dashboard without a token
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // 3. LOGIC: Logged in (Token exists)
  try {
    const payload = decodeJwt(token);

    // ✅ ROLE DETECTION
    // Prioritize 'role' claim, fallback to 'is_superuser' boolean
    let userRole = (payload.role as string)?.toLowerCase() || '';
    
    if (!userRole && payload.is_superuser === true) {
      userRole = 'admin';
    }

    // Determine the default landing page based on the 4 roles
    // Fallback to student dashboard if role is totally missing to avoid redirect loops
    const targetDashboard = ROLE_DASHBOARDS[userRole] || '/login';

	if (!userRole && isDashboardRoute) {
		const response = NextResponse.redirect(new URL('/login', request.url));
		response.cookies.delete('token'); // Clear the useless token
		return response;
	}
    // A. Prevent logged-in users from seeing the Login page
    if (isLoginPage) {
      return NextResponse.redirect(new URL(targetDashboard, request.url));
    }

    // B. ROLE GUARD: Ensure user is in the correct folder for their role
    if (isDashboardRoute) {
      const pathRole = pathname.split('/')[1]; // Extracts 'admin', 'student', etc.
      
      const isAuthorized = 
        userRole === pathRole || 
        (userRole === 'admin') || // Admin is allowed everywhere
        (userRole === 'instructor' && pathRole === 'professor') ||
        (userRole === 'ta' && pathRole === 'grader');

      if (!isAuthorized) {
        console.warn(`Unauthorized access: ${userRole} attempted to visit ${pathname}`);
        return NextResponse.redirect(new URL(targetDashboard, request.url));
      }
    }

    return NextResponse.next();

  } catch (error) {
    // If token is malformed or expired
    console.error("Middleware JWT Error:", error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    // Clear the bad cookie to allow a clean re-login
    response.cookies.delete('token');
    return response;
  }
}

// Ensure the middleware only runs on relevant routes
export const config = {
  matcher: [
    '/admin/:path*', 
    '/student/:path*', 
    '/professor/:path*', 
    '/grader/:path*', 
    '/login'
  ],
};