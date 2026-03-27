import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

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
    const { title, slug, excerpt, content, status, image_data, image_mime_type } = body;

    const existing = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let imageUrl = existing.imageUrl;
    if (image_data && image_mime_type) {
      // Remove old image if exists
      if (existing.imageUrl) {
        const oldPath = path.join(process.cwd(), "public", existing.imageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      const ext = image_mime_type.split("/")[1] || "png";
      const filename = `${uuidv4()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const buffer = Buffer.from(image_data, "base64");
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imageUrl = `/uploads/blog/${filename}`;
    }

    let finalSlug = existing.slug;
    if (slug) {
      finalSlug = slug;
    } else if (title && title !== existing.title) {
      finalSlug = slugify(title, { lower: true, strict: true });
    }

    // Set publishedAt when transitioning to published
    let publishedAt = existing.publishedAt;
    if (status === "published" && !existing.publishedAt) {
      publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        slug: finalSlug,
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(status !== undefined && { status }),
        imageUrl,
        publishedAt,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
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

    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Remove image file if exists
    if (post.imageUrl) {
      const imagePath = path.join(process.cwd(), "public", post.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.blogPost.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
