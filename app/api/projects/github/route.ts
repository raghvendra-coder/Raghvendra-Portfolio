import { NextResponse } from "next/server";

// Project repository links aren't ready to be shared publicly yet.
// This intentionally responds 400 so the UI can surface a clear message
// instead of navigating to a placeholder or invented repository URL.
// Once real per-project repo links are ready, wire the GitHub button back
// to `project.github` directly and this route can be removed.
export async function GET() {
  return NextResponse.json(
    { error: "GitHub repository link not available yet" },
    { status: 400 }
  );
}
