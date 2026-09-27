import { NextRequest, NextResponse } from "next/server";
import { getMessagesCollection } from "@/lib/mongodb";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  // --- Server-side validation (same rules as before, kept intact) ---
  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 });
  }
  if (name.trim().length > 200 || email.trim().length > 320 || message.trim().length > 5000) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  const submittedAt = new Date();

  // --- Save to MongoDB for the admin dashboard (best-effort) ---
  // A database hiccup shouldn't stop the email notification below, so this
  // is logged rather than surfaced to the visitor.
  try {
    const messages = await getMessagesCollection();
    await messages.insertOne({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      created_at: submittedAt.toISOString(),
    });
  } catch (err) {
    console.error("Contact form: failed to save message to MongoDB:", err);
  }

  // --- Send the message to your personal inbox via Resend ---
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.EMAIL_TO;
  const fromAddress = process.env.EMAIL_FROM;

  if (!apiKey || !toAddress || !fromAddress) {
    console.error(
      "Contact form: missing RESEND_API_KEY, EMAIL_TO, or EMAIL_FROM environment variable(s)."
    );
    return NextResponse.json(
      { error: "Email service isn't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: cleanEmail,
        subject: `New portfolio message from ${cleanName}`,
        html: `
          <div style="font-family:sans-serif;line-height:1.6;color:#111">
            <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
            <p><strong>Submitted:</strong> ${submittedAt.toLocaleString()}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br/>")}</p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text().catch(() => "");
      console.error("Contact form: Resend API error:", emailRes.status, errText);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again or email me directly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact form: email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
