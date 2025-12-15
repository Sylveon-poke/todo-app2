import {} from "../lib/type.js";
import { TaskUseCase } from "../usecase.js";
import { sampleTasks } from "./testTask.js";
const app = new TaskUseCase();
sampleTasks.forEach(task => {
    app.addTask(task);
});
const edit_element = {
    "title": document.getElementById('title'), // タイトル
    "content": document.getElementById('content'), // 内容
    "dueDate": document.getElementById('dueDate'), // 期限日
    "repeatEnabled": document.getElementById('repeatEnabled'), // 繰り返し有効
    "repeatCount": document.getElementById('repeatCount'), // 繰り返し回数
    "repeatUnit": document.getElementById('repeatUnit'), // 繰り返し単位
};
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    // const strId = params.get('id');
    // if (!strId) return;
    // const id = Number(strId);
    const id = 7; // テスト用に固定IDを使用
    const task = app.getTask(id);
    edit_element.title.value = task.title;
    edit_element.content.value = task.content;
    edit_element.dueDate.valueAsDate = task.dueDate;
    console.log(task.priorty);
    // 優先度の設定
    if (task.priorty !== undefined) {
        document.querySelector(`input[value=${task.priorty}]`).checked = true;
    }
    // 繰り返し設定
    if (task.repeat) {
        edit_element.repeatEnabled.checked = task.repeat.enabled;
        edit_element.repeatCount.value = String(task.repeat.count);
        edit_element.repeatUnit.value = task.repeat.unit;
    }
});
const edit = document.getElementById("todo-edit-form");
edit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(edit);
    const title = getFormDataKey(formData, "title"); /** *追加 */
    const content = getFormDataKey(formData, "content");
    const dueDateStr = getFormDataKey(formData, "dueDate");
    const priority = getFormDataKey(formData, "priority");
    const repeatEnabled = getFormDataKey(formData, "repeatEnabled");
    const repeatCount = getFormDataKey(formData, "repeatCount");
    const repeatUnit = getFormDataKey(formData, "repeatUnit");
    formData.forEach((value, key) => {
        console.log(`${key}- ${value}`);
    });
});
/** フォームデータから特定のキーの値を取得するヘルパー関数 */
function getFormDataKey(formData, label) {
    return formData.get(label);
}
//# sourceMappingURL=edit.js.map