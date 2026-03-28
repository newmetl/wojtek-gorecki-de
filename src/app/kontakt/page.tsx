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
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="font-headline text-[2.75rem] text-on-surface md:text-[4.75rem]">
            Schreib mir.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg font-normal leading-relaxed text-on-surface/50">
            Ob du eine Frage hast, einen Termin vereinbaren möchtest oder
            einfach Hallo sagen willst — ich freue mich auf deine Nachricht.
          </p>
        </div>
      </section>

      {/* Two-column: Contact info + Form */}
      <section className="pb-28 md:pb-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid gap-16 md:grid-cols-2">
            {/* Left: Direct contacts */}
            <div className="space-y-10">
              <div>
                <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
                  E-Mail
                </p>
                <p className="mt-3 font-body text-base font-normal text-on-surface">
                  <a
                    href="mailto:kontakt@wojtek-gorecki.de"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    kontakt(at)wojtek-gorecki.de
                  </a>
                </p>
              </div>

              <div>
                <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
                  Telefon
                </p>
                <p className="mt-3 font-body text-base font-normal text-on-surface">
                  <a
                    href="tel:+4915XX"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    +49 (0) 15XX – XXX XX XX
                  </a>
                </p>
              </div>

              <div>
                <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
                  Telegram
                </p>
                <p className="mt-3 font-body text-base font-normal text-on-surface">
                  <a
                    href="https://t.me/wojtekgorecki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    @wojtekgorecki
                  </a>
                </p>
              </div>

              <div>
                <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
                  WhatsApp
                </p>
                <p className="mt-3 font-body text-base font-normal text-on-surface">
                  <a
                    href="https://wa.me/4915XX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-primary"
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
