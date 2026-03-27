import Image from "next/image";
import Link from "next/link";
import PauseBlock from "@/components/PauseBlock";

export const metadata = {
  title: "Begleitgespräch – Wojtek Gorecki",
  description:
    "60-minütige Einzelbegleitung in einem geschützten Raum. Psychologische und spirituelle Beratung.",
};

export default function BegleitgespraechPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <p className="font-label text-xs uppercase tracking-widest text-primary">
            Einzelbegleitung
          </p>
          <h1 className="mt-4 font-headline text-4xl text-on-surface md:text-6xl">
            Begleitgespräch
          </h1>
          <p className="mt-10 max-w-2xl font-body text-lg leading-relaxed text-on-surface/70">
            Ein 60-minütiges Gespräch unter vier Augen. Kein Coaching, keine
            Therapie im klassischen Sinn — sondern ein Raum, in dem du gehört
            wirst. Mit allem, was gerade da ist.
          </p>
        </div>
      </section>

      {/* Atmospheric Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&q=80"
          alt="Stiller Raum"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent" />
      </section>

      {/* PauseBlock */}
      <PauseBlock
        quote="Man kann einen Menschen nichts lehren, man kann ihm nur helfen, es in sich selbst zu entdecken."
        author="Galileo Galilei"
      />

      {/* Das Angebot */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h2 className="font-headline text-3xl text-on-surface md:text-4xl">
            Das Angebot
          </h2>
          <div className="mt-10 space-y-6 font-body text-base leading-relaxed text-on-surface/70">
            <p>
              In einem Begleitgespräch geht es nicht um Ratschläge oder
              Lösungen. Es geht darum, gemeinsam hinzuschauen — auf das, was
              dich bewegt, was sich zeigen will, was vielleicht lange
              verborgen lag.
            </p>
            <p>
              Ich begleite dich mit Präsenz, Offenheit und Einfühlungsvermögen.
              Der Rahmen ist geschützt und vertraulich. Es braucht keinen
              besonderen Anlass — manchmal reicht der Wunsch, sich selbst
              ehrlicher zu begegnen.
            </p>
            <p>
              Die Gespräche finden persönlich oder online statt. Schreib mir
              einfach, und wir finden einen Termin, der für dich passt.
            </p>
          </div>
        </div>
      </section>

      {/* Price Card */}
      <section className="bg-surface-container-low py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          <div className="rounded-xl bg-surface-container-lowest px-8 py-12 text-center md:px-12 md:py-16">
            <p className="font-label text-xs uppercase tracking-widest text-primary">
              Einzelsitzung
            </p>
            <p className="mt-6 font-headline text-6xl text-on-surface">
              80 &euro;
            </p>
            <p className="mt-2 font-label text-sm text-on-surface/50">
              pro 60 Minuten
            </p>
            <Link
              href="#"
              className="mt-10 inline-block rounded-xl bg-primary px-10 py-4 font-label text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
            >
              Termin buchen
            </Link>
            <p className="mt-8 font-body text-sm text-on-surface/50">
              Ein reduzierter Preis ist auf Anfrage möglich.
              <br />
              Geld soll kein Hindernis sein.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
