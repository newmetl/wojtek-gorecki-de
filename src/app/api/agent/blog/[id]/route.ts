import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { logAgentAction } from "@/lib/agent-logger";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

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

async function handleImageUpload(
  image_data: string,
  image_mime_type: string,
  existingImageUrl: string | null
): Promise<string> {
  if (existingImageUrl) {
    const oldPath = path.join(process.cwd(), "public", existingImageUrl);
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
  return `/uploads/blog/${filename}`;
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
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      logAgentAction("blog", "get", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Post not found" },
        { status: 404 }
      );
    }

    logAgentAction("blog", "get", post.id, post.title, 200);
    return NextResponse.json({ success: true, data: post, error: null });
  } catch (error) {
    console.error("Agent: Error fetching blog post:", error);
    logAgentAction("blog", "get", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch blog post" },
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
    const { title, slug, excerpt, content, status, image_data, image_mime_type } = body;

    const existing = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      logAgentAction("blog", "update", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Post not found" },
        { status: 404 }
      );
    }

    let imageUrl = existing.imageUrl;
    if (image_data && image_mime_type) {
      imageUrl = await handleImageUpload(image_data, image_mime_type, existing.imageUrl);
    }

    let finalSlug = existing.slug;
    if (slug) {
      finalSlug = slug;
    } else if (title && title !== existing.title) {
      finalSlug = slugify(title, { lower: true, strict: true });
    }

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

    logAgentAction("blog", "update", post.id, post.title, 200);
    return NextResponse.json({ success: true, data: post, error: null });
  } catch (error) {
    console.error("Agent: Error updating blog post:", error);
    logAgentAction("blog", "update", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to update blog post" },
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
    const { title, slug, excerpt, content, status, image_data, image_mime_type } = body;

    const existing = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      logAgentAction("blog", "patch", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Post not found" },
        { status: 404 }
      );
    }

    let imageUrl: string | undefined | null;
    if (image_data && image_mime_type) {
      imageUrl = await handleImageUpload(image_data, image_mime_type, existing.imageUrl);
    }

    let finalSlug: string | undefined;
    if (slug) {
      finalSlug = slug;
    } else if (title && title !== existing.title) {
      finalSlug = slugify(title, { lower: true, strict: true });
    }

    let publishedAt: Date | undefined;
    if (status === "published" && !existing.publishedAt) {
      publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(finalSlug !== undefined && { slug: finalSlug }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(status !== undefined && { status }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(publishedAt !== undefined && { publishedAt }),
      },
    });

    logAgentAction("blog", "patch", post.id, post.title, 200);
    return NextResponse.json({ success: true, data: post, error: null });
  } catch (error) {
    console.error("Agent: Error patching blog post:", error);
    logAgentAction("blog", "patch", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to patch blog post" },
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
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      logAgentAction("blog", "delete", params.id, "", 404);
      return NextResponse.json(
        { success: false, data: null, error: "Post not found" },
        { status: 404 }
      );
    }

    if (post.imageUrl) {
      const imagePath = path.join(process.cwd(), "public", post.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.blogPost.delete({ where: { id: params.id } });

    logAgentAction("blog", "delete", post.id, post.title, 200);
    return NextResponse.json({ success: true, data: { id: post.id }, error: null });
  } catch (error) {
    console.error("Agent: Error deleting blog post:", error);
    logAgentAction("blog", "delete", params.id, "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
