'use client';

import { useEffect, useState } from 'react';
import { getOutboxCount, getLastSync } from '@/lib/offline/outbox';
import { registerServiceWorker } from '@/lib/offline/sw';

export function SyncStatusBar() {
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    registerServiceWorker();
    setOnline(navigator.onLine);

    const handleStatus = () => setOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    const refresh = async () => {
      const [count, sync] = await Promise.all([getOutboxCount(), getLastSync()]);
      setPending(count);
      setLastSync(sync);
    };

    void refresh();
    const interval = window.setInterval(refresh, 5000);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="sync-bar">
      <div className="sync-status">
        <span className={online ? 'sync-dot' : 'sync-dot offline'} />
        <strong>{online ? 'Online' : 'Offline'}</strong>
        <span>Änderungen ausstehend: {pending}</span>
      </div>
      <div className="sync-status">
        <span>Letzter Sync: {lastSync ?? '—'}</span>
        <span>Konflikte: Last-Write-Wins</span>
      </div>
    </div>
  );
}
