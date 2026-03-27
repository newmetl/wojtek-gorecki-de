"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NeuerBlogpostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManual) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlugManual(true);
    setSlug(val);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !excerpt || !content) {
      setError("Bitte Titel, Kurzbeschreibung und Text ausfuellen.");
      return;
    }

    if (excerpt.length > 300) {
      setError("Kurzbeschreibung darf maximal 300 Zeichen lang sein.");
      return;
    }

    setLoading(true);

    try {
      let image_data: string | null = null;
      let image_mime_type: string | null = null;

      if (imageFile) {
        const buffer = await imageFile.arrayBuffer();
        image_data = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        image_mime_type = imageFile.type;
      }

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || slugify(title),
          excerpt,
          content,
          status,
          image_data,
          image_mime_type,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern.");
        return;
      }

      router.push("/admin/blog");
    } catch {
      setError("Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="text-sm font-label text-[#795437] hover:underline mb-2 inline-block"
        >
          &larr; Zuruck zu Blog
        </Link>
        <h1 className="font-headline text-2xl font-bold text-[#1a1c1a]">
          Neuen Blogpost anlegen
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-white rounded-xl border border-[#e0ddd8] p-6 space-y-5">
            <div>
              <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                Titel *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a]/50 focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                Kurzbeschreibung * ({excerpt.length}/300)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                maxLength={300}
                rows={2}
                required
                className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                Text (Markdown) *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                required
                className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-mono text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                Bild
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm font-label text-[#1a1c1a]/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-[#e0ddd8] file:text-sm file:font-label file:bg-[#faf9f6] file:text-[#1a1c1a] hover:file:bg-[#f0efec]"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vorschau"
                  className="mt-3 max-h-40 rounded-lg border border-[#e0ddd8]"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors bg-white"
              >
                <option value="draft">Entwurf</option>
                <option value="published">Veroffentlicht</option>
              </select>
            </div>

            {error && (
              <p className="text-sm text-red-600 font-label">{error}</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 disabled:opacity-50 transition-colors"
              >
                {loading ? "Speichern..." : "Blogpost anlegen"}
              </button>
              <Link
                href="/admin/blog"
                className="px-5 py-2.5 border border-[#e0ddd8] text-[#1a1c1a]/70 text-sm font-label font-medium rounded-lg hover:bg-[#faf9f6] transition-colors"
              >
                Abbrechen
              </Link>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-xl border border-[#e0ddd8] p-6">
            <h2 className="font-label font-semibold text-sm text-[#1a1c1a]/50 uppercase tracking-wider mb-4">
              Vorschau
            </h2>
            <div className="prose prose-sm max-w-none font-body text-[#1a1c1a]">
              {title && (
                <h1 className="font-headline text-xl font-bold mb-2">
                  {title}
                </h1>
              )}
              {excerpt && (
                <p className="text-[#1a1c1a]/60 italic mb-4">{excerpt}</p>
              )}
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <p className="text-[#1a1c1a]/30 italic">
                  Markdown-Text eingeben, um eine Vorschau zu sehen...
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
