import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Newsletter service is not configured" },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "E-Mail-Adresse ist erforderlich" },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Ungültige E-Mail-Adresse" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);

      if (res.status === 422) {
        return NextResponse.json(
          { error: "Diese E-Mail-Adresse ist ungültig oder bereits angemeldet." },
          { status: 422 },
        );
      }

      console.error("Mailerlite API error:", res.status, data);
      return NextResponse.json(
        { error: "Anmeldung fehlgeschlagen. Bitte versuche es später erneut." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Anmeldung fehlgeschlagen. Bitte versuche es später erneut." },
      { status: 500 },
    );
  }
}
