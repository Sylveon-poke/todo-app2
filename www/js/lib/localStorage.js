import { LocalStorageMock } from "../test/localStorageMock.js";
/** 本番用のローカルストレージ */
export function createBrowserStorage() {
    return localStorage;
}
/** ローカルストレージのモック */
export function createMemoryStorage() {
    return new LocalStorageMock();
}
// repository.ts（どこでも共通で使う）
export function read(storage, key, defaultValue) {
    const data = storage.getItem(key);
    if (!data)
        return defaultValue;
    try {
        return JSON.parse(data);
    }
    catch (e) {
        console.error(`storage "${key}" の JSON パースに失敗`, e);
        return defaultValue;
    }
}
export function write(storage, key, value) {
    storage.setItem(key, JSON.stringify(value));
}
//# sourceMappingURL=localStorage.js.map