import { top_element } from "./../page/main.js";
/** 指定したクラス名の要素を取得するヘルパー関数 */
export function getFieldElement(taskEl, field) {
    const el = taskEl.querySelector(`.${field}`);
    if (!el)
        throw new Error('not found className');
    return el;
}
/** クリックイベントから指定したクラス名の要素を取得するヘルパー関数 */
export function clickedGetElement(ev, clickClass) {
    let el = null;
    for (const element of ev.composedPath()) {
        if (element instanceof HTMLElement && element.classList.contains(clickClass)) {
            el = element;
            break;
        }
    }
    return el;
}
/** Visible Task Update */
export function updateVisible(app) {
    return app.getVisibledTask({
        isDone: top_element.statusFilter.value === "checked",
        keyword: top_element.searchText.value,
        sortBy: top_element.field.value,
        sorttype: top_element.order.value
    });
}
//# sourceMappingURL=dom-utils.js.map