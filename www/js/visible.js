import { TaskManager } from "./logic.js";
import { toArray, toTaskMap } from "./utility.js";
export class queryVisible {
    constructor() {
        this.manager = new TaskManager();
    }
    getArrayTasks() {
        const tasks = this.manager.getDataAll();
        const arrTasks = toArray(tasks);
        return arrTasks;
    }
    getVisbledTask() {
        const tasks = this.getArrayTasks();
        return toTaskMap(tasks);
    }
}
//# sourceMappingURL=visible.js.map