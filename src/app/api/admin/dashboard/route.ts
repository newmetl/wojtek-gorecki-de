import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession, authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    const [
      totalAppointments,
      upcomingAppointments,
      pastAppointments,
      totalPosts,
      publishedPosts,
      draftPosts,
      nextAppointments,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { date: { gte: now } } }),
      prisma.appointment.count({ where: { date: { lt: now } } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "published" } }),
      prisma.blogPost.count({ where: { status: "draft" } }),
      prisma.appointment.findMany({
        where: { date: { gte: now } },
        include: { location: true },
        orderBy: { date: "asc" },
        take: 3,
      }),
    ]);

    return NextResponse.json({
      stats: {
        appointments: {
          total: totalAppointments,
          upcoming: upcomingAppointments,
          past: pastAppointments,
        },
        posts: {
          total: totalPosts,
          published: publishedPosts,
          draft: draftPosts,
        },
      },
      nextAppointments,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
