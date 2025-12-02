import { read, write } from "./localStorage.js";
import { STORAGE_KEY } from "./type.js";
// タスクを管理するクラス
export class TaskManager {
    // ローカルストレージから復元する
    constructor() {
        this.tasks = {};
        this.nextId = 1;
        const stored = read(STORAGE_KEY, {});
        const loaded = {};
        let maxId = 0;
        for (const [idStr, t] of Object.entries(stored)) {
            const id = Number(idStr);
            loaded[id] = {
                title: t.title,
                content: t.content,
                dueDate: new Date(t.dueDate),
                isDone: t.isDone,
            };
            if (id > maxId)
                maxId = id;
        }
        this.tasks = loaded;
        this.nextId = maxId + 1;
    }
    // 現在の状態をローカルストレージに保存する
    save() {
        const toStore = {};
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
    title: "殺しに行く",
    content: "牛乳・卵・パンを買う",
    dueDate: new Date("2025-12-05"),
    isDone: false,
};
const manage = new TaskManager();
// console.log(manage.getTask(1))
// manage.addTask(task1)
//# sourceMappingURL=logic.js.map