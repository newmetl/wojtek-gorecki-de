"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-10 flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Deine E-Mail-Adresse"
        className="flex-1 border-0 bg-surface-container-low px-5 py-3.5 font-body text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <button
        type="submit"
        className="bg-primary px-8 py-3.5 font-label text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
      >
        Anmelden
      </button>
    </form>
  );
}
