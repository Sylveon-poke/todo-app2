export interface AppStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    clear(): void;
}
/** 本番用のローカルストレージ */
export declare function createBrowserStorage(): AppStorage;
/** ローカルストレージのモック */
export declare function createMemoryStorage(): AppStorage;
export declare function read<T>(storage: AppStorage, key: string, defaultValue: T): T;
export declare function write<T>(storage: AppStorage, key: string, value: T): void;
//# sourceMappingURL=localStorage.d.ts.map