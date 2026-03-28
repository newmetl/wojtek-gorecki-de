import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string | null;
  publishedAt?: Date | null;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  imageUrl,
  publishedAt,
}: BlogCardProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(publishedAt))
    : null;

  return (
    <article className="group">
      <Link href={`/blog/${slug}`} className="block">
        {imageUrl && (
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-surface-container">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        )}
        <div className="mt-5">
          {formattedDate && (
            <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.25em] text-on-surface/40">
              {formattedDate}
            </p>
          )}
          <h3 className="mt-2 font-headline text-[1.25rem] leading-snug text-on-surface transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-3 font-body text-[0.85rem] font-medium leading-relaxed text-on-surface/55">
            {excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
