import { TaskManager } from "./logic.js";
import type { Task, TaskId } from "./type.js";
import { queryVisible } from "./visible.js";

export class TaskUseCase{
    manaeger=new TaskManager()
    visibleTasks = new queryVisible(this.manaeger)
    // Visible Task
    getVisbledTask(){
        return this.visibleTasks.getVisbledTask();
    }
    // Task maneger 
    addTask(task:Task){
        return this.manaeger.addTask(task);
    }
    getTask(id:TaskId){
        return this.manaeger.getTask(id);
    }
    deleteTask(id:TaskId){
        return this.manaeger.deleteTask(id);
    }
    toggleTask(id:TaskId){
        return this.manaeger.toggleTask(id);
    }
}

