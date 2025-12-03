import type { Task, TasksMap } from "./type";

export function getFieldElement(taskEl:DocumentFragment,field:string) {
    const el = taskEl.querySelector(`.${field}`) as HTMLElement | null;
    if (!el) throw new Error('not found className');
    return el;
  }

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
  const tasksMap:TasksMap = Object.fromEntries(ArrTask);
  return tasksMap;
}

export function clickedGetElement(ev:PointerEvent,clickClass:string):HTMLElement|null{
  let el: HTMLElement | null = null;
  for (const element of ev.composedPath()) {
      if (element instanceof HTMLElement && element.classList.contains(clickClass)) {
          el = element;
          break; 
      }
  }
  return el;
}
