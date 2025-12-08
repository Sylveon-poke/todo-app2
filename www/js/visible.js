import { TaskManager } from "./logic.js";
import { toArray, toTaskMap } from "./utility.js";
export class queryVisible {
    constructor(manager) {
        this.manager = manager;
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
        return tasks.filter(([_, task]) => task.title.toLowerCase().includes(k) ||
            task.content.toLowerCase().includes(k));
    }
    filterByDone(tasks, flg) {
        return tasks.filter(([id, task]) => task.isDone === flg);
    }
    /** ストラテジ風ソート */
    sortTasks(tasks, field, order) {
        console.log(field, order);
        const fieldSelector = {
            due: (t) => t.dueDate.getTime(),
            created: (t) => { var _a, _b; return (_b = (_a = t.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0; },
            updated: (t) => { var _a, _b; return (_b = (_a = t.updatedAt) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0; },
        };
        const orderStrategy = {
            asc: (a, b) => a - b,
            desc: (a, b) => b - a,
        };
        const getValue = fieldSelector[field];
        const compare = orderStrategy[order];
        const sorted = [...tasks].sort((a, b) => {
            const va = getValue(a[1]);
            const vb = getValue(b[1]);
            return compare(va, vb);
        });
        return sorted;
    }
    /** 検索 → ソート → TasksMap に変換 */
    getVisibleTask(option) {
        let tasks = this.getArrayTasks();
        tasks = this.filterByKeyword(tasks, option.keyword);
        tasks = this.filterByDone(tasks, option.isDone);
        tasks = this.sortTasks(tasks, option.sortBy, option.sorttype);
        // console.log(tasks)
        // console.log(toTaskMap(tasks))
        return toTaskMap(tasks);
    }
}
//# sourceMappingURL=visible.js.map