import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { logAgentAction } from "@/lib/agent-logger";
import slugify from "slugify";
import { uploadBlogImage } from "@/lib/upload";

function authenticateAgent(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  return token === process.env.AGENT_API_KEY;
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

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: perPage,
      }),
      prisma.blogPost.count(),
    ]);

    logAgentAction("blog", "list", "", "", 200);

    return NextResponse.json({
      success: true,
      data: { posts, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } },
      error: null,
    });
  } catch (error) {
    console.error("Agent: Error fetching blog posts:", error);
    logAgentAction("blog", "list", "", "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to fetch blog posts" },
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
    const { title, slug, excerpt, content, status, image_data, image_mime_type } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, data: null, error: "Missing required fields: title, excerpt, content" },
        { status: 400 }
      );
    }

    const finalSlug = slug || slugify(title, { lower: true, strict: true });

    let imageUrl: string | null = null;
    if (image_data && image_mime_type) {
      imageUrl = uploadBlogImage(image_data, image_mime_type);
    }

    const publishedAt = status === "published" ? new Date() : null;

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

    logAgentAction("blog", "create", post.id, post.title, 201);

    return NextResponse.json(
      { success: true, data: post, error: null },
      { status: 201 }
    );
  } catch (error) {
    console.error("Agent: Error creating blog post:", error);
    logAgentAction("blog", "create", "", "", 500);
    return NextResponse.json(
      { success: false, data: null, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
