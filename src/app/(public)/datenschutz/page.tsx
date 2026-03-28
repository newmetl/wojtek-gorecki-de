export const metadata = {
  title: "Datenschutzerklärung – Wojtek Gorecki",
  description: "Datenschutzerklärung gemäß DSGVO.",
};

import FadeIn from "@/components/FadeIn";

export default function DatenschutzPage() {
  return (
    <section className="py-24 md:py-32">
      <FadeIn>
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <h1 className="font-headline text-4xl text-on-surface md:text-5xl">
            Datenschutzerklärung
          </h1>

          <div className="mt-12 space-y-10 font-body text-base leading-relaxed text-on-surface/80">
          <div>
            <h2 className="font-headline text-xl text-on-surface">
              1. Verantwortlicher
            </h2>
            <div className="mt-4 space-y-1">
              <p>Wojtek Gorecki</p>
              <p>Holtroper Straße 3f</p>
              <p>50129 Bergheim</p>
              <p>E-Mail: kontakt(at)wojtek-gorecki.de</p>
            </div>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              2. Datenerfassung auf dieser Website
            </h2>
            <h3 className="mt-4 font-label text-sm font-semibold uppercase tracking-wide text-on-surface/70">
              Server-Log-Dateien
            </h3>
            <p className="mt-2">
              Der Provider dieser Seiten erhebt und speichert automatisch
              Informationen in sogenannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind: Browsertyp und
              Browserversion, verwendetes Betriebssystem, Referrer URL,
              Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage
              und IP-Adresse.
            </p>
            <p className="mt-2">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
              nicht vorgenommen. Grundlage für die Datenverarbeitung ist
              Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur
              Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen
              gestattet.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              3. Kontaktformular
            </h2>
            <p className="mt-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
              werden Ihre Angaben aus dem Anfrageformular inklusive der von
              Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
              Anfrage und für den Fall von Anschlussfragen bei uns
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
              weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung der in das Kontaktformular eingegebenen Daten
              erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung
              jederzeit widerrufen.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              4. Hosting
            </h2>
            <p className="mt-4">
              Diese Website wird bei einem externen Dienstleister gehostet
              (Hoster). Die personenbezogenen Daten, die auf dieser Website
              erfasst werden, werden auf den Servern des Hosters gespeichert.
              Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen,
              Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten,
              Namen, Webseitenzugriffe und sonstige Daten, die über eine
              Website generiert werden, handeln.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              5. Ihre Rechte
            </h2>
            <p className="mt-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung oder Löschung dieser Daten zu
              verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
              erteilt haben, können Sie diese Einwilligung jederzeit für
              die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
              bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen.
            </p>
            <p className="mt-2">
              Des Weiteren steht Ihnen ein Beschwerderecht bei der
              zuständigen Aufsichtsbehörde zu.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              6. Cookies
            </h2>
            <p className="mt-4">
              Diese Website verwendet keine Cookies zu Tracking- oder
              Analysezwecken. Es werden lediglich technisch notwendige
              Cookies eingesetzt, die für den Betrieb der Website
              erforderlich sind.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-xl text-on-surface">
              7. Externe Dienste
            </h2>
            <h3 className="mt-4 font-label text-sm font-semibold uppercase tracking-wide text-on-surface/70">
              Unsplash
            </h3>
            <p className="mt-2">
              Auf dieser Website werden Bilder des Dienstes Unsplash
              (Unsplash Inc.) eingebunden. Beim Aufruf einer Seite mit
              eingebetteten Bildern wird eine Verbindung zu den Servern von
              Unsplash hergestellt. Dabei wird dem Server mitgeteilt, welche
              Seiten Sie besucht haben.
            </p>
          </div>
        </div>
      </div>
      </FadeIn>
    </section>
  );
}
