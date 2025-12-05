import { read, write } from "./localStorage.js";
import { buildStoredTasksMap, getMaxId, restoreTasks } from "./task.js";
import { STORAGE_KEY } from "./type.js";
import { toArray, toTaskMap } from "./utility.js";
import isEqual from "lodash.isequal";
// タスクを管理するクラス
export class TaskManager {
    // ローカルストレージから復元する
    constructor() {
        this.tasks = {};
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
        this.tasks[id] = task;
        this.save();
        return id;
    }
    // 指定したIDのタスクを取得する
    getTask(id) {
        if (!this.tasks[id]) {
            throw new Error(`Task not found. id=${id}`);
        }
        const task = this.tasks[id];
        return task;
    }
    // 指定したIDのタスクを削除する
    deleteTask(id) {
        const tasks = toArray(this.tasks).filter(([key]) => key !== String(id));
        this.tasks = toTaskMap(tasks);
        this.save();
    }
    toggleTask(id) {
        const flgDone = !(this.getTask(id).isDone);
        this.getTask(id).isDone = flgDone;
        this.save();
    }
    editTask(id, editTask) {
        const task = this.getTask(id);
        if (task === editTask)
            return;
        editTask.updatedAt = new Date();
    }
    // 全てのデータを取得する
    getDataAll() {
        return this.tasks;
    }
}
const manage = new TaskManager();
// console.log(manage.getTask(1))
// manage.addTask(task1)
//# sourceMappingURL=logic.js.map