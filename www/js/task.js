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
        createdAt: now
    };
    return task;
}
export function restoreTasks(stored) {
    const loaded = new Map();
    for (const [idStr, t] of Object.entries(stored)) {
        const id = Number(idStr);
        loaded.set(id, {
            title: t.title,
            content: t.content,
            dueDate: new Date(t.dueDate),
            isDone: t.isDone,
            updatedAt: new Date(t.updatedAt),
            createdAt: new Date(t.createdAt)
        });
    }
    return loaded;
}
export function buildStoredTasksMap(tasks) {
    const toStore = {};
    for (const [idStr, t] of Array.from(tasks.entries())) {
        const id = Number(idStr);
        toStore[id] = {
            id,
            title: t.title,
            content: t.content,
            dueDate: t.dueDate.toISOString(),
            isDone: t.isDone,
            updatedAt: t.updatedAt.toISOString(),
            createdAt: t.createdAt.toISOString()
        };
    }
    return toStore;
}
export function getMaxId(stored) {
    return Math.max(...Object.keys(stored).map(Number), 0);
}
//# sourceMappingURL=task.js.map