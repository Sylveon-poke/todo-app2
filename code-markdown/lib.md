## src/lib/dom-utils.ts
``` typescript
import { top_element } from "./../page/main.js";
import type { SortField, SortOrder, TaskPriority, TasksMap } from "./type.js";
import type { TaskUseCase } from "../usecase.js";
/** 指定したクラス名の要素を取得するヘルパー関数 */
export function getFieldElement(taskEl:DocumentFragment,field:string) {
    const el = taskEl.querySelector(`.${field}`) as HTMLElement | null;
    if (!el) throw new Error('not found className');
    return el;
  }

/** クリックイベントから指定したクラス名の要素を取得するヘルパー関数 */
export function clickedGetElement(ev:PointerEvent,clickClass:string):HTMLElement|null{
  let el: HTMLElement | null = null;
  for (const element of ev.composedPath()) {
      if (element instanceof HTMLElement && element.classList.contains(clickClass)) {
          el = element;
          break; 
      }
  }
  return el;
}

/** Visible Task Update */
export function updateVisible(app:TaskUseCase):TasksMap{
    const data = app.getVisibledTask({
        isDone:top_element.statusFilter.value==="checked",
        keyword:top_element.searchText.value,
        sortBy:top_element.field.value as SortField,
        sorttype:top_element.order.value as SortOrder
    });
    // console.log(app,data);
    return app.getVisibledTask({
        isDone:top_element.statusFilter.value==="checked",
        keyword:top_element.searchText.value,
        sortBy:top_element.field.value as SortField,
        sorttype:top_element.order.value as SortOrder
    })
}
// タスクの優先度に応じたボーダーカラーを返す関数
export function taskBorderColor(priority?: TaskPriority): string {
    // console.log(priority);
    switch (priority) {
        case "high":
            return "border-red-400 dark:border-red-600";
        case "medium":
            return "border-yellow-400 dark:border-yellow-600";
        case "low":
            return "border-green-400 dark:border-green-600";
        default:
            return "border-slate-200 dark:border-white/10";
    }
}
```
---
## src/lib/localStorage.ts
``` typescript
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
```
---
## src/lib/repeat.ts
``` typescript
export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();

  d.setMonth(d.getMonth() + months, 1);

  const lastDay = new Date(
    d.getFullYear(),
    d.getMonth() + 1,
    0
  ).getDate();

  d.setDate(Math.min(day, lastDay));
  return d;
}
/** 指定した日付に週数を加算するヘルパー関数 */
export function addWeeks(date: Date, weeks: number): Date {
  // 年/月/日/時/分/秒 を保持して、日付だけを進める
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const ms = date.getMilliseconds();

  const out = new Date(y, m, d + weeks * 7, hh, mm, ss, ms);
  return out;
}
/** 指定した日付に日数を加算するヘルパー関数 */
export function addDays(date: Date, days: number): Date {
  // 年/月/日/時/分/秒 を保持して、日付だけを進める
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const ms = date.getMilliseconds();
  return new Date(y, m, d + days, hh, mm, ss, ms);
}
```
---
## src/lib/task.ts
``` typescript
import type { StoredTasksMap, Task, TasksMap } from "./type.js";
/** デフォルトのタスクを生成する関数 */
export function defaultTask():Task{
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const now = new Date();
  const task:Task = {
    title:"",
    content:"",
    dueDate:d,
    isDone:false,
    updatedAt:now,
    createdAt:now,
  }
  return task
}
/** 保存されたタスクデータを復元する関数 */
export function restoreTasks(stored:StoredTasksMap){
    const loaded: TasksMap = new Map();
    for (const [idStr, t] of Object.entries(stored)) {
      const id = Number(idStr);
      const task: Task = {
        title: t.title,
        content: t.content,
        dueDate: new Date(t.dueDate),
        isDone: t.isDone,
        updatedAt:new Date(t.updatedAt),
        createdAt:new Date(t.createdAt),
        ...(t.priority !== undefined && { priority: t.priority }),
        ...(t.repeat !== undefined && { repeat: t.repeat }),
        ...(t.isTemplate !== undefined && { isTemplate: t.isTemplate }),
        ...(t.seriesId !== undefined && { seriesId: t.seriesId }),
      };
      
      // console.log("task.ts",id,t.priority,task);
      loaded.set(id, task);
    }
    return loaded;
}
/** タスクデータを保存用に変換する関数 */
export function buildStoredTasksMap(tasks:TasksMap){
    const toStore: StoredTasksMap = {};
    for (const [idStr, t] of Array.from(tasks.entries())) {
      const id = Number(idStr);
      toStore[id] = {
        id,
        title: t.title,
        content: t.content,
        dueDate: t.dueDate.toISOString(),
        isDone: t.isDone,
        updatedAt:t.updatedAt.toISOString(),
        createdAt:t.createdAt.toISOString(),
        ...(t.priority !== undefined && { priority: t.priority }),
        ...(t.repeat !== undefined && { repeat: t.repeat }),
        ...(t.isTemplate !== undefined && { isTemplate: t.isTemplate }),
        ...(t.seriesId !== undefined && { seriesId: t.seriesId })
      };
    }
    return toStore;
}
/** 保存されたタスクデータから最大のIDを取得する関数 */
export function getMaxId(stored: StoredTasksMap): number {
  return Math.max(...Object.keys(stored).map(Number), 0);
}
```
---
## src/lib/type.ts
``` typescript
// www/src/lib/type.ts

// タスクの型定義
export interface Task {
  title: string;
  content: string;
  dueDate: Date;
  isDone: boolean;
  updatedAt:Date;
  createdAt:Date;
  priority?: TaskPriority;
  repeat?: Repeat;

  seriesId?: number;
  isTemplate?: boolean;
}
// タスクIDとタスクのマップ型定義
export type TaskId = number;
export type TasksMap = Map<TaskId, Task>;

// ストレージに保存するタスクの型定義
export interface StoredTask {
  id: TaskId;
  title: string;
  content: string;
  dueDate: string;
  isDone: boolean;
  updatedAt:string;
  createdAt:string;
  priority?: TaskPriority;
  repeat?: Repeat;

  seriesId?: number;
  isTemplate?: boolean;
}
// 繰り返し設定の型定義
export interface Repeat {
  enabled: boolean;
  count: number;
  unit: "day" | "week" | "month";
}
// ストレージに保存するタスクのマップ型定義
export type StoredTasksMap = Record<number, StoredTask>;
// ストレージキー
export const STORAGE_KEY = "tasks";

// 並び替えの種類
export type SortField = "due" | "created" | "updated";
export type SortOrder = "asc" | "desc";

// フォームラベルの型定義
export type FormLabel = "title" | "content" | "dueDate" | "priority" | "repeatEnabled" | "repeatCount" | "repeatUnit";
// プロパティの型定義
export type TaskPriority = "low" | "medium" | "high" | "";
```
---
## src/lib/utility.ts
``` typescript
import type { TaskId, Task, TasksMap } from "./type.js";
/** 日付を「YYYY/MM/DD」形式の文字列に変換する関数 */
export const toDateText = (d:Date) =>{ 
    const text = d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return text;
}
/** タスクのマップを配列に変換する関数 */
export function toArray(tasks:TasksMap){
  const arr =Array.from(tasks.entries()); 
  return arr
}

/** 配列をタスクのマップに変換する関数 */
export function toTaskMap(ArrTask:[TaskId,Task][]){
  const tasksMap:TasksMap = new Map<TaskId,Task>(ArrTask);
  return tasksMap;
}

/** 2つのタスクが等しいかどうかを比較する関数 */
export function isEqualTask(task1:Task,task2:Task){
  let changeedFlg = false;
  
  type Field  = "title"|"content"|"dueDate"|'isDone'|"priority";

  const isDiffTask:Record<Field,boolean> = {
    title:   task1.title   === task2.title,
    content: task1.content === task2.content,
    dueDate: task1.dueDate === task2.dueDate,
    isDone:  task1.isDone  === task2.isDone,
    priority: task1.priority === task2.priority
  };

  const fields: Field[] = ["title", "content", "dueDate", "isDone","priority"];

  for (const flg of fields) {
    if (!isDiffTask[flg]){
      console.log(flg,isDiffTask[flg])
      changeedFlg = true
    }
  }
  return changeedFlg;
}
```
