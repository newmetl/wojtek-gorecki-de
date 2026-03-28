"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mt-12 flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Deine E-Mail-Adresse"
        className="flex-1 rounded-full border border-outline-variant/40 bg-transparent px-6 py-3.5 font-body text-[0.9rem] font-medium text-on-surface placeholder:text-on-surface/30 transition-all duration-300 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
      />
      <button
        type="submit"
        className="group relative overflow-hidden rounded-full bg-primary px-8 py-3.5 font-label text-[0.8rem] font-medium tracking-wide text-on-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
      >
        <span className="relative z-10">Anmelden</span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    </form>
  );
}
