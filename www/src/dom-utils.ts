import { top_element } from "./main";
import type { SortField, SortOrder } from "./type";
import type { TaskUseCase } from "./usecase";

export function getFieldElement(taskEl:DocumentFragment,field:string) {
    const el = taskEl.querySelector(`.${field}`) as HTMLElement | null;
    if (!el) throw new Error('not found className');
    return el;
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

export function updateVisible(app:TaskUseCase){
    return app.getVisibledTask({
        isDone:top_element.statusFilter.value==="checked",
        keyword:top_element.searchText.value,
        sortBy:top_element.field.value as SortField,
        sorttype:top_element.order.value as SortOrder
    })
    
}