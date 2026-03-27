import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || post.status !== "published") {
    return { title: "Beitrag nicht gefunden" };
  }

  return {
    title: `${post.title} – Wojtek Gorecki`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(post.imageUrl && {
        images: [{ url: post.imageUrl, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const now = new Date();

  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (
    !post ||
    post.status !== "published" ||
    !post.publishedAt ||
    post.publishedAt > now
  ) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Wojtek Gorecki",
    },
    ...(post.imageUrl && {
      image: post.imageUrl,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Image */}
      {post.imageUrl && (
        <section className="relative h-[40vh] md:h-[55vh]">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent" />
        </section>
      )}

      {/* Article */}
      <article className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface/50">
            {formattedDate}
          </p>
          <h1 className="mt-4 font-headline text-3xl leading-tight text-on-surface md:text-5xl">
            {post.title}
          </h1>

          <div className="prose prose-lg prose-stone mt-12 max-w-none font-body prose-headings:font-headline prose-headings:text-on-surface prose-p:text-on-surface/80 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary/30 prose-blockquote:font-headline prose-blockquote:italic prose-blockquote:text-on-surface/60">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8">
            <Link
              href="/blog"
              className="font-label text-sm font-medium text-primary transition-opacity hover:opacity-70"
            >
              &larr; Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
