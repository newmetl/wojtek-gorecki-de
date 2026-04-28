# wojtek-gorecki.de

Persönliche Website für psychologische und spirituelle Beratung von Wojtek Gorecki.

---

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14 | React-Framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Typsicherheit |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Styling |
| [Prisma](https://www.prisma.io/) | 5 | ORM / Datenbankzugriff |
| SQLite | – | Datenbank (lokal / auf Server) |
| [NextAuth.js](https://next-auth.js.org/) | 4 | Admin-Authentifizierung |
| [React Markdown](https://github.com/remarkjs/react-markdown) | 10 | Blog-Inhalte (Markdown) |

---

## Projektstruktur

```
src/
├── app/
│   ├── (public)/              # Öffentliche Seiten (mit Navigation + Footer)
│   │   ├── layout.tsx         # Layout: Navigation + Footer
│   │   ├── page.tsx           # Startseite
│   │   ├── blog/              # Blog-Übersicht + Einzelbeiträge
│   │   ├── offenes-treffen/   # Seite: Offenes Treffen
│   │   ├── begleitgespraech/  # Seite: Begleitgespräch
│   │   ├── ueber-mich/        # Seite: Über mich
│   │   ├── kontakt/           # Seite: Kontakt
│   │   ├── impressum/         # Impressum
│   │   └── datenschutz/       # Datenschutzerklärung
│   ├── admin/                 # Geschützter Admin-Bereich
│   │   ├── layout.tsx         # Admin-Layout (Sidebar, eigene Navigation)
│   │   ├── login/             # Login-Seite
│   │   ├── dashboard/         # Übersicht
│   │   ├── blog/              # Blog-Verwaltung (CRUD)
│   │   ├── termine/           # Termin-Verwaltung (CRUD)
│   │   ├── locations/         # Orts-Verwaltung (CRUD)
│   │   └── einstellungen/     # Einstellungen
│   ├── api/                   # API-Routen
│   │   ├── admin/             # Geschützte Admin-APIs
│   │   ├── agent/             # Agent-APIs (externer Zugriff)
│   │   └── auth/              # NextAuth-Routen
│   ├── layout.tsx             # Root-Layout (HTML, Body, Fonts)
│   └── globals.css            # Globale Stile
├── components/
│   ├── Navigation.tsx         # Haupt-Navigation (öffentlich)
│   ├── Footer.tsx             # Footer (öffentlich)
│   ├── BlogCard.tsx           # Blog-Vorschau-Karte
│   ├── AppointmentCard.tsx    # Termin-Karte
│   ├── ContactForm.tsx        # Kontaktformular
│   ├── NewsletterForm.tsx     # Newsletter-Anmeldung
│   ├── PauseBlock.tsx         # Zitat-/Pause-Abschnitt
│   └── admin/
│       ├── AdminSidebar.tsx   # Admin-Seitenleiste
│       └── DeleteConfirmDialog.tsx
├── lib/
│   ├── prisma.ts              # Prisma-Client-Singleton
│   ├── auth.ts                # NextAuth-Konfiguration
│   └── rate-limit.ts          # Rate-Limiting
prisma/
├── schema.prisma              # Datenbank-Schema
├── seed.ts                    # Seed-Script (Demo-Daten)
└── migrations/                # Datenbank-Migrationen
public/
└── images/                    # Statische Bilder (Portrait, etc.)
docs/
└── assets/                    # Design-Assets / Originaldateien
```

---

## Lokale Entwicklung

### Voraussetzungen

- Node.js 18+
- npm

### Setup

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen konfigurieren
cp .env.example .env
# .env befüllen (siehe Abschnitt Umgebungsvariablen)

# 3. Datenbank initialisieren
npm run db:push

# 4. (Optional) Demo-Daten laden
npm run db:seed

# 5. Entwicklungsserver starten
npm run dev
```

Die App läuft danach unter [http://localhost:3000](http://localhost:3000).

---

## Umgebungsvariablen

| Variable | Beschreibung | Beispiel |
|---|---|---|
| `DATABASE_URL` | SQLite-Pfad | `file:./dev.db` |
| `ADMIN_PASSWORD` | Passwort für den Admin-Bereich | `geheimes-passwort` |
| `NEXTAUTH_SECRET` | JWT-Signierungsschlüssel (min. 32 Zeichen) | `ein-langer-zufaelliger-string` |
| `NEXTAUTH_URL` | Öffentliche URL (nur Produktion) | `https://wojtek-gorecki.de` |
| `AGENT_API_KEY` | Bearer-Token für die Agent API | `zufälliger-32-zeichen-key` |
| `FORMSPREE_ID` | Formspree-ID für das Kontaktformular | `abc123` |
| `MAILERLITE_API_KEY` | Mailerlite-API-Key für Newsletter | `ml-key-...` |

---

## Datenbank

```bash
# Schema in die Datenbank übertragen
npm run db:push

# Demo-Daten einspielen (3 Blog-Posts)
npm run db:seed

# Prisma Studio öffnen (Datenbank-GUI)
npm run db:studio
```

### Datenbankmodelle

- **BlogPost** — Blog-Beiträge (Titel, Slug, Inhalt als Markdown, Status, Veröffentlichungsdatum)
- **Appointment** — Termine für das Offene Treffen (Datum, Uhrzeit, Ort, Buchungs-URL)
- **Location** — Veranstaltungsorte (Name, Adresse)

---

## Admin-Bereich

Der Admin-Bereich ist unter `/admin` erreichbar und mit einem Passwort geschützt.

**Login:** `/admin/login`

Im Admin-Bereich lassen sich verwalten:
- **Blog-Beiträge** — Erstellen, bearbeiten, veröffentlichen, löschen
- **Termine** — Termine für das Offene Treffen anlegen und verwalten
- **Locations** — Veranstaltungsorte pflegen

---

## Agent API (für KI-Agenten)

Die Agent API ermöglicht externen KI-Agenten (z. B. Claude) die Verwaltung von Blog-Beiträgen, Terminen und Locations. Alle Endpunkte sind mit einem Bearer-Token geschützt und Rate-limitiert (60 Requests / 60 Sekunden pro IP).

### Authentifizierung

Jeder Request benötigt den Header:

```
Authorization: Bearer <AGENT_API_KEY>
```

`AGENT_API_KEY` wird in der `.env`-Datei konfiguriert.

### Antwortformat

Alle Antworten folgen einem einheitlichen Schema:

```json
{
  "success": true | false,
  "data": { ... } | null,
  "error": "Fehlerbeschreibung" | null
}
```

### Fehlercodes

| Code | Bedeutung |
|------|-----------|
| 400  | Ungültige Anfrage (fehlende Pflichtfelder, referenzierte Location in Benutzung) |
| 401  | Ungültiger oder fehlender Bearer-Token |
| 404  | Ressource nicht gefunden |
| 429  | Rate Limit überschritten |
| 500  | Server-Fehler |

---

### Blog-Beiträge

#### `GET /api/agent/blog`

Alle Blog-Beiträge abrufen (Drafts und publizierte).

**Query-Parameter:**

| Parameter | Typ | Default | Beschreibung |
|-----------|-----|---------|--------------|
| `page`    | int | 1       | Seitennummer |
| `per_page`| int | 20      | Einträge pro Seite |

**Antwort:**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "Titel",
        "slug": "titel",
        "excerpt": "Kurztext",
        "content": "Markdown-Inhalt",
        "imageUrl": "/uploads/blog/bild.png" | null,
        "status": "draft" | "published",
        "publishedAt": "2026-03-01T12:00:00.000Z" | null,
        "createdAt": "2026-03-01T12:00:00.000Z",
        "updatedAt": "2026-03-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 20,
      "total": 5,
      "totalPages": 1
    }
  },
  "error": null
}
```

#### `GET /api/agent/blog/[id]`

Einzelnen Blog-Beitrag abrufen.

#### `POST /api/agent/blog`

Neuen Blog-Beitrag erstellen.

**Request-Body (JSON):**

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `title` | string | Ja | Titel des Beitrags |
| `excerpt` | string | Ja | Kurztext / Vorschau |
| `content` | string | Ja | Inhalt als Markdown |
| `slug` | string | Nein | URL-Slug (wird aus Titel generiert falls leer) |
| `status` | string | Nein | `"draft"` (Default) oder `"published"` |
| `image_data` | string | Nein | Bild als Base64-String |
| `image_mime_type` | string | Nein | MIME-Type des Bildes (z. B. `"image/png"`) |

**Antwort:** `201` mit dem erstellten BlogPost-Objekt.

#### `PUT /api/agent/blog/[id]`

Blog-Beitrag vollständig aktualisieren. Alle Felder wie bei POST, aber keines ist Pflicht.

**Besonderheiten:**
- Wird `status` auf `"published"` gesetzt, wird `publishedAt` automatisch auf jetzt gesetzt (falls vorher null).
- Wird ein neues Bild hochgeladen, wird das alte automatisch gelöscht.
- Wird `title` geändert, wird der `slug` automatisch neu generiert (außer `slug` wird explizit mitgegeben).

#### `PATCH /api/agent/blog/[id]`

Blog-Beitrag teilweise aktualisieren. Nur übergebene Felder werden geändert, alle anderen bleiben unverändert. Gleiche Felder wie PUT.

#### `DELETE /api/agent/blog/[id]`

Blog-Beitrag löschen. Zugehöriges Bild wird ebenfalls gelöscht.

**Antwort:** `{ "success": true, "data": { "id": "uuid" }, "error": null }`

---

### Termine (Appointments)

#### `GET /api/agent/appointments`

Alle Termine abrufen (inklusive Location-Daten).

**Query-Parameter:** `page` (Default 1), `per_page` (Default 20)

**Antwort:**

```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "uuid",
        "title": "Offenes Treffen",
        "locationId": "location-uuid",
        "date": "2026-04-15T00:00:00.000Z",
        "timeStart": "19:00",
        "timeEnd": "21:00",
        "bookingUrl": "https://calendly.com/..." | null,
        "description": "Beschreibung" | null,
        "isActive": true,
        "location": {
          "id": "location-uuid",
          "name": "Kulturzentrum",
          "address": "Musterstraße 1, 12345 Berlin"
        },
        "createdAt": "2026-03-01T12:00:00.000Z",
        "updatedAt": "2026-03-01T12:00:00.000Z"
      }
    ],
    "pagination": { "page": 1, "perPage": 20, "total": 3, "totalPages": 1 }
  },
  "error": null
}
```

#### `GET /api/agent/appointments/[id]`

Einzelnen Termin abrufen.

#### `POST /api/agent/appointments`

Neuen Termin erstellen.

**Request-Body (JSON):**

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `title` | string | Ja | Titel des Termins |
| `locationId` | string | Ja | UUID der Location |
| `date` | string | Ja | Datum (ISO 8601, z. B. `"2026-04-15"`) |
| `timeStart` | string | Ja | Startzeit (z. B. `"19:00"`) |
| `timeEnd` | string | Ja | Endzeit (z. B. `"21:00"`) |
| `bookingUrl` | string | Nein | Link zur Buchung |
| `description` | string | Nein | Beschreibung |
| `isActive` | boolean | Nein | Aktiv/sichtbar (Default: `true`) |

**Antwort:** `201` mit dem erstellten Appointment-Objekt (inkl. Location).

#### `PUT /api/agent/appointments/[id]`

Termin vollständig aktualisieren. Gleiche Felder wie POST, keines ist Pflicht.

#### `PATCH /api/agent/appointments/[id]`

Termin teilweise aktualisieren. Nur übergebene Felder werden geändert.

#### `DELETE /api/agent/appointments/[id]`

Termin löschen.

---

### Locations (Veranstaltungsorte)

#### `GET /api/agent/locations`

Alle Locations abrufen.

**Antwort:**

```json
{
  "success": true,
  "data": {
    "locations": [
      {
        "id": "uuid",
        "name": "Kulturzentrum",
        "address": "Musterstraße 1, 12345 Berlin",
        "createdAt": "2026-03-01T12:00:00.000Z",
        "updatedAt": "2026-03-01T12:00:00.000Z"
      }
    ]
  },
  "error": null
}
```

#### `GET /api/agent/locations/[id]`

Einzelne Location abrufen.

#### `POST /api/agent/locations`

Neue Location erstellen.

**Request-Body (JSON):**

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `name` | string | Ja | Name des Ortes |
| `address` | string | Nein | Adresse |

**Antwort:** `201` mit dem erstellten Location-Objekt.

#### `PUT /api/agent/locations/[id]` / `PATCH /api/agent/locations/[id]`

Location aktualisieren.

#### `DELETE /api/agent/locations/[id]`

Location löschen. **Achtung:** Fehlschlag mit `400`, wenn Termine die Location referenzieren.

---

## Build & Deployment

```bash
# Produktions-Build erstellen
npm run build

# Produktions-Server starten
npm start
```

### Docker

```bash
# Container bauen und starten
docker-compose up --build
```

Die App ist für den Standalone-Betrieb (z. B. auf einem VPS) optimiert.

---

## Design-System

- **Headline-Font:** EB Garamond (Serif)
- **Body-/Label-Font:** Quicksand (Sans-Serif, 500)
- **Primärfarbe:** `#9B4410` (Terrakotta)
- **Hintergrund:** `#faf9f6` (warmes Off-White)
- **Basis-Schriftgröße:** 17px
