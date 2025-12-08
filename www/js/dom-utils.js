import { top_element } from "./main";
export function getFieldElement(taskEl, field) {
    const el = taskEl.querySelector(`.${field}`);
    if (!el)
        throw new Error('not found className');
    return el;
}
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
export function updateVisible(app) {
    return app.getVisibledTask({
        isDone: top_element.statusFilter.value === "checked",
        keyword: top_element.searchText.value,
        sortBy: top_element.field.value,
        sorttype: top_element.order.value
    });
}
//# sourceMappingURL=dom-utils.js.map