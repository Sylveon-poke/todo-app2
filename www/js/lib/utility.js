/** 日付を「YYYY/MM/DD」形式の文字列に変換する関数 */
export const toDateText = (d) => {
    const text = d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return text;
};
/** タスクのマップを配列に変換する関数 */
export function toArray(tasks) {
    const arr = Array.from(tasks.entries());
    return arr;
}
/** 配列をタスクのマップに変換する関数 */
export function toTaskMap(ArrTask) {
    const tasksMap = new Map(ArrTask);
    return tasksMap;
}
/** 2つのタスクが等しいかどうかを比較する関数 */
export function isEqualTask(task1, task2) {
    let changeedFlg = false;
    const isDiffTask = {
        title: task1.title === task2.title,
        content: task1.content === task2.content,
        dueDate: task1.dueDate === task1.dueDate,
        isDone: task1.isDone === task2.isDone,
    };
    const fields = ["title", "content", "dueDate", "isDone"];
    for (const flg of fields) {
        if (!isDiffTask[flg]) {
            console.log(flg, isDiffTask[flg]);
            changeedFlg = true;
        }
    }
    return changeedFlg;
}
//# sourceMappingURL=utility.js.map