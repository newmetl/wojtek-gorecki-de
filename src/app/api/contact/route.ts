import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formspreeId = process.env.FORMSPREE_ID;

  if (!formspreeId) {
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 500 },
    );
  }

  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
