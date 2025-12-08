import { read, write } from "./localStorage.js";
import { buildStoredTasksMap, getMaxId, restoreTasks } from "./task.js";
import { STORAGE_KEY } from "./type.js";
import { isEqualTask, toArray, toTaskMap } from "./utility.js";
// タスクを管理するクラス
export class TaskManager {
    // ローカルストレージから復元する
    constructor() {
        this.tasks = new Map();
        this.nextId = 1;
        const stored = read(STORAGE_KEY, {});
        this.tasks = restoreTasks(stored);
        this.nextId = getMaxId(stored) + 1;
    }
    // 現在の状態をローカルストレージに保存する
    save() {
        const toStore = buildStoredTasksMap(this.tasks);
        write(STORAGE_KEY, toStore);
    }
    // 新しいタスクを追加する
    addTask(task) {
        const id = this.nextId++;
        this.tasks.set(id, task);
        this.save();
        return id;
    }
    // 指定したIDのタスクを取得する
    getTask(id) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task not found. id=${id}`);
        }
        return task;
    }
    // 指定したIDのタスクを上書きする
    setTask(id, task) {
        if (!this.tasks.has(id)) {
            throw new Error(`Task not found. id=${id}`);
        }
        this.tasks.set(id, task);
        this.save();
    }
    // 指定したIDのタスクを削除する
    deleteTask(id) {
        if (!this.tasks.delete(id)) {
            throw new Error(`Task not found. id=${id}`);
        }
        this.save();
    }
    // 指定したIDのタスクのisDoneを変更する
    toggleTask(id) {
        const current = this.getTask(id);
        const updated = Object.assign(Object.assign({}, current), { isDone: !current.isDone, updatedAt: new Date() });
        this.setTask(id, updated);
    }
    // 指定した ID のタスクを編集する
    editTask(id, editTask) {
        const task = this.getTask(id);
        const isEdited = isEqualTask(task, editTask);
        if (isEdited)
            return;
        editTask.updatedAt = new Date();
        this.setTask(id, editTask);
    }
    // 全てのデータを取得する
    getDataAll() {
        return this.tasks;
    }
}
const manage = new TaskManager();
//# sourceMappingURL=logic.js.map