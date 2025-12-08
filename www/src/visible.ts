import { TaskManager } from "./logic.js";
import type { SortType, Task, TasksMap } from "./type.js";
import { toArray, toTaskMap } from "./utility.js";

export class queryVisible {
    constructor(private manager: TaskManager) {}

    public keyword: string = "";        // 検索文字列
    public sortType: SortType = "updated-desc"; // 並び替えの種類
    public isDone:boolean = false;

    /** タスクを配列として取得 */
    private getArrayTasks(): [number, Task][] {
        return toArray(this.manager.getDataAll());
    }

    /** 検索フィルタ */
    private filterByKeyword(tasks: [number, Task][], keyword: string): [number, Task][] {
        if (!keyword.trim()) return tasks;

        const k = keyword.toLowerCase();
        return tasks.filter(([_, task]) => 
            task.title.toLowerCase().includes(k) ||
            task.content.toLowerCase().includes(k)
        );
    }
    private filterByDone(tasks: [number, Task][], flg:boolean):[number,Task][]{
        return tasks.filter(([id,task])=>
            task.isDone === flg
        )
    }

    /** ストラテジ風ソート */
    private sortTasks(tasks: [number, Task][], sortType: SortType): [number, Task][] {

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
        tasks = this.filterByDone(tasks,this.isDone)
        tasks = this.sortTasks(tasks, this.sortType);
        // console.log(tasks)
        // console.log(toTaskMap(tasks))
    return toTaskMap(tasks);
    }
}