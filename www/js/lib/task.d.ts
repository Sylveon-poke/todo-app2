import type { StoredTasksMap, Task, TasksMap } from "./type.js";
/** デフォルトのタスクを生成する関数 */
export declare function defaultTask(): Task;
/** 保存されたタスクデータを復元する関数 */
export declare function restoreTasks(stored: StoredTasksMap): TasksMap;
/** タスクデータを保存用に変換する関数 */
export declare function buildStoredTasksMap(tasks: TasksMap): StoredTasksMap;
/** 保存されたタスクデータから最大のIDを取得する関数 */
export declare function getMaxId(stored: StoredTasksMap): number;
//# sourceMappingURL=task.d.ts.map