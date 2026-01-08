## src/test/edit.ts
``` typescript
import { type FormLabel, type Task } from "../lib/type.js";
import { TaskUseCase } from "../usecase.js"
import { sampleTasks } from "./testTask.js";

const app = new TaskUseCase();
// sampleTasks.forEach(task => {
//     app.addTask(task);
// });

const edit_element = {
    "title": document.getElementById('title') as HTMLInputElement, // タイトル
    "content": document.getElementById('content') as HTMLTextAreaElement, // 内容
    "dueDate": document.getElementById('dueDate') as HTMLInputElement, // 期限日
    "repeatEnabled": document.getElementById('repeatEnabled') as HTMLInputElement, // 繰り返し有効
    "repeatCount": document.getElementById('repeatCount') as HTMLInputElement, // 繰り返し回数
    "repeatUnit": document.getElementById('repeatUnit') as HTMLSelectElement,  // 繰り返し単位
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const strId = params.get('id');
    if (!strId) return;
    const id = Number(strId);
    // const id = 7; // テスト用に固定IDを使用
    const task = app.getTask(id);

    edit_element.title.value = task.title;
    edit_element.content.value = task.content;
    edit_element.dueDate.valueAsDate = task.dueDate;
    // 優先度の設定
    if (task.priority !== undefined) {
        document.querySelector<HTMLInputElement>(`input[value=${task.priority}]`)!.checked = true;
    }
    // 繰り返し設定
    if (task.repeat) {
        edit_element.repeatEnabled.checked = task.repeat.enabled;
        edit_element.repeatCount.value = String(task.repeat.count);
        edit_element.repeatUnit.value = task.repeat.unit;
    }
});

const edit = document.getElementById("todo-edit-form") as HTMLFormElement;
edit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(edit);
    const title = getFormDataKey(formData, "title");
    const content = getFormDataKey(formData, "content");
    const dueDateStr = getFormDataKey(formData, "dueDate");
    const priority = getFormDataKey(formData, "priority");
    const repeatEnabled = getFormDataKey(formData, "repeatEnabled");
    const repeatCount = getFormDataKey(formData, "repeatCount");
    const repeatUnit = getFormDataKey(formData, "repeatUnit");

    const params = new URLSearchParams(window.location.search);
    const strId = params.get('id');
    if (!strId) return;
    const id = Number(strId);
    const task = app.getTask(id);
    console.log(priority);
    const editedTask:Task = {
        title: title,
        content: content,
        dueDate: new Date(dueDateStr),
        isDone: task.isDone,
        updatedAt: task.updatedAt,
        createdAt: task.createdAt,
        ...(priority !== null && { priority: priority as "low" | "medium" | "high" }),
        ...(repeatEnabled === "on" &&
        {
            repeat:
            {
                enabled: true,
                count: Number(repeatCount),
                unit: repeatUnit as "day" | "week" | "month"
            }
        }),
    };
    // タスクを編集
    app.editeTask(id, editedTask);
    // 一覧ページにリダイレクト
    window.location.href = "./index.html";
});

/** キャンセルボタンの処理 */
const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // 一覧ページにリダイレクト
    window.location.href = "./index.html";
});

/** フォームデータから特定のキーの値を取得するヘルパー関数 */
function getFormDataKey(formData: FormData, label: FormLabel): string {
    return formData.get(label) as string;
}
```
---
``` typescript
// localStorageMock.ts
export class LocalStorageMock implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    if (this.store[key] === undefined) {return null}
    return Object.prototype.hasOwnProperty.call(this.store, key)
      ? this.store[key]
      : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] ?? null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  // ===== 便利メソッド（テスト用） =====

  /** JSON を自動で stringify して保存（テストで初期値入れる用） */
  setJSON(key: string, value: unknown): void {
    this.setItem(key, JSON.stringify(value));
  }

  /** JSON を parse して取得（デバッグ用） */
  getJSON<T>(key: string): T | null {
    const raw = this.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
}
```
---