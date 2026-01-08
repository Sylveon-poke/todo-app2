## src/logic.ts
``` typescript
import { createBrowserStorage, createMemoryStorage, read, write } from "./lib/localStorage.js"
import { buildStoredTasksMap, getMaxId, restoreTasks } from "./lib/task.js";
import {
  STORAGE_KEY,
  type StoredTasksMap,
  type Task,
  type TaskId,
  type TasksMap
} from "./lib/type.js";
import { isEqualTask } from "./lib/utility.js";

/** タスク管理クラス */
export class TaskManager {
  private tasks: TasksMap = new Map();
  private nextId: TaskId = 1;
  private storage = createBrowserStorage();

  /** コンストラクタ */
  constructor() {
    const stored = read<StoredTasksMap>(this.storage,STORAGE_KEY, {});
    this.tasks = restoreTasks(stored);
    this.nextId = getMaxId(stored) + 1;
  }

  /** タスクデータを保存するプライベートメソッド */
  private save() {
    const toStore: StoredTasksMap = buildStoredTasksMap(this.tasks);
    write<StoredTasksMap>(this.storage,STORAGE_KEY, toStore);
    
  }

  /**  新しいタスクを追加する */
  addTask(task: Task): TaskId {
    const id = this.nextId++;
    this.tasks.set(id, task);
    this.save();
    return id;
  }

  /** 指定したIDのタスクを取得する */
  getTask(id: TaskId): Task {
    const task = this.tasks.get(id);
    if (!task) {
      throw new Error(`Task not found. id=${id}`);
    }

    return task;
  }
  /** 指定したIDのタスクを更新する */
  setTask(id: TaskId, task: Task) {
    if (!this.tasks.has(id)) {
      throw new Error(`Task not found. id=${id}`);
    }
    this.tasks.set(id, task);
    this.save();
  }
  /** 指定したIDのタスクを削除する */
  deleteTask(id: TaskId) {
    if (!this.tasks.delete(id)) {
      throw new Error(`Task not found. id=${id}`);
    }
    this.save();
  }
  /** 指定したIDのタスクの完了状態を切り替える */
  toggleTask(id: TaskId) {
    const current = this.getTask(id);
    const updated: Task = {
      ...current,
      isDone: !current.isDone,
      updatedAt: new Date(),
    };
    this.setTask(id, updated);
  }
  /**  指定したIDのタスクを編集する */
  editTask(id: TaskId, editTask: Task) {
    const task = this.getTask(id);
    const isEdited = isEqualTask(task, editTask);
    console.log("isEdited:"+isEdited);
    if (!isEdited) return;
    editTask.updatedAt = new Date();
    this.setTask(id, editTask);
  }
  /**  すべてのタスクを取得する */
  getDataAll(): TasksMap {
    return this.tasks;
  }
}
```
---
## src/usercase.ts
``` typescript
import { TaskManager } from "./logic.js";
import type { SortField, SortOrder, Task, TaskId, TasksMap } from "./lib/type.js";
import { queryVisible } from "./visible.js";

export class TaskUseCase{
    manaeger=new TaskManager()
    visibleTasks = new queryVisible(this.manaeger)
    // Visible Task Update
    /** 指定した条件で表示するタスクを取得する */
    getVisibledTask(option:{
            keyword:string,
            sortBy:SortField,
            sorttype:SortOrder,
            isDone:boolean
        }):TasksMap{
        // console.log(this.visibleTasks.getVisibleTask())
        return this.visibleTasks.getVisibleTask(option);
    }
    // Task maneger API
    /** 新しいタスクを追加する */
    addTask(task:Task){
        return this.manaeger.addTask(task);
    }
    
    /** 指定したIDのタスクを取得する */
    getTask(id:TaskId){
        return this.manaeger.getTask(id);
    }

    /** 指定したIDのタスクを削除する */
    deleteTask(id:TaskId){
        return this.manaeger.deleteTask(id);
    }

    /** 指定したIDのタスクの完了状態を切り替える */
    toggleTask(id:TaskId){
        return this.manaeger.toggleTask(id);
    }

    /** 指定したIDのタスクを編集する */
    editeTask(id:TaskId,editedTask:Task){
        return this.manaeger.editTask(id,editedTask);
    }
}
```
---
## src/visible.ts
``` typescript
import { TaskManager } from "./logic.js";
import type { SortField, SortOrder, Task, TasksMap } from "./lib/type.js";
import { toArray, toTaskMap } from "./lib/utility.js";

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
    // タスクの完了フィルタ
    private filterByDone(tasks: [number, Task][], flg:boolean):[number,Task][]{
        return tasks.filter(([id,task])=>
            task.isDone === flg
        )
    }

    /** ストラテジ風ソート */
    private sortTasks(tasks: [number, Task][], field: SortField, order: SortOrder): [number, Task][] {
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
        // console.log(tasks)
        return toTaskMap(tasks);
    }
}
```