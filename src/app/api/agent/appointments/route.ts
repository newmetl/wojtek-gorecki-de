import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { logAgentAction } from "@/lib/agent-logger";

function authenticateAgent(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === process.env.AGENT_API_KEY;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function GET(request: NextRequest) {
  if (!authenticateAgent(request)) {
    return NextResponse.json(
      { success: false, data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const ip = getClientIp(request);
  const limit = rateLimit(ip, 60, 60000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "20", 10);
    const skip = (page - 1) * perPage;

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        include: { location: true },
        orderBy: { date: "desc" },
        skip,
        take: perPage,
      }),
      prisma.appointment.count(),
    ]);

    logAgentAction("appointments", "list", "", "", 200);

    return NextResponse.json({
      success: true,
      data: { appointments, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } },
      error: null,
    });
  } catch (error) {
    console.error("Agent: Error fetching appointments:", error);
    logAgentAction("appointments", "list", "", "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!authenticateAgent(request)) {
    return NextResponse.json(
      { success: false, data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const ip = getClientIp(request);
  const limit = rateLimit(ip, 60, 60000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { title, locationId, date, timeStart, timeEnd, bookingUrl, description, isActive } = body;

    if (!title || !locationId || !date || !timeStart || !timeEnd) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required fields: title, locationId, date, timeStart, timeEnd" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        title,
        locationId,
        date: new Date(date),
        timeStart,
        timeEnd,
        bookingUrl: bookingUrl || null,
        description: description || null,
        isActive: isActive !== undefined ? isActive : true,
      },
      include: { location: true },
    });

    logAgentAction("appointments", "create", appointment.id, appointment.title, 201);

    return NextResponse.json(
      { success: true, data: appointment, error: null },
      { status: 201 }
    );
  } catch (error) {
    console.error("Agent: Error creating appointment:", error);
    logAgentAction("appointments", "create", "", "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
