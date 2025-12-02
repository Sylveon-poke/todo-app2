import { TaskManager } from "./logic.js";
import { toArray, toTaskMap } from "./utility.js";
export class queryVisible {
    constructor(manager) {
        this.manager = manager;
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