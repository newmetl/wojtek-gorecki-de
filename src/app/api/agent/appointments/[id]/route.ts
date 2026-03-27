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

function checkRateLimit(request: NextRequest) {
  const ip = getClientIp(request);
  return rateLimit(ip, 60, 60000);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!authenticateAgent(request)) {
    return NextResponse.json(
      { success: false, data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const limit = checkRateLimit(request);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: { location: true },
    });

    if (!appointment) {
      logAgentAction("appointments", "get", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Appointment not found" },
        { status: 404 }
      );
    }

    logAgentAction("appointments", "get", appointment.id, appointment.title, 200);
    return NextResponse.json({ success: true, data: appointment, error: null });
  } catch (error) {
    console.error("Agent: Error fetching appointment:", error);
    logAgentAction("appointments", "get", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!authenticateAgent(request)) {
    return NextResponse.json(
      { success: false, data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const limit = checkRateLimit(request);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { title, locationId, date, timeStart, timeEnd, bookingUrl, description, isActive } = body;

    const existing = await prisma.appointment.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      logAgentAction("appointments", "update", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Appointment not found" },
        { status: 404 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(locationId !== undefined && { locationId }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(timeStart !== undefined && { timeStart }),
        ...(timeEnd !== undefined && { timeEnd }),
        ...(bookingUrl !== undefined && { bookingUrl }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      },
      include: { location: true },
    });

    logAgentAction("appointments", "update", appointment.id, appointment.title, 200);
    return NextResponse.json({ success: true, data: appointment, error: null });
  } catch (error) {
    console.error("Agent: Error updating appointment:", error);
    logAgentAction("appointments", "update", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!authenticateAgent(request)) {
    return NextResponse.json(
      { success: false, data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const limit = checkRateLimit(request);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { title, locationId, date, timeStart, timeEnd, bookingUrl, description, isActive } = body;

    const existing = await prisma.appointment.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      logAgentAction("appointments", "patch", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Appointment not found" },
        { status: 404 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(locationId !== undefined && { locationId }),
        ...(date !== undefined && { date: new Date(date) }),
        ...(timeStart !== undefined && { timeStart }),
        ...(timeEnd !== undefined && { timeEnd }),
        ...(bookingUrl !== undefined && { bookingUrl }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      },
      include: { location: true },
    });

    logAgentAction("appointments", "patch", appointment.id, appointment.title, 200);
    return NextResponse.json({ success: true, data: appointment, error: null });
  } catch (error) {
    console.error("Agent: Error patching appointment:", error);
    logAgentAction("appointments", "patch", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to patch appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!authenticateAgent(request)) {
    return NextResponse.json(
      { success: false, data: null, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const limit = checkRateLimit(request);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Rate limit exceeded" },
      { status: 429 }
    );
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    });

    if (!appointment) {
      logAgentAction("appointments", "delete", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Appointment not found" },
        { status: 404 }
      );
    }

    await prisma.appointment.delete({ where: { id: params.id } });

    logAgentAction("appointments", "delete", appointment.id, appointment.title, 200);
    return NextResponse.json({ success: true, data: { id: appointment.id }, error: null });
  } catch (error) {
    console.error("Agent: Error deleting appointment:", error);
    logAgentAction("appointments", "delete", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
