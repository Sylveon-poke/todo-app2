import { TaskManager } from "./logic.js";
import { defaultTask } from "./task.js";
import {} from "./type.js";
import { TaskUseCase } from "./usecase.js";
import { clickedGetElement, getFieldElement, toDateText } from "./utility.js";
import { queryVisible } from "./visible.js";
const app = new TaskUseCase();
const top_element = {
    "todo": document.getElementById('tpl-todo'),
    "tasks": document.getElementById('tasks'),
    "add": document.getElementById('add-btn'),
    "checked": document.getElementById('checked-btn')
};
function render(tasks) {
    if (!tasks)
        return;
    top_element.tasks.innerHTML = '';
    for (const [idx, t] of Object.entries(tasks)) {
        const task = top_element.todo.content.cloneNode(true);
        const li = task.querySelector('li');
        li === null || li === void 0 ? void 0 : li.setAttribute('data-id', String(idx));
        const title = getFieldElement(task, "title");
        const content = getFieldElement(task, "content");
        const date = getFieldElement(task, "due-date");
        title.textContent = t.title !== "" ? t.title : "新規タスク";
        content.textContent = t.content !== "" ? t.content : "";
        date.textContent = toDateText(new Date(t.dueDate));
        top_element.tasks.appendChild(task);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    render(app.getVisbledTask());
    // console.log(top_element.tasks.querySelectorAll('[data-id]'));
});
top_element.add.addEventListener('click', () => {
    app.addTask(defaultTask());
    render(app.getVisbledTask());
});
top_element.tasks.addEventListener('click', (ev) => {
    var _a;
    const id = ((_a = clickedGetElement(ev, "task")) === null || _a === void 0 ? void 0 : _a.dataset.id) || "-1";
    if (id === "-1")
        return;
    const done = clickedGetElement(ev, "done");
    if (done) {
        app.toggleTask(Number(id));
    }
    const del = clickedGetElement(ev, "del");
    if (del) {
        app.deleteTask(Number(id));
        render(app.getVisbledTask());
    }
});
//# sourceMappingURL=main.js.map