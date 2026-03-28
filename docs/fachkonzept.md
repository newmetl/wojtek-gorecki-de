# Fachkonzept: wojtek-gorecki.de – Neuentwicklung
**Version 1.2 | März 2026**  
*Erstellt für die Implementierung mit Claude Code*

---

## 1. Projektziel & Kontext

### 1.1 Projektziel
Neuentwicklung der Website wojtek-gorecki.de als vollständige Webanwendung mit:
- Öffentlichem Frontend (7 eigenständige Unterseiten inkl. Blog)
- Admin-Backend zur Termin- und Blogpost-Verwaltung
- Agent-API für KI-gestützte Verwaltung von Blogposts, Terminen und Locations (CRUD, einzige externe API)
- Calendly-Integration als Buchungskanal
- DSGVO-Konformität (Deutschland / NRW)

### 1.2 Betreiber
Wojtek Gorecki – Psychologische und spirituelle Beratung  
Holtroper Straße 3f, 50129 Bergheim

---

## 2. Technischer Stack (Empfehlung für Claude Code)

| Schicht | Technologie |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS + Custom CSS Variables |
| Datenbank | SQLite (lokal) via Prisma ORM oder PostgreSQL (VPS) |
| Auth (Admin) | NextAuth.js (Credentials Provider, Single User) |
| Deployment | VPS (selbstgehostet) |
| Terminbuchung | Calendly Embed / Deep Links |
| Formular | React Hook Form + Formspree (E-Mail-Versand) |
| Sprache | TypeScript |

---

## 3. Sitemap & Seitenstruktur

```
/                        → Startseite (Landingpage)
/offenes-treffen         → Offenes Treffen: Beschreibung + Terminliste
/begleitgespraech        → Begleitgespräch: Beschreibung + Buchung
/ueber-mich              → Kurzbiografie
/kontakt                 → Kontaktformular + Direktkontakt

/blog                    → Blog-Übersichtsseite (alle veröffentlichten Posts)
/blog/[slug]             → Blog-Detailseite (einzelner Post)

/impressum               → Statische Seite
/datenschutz             → Statische Seite

/admin                   → Redirect zu /admin/login (wenn nicht auth)
/admin/login             → Login-Seite
/admin/dashboard         → Übersicht / KPIs
/admin/termine           → Terminliste
/admin/termine/neu       → Neuen Termin anlegen
/admin/termine/[id]      → Termin bearbeiten / löschen
/admin/locations         → Locations verwalten
/admin/einstellungen     → Seiteninhalte bearbeiten (Texte, Links)
/admin/blog              → Blogpost-Liste
/admin/blog/neu          → Neuen Blogpost anlegen
/admin/blog/[id]         → Blogpost bearbeiten / löschen
```

---

## 4. Frontend Use Cases & Inhalte

### Seite 1 – Startseite (`/`)

#### UC-F01: Besucher kommt auf die Startseite
**Content**:
- Hero: Headline „Was bereits ist.", Subheadline über innere Klärung & Selbstbegegnung, atmosphärisches Foto
- Zwei CTAs: „Offene Treffen" → /offenes-treffen, „Begleitgespräch" → /begleitgespraech
- Intro-Absatz: Keine Optimierung, kein Fixing – Verweis auf etwas, das allem vorausgeht
- Kurzer Beschreibungstext: „Diese Webseite und die hier angebotene Arbeit dienen nur einem Zweck: dem Erinnern an das, was immer schon hier ist. An das unauflösbare und bereits vollkommene Mysterium dieses Augenblicks…."
- Teaser Offenes Treffen: 2–3 Sätze + nächste 2–3 Termine kompakt + Link „Alle Termine →"
- Teaser Begleitgespräch: 1 Absatz + Link „Mehr erfahren →"
- Pull-Quote (kursiv, zentriert)
- Newsletter-Signup: Umsetzung über Mailerlite (Code-Snippets werden nachträglich angepasst)

