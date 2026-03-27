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
    const location = await prisma.location.findUnique({
      where: { id: params.id },
    });

    if (!location) {
      logAgentAction("locations", "get", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Location not found" },
        { status: 404 }
      );
    }

    logAgentAction("locations", "get", location.id, location.name, 200);
    return NextResponse.json({ success: true, data: location, error: null });
  } catch (error) {
    console.error("Agent: Error fetching location:", error);
    logAgentAction("locations", "get", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch location" },
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
    const { name, address } = body;

    const existing = await prisma.location.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      logAgentAction("locations", "update", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Location not found" },
        { status: 404 }
      );
    }

    const location = await prisma.location.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(address !== undefined && { address }),
      },
    });

    logAgentAction("locations", "update", location.id, location.name, 200);
    return NextResponse.json({ success: true, data: location, error: null });
  } catch (error) {
    console.error("Agent: Error updating location:", error);
    logAgentAction("locations", "update", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to update location" },
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
    const { name, address } = body;

    const existing = await prisma.location.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      logAgentAction("locations", "patch", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Location not found" },
        { status: 404 }
      );
    }

    const location = await prisma.location.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(address !== undefined && { address }),
      },
    });

    logAgentAction("locations", "patch", location.id, location.name, 200);
    return NextResponse.json({ success: true, data: location, error: null });
  } catch (error) {
    console.error("Agent: Error patching location:", error);
    logAgentAction("locations", "patch", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to patch location" },
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
    const location = await prisma.location.findUnique({
      where: { id: params.id },
    });

    if (!location) {
      logAgentAction("locations", "delete", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Location not found" },
        { status: 404 }
      );
    }

    const appointmentCount = await prisma.appointment.count({
      where: { locationId: params.id },
    });

    if (appointmentCount > 0) {
      logAgentAction("locations", "delete", params.id, location.name, 400);
      return NextResponse.json(
        { success: false, data: null, error: "Cannot delete location: it is referenced by existing appointments" },
        { status: 400 }
      );
    }

    await prisma.location.delete({ where: { id: params.id } });

    logAgentAction("locations", "delete", location.id, location.name, 200);
    return NextResponse.json({ success: true, data: { id: location.id }, error: null });
  } catch (error) {
    console.error("Agent: Error deleting location:", error);
    logAgentAction("locations", "delete", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to delete location" },
      { status: 500 }
    );
  }
}
