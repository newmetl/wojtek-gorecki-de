import Image from "next/image";
import PauseBlock from "@/components/PauseBlock";

export const metadata = {
  title: "Über mich – Wojtek Gorecki",
  description:
    "Über Wojtek Gorecki. Psychologische und spirituelle Begleitung aus persönlicher Erfahrung.",
};

export default function UeberMichPage() {
  return (
    <>
      {/* Portrait + Intro */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid items-start gap-16 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Wojtek Gorecki"
                fill
                className="object-cover grayscale transition-all duration-1000 hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <h1 className="font-headline text-[2.25rem] text-on-surface md:text-[3.25rem] md:leading-tight">
                Der Raum zwischen den Worten.
              </h1>
              <div className="mt-10 space-y-6 font-body text-base font-normal leading-relaxed text-on-surface/60">
                <p>
                  Mein Name ist Wojtek Gorecki. Ich begleite Menschen auf ihrem
                  Weg zu sich selbst — nicht als Experte, der Antworten hat,
                  sondern als jemand, der den Wert des ehrlichen Hinschauens
                  kennt.
                </p>
                <p>
                  Mein eigener Weg begann nicht mit einem Plan. Er begann mit
                  einer Krise, mit dem Scheitern von Vorstellungen, die ich
                  für mein Leben hielt. In der Stille, die danach kam, fand
                  ich etwas, das ich nicht erwartet hatte: eine Tiefe, die
                  schon immer da war.
                </p>
                <p>
                  Heute teile ich diesen Raum mit anderen. In offenen Treffen,
                  in Einzelgesprächen, in Texten. Nicht weil ich eine Methode
                  gefunden habe, sondern weil die Begegnung mit dem, was ist,
                  selbst der Weg ist.
                </p>
                <p>
                  Ich lebe in Bergheim bei Köln und arbeite sowohl persönlich
                  als auch online. Meine Arbeit ist geprägt von der
                  Überzeugung, dass jeder Mensch bereits alles in sich trägt,
                  was er braucht.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid gap-14 md:grid-cols-3">
            <div>
              <div className="mb-6 h-px w-10 bg-primary/40" />
              <h3 className="font-headline text-[1.5rem] text-on-surface">
                Einfachheit
              </h3>
              <p className="mt-4 font-body text-base font-normal leading-relaxed text-on-surface/50">
                Kein System, keine Technik. Was wirklich wirkt, ist oft das
                Einfachste: Da sein. Hinhören. Nicht ausweichen.
              </p>
            </div>
            <div>
              <div className="mb-6 h-px w-10 bg-primary/40" />
              <h3 className="font-headline text-[1.5rem] text-on-surface">
                Präsenz
              </h3>
              <p className="mt-4 font-body text-base font-normal leading-relaxed text-on-surface/50">
                Alles beginnt im Jetzt. Nicht in der Analyse der
                Vergangenheit, nicht in der Hoffnung auf die Zukunft — sondern
                in dem, was gerade lebendig ist.
              </p>
            </div>
            <div>
              <div className="mb-6 h-px w-10 bg-primary/40" />
              <h3 className="font-headline text-[1.5rem] text-on-surface">
                Tiefe
              </h3>
              <p className="mt-4 font-body text-base font-normal leading-relaxed text-on-surface/50">
                Unter der Oberfläche liegt etwas, das nicht verbessert werden
                muss. Die Bereitschaft, dort hinzuschauen, ist der Anfang
                wirklicher Veränderung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PauseBlock */}
      <PauseBlock
        quote="Werde, der du bist."
        author="Friedrich Nietzsche"
      />

      {/* CTA */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="font-body text-base font-normal leading-relaxed text-on-surface/50">
            Ich freue mich über Begegnungen — ob persönlich, online oder auf
            Facebook.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://www.facebook.com/wojtek.gorecki"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-9 py-4 font-label text-[0.8rem] font-normal tracking-wide text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10">Auf Facebook folgen</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
