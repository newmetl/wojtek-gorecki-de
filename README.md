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
