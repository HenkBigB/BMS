export default function AdminPage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Admin</h1>
        <p>Pflegen Sie Möbelkatalog, Attribute, Foto-Typen und Nutzer.</p>
      </section>
      <section className="card grid grid-3">
        <div>
          <h2>Möbelkatalog</h2>
          <p>13 aktive Typen</p>
        </div>
        <div>
          <h2>Attribute</h2>
          <p>7 Gruppen · 18 Werte</p>
        </div>
        <div>
          <h2>Einzelobjekte</h2>
          <p>12 Kategorien · 7 kritisch</p>
        </div>
      </section>
    </div>
  );
}
