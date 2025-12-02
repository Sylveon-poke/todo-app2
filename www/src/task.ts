import type { StoredTasksMap, Task, TasksMap } from "./type.js";

export function defaultTask():Task{
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const task:Task = {
    title:"新規タスク",
    content:"",
    dueDate:d,
    isDone:false
  }
  return task
}

export function restoreTasks(stored:StoredTasksMap){
    const loaded: TasksMap = {};
    for (const [idStr, t] of Object.entries(stored)) {
      const id = Number(idStr);
      loaded[id] = {
        title: t.title,
        content: t.content,
        dueDate: new Date(t.dueDate),
        isDone: t.isDone,
      };
    }
    return loaded;
}
export function buildStoredTasksMap(tasks:TasksMap){
    const toStore: StoredTasksMap = {};
    for (const [idStr, t] of Object.entries(tasks)) {
      const id = Number(idStr);
      toStore[id] = {
        id,
        title: t.title,
        content: t.content,
        dueDate: t.dueDate.toISOString(),
        isDone: t.isDone,
      };
    }
    return toStore;
}
export function getMaxId(stored: StoredTasksMap): number {
  return Math.max(...Object.keys(stored).map(Number), 0);
}