import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export const metadata = {
  title: "Blog – Wojtek Gorecki",
  description: "Gedanken und Impulse. Texte über Stille, Präsenz und das, was ist.",
};

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Math.max(1, parseInt(searchParams.page || "1", 10));
  const now = new Date();

  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        status: "published",
        publishedAt: { lte: now },
      },
      orderBy: { publishedAt: "desc" },
      skip: (currentPage - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.blogPost.count({
      where: {
        status: "published",
        publishedAt: { lte: now },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <p className="font-label text-xs uppercase tracking-widest text-primary">
            Blog
          </p>
          <h1 className="mt-4 font-headline text-4xl text-on-surface md:text-6xl">
            Gedanken &amp; Impulse
          </h1>

          {posts.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-body text-lg text-on-surface/50">
                Noch keine Beiträge vorhanden.
              </p>
              <p className="mt-2 font-body text-sm text-on-surface/40">
                Bald erscheinen hier Texte über Stille, Präsenz und das, was ist.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-16 flex items-center justify-center gap-4">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="rounded-xl bg-surface-container px-5 py-2.5 font-label text-sm text-on-surface transition-colors hover:bg-surface-container-high"
                    >
                      &larr; Zurück
                    </Link>
                  )}
                  <span className="font-label text-sm text-on-surface/50">
                    Seite {currentPage} von {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="rounded-xl bg-surface-container px-5 py-2.5 font-label text-sm text-on-surface transition-colors hover:bg-surface-container-high"
                    >
                      Weiter &rarr;
                    </Link>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
