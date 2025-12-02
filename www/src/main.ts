import { TaskManager } from "./logic.js";
import { type TasksMap } from "./type.js";
import { defaultTask, getFieldElement, toDateText } from "./utility.js";
import { queryVisible } from "./visible.js";

const visibleTasks = new queryVisible();
const manager = new TaskManager();

const top_element = {
    "todo":document.getElementById('tpl-todo') as HTMLTemplateElement,
    "tasks":document.getElementById('tasks') as HTMLUListElement,
    "add":document.getElementById('add-btn') as HTMLDivElement,
    "checked":document.getElementById('checked-btn') as HTMLDivElement
}
function render(tasks:TasksMap){
    if (!tasks) return;
    top_element.tasks.innerHTML = '' 
    for (const [idx,t] of Object.entries(tasks)) {
        const task = top_element.todo.content.cloneNode(true) as DocumentFragment;
        const li = task.querySelector('li');
        li?.setAttribute('data-id',String(idx));
        const title = getFieldElement(task,"title")
        const content = getFieldElement(task,"content");
        const date = getFieldElement(task,"due-date");
        title.textContent = t.title !== "" ? t.title:"新規タスク";
        content.textContent = t.content !== "" ? t.content:"";
        date.textContent = toDateText(new Date(t.dueDate))
        top_element.tasks.appendChild(task)
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    render(visibleTasks.getVisbledTask());
    // console.log(top_element.tasks.querySelectorAll('[data-id]'));
})

top_element.add.addEventListener('click',()=>{
    manager.addTask(defaultTask());
    render(manager.getDataAll());
})