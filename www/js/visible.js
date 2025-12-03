import { TaskManager } from "./logic.js";
import { toArray, toTaskMap } from "./utility.js";
export class queryVisible {
    constructor(manager) {
        this.manager = manager;
        this.keyword = ""; // 検索文字列
        this.sortType = "due-asc"; // 並び替えの種類
    }
    /** タスクを配列として取得 */
    getArrayTasks() {
        return toArray(this.manager.getDataAll());
    }
    /** 検索フィルタ */
    filterByKeyword(tasks, keyword) {
        if (!keyword.trim())
            return tasks;
        const k = keyword.toLowerCase();
        return tasks.filter(([id, task]) => task.title.toLowerCase().includes(k) ||
            task.content.toLowerCase().includes(k));
    }
    /** ストラテジ風ソート */
    sortTasks(tasks, sortType) {
        // sortTypeごとの関数を登録
        const strategies = {
            "due-asc": (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
            "due-desc": (a, b) => b.dueDate.getTime() - a.dueDate.getTime(),
            "created-asc": (a, b) => { var _a, _b; return (((_a = a.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = b.createdAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); },
            "created-desc": (a, b) => { var _a, _b; return (((_a = b.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = a.createdAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); },
            "updated-asc": (a, b) => { var _a, _b; return (((_a = a.updatedAt) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = b.updatedAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); },
            "updated-desc": (a, b) => { var _a, _b; return (((_a = b.updatedAt) === null || _a === void 0 ? void 0 : _a.getTime()) || 0) - (((_b = a.updatedAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0); },
        };
        const compareFn = strategies[sortType];
        return tasks.sort((a, b) => compareFn(a[1], b[1]));
    }
    /** 検索 → ソート → TasksMap に変換 */
    getVisibleTask() {
        let tasks = this.getArrayTasks();
        tasks = this.filterByKeyword(tasks, this.keyword);
        tasks = this.sortTasks(tasks, this.sortType);
        return toTaskMap(tasks);
    }
}
//# sourceMappingURL=visible.js.map