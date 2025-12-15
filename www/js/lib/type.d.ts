export interface Task {
    title: string;
    content: string;
    dueDate: Date;
    isDone: boolean;
    updatedAt: Date;
    createdAt: Date;
    priorty?: "low" | "medium" | "high";
    repeat?: Repeat;
    seriesId?: number;
    isTemplate?: boolean;
}
export type TaskId = number;
export type TasksMap = Map<TaskId, Task>;
export interface StoredTask {
    id: TaskId;
    title: string;
    content: string;
    dueDate: string;
    isDone: boolean;
    updatedAt: string;
    createdAt: string;
    priorty?: "low" | "medium" | "high";
    repeat?: Repeat;
    seriesId?: number;
    isTemplate?: boolean;
}
export interface Repeat {
    enabled: boolean;
    count: number;
    unit: "day" | "week" | "month";
}
export type StoredTasksMap = Record<number, StoredTask>;
export declare const STORAGE_KEY = "tasks";
export type SortField = "due" | "created" | "updated";
export type SortOrder = "asc" | "desc";
export type FormLabel = "title" | "content" | "dueDate" | "priority" | "repeatEnabled" | "repeatCount" | "repeatUnit";
//# sourceMappingURL=type.d.ts.map