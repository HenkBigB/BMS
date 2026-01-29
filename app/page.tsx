export default function HomePage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Willkommen im MVP</h1>
        <p>
          Dieses Dashboard bietet einen schnellen Überblick über Projekte, Sync-Status und
          Offline-Daten. Verwenden Sie die Navigation für Projekteingabe am iPad oder die
          Admin-Pflege am Desktop.
        </p>
      </section>
      <section className="card grid grid-2">
        <div>
          <h2>Heute</h2>
          <p className="badge">2 Projekte aktiv</p>
          <p>Quelle/Ziel-Struktur ist offline verfügbar.</p>
        </div>
        <div>
          <h2>Offline Hinweise</h2>
          <ul>
            <li>Fotos werden lokal zwischengespeichert.</li>
            <li>Outbox synchronisiert automatisch, sobald Online.</li>
            <li>Export wird nach Sync serverseitig erstellt.</li>
          </ul>
        </div>
      </section>
      <section className="card">
        <h2>Quick Actions</h2>
        <div className="tile-grid">
          <div className="tile">Neues Projekt</div>
          <div className="tile">Projekt öffnen</div>
          <div className="tile">Offline Daten</div>
          <div className="tile">Export anstoßen</div>
        </div>
      </section>
    </div>
  );
}
