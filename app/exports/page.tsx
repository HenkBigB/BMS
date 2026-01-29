import Link from "next/link";

export default function ExportsPage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Exporte</h1>
        <p>Platzhalter: Export anstoßen / Exportliste wird als nächstes implementiert.</p>
        <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/projects">← Zurück zu Projekte</Link>
          <Link href="/">Dashboard</Link>
        </div>
      </section>
    </div>
  );
}
