import type { ReactNode } from 'react';
import './globals.css';
import { SyncStatusBar } from './offline/sync-status-bar';

export const metadata = {
  title: 'BMS Besichtigungs-/Inventar-App',
  description: 'MVP für Vor-Ort-Besichtigungen mit Offline-Sync.',
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="app-header">
          <div className="app-brand">
            <strong>BMS</strong>
            <span>Besichtigungs-/Inventar-App</span>
          </div>
          <nav className="app-nav">
            <a href="/">Dashboard</a>
            <a href="/projects">Projekte</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <SyncStatusBar />
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
