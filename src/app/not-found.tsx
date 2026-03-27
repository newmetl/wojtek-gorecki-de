import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
        <h1 className="font-headline text-4xl text-on-surface md:text-6xl">
          Seite nicht gefunden
        </h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-on-surface/60">
          Die gesuchte Seite existiert leider nicht.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block font-label text-sm uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
        >
          Zur Startseite &rarr;
        </Link>
      </div>
    </section>
  );
}
