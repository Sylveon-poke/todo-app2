import { TaskManager } from "./logic.js";
import { queryVisible } from "./visible.js";
export class TaskUseCase {
    constructor() {
        this.manaeger = new TaskManager();
        this.visibleTasks = new queryVisible(this.manaeger);
    }
    // Visible Task
    getVisibledTask() {
        // console.log(this.visibleTasks.getVisibleTask())
        return this.visibleTasks.getVisibleTask();
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
    editeTask(id, editedTask) {
        return this.manaeger.editTask(id, editedTask);
    }
}
//# sourceMappingURL=usecase.js.map