var _a;
import { clickedGetElement, getFieldElement, taskBorderColor, updateVisible } from "./../lib/dom-utils.js";
import { defaultTask } from "./../lib/task.js";
import { TaskUseCase } from "./../usecase.js";
import { toDateText } from "./../lib/utility.js";
import { sampleTasks } from "../test/testTask.js";
const app = new TaskUseCase();
export const top_element = {
    "test": document.getElementById('test'),
    "todo": document.getElementById('tpl-todo'),
    "tasks": document.getElementById('tasks'),
    "add": document.getElementById('add-btn'),
    "checked": document.getElementById('checked-btn'),
    "searchBtn": document.getElementById('search-btn'),
    "searchText": document.getElementById('search-input'),
    "statusFilter": document.getElementById('checked'),
    "field": document.getElementById('field'),
    "order": document.getElementById('order'),
};
function render() {
    const tasks = updateVisible(app);
    if (!tasks)
        return;
    top_element.tasks.innerHTML = '';
    for (const [idx, t] of Array.from(tasks.entries())) {
        const task = top_element.todo.content.cloneNode(true);
        const li = task.querySelector('li');
        li === null || li === void 0 ? void 0 : li.setAttribute('data-id', String(idx));
        li === null || li === void 0 ? void 0 : li.classList.add(...taskBorderColor(t.priority).split(" "));
        // console.log(li?.className);
        // console.log(idx,t);
        const title = getFieldElement(task, "title");
        const content = getFieldElement(task, "content");
        const date = getFieldElement(task, "due-date");
        const done = getFieldElement(task, "done");
        title.textContent = t.title !== "" ? t.title : "新規タスク";
        content.textContent = t.content !== "" ? t.content : "";
        done.textContent = t.isDone == true ? "戻る" : "完了";
        date.textContent = toDateText(new Date(t.dueDate));
        top_element.tasks.appendChild(task);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    //console.log("DOMContentLoaded");
    render();
    // console.log(top_element.tasks.querySelectorAll('[data-id]'));
});
top_element.add.addEventListener('click', () => {
    app.addTask(defaultTask());
    render();
});
top_element.tasks.addEventListener('click', (ev) => {
    var _a;
    const id = ((_a = clickedGetElement(ev, "task")) === null || _a === void 0 ? void 0 : _a.dataset.id) || "-1";
    if (id === "-1")
        return;
    const done = clickedGetElement(ev, "done");
    if (done) {
        app.toggleTask(Number(id));
        render();
        return;
    }
    const del = clickedGetElement(ev, "del");
    if (del) {
        if (confirm("本当にこのタスクを削除しますか？")) {
            app.deleteTask(Number(id));
            render();
        }
        return;
    }
    let copy = clickedGetElement(ev, "copy-btn");
    if (copy) {
        app.copyTask(Number(id));
        const backup = copy.cloneNode(true);
        copy.textContent = "copied!";
        setTimeout(() => {
            copy.replaceWith(backup);
        }, 1000);
        return;
    }
    window.location.href = `/www/edit_AI.html?id=${id}`;
});
top_element.searchBtn.addEventListener('click', render);
top_element.field.addEventListener('change', render);
top_element.order.addEventListener('change', render);
top_element.statusFilter.addEventListener('change', render);
(_a = top_element.test) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    sampleTasks.forEach(task => {
        app.addTask(task);
    });
    render();
});
//# sourceMappingURL=main.js.map