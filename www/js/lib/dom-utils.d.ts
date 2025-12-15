import type { TaskUseCase } from "../usecase.js";
/** 指定したクラス名の要素を取得するヘルパー関数 */
export declare function getFieldElement(taskEl: DocumentFragment, field: string): HTMLElement;
/** クリックイベントから指定したクラス名の要素を取得するヘルパー関数 */
export declare function clickedGetElement(ev: PointerEvent, clickClass: string): HTMLElement | null;
/** Visible Task Update */
export declare function updateVisible(app: TaskUseCase): import("./type.js").TasksMap;
//# sourceMappingURL=dom-utils.d.ts.map