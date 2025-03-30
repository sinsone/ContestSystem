export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/contests/create",
    "/contests/edit/:path*",
    "/profile",
    "/admin/:path*"
  ]
} 