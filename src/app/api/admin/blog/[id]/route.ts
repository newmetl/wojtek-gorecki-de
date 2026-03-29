import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";
import slugify from "slugify";
import { uploadBlogImage, deleteBlogImage } from "@/lib/upload";

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
      imageUrl = uploadBlogImage(image_data, image_mime_type, existing.imageUrl);
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

    if (post.imageUrl) {
      deleteBlogImage(post.imageUrl);
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
