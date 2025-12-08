import { TaskManager } from "./logic.js";
import type { SortField, SortOrder, Task, TasksMap } from "./type.js";
import { toArray, toTaskMap } from "./utility.js";

export class queryVisible {
    constructor(private manager: TaskManager) {}

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
    private sortTasks(tasks: [number, Task][], field: SortField, order: SortOrder): [number, Task][] {
        console.log(field,order)
        const fieldSelector: Record<SortField, (t: Task) => number> = {
            due:     (t) => t.dueDate.getTime(),
            created: (t) => t.createdAt?.getTime() ?? 0,
            updated: (t) => t.updatedAt?.getTime() ?? 0,
        };

        const orderStrategy: Record<SortOrder, (a: number, b: number) => number> = {
            asc:  (a, b) => a - b,
            desc: (a, b) => b - a,
        };
        const getValue = fieldSelector[field];
        const compare  = orderStrategy[order];
        const sorted = [...tasks].sort((a, b) => {
            const va = getValue(a[1]);
            const vb = getValue(b[1]);
            return compare(va, vb);
        });
        return sorted;
    }

    /** 検索 → ソート → TasksMap に変換 */
    getVisibleTask(option:{
        keyword:string,
        sortBy:SortField,
        sorttype:SortOrder,
        isDone:boolean
    }): TasksMap {
        let tasks = this.getArrayTasks();

        tasks = this.filterByKeyword(tasks, option.keyword);
        tasks = this.filterByDone(tasks,option.isDone)
        tasks = this.sortTasks(tasks, option.sortBy,option.sorttype);
        // console.log(tasks)
        // console.log(toTaskMap(tasks))
    return toTaskMap(tasks);
    }
}