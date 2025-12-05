import { read,write } from "./localStorage.js"
import { buildStoredTasksMap, getMaxId, restoreTasks } from "./task.js";
import { 
  STORAGE_KEY, 
  type StoredTasksMap, 
  type Task, 
  type TaskId, 
  type TasksMap 
} from "./type.js";
import { toArray, toTaskMap } from "./utility.js";
import isEqual from "lodash.isequal";

// タスクを管理するクラス
export class TaskManager {
  private tasks: TasksMap = {};
  private nextId: TaskId = 1;

  // ローカルストレージから復元する
  constructor() {
    const stored = read<StoredTasksMap>(STORAGE_KEY, {});
    this.tasks = restoreTasks(stored);
    this.nextId = getMaxId(stored) + 1;
  }

  // 現在の状態をローカルストレージに保存する
  private save() {
    const toStore: StoredTasksMap = buildStoredTasksMap(this.tasks);
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
  // 指定したIDのタスクを削除する
  deleteTask(id:TaskId){
    const tasks = toArray(this.tasks).filter(
      ([key])=> key !== String(id)
    );
    this.tasks = toTaskMap(tasks);
    this.save();
  }
  toggleTask(id:TaskId){
    const flgDone = !(this.getTask(id).isDone);
    this.getTask(id).isDone = flgDone;
    this.save();
  }
  editTask(id:TaskId,editTask:Task){
    const task = this.getTask(id);
    if (task===editTask) return;
    editTask.updatedAt = new Date();
    
  }
  // 全てのデータを取得する
  getDataAll():TasksMap{
    return this.tasks;
  }
}

const manage = new TaskManager()
// console.log(manage.getTask(1))
// manage.addTask(task1)