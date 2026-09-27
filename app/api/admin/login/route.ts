import { NextRequest, NextResponse } from "next/server";

// Simple password-based admin auth for a small personal portfolio.
// Set ADMIN_PASSWORD in a .env.local file (never commit real secrets).
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_session", ADMIN_PASSWORD, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}
