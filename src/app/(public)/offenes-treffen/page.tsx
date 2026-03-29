export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AppointmentCard from "@/components/AppointmentCard";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Offenes Treffen – Wojtek Gorecki",
  description:
    "Offene Abende in der Stille. Gemeinsame Begegnung ohne Methode, ohne Programm.",
};

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

  return (
    <>
      {/* Header */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <FadeIn direction="none" delay={100}>
            <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.25em] text-primary">
              Begegnung in der Stille
            </p>
          </FadeIn>
          <FadeIn direction="none" delay={200}>
            <h1 className="mt-5 font-headline text-[2.75rem] text-on-surface md:text-[4.75rem]">
              Offenes Treffen
            </h1>
          </FadeIn>
          <FadeIn direction="none" delay={350}>
            <div className="mt-10 max-w-2xl space-y-6 font-body text-base font-medium leading-relaxed text-on-surface/60">
              <p>
                Ein Raum ohne Agenda, ohne Methode, ohne Ziel, irgendwo
                anzukommen. Du musst nichts erreichen, nichts verstehen und
                nichts an dir verändern. Du kannst mit Fragen kommen, mit
                Zweifel, mit Erschöpfung vom Suchen — oder einfach ohne
                Anliegen.
              </p>
              <p>
                Wir richten die Aufmerksamkeit gemeinsam auf das, was bereits
                ist. Nicht, um etwas zu verstehen — sondern um zu sehen, was
                bleibt, wenn nichts verstanden werden muss. Manchmal entsteht
                Stille. Manchmal ein Gespräch. Manchmal nur ein gemeinsames
                Dasein.
              </p>
              <p>
                Du kannst zuhören, dich einbringen oder einfach da sein. Die
                Teilnahme ist auf Spendenbasis.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Atmospheric Image */}
      <FadeIn>
        <section className="relative h-[50vh] md:h-[60vh]">
          <Image
            src="/images/offenes-treffen.png"
            alt="Offenes Treffen"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
        </section>
      </FadeIn>

      {/* Appointments */}
      <section className="py-28 md:py-36">
        <FadeIn>
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <h2 className="font-headline text-[2.25rem] text-on-surface md:text-[3.25rem]">
              Kommende Termine
            </h2>

            {appointments.length === 0 ? (
              <p className="mt-8 font-body text-base font-medium text-on-surface/40">
                Aktuell sind keine Termine geplant. Schau bald wieder vorbei.
              </p>
            ) : (
              <div className="mt-14 space-y-4">
                {appointments.map((apt) => (
                  <AppointmentCard
                    key={apt.id}
                    title={apt.title}
                    date={apt.date}
                    timeStart={apt.timeStart}
                    timeEnd={apt.timeEnd}
                    locationName={apt.location.name}
                    locationAddress={apt.location.address ?? undefined}
                    bookingUrl={apt.bookingUrl}
                    description={apt.description}
                  />
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* Info */}
      <section className="bg-surface-container-low py-28 md:py-36">
        <FadeIn>
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <h2 className="font-headline text-[1.65rem] text-on-surface md:text-[2.25rem]">
              Gut zu wissen
            </h2>
            <ul className="mt-10 space-y-5 font-body text-base font-medium leading-relaxed text-on-surface/60">
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                <span>
                  Bitte komm ein paar Minuten vor Beginn, damit wir
                  gemeinsam und in Ruhe starten können.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                <span>
                  Es braucht keine Vorerfahrung. Komm einfach, wie du bist.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                <span>
                  Alle Treffen — ob online oder vor Ort — finden in einem
                  geschützten Rahmen statt. Es wird nichts aufgezeichnet
                  oder veröffentlicht.
                </span>
              </li>
            </ul>
          </div>
        </FadeIn>
      </section>

      {/* Cross-reference */}
      <section className="py-28 md:py-36">
        <FadeIn>
          <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
            <p className="font-body text-base font-medium leading-relaxed text-on-surface/50">
              Du wünschst dir einen persönlicheren Rahmen?
            </p>
            <h3 className="mt-4 font-headline text-[1.65rem] text-on-surface md:text-[2.25rem]">
              Begleitgespräch
            </h3>
            <p className="mt-4 font-body text-base font-medium text-on-surface/50">
              In einem Einzelgespräch begleite ich dich mit voller
              Aufmerksamkeit — in deinem Tempo, in deinem Raum.
            </p>
            <Link
              href="/begleitgespraech"
              className="group relative mt-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-10 py-4 font-label text-[0.8rem] font-medium tracking-wide text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10">Mehr erfahren</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
