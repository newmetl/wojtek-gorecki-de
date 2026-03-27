interface PauseBlockProps {
  quote: string;
  author?: string;
}

export default function PauseBlock({ quote, author }: PauseBlockProps) {
  return (
    <section className="bg-surface-container-low py-32 md:py-48">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
        <blockquote className="font-headline text-3xl italic leading-relaxed text-on-surface md:text-5xl md:leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {author && (
          <p className="mt-8 font-label text-sm uppercase tracking-widest text-on-surface/60">
            {author}
          </p>
        )}
      </div>
    </section>
  );
}
