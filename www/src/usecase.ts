import { TaskManager } from "./logic.js";
import type { SortField, SortOrder, Task, TaskId, TasksMap } from "./type.js";
import { queryVisible } from "./visible.js";

export class TaskUseCase{
    manaeger=new TaskManager()
    visibleTasks = new queryVisible(this.manaeger)
    // Visible Task
    getVisibledTask(option:{
            keyword:string,
            sortBy:SortField,
            sorttype:SortOrder,
            isDone:boolean
        }):TasksMap{
        // console.log(this.visibleTasks.getVisibleTask())
        return this.visibleTasks.getVisibleTask(option);
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
    editeTask(id:TaskId,editedTask:Task){
        return this.manaeger.editTask(id,editedTask);
    }
}

