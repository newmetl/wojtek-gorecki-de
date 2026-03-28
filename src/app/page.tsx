import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import AppointmentCard from "@/components/AppointmentCard";
import BlogCard from "@/components/BlogCard";
import PauseBlock from "@/components/PauseBlock";
import NewsletterForm from "@/components/NewsletterForm";

export default async function HomePage() {
  const now = new Date();

  const appointments = await prisma.appointment.findMany({
    where: {
      isActive: true,
      date: { gte: now },
    },
    include: { location: true },
    orderBy: { date: "asc" },
    take: 3,
  });

  const posts = await prisma.blogPost.findMany({
    where: {
      status: "published",
      publishedAt: { lte: now },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-[0.07]"
            priority
          />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-32 md:px-12">
          <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary/80">
            Psychologische &amp; spirituelle Begleitung
          </p>
          <h1 className="mt-6 font-headline text-[3rem] leading-[1.1] text-on-surface md:text-[4.75rem]">
            Was bereits ist.
          </h1>
          <p className="mt-8 max-w-2xl font-body text-lg font-normal leading-relaxed text-on-surface/60 md:text-xl">
            Ein Raum für innere Klarheit. Nicht um etwas zu reparieren oder zu
            optimieren — sondern um dem zu begegnen, was schon da ist.
          </p>
          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/offenes-treffen"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-9 py-4 font-label text-[0.8rem] font-normal tracking-wide text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10">Offenes Treffen entdecken</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link
              href="/begleitgespraech"
              className="inline-flex items-center justify-center rounded-full border border-outline-variant/60 bg-transparent px-9 py-4 font-label text-[0.8rem] font-normal tracking-wide text-on-surface transition-all duration-300 hover:border-primary/40 hover:bg-primary/[0.04] hover:text-primary"
            >
              Begleitgespräch anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="mx-auto mb-10 h-px w-16 bg-primary/30" />
          <p className="text-center font-headline text-[1.65rem] leading-relaxed text-on-surface md:text-[2rem]">
            Es geht nicht darum, besser zu werden. Es geht darum, ehrlich
            hinzuschauen. In der Begegnung mit dem, was ist, entsteht ein Raum
            — offen, still und lebendig.
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-primary/30" />
        </div>
      </section>

      {/* Offenes Treffen Teaser */}
      <section className="bg-surface-container-low py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
            Begegnung
          </p>
          <h2 className="mt-4 font-headline text-[2.25rem] text-on-surface md:text-[3.25rem]">
            Offenes Treffen
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base font-normal leading-relaxed text-on-surface/60">
            Ein offener Abend für alle, die den Wunsch nach Stille und
            aufrichtiger Begegnung teilen. Ohne Methode, ohne Programm — nur
            die Bereitschaft, da zu sein.
          </p>

          {appointments.length > 0 && (
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

          <div className="mt-12">
            <Link
              href="/offenes-treffen"
              className="group inline-flex items-center gap-2 font-label text-[0.8rem] font-normal text-primary transition-all duration-300 hover:gap-3"
            >
              Alle Termine
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Begleitgespräch Teaser */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
                Einzelbegleitung
              </p>
              <h2 className="mt-4 font-headline text-[2.25rem] text-on-surface md:text-[3.25rem]">
                Begleitgespräch
              </h2>
              <p className="mt-6 font-body text-base font-normal leading-relaxed text-on-surface/60">
                Ein geschützter Raum für das, was sich zeigen möchte. In einem
                60-minütigen Gespräch begleite ich dich mit Präsenz und
                Aufmerksamkeit — ohne Agenda, ohne Bewertung. Hier darf alles
                sein, was ist.
              </p>
              <Link
                href="/begleitgespraech"
                className="group mt-10 inline-flex items-center gap-2 font-label text-[0.8rem] font-normal text-primary transition-all duration-300 hover:gap-3"
              >
                Mehr erfahren
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-container">
              <Image
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80"
                alt="Ruhiger Ort der inneren Einkehr"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PauseBlock */}
      <PauseBlock
        quote="Die größte Offenbarung ist die Stille."
        author="Laotse"
      />

      {/* Newsletter */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="font-headline text-[2.25rem] text-on-surface md:text-[3.25rem]">
            Briefe aus der Stille
          </h2>
          <p className="mt-5 font-body text-base font-normal text-on-surface/50">
            Gelegentliche Impulse und Gedanken — direkt in dein Postfach.
            Kein Spam, jederzeit abbestellbar.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Blog Teaser */}
      {posts.length > 0 && (
        <section className="bg-surface-container-low py-28 md:py-36">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <p className="font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-primary">
              Blog
            </p>
            <h2 className="mt-4 font-headline text-[2.25rem] text-on-surface md:text-[3.25rem]">
              Aktuelle Gedanken
            </h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  publishedAt={post.publishedAt}
                />
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-label text-[0.8rem] font-normal text-primary transition-all duration-300 hover:gap-3"
              >
                Alle Beiträge
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
