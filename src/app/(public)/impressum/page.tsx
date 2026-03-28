export const metadata = {
  title: "Impressum – Wojtek Gorecki",
  description: "Impressum und Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <h1 className="font-headline text-4xl text-on-surface md:text-5xl">
          Impressum
        </h1>

        <div className="mt-12 space-y-10 font-body text-base leading-relaxed text-on-surface/80">
          <div>
            <h2 className="font-headline text-xl text-on-surface">
              Angaben gemäß § 5 TMG
            </h2>
            <div className="mt-4 space-y-1">
              <p>Wojtek Gorecki</p>
              <p>Holtroper Straße 3f</p>
              <p>50129 Bergheim</p>
              <p>Deutschland</p>
            </div>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">Kontakt</h2>
            <div className="mt-4 space-y-1">
              <p>E-Mail: kontakt(at)wojtek-gorecki.de</p>
            </div>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <div className="mt-4 space-y-1">
              <p>Wojtek Gorecki</p>
              <p>Holtroper Straße 3f</p>
              <p>50129 Bergheim</p>
            </div>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              Haftungsausschluss
            </h2>
            <h3 className="mt-4 font-label text-sm font-semibold uppercase tracking-wide text-on-surface/70">
              Haftung für Inhalte
            </h3>
            <p className="mt-2">
              Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden. Als
              Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG bin ich als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen.
            </p>

            <h3 className="mt-6 font-label text-sm font-semibold uppercase tracking-wide text-on-surface/70">
              Haftung für Links
            </h3>
            <p className="mt-2">
              Diese Website enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              Urheberrecht
            </h2>
            <p className="mt-4">
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
              der schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
