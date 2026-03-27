import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      include: { location: true },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, locationId, date, timeStart, timeEnd, bookingUrl, description, isActive } = body;

    if (!title || !locationId || !date || !timeStart || !timeEnd) {
      return NextResponse.json(
        { error: "Missing required fields: title, locationId, date, timeStart, timeEnd" },
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

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
