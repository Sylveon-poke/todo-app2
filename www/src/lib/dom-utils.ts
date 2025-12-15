import { top_element } from "./../page/main.js";
import type { SortField, SortOrder } from "./type.js";
import type { TaskUseCase } from "../usecase.js";
/** 指定したクラス名の要素を取得するヘルパー関数 */
export function getFieldElement(taskEl:DocumentFragment,field:string) {
    const el = taskEl.querySelector(`.${field}`) as HTMLElement | null;
    if (!el) throw new Error('not found className');
    return el;
  }

/** クリックイベントから指定したクラス名の要素を取得するヘルパー関数 */
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

/** Visible Task Update */
export function updateVisible(app:TaskUseCase){
    return app.getVisibledTask({
        isDone:top_element.statusFilter.value==="checked",
        keyword:top_element.searchText.value,
        sortBy:top_element.field.value as SortField,
        sorttype:top_element.order.value as SortOrder
    })
    
}