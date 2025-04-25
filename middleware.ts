import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const anonymousToken = request.cookies.get("token_anony")?.value;
  
  // List of protected routes
  const protectedPaths = ['/protected', '/admin'];
  
  // Check if current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  // Redirect to login if accessing protected route without token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Define the routes that need to be protected
export const config = {
  matcher: ["/", "/portfolio", "/projects", "/contact"], // Exclude '/' from protected routes
};
