import Dexie, { type Table } from 'dexie';

export interface OfflineProject {
  id: string;
  name: string;
  updatedAt: string;
}

export interface OfflineRoomLineItem {
  id: string;
  roomId: string;
  furnitureTypeId: string;
  snapshotName: string;
  snapshotUnitVolume: number;
  quantity: number;
  variantLabel?: string;
  attributes?: string[];
  updatedAt: string;
}

export interface OfflineSingleItem {
  id: string;
  roomId: string;
  categoryId: string;
  label?: string;
  length?: number;
  width?: number;
  height?: number;
  weightKg?: number;
  weightStatus?: 'estimated' | 'confirmed';
  attributes?: string[];
  notes?: string;
  updatedAt: string;
}

export interface OfflinePhoto {
  id: string;
  scope: 'building' | 'floor' | 'room';
  scopeId: string;
  url: string;
  note?: string;
  photoTypeId?: string;
  createdAt: string;
}

export interface OutboxEntry {
  id: string;
  createdAt: string;
  payload: Record<string, unknown>;
  type: 'mutation' | 'photo';
  status: 'pending' | 'synced' | 'failed';
}

class OfflineDatabase extends Dexie {
  projects!: Table<OfflineProject, string>;
  roomLineItems!: Table<OfflineRoomLineItem, string>;
  singleItems!: Table<OfflineSingleItem, string>;
  photos!: Table<OfflinePhoto, string>;
  outbox!: Table<OutboxEntry, string>;
  metadata!: Table<{ key: string; value: string }, string>;

  constructor() {
    super('bms-offline');
    this.version(1).stores({
      projects: 'id, updatedAt',
      roomLineItems: 'id, roomId, updatedAt',
      singleItems: 'id, roomId, updatedAt',
      photos: 'id, scope, scopeId, createdAt',
      outbox: 'id, status, createdAt',
      metadata: 'key'
    });
  }
}

export const offlineDb = new OfflineDatabase();
