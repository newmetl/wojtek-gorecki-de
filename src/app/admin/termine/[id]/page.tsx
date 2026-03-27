"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Location {
  id: string;
  name: string;
}

export default function EditTerminPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/locations").then((r) => r.json()),
      fetch(`/api/admin/appointments`).then((r) => r.json()),
    ])
      .then(([locData, aptData]) => {
        setLocations(locData.locations || []);
        const apt = (aptData.appointments || []).find(
          (a: { id: string }) => a.id === id
        );
        if (apt) {
          setTitle(apt.title);
          setLocationId(apt.locationId);
          setDate(apt.date.split("T")[0]);
          setTimeStart(apt.timeStart);
          setTimeEnd(apt.timeEnd);
          setBookingUrl(apt.bookingUrl || "");
          setDescription(apt.description || "");
          setIsActive(apt.isActive);
        } else {
          setError("Termin nicht gefunden.");
        }
      })
      .catch(() => setError("Daten konnten nicht geladen werden."))
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !locationId || !date || !timeStart || !timeEnd) {
      setError("Bitte alle Pflichtfelder ausfuellen.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          locationId,
          date,
          timeStart,
          timeEnd,
          bookingUrl: bookingUrl || null,
          description: description || null,
          isActive,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern.");
        return;
      }

      router.push("/admin/termine");
    } catch {
      setError("Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/termine");
      }
    } catch {
      setError("Loschen fehlgeschlagen.");
    }
  };

  if (fetching) {
    return (
      <div className="max-w-2xl">
        <p className="text-sm text-[#1a1c1a]/50 font-label">Laden...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/termine"
          className="text-sm font-label text-[#795437] hover:underline mb-2 inline-block"
        >
          &larr; Zuruck zu Termine
        </Link>
        <h1 className="font-headline text-2xl font-bold text-[#1a1c1a]">
          Termin bearbeiten
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#e0ddd8] p-6 space-y-5">
        <div>
          <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
            Titel *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
            Location *
          </label>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors bg-white"
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
            Datum *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
              Uhrzeit von *
            </label>
            <input
              type="time"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
              Uhrzeit bis *
            </label>
            <input
              type="time"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
              required
              className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
            Anmelde-URL (optional)
          </label>
          <input
            type="url"
            value={bookingUrl}
            onChange={(e) => setBookingUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] placeholder:text-[#1a1c1a]/30 focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
            Beschreibung (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors resize-y"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#795437] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
          </label>
          <span className="text-sm font-label text-[#1a1c1a]/70">
            Aktiv
          </span>
        </div>

        {error && (
          <p className="text-sm text-red-600 font-label">{error}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Speichern..." : "Speichern"}
            </button>
            <Link
              href="/admin/termine"
              className="px-5 py-2.5 border border-[#e0ddd8] text-[#1a1c1a]/70 text-sm font-label font-medium rounded-lg hover:bg-[#faf9f6] transition-colors"
            >
              Abbrechen
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="px-4 py-2.5 text-sm font-label font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Loschen
          </button>
        </div>
      </form>

      <DeleteConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Termin loschen"
        message="Mochtest du diesen Termin wirklich loschen? Diese Aktion kann nicht ruckgangig gemacht werden."
      />
    </div>
  );
}
