export function getFieldElement(taskEl, field) {
    const el = taskEl.querySelector(`.${field}`);
    if (!el)
        throw new Error('not found className');
    return el;
}
export const toDateText = (d) => {
    const text = d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return text;
};
export function toArray(tasks) {
    const arr = Object.entries(tasks);
    return arr;
}
export function toTaskMap(ArrTask) {
    const tasksMap = Object.fromEntries(ArrTask);
    return tasksMap;
}
//# sourceMappingURL=utility.js.map