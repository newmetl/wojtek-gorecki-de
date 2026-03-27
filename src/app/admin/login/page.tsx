"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Falsches Passwort. Bitte versuche es erneut.");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Ein Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-sm border border-[#e0ddd8] p-8">
          <div className="text-center mb-8">
            <h1 className="font-headline text-2xl font-bold text-[#795437] mb-1">
              Admin
            </h1>
            <p className="text-sm text-[#1a1c1a]/50 font-label">
              wojtek-gorecki.de
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-label font-medium text-[#1a1c1a]/70 mb-1.5"
              >
                Passwort
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin-Passwort eingeben"
                required
                className="w-full px-3 py-2.5 border border-[#e0ddd8] rounded-lg text-sm font-body text-[#1a1c1a] placeholder:text-[#1a1c1a]/30 focus:outline-none focus:ring-2 focus:ring-[#795437]/20 focus:border-[#795437] transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-label">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#795437] text-white text-sm font-label font-medium rounded-lg hover:bg-[#795437]/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Anmelden..." : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