**Anforderungen**:
- Termine im Startseiten-Teaser dynamisch aus DB (max. 3 nächste Termine, standortunabhängig)
- Newsletter-Eintrag über Mailerlite
- Cookie-Banner (falls Cookies verwendet werden)

---

### Seite 2 – Offenes Treffen (`/offenes-treffen`)

#### UC-F02: Besucher informiert sich über das Format
**Content**:
- Kurzbeschreibung des Formats (max. 3 Absätze): offen, ohne Methode, ohne Ziel, auf Spendenbasis

#### UC-F03: Besucher sieht alle Termine und meldet sich an
**Content**:
- Terminliste mit allen anstehenden Terminen, nach Datum sortiert (anstehende zuerst)
- Jeder Termin:
  - Datum
  - Uhrzeit (von–bis)
  - Location
  - Hinweistext (z.B. „Auf Spendenbasis" oder „Keine Aufzeichnung")
  - Button „Zur Anmeldung →" (Calendly Deep Link)

**Anforderungen**:
- Termine dynamisch aus DB geladen (API-Route `/api/appointments`)
- Nur zukünftige Termine anzeigen (`date >= today`)

---

### Seite 3 – Begleitgespräch (`/begleitgespraech`)

#### UC-F04: Besucher informiert sich und bucht
**Content**:
- Kurzbeschreibung (max. 3 Absätze): 60 Minuten, Einzelgespräch via Zoom, Präsenz & innere Orientierung, kein Therapieersatz, keine Methode
- Preis klar sichtbar: **80 €**
- Ein CTA-Button: „Termin buchen" → Calendly-Link

**Anforderungen**:
- Statische Seite (kein dynamischer Inhalt)
- Calendly-Buchungskalender einbetten

---

### Seite 4 – Über mich (`/ueber-mich`)

#### UC-F05: Besucher liest die Biografie
**Content**:
- Portraitfoto (warm, natürlich)
- Kurzbiografie in 3–4 knappen Absätzen:
  - 15+ Jahre innerer Weg und spirituelle Suche
  - IT/Technologie-Hintergrund, analytische Arbeitsweise
  - Heute: Räume für innere Klärung und ehrliche Selbstbegegnung
- Facebook-Link: „Folge mir auf Facebook →" (mit Icon)

**Anforderungen**:
- Vollständig statische Seite
- Facebook-Link als externer Link (öffnet in neuem Tab)

---

### Seite 5 – Kontakt (`/kontakt`)

#### UC-F06: Besucher nimmt Kontakt auf
**Content**:
- Intro-Text: „Du kannst mich auf verschiedenen Wegen erreichen."
- Direktkontakt-Liste (Icon + Label + Wert):
  - E-Mail (obfuscated gegen Bots)
  - Mobil / Telefon
  - Telegram (Handle oder Link)
  - WhatsApp (wa.me-Link)
- Kontaktformular (sekundär, unterhalb der Direktkontakte):
  - Felder: Name, E-Mail, Nachricht
  - Button: „Nachricht senden"

**Anforderungen**:
- Anti-Spam: Honeypot-Feld (verstecktes Feld)
- E-Mail-Versand per Formspree (`https://formspree.io/f/mlgwolly`)
- Kein reCAPTCHA (zu viel DSGVO-Aufwand für Einzelbetrieb)

---

### Statische Seiten

#### UC-F07: Besucher findet Impressum & Datenschutz
**Routen**: `/impressum`, `/datenschutz`  
**Content**: Vollständige Rechtstexte aus bestehender Website übernehmen  
**Anforderungen**: Statische Seiten, im Footer verlinkt, von Robots.txt nicht ausgeschlossen

---

### Seite 6 – Blog-Übersicht (`/blog`)

