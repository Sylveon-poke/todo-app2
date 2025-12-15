// www/src/lib/type.ts

// タスクの型定義
export interface Task {
  title: string;
  content: string;
  dueDate: Date;
  isDone: boolean;
  updatedAt:Date;
  createdAt:Date;
  priorty?: "low" | "medium" | "high";
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
  priorty?: "low" | "medium" | "high";
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