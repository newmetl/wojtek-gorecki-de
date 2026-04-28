import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";
import { uploadLocationImage, deleteLocationImage } from "@/lib/upload";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, address, image_data, image_mime_type, remove_image } = body;

    const existing = await prisma.location.findUnique({
      where: { id: params.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    let imageUrl: string | null | undefined = undefined;
    if (image_data && image_mime_type) {
      imageUrl = uploadLocationImage(
        image_data,
        image_mime_type,
        existing.imageUrl
      );
    } else if (remove_image) {
      if (existing.imageUrl) {
        deleteLocationImage(existing.imageUrl);
      }
      imageUrl = null;
    }

    const location = await prisma.location.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(address !== undefined && { address }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    return NextResponse.json({ location });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appointmentCount = await prisma.appointment.count({
      where: { locationId: params.id },
    });

    if (appointmentCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete location: it is referenced by existing appointments" },
        { status: 400 }
      );
    }

    const existing = await prisma.location.findUnique({
      where: { id: params.id },
    });
    if (existing?.imageUrl) {
      deleteLocationImage(existing.imageUrl);
    }

    await prisma.location.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 }
    );
  }
}
