export default function OfflinePage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Offline Daten</h1>
        <p>Zwischengespeicherte Projekte und Fotos werden hier verwaltet.</p>
      </section>
      <section className="card">
        <h2>Outbox</h2>
        <p>Alle Änderungen werden nach Wiederverbindung automatisch synchronisiert.</p>
        <p>Export ist erst nach erfolgreichem Sync verfügbar.</p>
      </section>
    </div>
  );
}
