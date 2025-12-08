import { TaskManager } from "./logic.js";
import type { SortType, Task, TasksMap } from "./type.js";
import { toArray, toTaskMap } from "./utility.js";

export class queryVisible {
    constructor(private manager: TaskManager) {}

    public keyword: string = "";        // 検索文字列
    public sortType: SortType = "updated-desc"; // 並び替えの種類

    /** タスクを配列として取得 */
    private getArrayTasks(): [string, Task][] {
        return toArray(this.manager.getDataAll());
    }

    /** 検索フィルタ */
    private filterByKeyword(tasks: [string, Task][], keyword: string): [string, Task][] {
        if (!keyword.trim()) return tasks;

        const k = keyword.toLowerCase();
        return tasks.filter(([id, task]) => 
            task.title.toLowerCase().includes(k) ||
            task.content.toLowerCase().includes(k)
        );
    }

    /** ストラテジ風ソート */
    private sortTasks(tasks: [string, Task][], sortType: SortType): [string, Task][] {

        // sortTypeごとの関数を登録
        const strategies: Record<SortType, (a: Task, b: Task) => number> = {
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
    getVisibleTask(): TasksMap {
        let tasks = this.getArrayTasks();

        tasks = this.filterByKeyword(tasks, this.keyword);
        tasks = this.sortTasks(tasks, this.sortType);
        // console.log(tasks)
        // console.log(toTaskMap(tasks))
    return toTaskMap(tasks);
    }
}