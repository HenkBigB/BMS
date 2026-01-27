import { offlineDb } from './db';

export async function getOutboxCount() {
  return offlineDb.outbox.where('status').equals('pending').count();
}

export async function getLastSync() {
  const entry = await offlineDb.metadata.get('lastSync');
  return entry?.value ?? null;
}

export async function markLastSync(timestamp: string) {
  await offlineDb.metadata.put({ key: 'lastSync', value: timestamp });
}

export async function enqueueOutbox(payload: Record<string, unknown>, type: 'mutation' | 'photo') {
  const id = crypto.randomUUID();
  await offlineDb.outbox.add({
    id,
    createdAt: new Date().toISOString(),
    payload,
    type,
    status: 'pending'
  });
  return id;
}
