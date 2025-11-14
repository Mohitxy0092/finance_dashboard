import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware((auth, request) => {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api")) return NextResponse.next(); // <= MUST exist
  if (isProtectedRoute(request)) auth().protect();
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/"],
};
