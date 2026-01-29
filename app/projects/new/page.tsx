import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Neues Projekt</h1>
        <p>Platzhalter: Die Projektanlage wird als nächstes implementiert.</p>
        <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/projects">← Zurück zu Projekte</Link>
          <Link href="/">Dashboard</Link>
        </div>
      </section>
    </div>
  );
}
