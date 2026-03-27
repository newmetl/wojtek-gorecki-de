"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Location {
  id: string;
  name: string;
}

export default function NeuerTerminPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetch("/api/admin/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data.locations || []);
        if (data.locations?.length > 0) {
          setLocationId(data.locations[0].id);
        }
      })
      .catch(() => setError("Locations konnten nicht geladen werden."));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !locationId || !date || !timeStart || !timeEnd) {
      setError("Bitte alle Pflichtfelder ausfuellen.");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Das Datum muss in der Zukunft liegen.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/appointments", {
        method: "POST",
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
          Neuen Termin anlegen
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
            <option value="">Location wahlen...</option>
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

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 disabled:opacity-50 transition-colors"
          >
            {loading ? "Speichern..." : "Termin anlegen"}
          </button>
          <Link
            href="/admin/termine"
            className="px-5 py-2.5 border border-[#e0ddd8] text-[#1a1c1a]/70 text-sm font-label font-medium rounded-lg hover:bg-[#faf9f6] transition-colors"
          >
            Abbrechen
          </Link>
        </div>
      </form>
    </div>
  );
}
