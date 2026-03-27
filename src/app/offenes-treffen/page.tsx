import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AppointmentCard from "@/components/AppointmentCard";

export const metadata = {
  title: "Offenes Treffen – Wojtek Gorecki",
  description:
    "Offene Abende in der Stille. Gemeinsame Begegnung ohne Methode, ohne Programm.",
};

interface AppointmentWithLocation {
  id: string;
  title: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  bookingUrl: string | null;
  description: string | null;
  location: {
    id: string;
    name: string;
    address: string | null;
  };
}

export default async function OffenesTreffenPage() {
  const now = new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      isActive: true,
      date: { gte: now },
    },
    include: { location: true },
    orderBy: { date: "asc" },
  });

  // Group appointments by location
  const grouped = appointments.reduce<
    Record<string, { location: AppointmentWithLocation["location"]; items: AppointmentWithLocation[] }>
  >((acc, apt) => {
    const key = apt.location.id;
    if (!acc[key]) {
      acc[key] = { location: apt.location, items: [] };
    }
    acc[key].items.push(apt);
    return acc;
  }, {});

  const locationGroups = Object.values(grouped);

  return (
    <>
      {/* Header */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <p className="font-label text-xs uppercase tracking-widest text-primary">
            Begegnung in der Stille
          </p>
          <h1 className="mt-4 font-headline text-4xl text-on-surface md:text-6xl">
            Offenes Treffen
          </h1>
          <div className="mt-10 max-w-2xl space-y-6 font-body text-base leading-relaxed text-on-surface/70">
            <p>
              Das Offene Treffen ist ein Raum, in dem nichts erreicht werden
              muss. Kein Programm, keine Methode — nur die Bereitschaft, ehrlich
              da zu sein. Mit sich selbst und mit anderen.
            </p>
            <p>
              Wir sitzen zusammen, teilen Stille und Worte. Was sich zeigt,
              darf sich zeigen. Es braucht keine Vorerfahrung, keine Anmeldung
              — nur den Wunsch, einen Abend in Offenheit zu verbringen.
            </p>
            <p>
              Die Treffen finden regelmäßig an verschiedenen Orten statt und
              sind auf Spendenbasis zugänglich. Jeder ist willkommen.
            </p>
          </div>
        </div>
      </section>

      {/* Atmospheric Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80"
          alt="Stille Begegnung"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
      </section>

      {/* Appointments */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <h2 className="font-headline text-3xl text-on-surface md:text-4xl">
            Kommende Termine
          </h2>

          {locationGroups.length === 0 ? (
            <p className="mt-8 font-body text-base text-on-surface/50">
              Aktuell sind keine Termine geplant. Schau bald wieder vorbei.
            </p>
          ) : (
            <div className="mt-12 space-y-16">
              {locationGroups.map((group) => (
                <div key={group.location.id}>
                  <h3 className="font-headline text-xl text-on-surface">
                    {group.location.name}
                  </h3>
                  {group.location.address && (
                    <p className="mt-1 font-label text-sm text-on-surface/50">
                      {group.location.address}
                    </p>
                  )}
                  <div className="mt-6 space-y-3">
                    {group.items.map((apt) => (
                      <AppointmentCard
                        key={apt.id}
                        title={apt.title}
                        date={apt.date}
                        timeStart={apt.timeStart}
                        timeEnd={apt.timeEnd}
                        bookingUrl={apt.bookingUrl}
                        description={apt.description}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="bg-surface-container-low py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="font-headline text-2xl text-on-surface md:text-3xl">
            Gut zu wissen
          </h2>
          <ul className="mt-8 space-y-4 font-body text-base leading-relaxed text-on-surface/70">
            <li className="flex gap-3">
              <span className="mt-1 text-primary">&#x2022;</span>
              <span>
                Bitte komm etwa 10 Minuten vor Beginn, damit wir gemeinsam
                starten können.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-primary">&#x2022;</span>
              <span>
                Die Teilnahme ist auf Spendenbasis — als Richtwert
                empfehle ich 15–20 Euro.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-primary">&#x2022;</span>
              <span>
                Es braucht keine Vorerfahrung. Komm, wie du bist.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-primary">&#x2022;</span>
              <span>
                Bequeme Kleidung ist empfehlenswert. Sitzkissen und Stühle
                sind vorhanden.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Cross-reference */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="font-body text-base leading-relaxed text-on-surface/60">
            Du wünschst dir einen persönlicheren Rahmen?
          </p>
          <h3 className="mt-4 font-headline text-2xl text-on-surface md:text-3xl">
            Begleitgespräch
          </h3>
          <p className="mt-4 font-body text-base text-on-surface/60">
            In einem Einzelgespräch begleite ich dich mit voller
            Aufmerksamkeit — in deinem Tempo, in deinem Raum.
          </p>
          <Link
            href="/begleitgespraech"
            className="mt-8 inline-block rounded-xl bg-primary px-8 py-4 font-label text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
          >
            Mehr erfahren
          </Link>
        </div>
      </section>
    </>
  );
}
