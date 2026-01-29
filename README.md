# BMS Besichtigungs-/Inventar-App (MVP)

## Überblick
Dieses Repository liefert ein umsetzbares V1-Grundgerüst für die Besichtigungs-/Inventar-App.
Es enthält eine Next.js-App (PWA), Prisma-Schema, Seeds, Docker Compose, sowie eine Offline-Strategie
mit IndexedDB + Outbox-Queue.

## Setup / Run

### Fresh Install (Ubuntu 24.04 + Docker)
```bash
git clone <repo-url>
cd BMS
cp .env.example .env
docker compose up -d --build
```
Öffnen: `http://<server-ip>:3000`

**Hinweise**
- Nur Port **3000** ist nach außen freigegeben (DB/MinIO nur intern im Docker-Netz).
- Testpasswort (bis Ende der Testphase): **BMS2026**.
- Logs anzeigen: `docker compose logs -f nextjs-app`
- Restart: `docker compose restart nextjs-app`

### Lokal (Node)
1. `.env.example` nach `.env` kopieren und anpassen.
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Datenbank starten (z.B. via Docker):
   ```bash
   docker compose up -d postgres minio
   ```
4. Migration + Seed:
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```
5. App starten:
   ```bash
   npm run dev
   ```

### Docker Compose (Stack)
```bash
docker compose up --build
```
Die App läuft unter `http://<server-ip>:3000`.
Postgres und MinIO laufen nur intern und sind nicht extern gemappt.

## Offline-Konzept
- **App Shell Cache**: Service Worker cached die wichtigsten Routen (PWA).
- **IndexedDB (Dexie)**: Offline-Entitäten (Projekte, Räume, Inventar, Fotos, Outbox).
- **Outbox-Queue**: Änderungen + Foto-Uploads werden lokal als `pending` gespeichert.
- **Sync**: Bei Online-Status werden Outbox-Einträge sequenziell an den Server übertragen.
- **Konflikte**: Default V1 = **Last-Write-Wins pro Feld**.
- **UI**: Sync-Statusbar zeigt Online/Offline, Pending-Count und letzten Sync-Zeitpunkt.

## Seeds (Default-Listen)
Folgende Seeds werden initial angelegt:
- Attributgruppen + Werte
- Foto-Typen
- Raumtypen
- Einzelobjekt-Kategorien inkl. kritisch-Flag
- Möbelkatalog (inkl. Decimal-Mengen für Akten/Regal lfm)
- Beispielprojekt mit Quelle/Ziel-Struktur, Varianten, Einzelobjekt

**Admin-Login (Seed)**
- Benutzer: `admin@example.local`
- Passwort: `BMS2026`

## Backup-Hinweise
- **Postgres**: Regelmäßige Dumps (`pg_dump`) in ein gesichertes Backup-Verzeichnis.
- **MinIO**: `mc mirror` auf ein externes Backup-Target.
- Empfehlung: tägliche inkrementelle Backups + wöchentliche Vollbackups.

## Infrastruktur-Hinweis (MinIO Pin)
Das MinIO-Image ist auf `RELEASE.2023-10-25T06-33-25Z` gepinnt, um eine
Inkompatibilität mit CPUs ohne x86-64-v2 Features zu vermeiden.

## Assumptions
- Offline ist online-first mit IndexedDB + Outbox (bei Sync automatische Übertragung).
- Konflikte werden per Last-Write-Wins auf Feldebene gelöst.
- Export-Generierung erfolgt serverseitig nach erfolgreichem Sync.
- Zugriff ist intern via VPN, daher HTTP ohne TLS akzeptiert.
- Mindestvalidierung für kritische Einzelobjekte: Gewicht **oder** Maße erforderlich (wird serverseitig geprüft).

## Architektur-Notizen
- Prisma dient als ORM/Migration.
- Fotos werden in MinIO abgelegt.
- Auth erfolgt über Benutzer/Passwort + Rollenprüfung.
