import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BlogListClient from "./BlogListClient";

export default async function BlogPage() {
  const session = await getServerSession();
  if (!session) redirect("/admin/login");

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[#1a1c1a] mb-1">
            Blog
          </h1>
          <p className="text-sm text-[#1a1c1a]/50 font-label">
            Blogposts verwalten
          </p>
        </div>
        <Link
          href="/admin/blog/neu"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 transition-colors"
        >
          + Neuer Blogpost
        </Link>
      </div>

      <BlogListClient posts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}
