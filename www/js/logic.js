import { read, write } from "./localStorage.js";
import { buildStoredTasksMap, getMaxId, restoreTasks } from "./task.js";
import { STORAGE_KEY } from "./type.js";
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
    // 全てのデータを取得する
    getDataAll() {
        return this.tasks;
    }
}
const task1 = {
    title: "買い物に行く",
    content: "牛乳・卵・パンを買う",
    dueDate: new Date("2025-12-05"),
    isDone: false,
};
const manage = new TaskManager();
// console.log(manage.getTask(1))
// manage.addTask(task1)
//# sourceMappingURL=logic.js.map