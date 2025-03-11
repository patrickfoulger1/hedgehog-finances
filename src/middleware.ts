// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const isAuthenticated = request.cookies.has("next-auth.session-token");
//   const publicPaths = ["/", "/login", "/register"];
//   const protectedPaths = ["/dashboard", "/account", "/inbox"];
//   const path = request.nextUrl.pathname;

//   if (isAuthenticated && publicPaths.includes(path)) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!isAuthenticated && protectedPaths.includes(path)) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }
