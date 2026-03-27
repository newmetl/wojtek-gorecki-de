import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

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

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold text-[#1a1c1a] mb-1">
          Dashboard
        </h1>
        <p className="text-sm text-[#1a1c1a]/50 font-label">
          Ubersicht der Website-Inhalte
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#e0ddd8] p-5">
          <p className="text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider mb-1">
            Termine gesamt
          </p>
          <p className="text-3xl font-headline font-bold text-[#1a1c1a]">
            {totalAppointments}
          </p>
          <div className="mt-2 flex gap-3 text-xs font-label text-[#1a1c1a]/50">
            <span>{upcomingAppointments} kommende</span>
            <span>{pastAppointments} vergangene</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#e0ddd8] p-5">
          <p className="text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider mb-1">
            Kommende Termine
          </p>
          <p className="text-3xl font-headline font-bold text-[#795437]">
            {upcomingAppointments}
          </p>
          <p className="mt-2 text-xs font-label text-[#1a1c1a]/50">
            aktiv geplant
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#e0ddd8] p-5">
          <p className="text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider mb-1">
            Blogposts
          </p>
          <p className="text-3xl font-headline font-bold text-[#1a1c1a]">
            {totalPosts}
          </p>
          <div className="mt-2 flex gap-3 text-xs font-label text-[#1a1c1a]/50">
            <span>{publishedPosts} veroffentlicht</span>
            <span>{draftPosts} Entwurfe</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/admin/termine/neu"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 transition-colors"
        >
          + Neuen Termin anlegen
        </Link>
        <Link
          href="/admin/blog/neu"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e0ddd8] text-[#1a1c1a] text-sm font-label font-medium rounded-lg hover:bg-[#faf9f6] transition-colors"
        >
          + Neuen Blogpost anlegen
        </Link>
      </div>

      {/* Next Appointments */}
      <div className="bg-white rounded-xl border border-[#e0ddd8] p-5">
        <h2 className="font-label font-semibold text-sm text-[#1a1c1a] mb-4">
          Nachste Termine
        </h2>
        {nextAppointments.length === 0 ? (
          <p className="text-sm text-[#1a1c1a]/50 font-body">
            Keine kommenden Termine vorhanden.
          </p>
        ) : (
          <div className="space-y-3">
            {nextAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between py-3 border-b border-[#e0ddd8] last:border-0"
              >
                <div>
                  <p className="text-sm font-label font-medium text-[#1a1c1a]">
                    {apt.title}
                  </p>
                  <p className="text-xs font-label text-[#1a1c1a]/50 mt-0.5">
                    {new Date(apt.date).toLocaleDateString("de-DE", {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}{" "}
                    | {apt.timeStart} - {apt.timeEnd} | {apt.location.name}
                  </p>
                </div>
                <Link
                  href={`/admin/termine/${apt.id}`}
                  className="text-xs font-label text-[#795437] hover:underline"
                >
                  Bearbeiten
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
