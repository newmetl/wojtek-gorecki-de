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
    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" },
    });

    logAgentAction("locations", "list", "", "", 200);

    return NextResponse.json({
      success: true,
      data: { locations },
      error: null,
    });
  } catch (error) {
    console.error("Agent: Error fetching locations:", error);
    logAgentAction("locations", "list", "", "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch locations" },
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
    const { name, address } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required field: name" },
        { status: 400 }
      );
    }

    const location = await prisma.location.create({
      data: {
        name,
        address: address || null,
      },
    });

    logAgentAction("locations", "create", location.id, location.name, 201);

    return NextResponse.json(
      { success: true, data: location, error: null },
      { status: 201 }
    );
  } catch (error) {
    console.error("Agent: Error creating location:", error);
    logAgentAction("locations", "create", "", "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to create location" },
      { status: 500 }
    );
  }
}
