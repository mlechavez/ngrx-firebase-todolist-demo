import { Injectable } from '@angular/core';
import {
  StorageClearItem,
  StorageGetItem,
  StorageSetItem,
} from '../models/web-storage.model';

@Injectable({
  providedIn: 'root',
})
export class WebStorageService {
  constructor() {}

  set(item: StorageSetItem): void {
    if (!this.webStorageExists()) {
      console.error(`${item.storageLocation} is not supported by your browser`);
      return;
    }

    if (typeof item.value === 'object') {
      item.value = JSON.stringify(item.value);
    }

    window[item.storageLocation].setItem(item.key, item.value);
  }

  get(item: StorageGetItem): any {
    if (!this.webStorageExists()) {
      console.error(`${item.storageLocation} is not supported by your browser`);
      return;
    }
    return JSON.parse(window[item.storageLocation].getItem(item.key));
  }

  clear(item: StorageClearItem) {
    if (!this.webStorageExists()) {
      console.error(`${item.storageLocation} is not supported by your browser`);
      return;
    }
    window[item.storageLocation].clear();
  }

  private webStorageExists(): boolean {
    return typeof Storage !== undefined;
  }
}
