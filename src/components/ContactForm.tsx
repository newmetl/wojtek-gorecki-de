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
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest px-8 py-14 text-center">
        <div className="mx-auto mb-6 h-px w-12 bg-primary/30" />
        <p className="font-headline text-xl text-on-surface">
          Vielen Dank für deine Nachricht.
        </p>
        <p className="mt-3 font-body text-[0.85rem] font-normal text-on-surface/50">
          Ich melde mich in Kürze bei dir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label
          htmlFor="name"
          className="block font-label text-[0.75rem] font-normal tracking-wide text-on-surface/60"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-outline-variant/30 bg-transparent px-5 py-3.5 font-body text-[0.9rem] font-normal text-on-surface placeholder:text-on-surface/25 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
          placeholder="Dein Name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-label text-[0.75rem] font-normal tracking-wide text-on-surface/60"
        >
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-outline-variant/30 bg-transparent px-5 py-3.5 font-body text-[0.9rem] font-normal text-on-surface placeholder:text-on-surface/25 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
          placeholder="deine@email.de"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-label text-[0.75rem] font-normal tracking-wide text-on-surface/60"
        >
          Nachricht
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none rounded-xl border border-outline-variant/30 bg-transparent px-5 py-3.5 font-body text-[0.9rem] font-normal text-on-surface placeholder:text-on-surface/25 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
          placeholder="Was möchtest du mir mitteilen?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative w-full overflow-hidden rounded-full bg-primary px-6 py-4 font-label text-[0.8rem] font-normal tracking-wide text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
      >
        <span className="relative z-10">
          {status === "sending" ? "Wird gesendet..." : "Nachricht senden"}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>

      {status === "error" && (
        <p className="text-center font-body text-[0.85rem] font-normal text-error">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}
    </form>
  );
}
