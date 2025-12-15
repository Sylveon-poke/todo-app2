export function defaultTask() {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const now = new Date();
    const task = {
        title: "",
        content: "",
        dueDate: d,
        isDone: false,
        updatedAt: now,
        createdAt: now,
    };
    return task;
}
export function restoreTasks(stored) {
    const loaded = new Map();
    for (const [idStr, t] of Object.entries(stored)) {
        const id = Number(idStr);
        const task = Object.assign(Object.assign(Object.assign(Object.assign({ title: t.title, content: t.content, dueDate: new Date(t.dueDate), isDone: t.isDone, updatedAt: new Date(t.updatedAt), createdAt: new Date(t.createdAt) }, (t.priorty !== undefined && { priorty: t.priorty })), (t.repeat !== undefined && { repeat: t.repeat })), (t.isTemplate !== undefined && { isTemplate: t.isTemplate })), (t.seriesId !== undefined && { seriesId: t.seriesId }));
        loaded.set(id, task);
    }
    return loaded;
}
export function buildStoredTasksMap(tasks) {
    const toStore = {};
    for (const [idStr, t] of Array.from(tasks.entries())) {
        const id = Number(idStr);
        toStore[id] = Object.assign(Object.assign(Object.assign(Object.assign({ id, title: t.title, content: t.content, dueDate: t.dueDate.toISOString(), isDone: t.isDone, updatedAt: t.updatedAt.toISOString(), createdAt: t.createdAt.toISOString() }, (t.priorty !== undefined && { priorty: t.priorty })), (t.repeat !== undefined && { repeat: t.repeat })), (t.isTemplate !== undefined && { isTemplate: t.isTemplate })), (t.seriesId !== undefined && { seriesId: t.seriesId }));
    }
    return toStore;
}
export function getMaxId(stored) {
    return Math.max(...Object.keys(stored).map(Number), 0);
}
//# sourceMappingURL=task.js.map