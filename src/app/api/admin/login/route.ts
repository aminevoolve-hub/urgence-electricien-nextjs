import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  isAdminPasswordConfigured,
  passwordMatches,
  sessionToken,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json({ error: "Mot de passe admin non configuré (ADMIN_PASSWORD)" }, { status: 503 });
  }

  const { password } = await request.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || !(await passwordMatches(password))) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, (await sessionToken()) as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
