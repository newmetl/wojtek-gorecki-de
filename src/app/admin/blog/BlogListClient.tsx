"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
}

type Filter = "all" | "draft" | "published";

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = posts.filter((post) => {
    if (filter === "draft") return post.status === "draft";
    if (filter === "published") return post.status === "published";
    return true;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/blog/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "Alle" },
    { key: "draft", label: "Entwurfe" },
    { key: "published", label: "Veroffentlicht" },
  ];

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-lg border border-[#e0ddd8] p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-sm font-label rounded-md transition-colors ${
              filter === tab.key
                ? "bg-[#795437] text-white font-medium"
                : "text-[#1a1c1a]/60 hover:text-[#1a1c1a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e0ddd8] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#1a1c1a]/50 font-body">
            Keine Blogposts gefunden.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0ddd8] bg-[#faf9f6]">
                  <th className="text-left text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                    Titel
                  </th>
                  <th className="text-left text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                    Datum
                  </th>
                  <th className="text-right text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-[#e0ddd8] last:border-0 hover:bg-[#faf9f6] transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-label font-medium text-[#1a1c1a]">
                      {post.title}
                    </td>
                    <td className="px-4 py-3">
                      {post.status === "published" ? (
                        <span className="inline-flex px-2 py-0.5 text-xs font-label rounded-full bg-green-50 text-green-700">
                          Veroffentlicht
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 text-xs font-label rounded-full bg-yellow-50 text-yellow-700">
                          Entwurf
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-label text-[#1a1c1a]/70">
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="text-xs font-label text-[#795437] hover:underline"
                        >
                          Bearbeiten
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-xs font-label text-[#1a1c1a]/50 hover:underline"
                        >
                          Vorschau
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="text-xs font-label text-red-500 hover:underline"
                        >
                          Loschen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Blogpost loschen"
        message="Mochtest du diesen Blogpost wirklich loschen? Diese Aktion kann nicht ruckgangig gemacht werden."
      />
    </>
  );
}
