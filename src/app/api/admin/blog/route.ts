import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
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
    const { title, slug, excerpt, content, status, image_data, image_mime_type } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Missing required fields: title, excerpt, content" },
        { status: 400 }
      );
    }

    const finalSlug = slug || slugify(title, { lower: true, strict: true });

    let imageUrl: string | null = null;
    if (image_data && image_mime_type) {
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

    const publishedAt =
      status === "published" ? new Date() : null;

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        status: status || "draft",
        imageUrl,
        publishedAt,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
