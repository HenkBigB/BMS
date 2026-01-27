export default function ProjectsPage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Projekte</h1>
        <p>Hier werden Quelle/Ziel, Gebäude, Etagen und Räume verwaltet.</p>
      </section>
      <section className="card grid grid-2">
        <div>
          <h2>Quelle</h2>
          <p>2 Gebäude · 2 Etagen · 3 Räume</p>
        </div>
        <div>
          <h2>Ziel</h2>
          <p>1 Gebäude · 1 Etage · 1 Raum</p>
        </div>
      </section>
    </div>
  );
}
