/* eslint-disable  @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

//code from https://nextjs.org/docs/app/guides/authentication#authorization with own adjustments
// 1. Specify protected and public routes
const protectedRoutes = ["/admin/dashboard"];
const publicRoutes = ["/pricing", "/gallery", "/", "/admin"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  // 3. Decrypt the session from the cookie
  const token = req.cookies.get("accessToken")?.value;
  let session: any = null;

  try {
    if (token) {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      session = payload;
    }
  } catch (err) {
    session = null;
    console.error("JWT error", err);
  }
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.id && !path.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

// Exclude static files and API routes from middleware
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
