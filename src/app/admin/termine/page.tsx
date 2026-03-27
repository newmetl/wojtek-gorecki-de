import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import TermineClient from "./TermineClient";

export default async function TerminePage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  const appointments = await prisma.appointment.findMany({
    include: { location: true },
    orderBy: { date: "desc" },
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[#1a1c1a] mb-1">
            Termine
          </h1>
          <p className="text-sm text-[#1a1c1a]/50 font-label">
            Alle Termine verwalten
          </p>
        </div>
        <Link
          href="/admin/termine/neu"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 transition-colors"
        >
          + Neuer Termin
        </Link>
      </div>

      <TermineClient
        appointments={JSON.parse(JSON.stringify(appointments))}
      />
    </div>
  );
}
