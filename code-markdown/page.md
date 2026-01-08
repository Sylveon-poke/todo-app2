## src/page/edit.ts
``` typescript
import { TaskUseCase } from "../usecase.js"

const edit_element = {
    "quit":document.getElementById('quit') as HTMLButtonElement,
    "save":document.getElementById('save') as HTMLButtonElement,
    "title":document.getElementById('title') as HTMLInputElement,
    "content":document.getElementById('content') as HTMLTextAreaElement
}
const app = new TaskUseCase();
edit_element.quit.addEventListener('click',()=>{
    window.location.href = "/www/index.html"
})
edit_element.save.addEventListener('click',()=>{
    const title = edit_element.title.value;
    const content = edit_element.content.value;
    const params = new URLSearchParams(window.location.search);
    const strId = params.get('id');
    if (!strId) return;
    const id = Number(strId);
    const task = app.getTask(id);
    console.log(id,title,content)
    task.title = title;
    task.content = content;
    app.editeTask(id,task);
})
document.addEventListener('DOMContentLoaded',()=>{
    const params = new URLSearchParams(window.location.search);
    const strId = params.get('id');
    if (!strId) return;
    const id = Number(strId);
    const task = app.getTask(id);
    edit_element.title.value = task.title;
    edit_element.content.value = task.content;
})
```
---
## src/page/main.ts
``` typescript
import { clickedGetElement, getFieldElement, taskBorderColor, updateVisible } from "./../lib/dom-utils.js";
import { defaultTask } from "./../lib/task.js";
import { TaskUseCase } from "./../usecase.js";
import { toDateText } from "./../lib/utility.js";

const app = new TaskUseCase();

export const top_element = {
    "test"         :document.getElementById('test'),
    "todo"         :document.getElementById('tpl-todo')     as HTMLTemplateElement,
    "tasks"        :document.getElementById('tasks')        as HTMLUListElement,
    "add"          :document.getElementById('add-btn')      as HTMLDivElement,
    "checked"      :document.getElementById('checked-btn')  as HTMLDivElement,
    "searchBtn"    :document.getElementById('search-btn')   as HTMLInputElement,
    "searchText"   :document.getElementById('search-input') as HTMLInputElement,
    "statusFilter" :document.getElementById('checked')      as HTMLSelectElement,
    "field"        :document.getElementById('field')        as HTMLSelectElement,
    "order"        :document.getElementById('order')        as HTMLSelectElement
}
function render(){
    const tasks = updateVisible(app);
    if (!tasks) return;
    top_element.tasks.innerHTML = '' 
    for (const [idx,t] of Array.from(tasks.entries())) {
        const task = top_element.todo.content.cloneNode(true) as DocumentFragment;
        const li = task.querySelector('li');
        li?.setAttribute('data-id',String(idx));
        li?.classList.add(...taskBorderColor(t.priority).split(" "));
        // console.log(li?.className);
        // console.log(idx,t);
        const title = getFieldElement(task,"title")
        const content = getFieldElement(task,"content");
        const date = getFieldElement(task,"due-date");
        const done = getFieldElement(task,"done");
        title.textContent = t.title !== "" ? t.title:"新規タスク";
        content.textContent = t.content !== "" ? t.content:"";
        done.textContent = t.isDone == true ? "戻る":"完了";
        date.textContent = toDateText(new Date(t.dueDate));
        top_element.tasks.appendChild(task);
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    //console.log("DOMContentLoaded");
    render();
    // console.log(top_element.tasks.querySelectorAll('[data-id]'));
})

top_element.add.addEventListener('click',()=>{
    app.addTask(defaultTask());
    render();
})

top_element.tasks.addEventListener('click', (ev:PointerEvent) =>{
    const id = clickedGetElement(ev,"task")?.dataset.id || "-1";
    if (id==="-1") return;
    const done = clickedGetElement(ev,"done");
    if(done){
        app.toggleTask(Number(id));
        render();
        return;
    }

    const del = clickedGetElement(ev,"del");
    if(del){
        app.deleteTask(Number(id));
        render();
        return;
    }
    window.location.href = `/www/edit_AI.html?id=${id}`;
})
top_element.searchBtn.addEventListener('click',render)
top_element.field.addEventListener('change',render)
top_element.order.addEventListener('change',render)
top_element.statusFilter.addEventListener('change',render)
```
