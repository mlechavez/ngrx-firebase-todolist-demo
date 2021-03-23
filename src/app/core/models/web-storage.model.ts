export interface StorageGetItem {
  key: string;
  storageLocation: WebStorageLocation;
}

export interface StorageSetItem extends StorageGetItem {
  value: any;
}

export interface StorageClearItem {
  storageLocation: WebStorageLocation;
}

export type WebStorageLocation = 'sessionStorage' | 'localStorage';
