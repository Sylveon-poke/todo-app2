import type { TaskId, Task, TasksMap } from "./type.js";
/** 日付を「YYYY/MM/DD」形式の文字列に変換する関数 */
export declare const toDateText: (d: Date) => string;
/** タスクのマップを配列に変換する関数 */
export declare function toArray(tasks: TasksMap): [number, Task][];
/** 配列をタスクのマップに変換する関数 */
export declare function toTaskMap(ArrTask: [TaskId, Task][]): TasksMap;
/** 2つのタスクが等しいかどうかを比較する関数 */
export declare function isEqualTask(task1: Task, task2: Task): boolean;
//# sourceMappingURL=utility.d.ts.map