interface PauseBlockProps {
  quote: string;
  author?: string;
}

export default function PauseBlock({ quote, author }: PauseBlockProps) {
  return (
    <section className="bg-surface-container-low py-36 md:py-48">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
        <div className="mx-auto mb-8 h-px w-12 bg-primary/40" />
        <blockquote className="font-headline text-[1.8rem] italic leading-relaxed text-on-surface md:text-[2.8rem] md:leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {author && (
          <p className="mt-10 font-label text-[0.7rem] font-normal uppercase tracking-[0.25em] text-on-surface/40">
            {author}
          </p>
        )}
      </div>
    </section>
  );
}
