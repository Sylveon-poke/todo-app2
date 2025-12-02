import { TaskManager } from "./logic.js";
import type { Task, TasksMap } from "./type.js";
import { toArray, toTaskMap } from "./utility.js";

export class queryVisible{
    private manager: TaskManager = new TaskManager();

    private getArrayTasks():[string,Task][]{
        const tasks = this.manager.getDataAll();
        const arrTasks = toArray(tasks);
        return arrTasks;
    }
    getVisbledTask():TasksMap{
        const tasks = this.getArrayTasks();
        return toTaskMap(tasks);
    }
}