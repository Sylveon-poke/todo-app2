import { TaskManager } from "./logic.js";
import { queryVisible } from "./visible.js";
export class TaskUseCase {
    constructor() {
        this.manaeger = new TaskManager();
        this.visibleTasks = new queryVisible(this.manaeger);
    }
    // Visible Task Update
    /** 指定した条件で表示するタスクを取得する */
    getVisibledTask(option) {
        // console.log(this.visibleTasks.getVisibleTask())
        return this.visibleTasks.getVisibleTask(option);
    }
    // Task maneger API
    /** 新しいタスクを追加する */
    addTask(task) {
        return this.manaeger.addTask(task);
    }
    /** 指定したIDのタスクを取得する */
    getTask(id) {
        return this.manaeger.getTask(id);
    }
    /** 指定したIDのタスクを削除する */
    deleteTask(id) {
        return this.manaeger.deleteTask(id);
    }
    /** 指定したIDのタスクの完了状態を切り替える */
    toggleTask(id) {
        return this.manaeger.toggleTask(id);
    }
    /** 指定したIDのタスクを編集する */
    editeTask(id, editedTask) {
        return this.manaeger.editTask(id, editedTask);
    }
}
//# sourceMappingURL=usecase.js.map