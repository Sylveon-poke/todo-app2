import { LocalStorageMock } from "../test/localStorageMock.js";

// storageAdapter.ts
export interface AppStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}
/** 本番用のローカルストレージ */
export function createBrowserStorage(): AppStorage {
  return localStorage;
}
/** ローカルストレージのモック */
export function createMemoryStorage(): AppStorage {
  return new LocalStorageMock();
}


// repository.ts（どこでも共通で使う）
export function read<T>(storage: AppStorage, key: string, defaultValue: T): T {
  const data = storage.getItem(key);
  if (!data) return defaultValue;

  try {
    return JSON.parse(data) as T;
  } catch (e) {
    console.error(`storage "${key}" の JSON パースに失敗`, e);
    return defaultValue;
  }
}

export function write<T>(storage: AppStorage, key: string, value: T): void {
  storage.setItem(key, JSON.stringify(value));
}