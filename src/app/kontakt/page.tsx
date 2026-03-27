import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import PauseBlock from "@/components/PauseBlock";

export const metadata = {
  title: "Kontakt – Wojtek Gorecki",
  description:
    "Nimm Kontakt auf. Schreib mir eine Nachricht oder ruf mich an.",
};

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="font-headline text-4xl text-on-surface md:text-6xl">
            Schreib mir.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-on-surface/60">
            Ob du eine Frage hast, einen Termin vereinbaren möchtest oder
            einfach Hallo sagen willst — ich freue mich auf deine Nachricht.
          </p>
        </div>
      </section>

      {/* Two-column: Contact info + Form */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Left: Direct contacts */}
            <div className="space-y-8">
              <div>
                <p className="font-label text-xs uppercase tracking-widest text-primary">
                  E-Mail
                </p>
                <p className="mt-2 font-body text-base text-on-surface">
                  <a
                    href="mailto:kontakt@wojtek-gorecki.de"
                    className="transition-colors hover:text-primary"
                  >
                    kontakt(at)wojtek-gorecki.de
                  </a>
                </p>
              </div>

              <div>
                <p className="font-label text-xs uppercase tracking-widest text-primary">
                  Telefon
                </p>
                <p className="mt-2 font-body text-base text-on-surface">
                  <a
                    href="tel:+4915XX"
                    className="transition-colors hover:text-primary"
                  >
                    +49 (0) 15XX – XXX XX XX
                  </a>
                </p>
              </div>

              <div>
                <p className="font-label text-xs uppercase tracking-widest text-primary">
                  Telegram
                </p>
                <p className="mt-2 font-body text-base text-on-surface">
                  <a
                    href="https://t.me/wojtekgorecki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    @wojtekgorecki
                  </a>
                </p>
              </div>

              <div>
                <p className="font-label text-xs uppercase tracking-widest text-primary">
                  WhatsApp
                </p>
                <p className="mt-2 font-body text-base text-on-surface">
                  <a
                    href="https://wa.me/4915XX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-primary"
                  >
                    Nachricht senden
                  </a>
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* PauseBlock */}
      <PauseBlock
        quote="Der Anfang ist die Hälfte des Ganzen."
        author="Aristoteles"
      />

      {/* Atmospheric image */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&q=80"
          alt="Stille Landschaft"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent" />
      </section>
    </>
  );
}
