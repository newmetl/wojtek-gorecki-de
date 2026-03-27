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
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-surface-container">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="mt-4">
          {formattedDate && (
            <p className="font-label text-xs uppercase tracking-widest text-on-surface/50">
              {formattedDate}
            </p>
          )}
          <h3 className="mt-1 font-headline text-xl text-on-surface transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-on-surface/70">
            {excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
