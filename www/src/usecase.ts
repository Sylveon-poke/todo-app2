import { TaskManager } from "./logic.js";
import type { SortField, SortOrder, Task, TaskId, TasksMap } from "./lib/type.js";
import { queryVisible } from "./visible.js";

export class TaskUseCase{
    manaeger=new TaskManager()
    visibleTasks = new queryVisible(this.manaeger)
    // Visible Task Update
    /** 指定した条件で表示するタスクを取得する */
    getVisibledTask(option:{
            keyword:string,
            sortBy:SortField,
            sorttype:SortOrder,
            isDone:boolean
        }):TasksMap{
        // console.log(this.visibleTasks.getVisibleTask())
        return this.visibleTasks.getVisibleTask(option);
    }
    // Task maneger API
    /** 新しいタスクを追加する */
    addTask(task:Task){
        return this.manaeger.addTask(task);
    }
    
    /** 指定したIDのタスクを取得する */
    getTask(id:TaskId){
        return this.manaeger.getTask(id);
    }

    /** 指定したIDのタスクを削除する */
    deleteTask(id:TaskId){
        return this.manaeger.deleteTask(id);
    }

    /** 指定したIDのタスクの完了状態を切り替える */
    toggleTask(id:TaskId){
        return this.manaeger.toggleTask(id);
    }

    /** 指定したIDのタスクを編集する */
    editeTask(id:TaskId,editedTask:Task){
        return this.manaeger.editTask(id,editedTask);
    }
}