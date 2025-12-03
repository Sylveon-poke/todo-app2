import { TaskManager } from "./logic.js";
import { defaultTask } from "./task.js";
import { type TasksMap } from "./type.js";
import { TaskUseCase } from "./usecase.js";
import { clickedGetElement, getFieldElement, toDateText } from "./utility.js";
import { queryVisible } from "./visible.js";

const app = new TaskUseCase();

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
        const done = getFieldElement(task,"done");
        title.textContent = t.title !== "" ? t.title:"新規タスク";
        content.textContent = t.content !== "" ? t.content:"";
        done.textContent = t.isDone == true ? "戻る":"完了"
        date.textContent = toDateText(new Date(t.dueDate))
        top_element.tasks.appendChild(task)
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    render(app.getVisbledTask());
    // console.log(top_element.tasks.querySelectorAll('[data-id]'));
})

top_element.add.addEventListener('click',()=>{
    app.addTask(defaultTask());
    render(app.getVisbledTask());
})

top_element.tasks.addEventListener('click', (ev:PointerEvent) =>{
    const id = clickedGetElement(ev,"task")?.dataset.id || "-1";
    if (id==="-1") return;
    const done = clickedGetElement(ev,"done");
    if(done){
        app.toggleTask(Number(id));
        render(app.getVisbledTask())
    }

    const del = clickedGetElement(ev,"del");
    if(del){
        app.deleteTask(Number(id));
        render(app.getVisbledTask())
    }
})