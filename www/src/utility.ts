import type { Task, TasksMap } from "./type.js";

export const toDateText = (d:Date) =>{ 
    const text = d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return text;
}

export function toArray(tasks:TasksMap){
  const arr = Object.entries(tasks); 
  return arr
}

export function toTaskMap(ArrTask:[string,Task][]){
  console.log(ArrTask)
  const tasksMap:TasksMap = Object.fromEntries(ArrTask);
  console.log(tasksMap)
  return tasksMap;
}

export function isEqualTask(task1:Task,task2:Task){
  let changeedFlg = false;
  
  type Field  = "title"|"content"|"dueDate"|'isDone';

  const isDiffTask:Record<Field,boolean> = {
    title:   task1.title   === task2.title,
    content: task1.content === task2.content,
    dueDate: task1.dueDate === task1.dueDate,
    isDone:  task1.isDone  === task2.isDone,
  };

  const fields: Field[] = ["title", "content", "dueDate", "isDone"];

  for (const flg of fields) {
    if (!isDiffTask[flg]){
      console.log(flg,isDiffTask[flg])
      changeedFlg = true
    }
  }
  return changeedFlg;
}