#### UC-F08: Besucher liest den Blog
**Content**:
- Seitentitel „Blog" oder „Gedanken & Impulse" (o.ä.)
- Kartenraster oder Liste aller veröffentlichten Posts, sortiert nach Veröffentlichungsdatum (neueste zuerst)
- Jede Karte zeigt: Bild (Vorschau, falls vorhanden), Titel, Kurzbeschreibung, Datum, Link „Weiterlesen →"
- Nur Posts mit `status = published` und `published_at <= heute` werden angezeigt

**Anforderungen**:
- Dynamisch aus DB geladen (ISR, Revalidation bei Änderung)
- Paginierung: 9 Posts pro Seite (oder infinite scroll – Entscheidung offen)
- Kein Post anzeigen, der `status = draft` ist

---

### Seite 7 – Blog-Detailseite (`/blog/[slug]`)

#### UC-F09: Besucher liest einen einzelnen Blogpost
**Content**:
- Hero-Bild (falls vorhanden, full-width)
- Titel, Veröffentlichungsdatum
- Fließtext (HTML oder Markdown, gerendert)
- Navigation: „← Zurück zur Übersicht"

**Anforderungen**:
- Slug wird aus dem Titel generiert (URL-safe, eindeutig)
- Statisch generiert (SSG) zum Zeitpunkt der Veröffentlichung, oder ISR
- 404 bei nicht existierendem oder unveröffentlichtem Slug
- Open Graph Bild und Meta-Description aus `excerpt` befüllt (SEO)

---

### Blog-Teaser auf der Startseite (`/`)

#### UC-F10: Besucher sieht die neuesten Posts auf der Startseite
**Content**:
- Abschnitt „Aktuelle Gedanken" o.ä. (nach Newsletter-Sektion)
- Die 3 neuesten veröffentlichten Posts als horizontale Karten: Bild, Titel, Kurzbeschreibung, Datum, „Weiterlesen →"
- Link „Alle Beiträge →" → /blog

**Anforderungen**:
- Daten bei Seitengenerierung geladen (SSG/ISR)
- Abschnitt wird ausgeblendet, wenn noch keine Posts veröffentlicht sind

---

## 5. Admin-Backend Use Cases

### UC-A01: Admin-Login
**Trigger**: Aufruf von `/admin/*`  
**Flow**:
1. Nicht authentifiziert → Redirect zu /admin/login
2. Login mit statischem Passwort aus `.env` (`ADMIN_PASSWORD`)
3. Session via NextAuth.js (HTTP-only Cookie)
4. Authentifiziert → Redirect zu /admin/dashboard

**Anforderungen**:
- Passwort wird ausschließlich über `ADMIN_PASSWORD` in `.env` gesetzt – keine DB-Tabelle, keine Benutzerverwaltung
- Passwort ändern = ENV-Variable anpassen + Neustart
- Session-Timeout: 24 Stunden
- Brute-Force-Schutz: Rate Limiting auf Login-Route (5 Versuche / 15 Min)

---

### UC-A02: Dashboard (Übersicht)
**Content**:
- Zahl der Termine (gesamt / kommend / vergangen)
- Zahl der Blogposts (gesamt / veröffentlicht / Entwürfe)
- Nächste 3 bevorstehende Termine
- Schnellzugriff: „Neuen Termin anlegen"
- Schnellzugriff: „Neuen Blogpost anlegen"

---

### UC-A03: Terminliste anzeigen
**Flow**:
- Tabelle aller Termine, sortiert nach Datum (neueste oben)
- Spalten: Datum, Uhrzeit, Location, Anmelde-Link, Status (aktiv/inaktiv)
- Filter: nach Location / nach Zeitraum (vergangen/kommend)
- Paginierung (25 pro Seite)
- Aktionen: Bearbeiten | Löschen | Deaktivieren

---

### UC-A04: Neuen Termin anlegen
**Formularfelder**:

| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| Titel | Text | Ja | z.B. „Offenes Treffen" |
| Location | Select | Ja | Alle verfügbaren Locations zur Auswahl |
| Datum | Date | Ja | Termin-Datum |
| Uhrzeit von | Time | Ja | Startzeit |
| Uhrzeit bis | Time | Ja | Endzeit |
| Anmelde-URL | URL | Nein | Calendly Deep Link oder sonstiger Link |
| Beschreibung | Textarea | Nein | Optionaler Hinweistext (z.B. „Auf Spendenbasis", „Keine Aufzeichnung") |
| Status | Toggle | Ja | Aktiv / Inaktiv (inaktive Termine werden nicht öffentlich angezeigt) |

**Anforderungen**:
- Datum muss in der Zukunft liegen (Validierung)
- Bei fehlendem Calendly-Link: Button „Zur Anmeldung" wird nicht angezeigt

---

### UC-A05: Locations verwalten
**Felder einer Location**:
- Name (Text, Pflicht)
- Adresse (Text mit Zeilenumbrüchen)

**Ansicht**:
- Liste aller Locations mit Aktionen: Bearbeiten | Löschen
- Button „Neue Location anlegen" öffnet Popup mit Formular, „Speichern" persistiert die Location in der DB

---

### UC-A06: Termin bearbeiten
**Flow**:
- Alle Felder aus UC-A04 sind editierbar
- Änderung wird sofort auf der öffentlichen Website sichtbar
- „Letztes Update"-Timestamp wird gespeichert

---

### UC-A07: Termin löschen
**Flow**:
- Bestätigungsdialog: „Termin wirklich löschen?"
- Hard Delete: Eintrag wird aus DB entfernt

---

### UC-A08: Blogpost-Liste anzeigen
**Ansicht**:
- Tabelle aller Posts, sortiert nach Veröffentlichungsdatum (neueste oben)
- Spalten: Titel, Status (Entwurf / Veröffentlicht), Veröffentlichungsdatum, Aktionen
- Filter: Status (alle / Entwurf / Veröffentlicht)
- Aktionen: Bearbeiten | Vorschau | Löschen

---

### UC-A09: Neuen Blogpost anlegen
**Formularfelder**:

| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| Titel | Text | Ja | Titel des Posts |
| Slug | Text | Ja | URL-Pfad, auto-generiert aus Titel, manuell editierbar |
| Kurzbeschreibung | Textarea | Ja | Teaser-Text für Übersicht und SEO (max. 300 Zeichen) |
| Text | Markdown-Editor | Ja | Vollständiger Beitragstext |
| Bild | Datei-Upload | Nein | Header-/Vorschaubild (JPEG/PNG/WebP, max. 5 MB) |
| Veröffentlichungsdatum | DateTime | Ja | Kann in der Zukunft liegen (geplante Veröffentlichung) |
| Status | Select | Ja | Entwurf / Veröffentlicht |

**Anforderungen**:
- Slug-Validierung: nur Kleinbuchstaben, Zahlen, Bindestriche; muss eindeutig sein
- Bild-Upload: lokal unter `/public/uploads/blog/` (in Docker-Volume, persistiert über Container-Neustart)
- Geplante Veröffentlichung: Post mit `published_at` in der Zukunft bleibt bis dahin unsichtbar
- Markdown-Editor für den Textbereich

---

### UC-A10: Blogpost bearbeiten
**Flow**:
- Alle Felder aus UC-A09 sind editierbar
- Bild-Upload: neues Bild ersetzt das alte (altes Bild wird gelöscht)
- Statuswechsel Entwurf → Veröffentlicht setzt `published_at` auf jetzt, falls noch nicht gesetzt

---

### UC-A11: Blogpost löschen
**Flow**:
- Bestätigungsdialog: „Post wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
- Hard Delete: Post und zugehöriges Bild werden entfernt

---

## 6. Datenbankschema

### Tabelle: `locations`
```sql
id              UUID PRIMARY KEY
name            TEXT NOT NULL
address         TEXT
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

### Tabelle: `appointments`
```sql
id              UUID PRIMARY KEY
title           TEXT NOT NULL
location_id     UUID REFERENCES locations(id)
date            DATE NOT NULL
time_start      TIME NOT NULL
time_end        TIME NOT NULL
booking_url     TEXT
description     TEXT
is_active       BOOLEAN DEFAULT true
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

