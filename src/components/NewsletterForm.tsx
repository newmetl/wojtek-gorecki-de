"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Ein Fehler ist aufgetreten.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Verbindungsfehler. Bitte versuche es später erneut.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center">
        <p className="font-body text-[0.95rem] font-medium text-on-surface">
          Vielen Dank für deine Anmeldung!
        </p>
        <p className="mt-1.5 font-body text-[0.85rem] text-on-surface/60">
          Du erhältst in Kürze eine E-Mail zur Bestätigung. Bitte klicke auf den
          Link in der E-Mail, um deine Anmeldung abzuschließen.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-12 flex flex-col gap-3 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <input
          type="email"
          required
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 rounded-full border border-outline-variant/40 bg-transparent px-6 py-3.5 font-body text-[0.9rem] font-medium text-on-surface placeholder:text-on-surface/30 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
        />
        {status === "error" && (
          <p className="px-4 font-body text-[0.8rem] text-error">
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative overflow-hidden rounded-full bg-primary px-8 py-3.5 font-label text-[0.8rem] font-medium tracking-wide text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
      >
        <span className="relative z-10">
          {status === "loading" ? "Wird gesendet…" : "Anmelden"}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    </form>
  );
}
