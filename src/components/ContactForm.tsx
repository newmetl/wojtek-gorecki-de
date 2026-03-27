"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-surface-container-low px-8 py-12 text-center">
        <p className="font-headline text-xl text-on-surface">
          Vielen Dank für deine Nachricht.
        </p>
        <p className="mt-2 font-body text-sm text-on-surface/60">
          Ich melde mich in Kürze bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-label text-sm font-medium text-on-surface/70"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 font-body text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Dein Name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-label text-sm font-medium text-on-surface/70"
        >
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border-0 bg-surface-container-low px-4 py-3 font-body text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="deine@email.de"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-label text-sm font-medium text-on-surface/70"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full resize-none rounded-xl border-0 bg-surface-container-low px-4 py-3 font-body text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Was möchtest du mir mitteilen?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl bg-primary px-6 py-3 font-label text-sm font-medium text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Wird gesendet..." : "Nachricht senden"}
      </button>

      {status === "error" && (
        <p className="text-center font-body text-sm text-error">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}
    </form>
  );
}
