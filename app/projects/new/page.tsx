import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Neues Projekt</h1>
        <p>Coming next – dieser Bereich wird als nächstes implementiert.</p>
        <Link href="/projects">Zurück zur Projektübersicht</Link>
      </section>
    </div>
  );
}
