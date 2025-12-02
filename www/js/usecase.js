import { TaskManager } from "./logic.js";
import { queryVisible } from "./visible.js";
export class TaskUseCase {
    constructor(manaeger, visibleTasks) {
        this.manaeger = manaeger;
        this.visibleTasks = visibleTasks;
    }
    // Visible Task
    getVisbledTask() {
        return this.visibleTasks.getVisbledTask();
    }
    // Task maneger 
    addTask(task) {
        return this.manaeger.addTask(task);
    }
    getTask(id) {
        return this.manaeger.getTask(id);
    }
}
//# sourceMappingURL=usecase.js.map