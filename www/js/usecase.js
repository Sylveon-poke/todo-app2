import { TaskManager } from "./logic.js";
import { queryVisible } from "./visible.js";
export class TaskUseCase {
    constructor() {
        this.manaeger = new TaskManager();
        this.visibleTasks = new queryVisible(this.manaeger);
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
    deleteTask(id) {
        return this.manaeger.deleteTask(id);
    }
    toggleTask(id) {
        return this.manaeger.toggleTask(id);
    }
}
//# sourceMappingURL=usecase.js.map