import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";
import { uploadLocationImage } from "@/lib/upload";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const locations = await prisma.location.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ locations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
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
    const { name, address, image_data, image_mime_type } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Missing required field: name" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (image_data && image_mime_type) {
      imageUrl = uploadLocationImage(image_data, image_mime_type);
    }

    const location = await prisma.location.create({
      data: {
        name,
        address: address || null,
        imageUrl,
      },
    });

    return NextResponse.json({ location }, { status: 201 });
  } catch (error) {
    console.error("Error creating location:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}
