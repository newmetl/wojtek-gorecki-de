"use client";

import { useState, useEffect } from "react";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Location {
  id: string;
  name: string;
  address: string | null;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/admin/locations");
      const data = await res.json();
      setLocations(data.locations || []);
    } catch {
      setError("Locations konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setName("");
    setAddress("");
    setModalOpen(true);
  };

  const openEditModal = (loc: Location) => {
    setEditingId(loc.id);
    setName(loc.name);
    setAddress(loc.address || "");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError("");

    try {
      const url = editingId
        ? `/api/admin/locations/${editingId}`
        : "/api/admin/locations";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address: address || null }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Fehler beim Speichern.");
        return;
      }

      setModalOpen(false);
      fetchLocations();
    } catch {
      setError("Ein Fehler ist aufgetreten.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteError("");

    try {
      const res = await fetch(`/api/admin/locations/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setDeleteError(
          data.error ||
            "Location kann nicht geloscht werden."
        );
        setDeleteId(null);
        return;
      }

      setDeleteId(null);
      fetchLocations();
    } catch {
      setDeleteError("Loschen fehlgeschlagen.");
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-2xl font-bold text-[#1a1c1a] mb-1">
            Locations
          </h1>
          <p className="text-sm text-[#1a1c1a]/50 font-label">
            Veranstaltungsorte verwalten
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 transition-colors"
        >
          + Neue Location
        </button>
      </div>

      {deleteError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-label">
          {deleteError}
        </div>
      )}

      {error && !modalOpen && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-label">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#e0ddd8] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-[#1a1c1a]/50 font-label">
            Laden...
          </div>
        ) : locations.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#1a1c1a]/50 font-body">
            Keine Locations vorhanden.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e0ddd8] bg-[#faf9f6]">
                <th className="text-left text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                  Adresse
                </th>
                <th className="text-right text-xs font-label font-medium text-[#1a1c1a]/50 uppercase tracking-wider px-4 py-3">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr
                  key={loc.id}
                  className="border-b border-[#e0ddd8] last:border-0 hover:bg-[#faf9f6] transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-label font-medium text-[#1a1c1a]">
                    {loc.name}
                  </td>
                  <td className="px-4 py-3 text-sm font-label text-[#1a1c1a]/70">
                    {loc.address || "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(loc)}
                        className="text-xs font-label text-[#795437] hover:underline"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => setDeleteId(loc.id)}
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
        )}
      </div>

      {/* Location Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="font-label font-semibold text-lg text-[#1a1c1a] mb-4">
              {editingId ? "Location bearbeiten" : "Neue Location"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5">
                  Adresse
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors resize-y"
                />
              </div>

              {error && modalOpen && (
                <p className="text-sm text-red-600 font-label">{error}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-label font-medium rounded-lg border border-[#e0ddd8] text-[#1a1c1a]/70 hover:bg-[#faf9f6] transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !name.trim()}
                className="px-4 py-2 text-sm font-label font-medium rounded-lg bg-[#795437] text-white hover:bg-[#795437]/90 disabled:opacity-50 transition-colors"
              >
                {saving ? "Speichern..." : "Speichern"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Location loschen"
        message="Mochtest du diese Location wirklich loschen? Dies ist nur moglich, wenn keine Termine damit verknupft sind."
      />
    </div>
  );
}
