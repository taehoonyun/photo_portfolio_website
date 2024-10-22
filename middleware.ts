import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the token exists in the cookies
  const token = req.cookies.get("token")?.value; // Safely access the token from cookies

  // Get the current URL path
  const { pathname } = req.nextUrl;

  // If there's no token and the user is trying to access a protected route, redirect to login
  if (!token && pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect to the login page
  }

  // If there's a token or the user is already on the login page, allow the request
  return NextResponse.next(); // Proceed to the next middleware or route
}

// Define the routes that need to be protected
export const config = {
  matcher: ['/portfolio', '/projects', '/contact'], // Exclude '/' from protected routes
};
