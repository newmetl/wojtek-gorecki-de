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
      <section className="relative flex min-h-[90vh] items-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="mx-auto max-w-5xl px-6 py-32 md:px-12">
          <h1 className="font-headline text-5xl leading-tight text-on-surface md:text-7xl lg:text-8xl">
            Was bereits ist.
          </h1>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-on-surface/70 md:text-xl">
            Ein Raum für innere Klarheit. Nicht um etwas zu reparieren oder zu
            optimieren — sondern um dem zu begegnen, was schon da ist.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/offenes-treffen"
              className="inline-block rounded-xl bg-primary px-8 py-4 font-label text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
            >
              Offenes Treffen entdecken
            </Link>
            <Link
              href="/begleitgespraech"
              className="inline-block rounded-xl bg-surface-container px-8 py-4 font-label text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high"
            >
              Begleitgespräch anfragen
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <p className="font-headline text-2xl leading-relaxed text-on-surface md:text-3xl">
            Es geht nicht darum, besser zu werden. Es geht darum, ehrlich
            hinzuschauen. In der Begegnung mit dem, was ist, entsteht ein Raum
            — offen, still und lebendig.
          </p>
        </div>
      </section>

      {/* Offenes Treffen Teaser */}
      <section className="bg-surface-container-low py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <p className="font-label text-xs uppercase tracking-widest text-primary">
            Begegnung
          </p>
          <h2 className="mt-3 font-headline text-3xl text-on-surface md:text-4xl">
            Offenes Treffen
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-on-surface/70">
            Ein offener Abend für alle, die den Wunsch nach Stille und
            aufrichtiger Begegnung teilen. Ohne Methode, ohne Programm — nur
            die Bereitschaft, da zu sein.
          </p>

          {appointments.length > 0 && (
            <div className="mt-12 space-y-4">
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

          <div className="mt-10">
            <Link
              href="/offenes-treffen"
              className="font-label text-sm font-medium text-primary transition-opacity hover:opacity-70"
            >
              Alle Termine &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Begleitgespräch Teaser */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="font-label text-xs uppercase tracking-widest text-primary">
                Einzelbegleitung
              </p>
              <h2 className="mt-3 font-headline text-3xl text-on-surface md:text-4xl">
                Begleitgespräch
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-on-surface/70">
                Ein geschützter Raum für das, was sich zeigen möchte. In einem
                60-minütigen Gespräch begleite ich dich mit Präsenz und
                Aufmerksamkeit — ohne Agenda, ohne Bewertung. Hier darf alles
                sein, was ist.
              </p>
              <Link
                href="/begleitgespraech"
                className="mt-8 inline-block font-label text-sm font-medium text-primary transition-opacity hover:opacity-70"
              >
                Mehr erfahren &rarr;
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container">
              <Image
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80"
                alt="Ruhiger Ort der inneren Einkehr"
                fill
                className="object-cover"
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
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="font-headline text-3xl text-on-surface md:text-4xl">
            Briefe aus der Stille
          </h2>
          <p className="mt-4 font-body text-base text-on-surface/60">
            Gelegentliche Impulse und Gedanken — direkt in dein Postfach.
            Kein Spam, jederzeit abbestellbar.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Blog Teaser */}
      {posts.length > 0 && (
        <section className="bg-surface-container-low py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 md:px-12">
            <p className="font-label text-xs uppercase tracking-widest text-primary">
              Blog
            </p>
            <h2 className="mt-3 font-headline text-3xl text-on-surface md:text-4xl">
              Aktuelle Gedanken
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
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
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="font-label text-sm font-medium text-primary transition-opacity hover:opacity-70"
              >
                Alle Beiträge &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
