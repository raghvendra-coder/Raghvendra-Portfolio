import { NextRequest, NextResponse } from "next/server";
import { getMessagesCollection } from "@/lib/mongodb";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

function isAuthed(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  return session === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const collection = await getMessagesCollection();
    const messages = await collection
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    // Convert MongoDB's ObjectId to a plain string for the frontend.
    const serialized = messages.map((m) => ({
      id: m._id.toString(),
      name: m.name,
      email: m.email,
      message: m.message,
      created_at: m.created_at,
    }));

    return NextResponse.json(serialized);
  } catch (err) {
    console.error("Admin messages error:", err);
    return NextResponse.json(
      { error: "Could not connect to the database. Check MONGODB_URI in .env.local." },
      { status: 500 }
    );
  }
}
