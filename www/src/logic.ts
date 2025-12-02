import { read,write } from "./localStorage.js"
import { 
  STORAGE_KEY, 
  type StoredTasksMap, 
  type Task, 
  type TaskId, 
  type TasksMap 
} from "./type.js";

// タスクを管理するクラス
export class TaskManager {
  private tasks: TasksMap = {};
  private nextId: TaskId = 1;

  // ローカルストレージから復元する
  constructor() {
    const stored = read<StoredTasksMap>(STORAGE_KEY, {});
    const loaded: TasksMap = {};
    let maxId = 0;

    for (const [idStr, t] of Object.entries(stored)) {
      const id = Number(idStr);
      loaded[id] = {
        title: t.title,
        content: t.content,
        dueDate: new Date(t.dueDate),
        isDone: t.isDone,
      };
      if (id > maxId) maxId = id;
    }

    this.tasks = loaded;
    this.nextId = maxId + 1;
  }

  // 現在の状態をローカルストレージに保存する
  private save() {
    const toStore: StoredTasksMap = {};

    for (const [idStr, t] of Object.entries(this.tasks)) {
      const id = Number(idStr);
      toStore[id] = {
        id,
        title: t.title,
        content: t.content,
        dueDate: t.dueDate.toISOString(),
        isDone: t.isDone,
      };
    }

    write<StoredTasksMap>(STORAGE_KEY, toStore);
  }

  // 新しいタスクを追加する
  addTask(task: Task): TaskId {
    const id = this.nextId++;
    this.tasks[id] = task;
    this.save();
    return id;
  }

  // 指定したIDのタスクを取得する
  getTask(id: TaskId): Task {
    if (!this.tasks[id]) {
      throw new Error(`Task not found. id=${id}`);
    }
    const task = this.tasks[id]
    return task;
  }
  // 全てのデータを取得する
  getDataAll():TasksMap{
    return this.tasks;
  }
}


const task1: Task = {
  title: "買い物に行く",
  content: "牛乳・卵・パンを買う",
  dueDate: new Date("2025-12-05"),
  isDone: false,
};

const manage = new TaskManager()
// console.log(manage.getTask(1))
// manage.addTask(task1)