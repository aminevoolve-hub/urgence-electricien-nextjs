import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/admin-auth";

// Read-only config the public site fetches; everything else under /api/admin needs a session.
const PUBLIC_ADMIN_READS = ["/api/admin/colors", "/api/admin/config"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();
  if (request.method === "GET" && PUBLIC_ADMIN_READS.includes(pathname)) return NextResponse.next();

  if (await isValidSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Authentification requise" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
