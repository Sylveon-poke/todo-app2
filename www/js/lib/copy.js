import { TaskManager } from "../logic.js";
import { toDateText } from "./utility.js";
export const copyToClipboard = (id) => {
    const manager = new TaskManager();
    const task = manager.getTask(Number(id));
    const title = task.title;
    const content = task.content;
    const dueDate = toDateText(task.dueDate);
    const taskText = `タイトル: ${title}\n詳細: ${content}\n期日: ${dueDate}`;
    navigator.clipboard.writeText(taskText).then(() => {
        // console.log('Task copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
};
//# sourceMappingURL=copy.js.map