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
        ...(t.priorty !== undefined && { priorty: t.priorty }),
        ...(t.repeat !== undefined && { repeat: t.repeat }),
        ...(t.isTemplate !== undefined && { isTemplate: t.isTemplate }),
        ...(t.seriesId !== undefined && { seriesId: t.seriesId }),
      };
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
        ...(t.priorty !== undefined && { priorty: t.priorty }),
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