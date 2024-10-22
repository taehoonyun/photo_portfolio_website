import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  // Check if the token exists in the cookies

  const token = req.cookies.get("token")?.value; // Safely access the token from cookies
  const token_anony = req.cookies.get("token_anony")?.value; // Safely access the token from cookies
  // console.log("token",token,"anoy",token_anony);

  // Get the current URL path
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  // If there's no token and the user is trying to access a protected route, redirect to login
  if (!token && !token_anony && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }
  // Set a custom cookie in the response
  if (token) {
    response.cookies.set("token_name", "token", { path: "/" });
  } else {
    response.cookies.set("token_name", "token_anony", { path: "/" });
  }
  // If there's a token or the user is already on the login page, allow the request
  return response; // Proceed to the next middleware or route
}

// Define the routes that need to be protected
export const config = {
  matcher: ["/", "/portfolio", "/projects", "/contact"], // Exclude '/' from protected routes
};
