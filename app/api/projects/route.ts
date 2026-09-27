import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(process.cwd(), "data", "projects.json");

export async function GET() {
  const raw = await fs.readFile(filePath, "utf-8");
  const projects = JSON.parse(raw);
  return NextResponse.json(projects);
}

// Lets the admin page overwrite the full projects list.
// Note: on serverless hosts (like Vercel) the filesystem is read-only in
// production, so this write works locally / on a normal Node server but
// would need a real database if deployed serverless.
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "Expected an array of projects." },
        { status: 400 }
      );
    }
    await fs.writeFile(filePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Projects update error:", err);
    return NextResponse.json(
      { error: "Could not save projects." },
      { status: 500 }
    );
  }
}
