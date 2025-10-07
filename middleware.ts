import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes for each role
const protectedRoutes = {
  student: ["/student"],
  parent: ["/parent"],
  counsellor: ["/counsellor"],
  admin: ["/admin"],
}

const publicRoutes = ["/auth/login", "/auth/register", "/", "/api"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes and API routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if accessing a protected route
  const isProtectedRoute = Object.values(protectedRoutes).some((routes) =>
    routes.some((route) => pathname.startsWith(route)),
  )

  if (isProtectedRoute) {
    // Check for user data in request headers (set by client-side auth)
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      // For client-side navigation, we'll let the AuthProvider handle redirects
      // Only redirect server-side requests without auth
      if (request.headers.get("accept")?.includes("text/html")) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