### Tabelle: `blog_posts`
```sql
id              UUID PRIMARY KEY
title           TEXT NOT NULL
slug            TEXT UNIQUE NOT NULL
excerpt         TEXT NOT NULL          -- Kurzbeschreibung (max. 300 Zeichen)
content         TEXT NOT NULL          -- Volltext (Markdown)
image_url       TEXT                   -- Pfad zum Beitragsbild
status          ENUM('draft', 'published') DEFAULT 'draft'
published_at    TIMESTAMP              -- NULL = unveröffentlicht / geplant
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

### Agent-Log (Datei, keine DB-Tabelle)
Alle Agent-API-Aktionen werden in eine einfache Log-Datei geschrieben (kein DB-Eintrag).

**Speicherort**: `./logs/agent.log` (im Docker-Volume, persistiert über Container-Neustart)  
**Format**: Zeilenbasiertes JSON (JSON Lines / NDJSON)

```json
{ "timestamp": "2026-04-01T10:23:00Z", "resource": "blog", "action": "create", "resource_id": "uuid", "resource_title": "Titel", "response_status": 201 }
{ "timestamp": "2026-04-01T10:24:00Z", "resource": "appointment", "action": "delete", "resource_id": "uuid", "resource_title": "Offenes Treffen", "response_status": 200 }
```

**Rotation**: Log-Rotation via `logrotate` oder manuell (Entscheidung beim Deployment)

---

## 7. API-Routen (Next.js)

### Agent-API (API-Key-geschützt)

> Authentifizierung via `Authorization: Bearer <AGENT_API_KEY>` (Wert in `.env`).  
> Kein Session-Cookie, kein NextAuth – bewusst von der Admin-Auth getrennt.  
> Alle Aktionen werden in `./logs/agent.log` protokolliert (JSON Lines).

#### Blog

| Methode | Route | Beschreibung |
|---|---|---|
| GET | /api/agent/blog | Alle Posts abrufen (inkl. Entwürfe), paginiert |
| GET | /api/agent/blog/[id] | Einzelnen Post per ID abrufen |
| POST | /api/agent/blog | Neuen Post erstellen |
| PUT | /api/agent/blog/[id] | Post vollständig ersetzen |
| PATCH | /api/agent/blog/[id] | Post teilweise aktualisieren (z.B. nur Status) |
| DELETE | /api/agent/blog/[id] | Post löschen |

**Request-Body `POST` / `PUT`** (JSON):
```json
{
  "title": "Titel des Posts",
  "slug": "titel-des-posts",
  "excerpt": "Kurzbeschreibung (max. 300 Zeichen)",
  "content": "Volltext in Markdown...",
  "image_url": "/uploads/blog/bild.jpg",
  "status": "draft",
  "published_at": "2026-04-01T10:00:00Z"
}
```

> **Bild-Upload via Agent-API**: Bilder werden als Base64-kodierter String im Feld `image_data` (mit `image_mime_type`) übergeben. Die API dekodiert und speichert das Bild serverseitig unter `/public/uploads/blog/` und befüllt `image_url` automatisch. Alternativ kann `image_url` direkt als externe URL übergeben werden (kein Upload).

#### Termine

| Methode | Route | Beschreibung |
|---|---|---|
| GET | /api/agent/appointments | Alle Termine abrufen (inkl. inaktiver), paginiert |
| GET | /api/agent/appointments/[id] | Einzelnen Termin per ID abrufen |
| POST | /api/agent/appointments | Neuen Termin erstellen |
| PUT | /api/agent/appointments/[id] | Termin vollständig ersetzen |
| PATCH | /api/agent/appointments/[id] | Termin teilweise aktualisieren (z.B. nur Status) |
| DELETE | /api/agent/appointments/[id] | Termin löschen |

**Request-Body `POST` / `PUT`** (JSON):
```json
{
  "title": "Offenes Treffen",
  "location_id": "uuid-der-location",
  "date": "2026-05-10",
  "time_start": "19:00",
  "time_end": "20:30",
  "booking_url": "https://calendly.com/...",
  "description": "Auf Spendenbasis. Keine Aufzeichnung.",
  "is_active": true
}
```

#### Locations

| Methode | Route | Beschreibung |
|---|---|---|
| GET | /api/agent/locations | Alle Locations abrufen |
| GET | /api/agent/locations/[id] | Einzelne Location per ID abrufen |
| POST | /api/agent/locations | Neue Location erstellen |
| PUT | /api/agent/locations/[id] | Location vollständig ersetzen |
| PATCH | /api/agent/locations/[id] | Location teilweise aktualisieren |
| DELETE | /api/agent/locations/[id] | Location löschen (nur wenn keine Termine referenzieren) |

**Request-Body `POST` / `PUT`** (JSON):
```json
{
  "name": "Düsseldorf",
  "address": "Musterstraße 1\n40223 Düsseldorf-Bilk"
}
```

#### Einheitliches Response-Format (alle Agent-Endpunkte)
```json
{
  "success": true,
  "data": { },
  "error": null
}
```

#### Sicherheit Agent-API
- API-Key in `.env` als `AGENT_API_KEY` (min. 32 Zeichen, zufällig generiert)
- Rate Limiting: max. 60 Requests/Minute
- Nur HTTPS
- Alle Aktionen in `./logs/agent.log` protokolliert (JSON Lines: Timestamp, Resource, Action, ID, HTTP-Status)

---

### Admin (Auth-Protected, Session-Cookie)

| Methode | Route | Beschreibung |
|---|---|---|
| GET | /api/admin/appointments | Alle Termine (inkl. inaktive) |
| POST | /api/admin/appointments | Neuen Termin erstellen |
| PUT | /api/admin/appointments/[id] | Termin bearbeiten |
| DELETE | /api/admin/appointments/[id] | Termin löschen |
| GET | /api/admin/locations | Alle Locations |
| POST | /api/admin/locations | Neue Location erstellen |
| PUT | /api/admin/locations/[id] | Location bearbeiten |
| DELETE | /api/admin/locations/[id] | Location löschen |
| GET | /api/admin/blog | Alle Blogposts (inkl. Entwürfe) |
| POST | /api/admin/blog | Neuen Blogpost erstellen |
| PUT | /api/admin/blog/[id] | Blogpost bearbeiten |
| DELETE | /api/admin/blog/[id] | Blogpost löschen |

---

## 8. Nicht-funktionale Anforderungen

### Performance
- Lighthouse Score > 90 (Performance, Accessibility, Best Practices, SEO)
- Static Generation wo möglich (SSG), Termine per ISR (Revalidation alle 60s)
- Keine unnötigen JavaScript-Libraries

### SEO
- Open Graph Tags (Titel, Beschreibung, Bild)
- Sitemap.xml automatisch generiert
- Robots.txt (Admin-Bereich ausgeschlossen)
- Strukturierte Daten (JSON-LD) für Events (Schema.org) und Blogposts (Article-Schema)

### DSGVO
- Keine Tracking-Cookies
- Keine Analytics (oder: nur Plausible Self-Hosted, cookielos)
- Datenschutzerklärung als statische Seite

### Sicherheit
- HTTPS (Let's Encrypt)
- HTTP Security Headers (CSP, HSTS, X-Frame-Options)
- Admin-Bereich: Rate Limiting auf Login
- SQL Injection Schutz: Prisma ORM (kein raw SQL ohne Parameterisierung)
- CSRF-Schutz: NextAuth.js CSRF Token

### Zugänglichkeit
- WCAG 2.1 AA konform
- Keyboard-Navigation (besonders Admin-Backend)
- Alt-Texte für alle Bilder