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
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <p className="font-label text-[0.7rem] font-medium uppercase tracking-[0.25em] text-primary">
            Blog
          </p>
          <h1 className="mt-5 font-headline text-[2.75rem] text-on-surface md:text-[4.75rem]">
            Gedanken &amp; Impulse
          </h1>

          {posts.length === 0 ? (
            <div className="mt-20 text-center">
              <div className="mx-auto mb-8 h-px w-16 bg-primary/20" />
              <p className="font-body text-lg font-medium text-on-surface/40">
                Noch keine Beiträge vorhanden.
              </p>
              <p className="mt-3 font-body text-[0.85rem] font-medium text-on-surface/30">
                Bald erscheinen hier Texte über Stille, Präsenz und das, was ist.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
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
                <nav className="mt-20 flex items-center justify-center gap-4">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="inline-flex items-center rounded-full border border-outline-variant/40 px-6 py-2.5 font-label text-[0.8rem] font-medium text-on-surface transition-all duration-300 hover:border-primary/40 hover:text-primary"
                    >
                      &larr; Zurück
                    </Link>
                  )}
                  <span className="font-label text-[0.8rem] font-medium text-on-surface/35">
                    Seite {currentPage} von {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="inline-flex items-center rounded-full border border-outline-variant/40 px-6 py-2.5 font-label text-[0.8rem] font-medium text-on-surface transition-all duration-300 hover:border-primary/40 hover:text-primary"
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
