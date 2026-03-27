import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";

export default async function EinstellungenPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold text-[#1a1c1a] mb-1">
          Einstellungen
        </h1>
        <p className="text-sm text-[#1a1c1a]/50 font-label">
          Website-Konfiguration
        </p>
      </div>

      <div className="space-y-6">
        {/* Site Info */}
        <div className="bg-white rounded-xl border border-[#e0ddd8] p-6">
          <h2 className="font-label font-semibold text-sm text-[#1a1c1a] mb-4">
            Website-Informationen
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#e0ddd8]">
              <span className="text-sm font-label text-[#1a1c1a]/70">
                Website
              </span>
              <span className="text-sm font-label text-[#1a1c1a]">
                wojtek-gorecki.de
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#e0ddd8]">
              <span className="text-sm font-label text-[#1a1c1a]/70">
                Framework
              </span>
              <span className="text-sm font-label text-[#1a1c1a]">
                Next.js 14
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#e0ddd8]">
              <span className="text-sm font-label text-[#1a1c1a]/70">
                Datenbank
              </span>
              <span className="text-sm font-label text-[#1a1c1a]">
                SQLite (Prisma)
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-label text-[#1a1c1a]/70">
                Authentifizierung
              </span>
              <span className="text-sm font-label text-[#1a1c1a]">
                NextAuth (Passwort)
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-[#e0ddd8] p-6">
          <h2 className="font-label font-semibold text-sm text-[#1a1c1a] mb-4">
            Hinweise
          </h2>
          <div className="space-y-3 text-sm font-body text-[#1a1c1a]/70">
            <p>
              Calendly-Links und Buchungs-URLs konnen direkt in den
              Termin-Einstellungen als Anmelde-URL hinterlegt werden.
            </p>
            <p>
              Anderungen an der Seitenstruktur, Navigation oder Footer-Inhalten
              erfordern Anpassungen im Quellcode.
            </p>
            <p>
              Das Admin-Passwort wird uber die Umgebungsvariable
              ADMIN_PASSWORD gesteuert.
            </p>
          </div>
        </div>

        {/* Placeholder */}
        <div className="bg-[#faf9f6] rounded-xl border border-dashed border-[#e0ddd8] p-6 text-center">
          <p className="text-sm text-[#1a1c1a]/40 font-label">
            Weitere Einstellungen werden in zukunftigen Versionen hinzugefugt.
          </p>
        </div>
      </div>
    </div>
  );
}
