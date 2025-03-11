import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // This catches files like manifest.webmanifest, favicon.ico, etc.
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.has("next-auth.session-token");
  const publicPaths = ["/", "/login", "/register"];
  const protectedPaths = ["/dashboard", "/account", "/inbox"];
  const path = request.nextUrl.pathname;

  if (isAuthenticated && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && protectedPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
