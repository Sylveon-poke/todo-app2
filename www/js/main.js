var _a;
import { clickedGetElement, getFieldElement } from "./dom-utils.js";
import { defaultTask } from "./task.js";
import {} from "./type.js";
import { TaskUseCase } from "./usecase.js";
import { toDateText } from "./utility.js";
const app = new TaskUseCase();
const top_element = {
    "test": document.getElementById('test'),
    "todo": document.getElementById('tpl-todo'),
    "tasks": document.getElementById('tasks'),
    "add": document.getElementById('add-btn'),
    "checked": document.getElementById('checked-btn')
};
function render(tasks) {
    if (!tasks)
        return;
    top_element.tasks.innerHTML = '';
    for (const [idx, t] of Array.from(tasks.entries())) {
        const task = top_element.todo.content.cloneNode(true);
        const li = task.querySelector('li');
        li === null || li === void 0 ? void 0 : li.setAttribute('data-id', String(idx));
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
    render(app.getVisibledTask());
    // console.log(top_element.tasks.querySelectorAll('[data-id]'));
});
top_element.add.addEventListener('click', () => {
    app.addTask(defaultTask());
    render(app.getVisibledTask());
});
top_element.tasks.addEventListener('click', (ev) => {
    var _a;
    const id = ((_a = clickedGetElement(ev, "task")) === null || _a === void 0 ? void 0 : _a.dataset.id) || "-1";
    if (id === "-1")
        return;
    const done = clickedGetElement(ev, "done");
    if (done) {
        app.toggleTask(Number(id));
        render(app.getVisibledTask());
        return;
    }
    const del = clickedGetElement(ev, "del");
    if (del) {
        app.deleteTask(Number(id));
        render(app.getVisibledTask());
        return;
    }
    window.location.href = `/www/edit.html?id=${id}`;
});
(_a = top_element.test) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (ev) => {
    const sampleTasks = [
        {
            title: "資料作成",
            content: "クライアント向け提案資料の作成",
            dueDate: new Date("2025-12-10"),
            isDone: false,
            updatedAt: new Date("2025-12-06T09:00:00"),
            createdAt: new Date("2025-12-05T12:30:00")
        },
        {
            title: "買い物",
            content: "牛乳・卵・パンを購入する",
            dueDate: new Date("2025-12-08"),
            isDone: true,
            updatedAt: new Date("2025-12-06T11:15:00"),
            createdAt: new Date("2025-12-04T15:10:00")
        },
        {
            title: "勉強",
            content: "TypeScriptのジェネリクス復習",
            dueDate: new Date("2025-12-12"),
            isDone: false,
            updatedAt: new Date("2025-12-06T10:10:00"),
            createdAt: new Date("2025-12-06T10:00:00")
        },
        {
            title: "ジョギング",
            content: "5km ランニング",
            dueDate: new Date("2025-12-07"),
            isDone: false,
            updatedAt: new Date("2025-12-05T08:00:00"),
            createdAt: new Date("2025-12-05T07:45:00")
        },
        {
            title: "掃除",
            content: "部屋の片付け＆ゴミ出し",
            dueDate: new Date("2025-12-09"),
            isDone: true,
            updatedAt: new Date("2025-12-06T08:30:00"),
            createdAt: new Date("2025-12-04T19:00:00")
        },
        {
            title: "面談準備",
            content: "自己PR・質問を整理",
            dueDate: new Date("2025-12-11"),
            isDone: false,
            updatedAt: new Date("2025-12-06T12:00:00"),
            createdAt: new Date("2025-12-06T12:00:00")
        }
    ];
    sampleTasks.forEach(task => {
        app.addTask(task);
    });
    render(app.getVisibledTask());
});
//# sourceMappingURL=main.js.map