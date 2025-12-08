import { TaskManager } from "./logic.js";
import { toArray, toTaskMap } from "./utility.js";
export class queryVisible {
    constructor(manager) {
        this.manager = manager;
        this.keyword = ""; // 検索文字列
        this.sortType = "updated-desc"; // 並び替えの種類
        this.isDone = false;
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
    sortTasks(tasks, sortType) {
        // sortTypeごとの関数を登録
        const strategies = {
            "due-asc": (a, b) => a.dueDate.getTime() - b.dueDate.getTime(),
            "due-desc": (a, b) => b.dueDate.getTime() - a.dueDate.getTime(),
            "created-asc": (a, b) => (a.createdAt.getTime() || 0) - (b.createdAt.getTime() || 0),
            "created-desc": (a, b) => (b.createdAt.getTime() || 0) - (a.createdAt.getTime() || 0),
            "updated-asc": (a, b) => (a.updatedAt.getTime() || 0) - (b.updatedAt.getTime() || 0),
            "updated-desc": (a, b) => (b.updatedAt.getTime() || 0) - (a.updatedAt.getTime() || 0),
        };
        const compareFn = strategies[sortType];
        return tasks.sort((a, b) => compareFn(a[1], b[1]));
    }
    /** 検索 → ソート → TasksMap に変換 */
    getVisibleTask() {
        let tasks = this.getArrayTasks();
        tasks = this.filterByKeyword(tasks, this.keyword);
        tasks = this.filterByDone(tasks, this.isDone);
        tasks = this.sortTasks(tasks, this.sortType);
        // console.log(tasks)
        // console.log(toTaskMap(tasks))
        return toTaskMap(tasks);
    }
}
//# sourceMappingURL=visible.js.map