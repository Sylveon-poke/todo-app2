export const toDateText = (d) => {
    const text = d.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return text;
};
export function toArray(tasks) {
    const arr = Object.entries(tasks);
    return arr;
}
export function toTaskMap(ArrTask) {
    console.log(ArrTask);
    const tasksMap = Object.fromEntries(ArrTask);
    console.log(tasksMap);
    return tasksMap;
}
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