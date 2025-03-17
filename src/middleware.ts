import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const isAuthPage = request.nextUrl.pathname.startsWith("/signin");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/signin/:path*"],
};
