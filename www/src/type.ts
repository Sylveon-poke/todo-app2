export interface Task {
  title: string;
  content: string;
  dueDate: Date;
  isDone: boolean;
  updatedAt:Date;
  createdAt:Date;
}

export type TaskId = number;
export type TasksMap = Map<TaskId, Task>;

export interface StoredTask {
  id: TaskId;
  title: string;
  content: string;
  dueDate: string;
  isDone: boolean;
  updatedAt:string;
  createdAt:string;
}

export type StoredTasksMap = Record<number, StoredTask>;

export const STORAGE_KEY = "tasks";

// 並び替えの種類
export type SortField = "due" | "created" | "updated";
export type SortOrder = "asc" | "desc";
