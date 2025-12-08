import { read, write } from "./localStorage.js";
import { buildStoredTasksMap, getMaxId, restoreTasks } from "./task.js";
import { STORAGE_KEY } from "./type.js";
import { isEqualTask, toArray, toTaskMap } from "./utility.js";
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
    // 指定したIDのタスクを上書きする
    setTask(id, setTask) {
        if (!this.tasks[id]) {
            throw new Error(`Task not found. id=${id}`);
        }
        this.tasks[id] = setTask;
        this.save();
    }
    // 指定したIDのタスクを削除する
    deleteTask(id) {
        const tasks = toArray(this.tasks).filter(([key]) => key !== String(id));
        this.tasks = toTaskMap(tasks);
        this.save();
    }
    // 指定したIDのタスクのisDoneを変更する
    toggleTask(id) {
        const flgDone = !(this.getTask(id).isDone);
        this.getTask(id).updatedAt = new Date();
        this.getTask(id).isDone = flgDone;
        this.save();
    }
    // 指定した ID のタスクを編集する
    editTask(id, editTask) {
        const task = this.getTask(id);
        const isEdited = isEqualTask(task, editTask);
        if (!isEdited)
            return;
        editTask.updatedAt = new Date();
        this.setTask(id, editTask);
        this.save();
    }
    // 全てのデータを取得する
    getDataAll() {
        return this.tasks;
    }
}
const manage = new TaskManager();
//# sourceMappingURL=logic.js.map