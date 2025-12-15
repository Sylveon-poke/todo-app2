import type { Task } from "../lib/type.js";
import { TaskUseCase } from "../usecase.js";

const app = new TaskUseCase();
export const sampleTasks: Task[] = [
    {
        title: "資料作成",
        content: "クライアント向け提案資料の作成",
        dueDate: new Date("2025-12-10"),
        isDone: false,
        updatedAt: new Date("2025-12-06T09:00:00"),
        createdAt: new Date("2025-12-05T12:30:00")
    },
    {
        title: "買い物",
        content: "牛乳・卵・パンを購入する",
        dueDate: new Date("2025-12-08"),
        isDone: true,
        updatedAt: new Date("2025-12-06T11:15:00"),
        createdAt: new Date("2025-12-04T15:10:00")
    },
    {
        title: "勉強",
        content: "TypeScriptのジェネリクス復習",
        dueDate: new Date("2025-12-12"),
        isDone: false,
        updatedAt: new Date("2025-12-06T10:10:00"),
        createdAt: new Date("2025-12-06T10:00:00")
    },
    {
        title: "ジョギング",
        content: "5km ランニング",
        dueDate: new Date("2025-12-07"),
        isDone: false,
        updatedAt: new Date("2025-12-05T08:00:00"),
        createdAt: new Date("2025-12-05T07:45:00")
    },
    {
        title: "掃除",
        content: "部屋の片付け＆ゴミ出し",
        dueDate: new Date("2025-12-09"),
        isDone: true,
        updatedAt: new Date("2025-12-06T08:30:00"),
        createdAt: new Date("2025-12-04T19:00:00")
    },
    {
        title: "面談準備",
        content: "自己PR・質問を整理",
        dueDate: new Date("2025-12-11"),
        isDone: false,
        updatedAt: new Date("2025-12-06T12:00:00"),
        createdAt: new Date("2025-12-06T12:00:00")
    },{
        title: "映画鑑賞",
        content: "新作映画を観に行く",
        dueDate: new Date("2025-12-13"),
        isDone: false,
        updatedAt: new Date("2025-12-06T14:00:00"),
        createdAt: new Date("2025-12-05T16:30:00"),
        priorty:"low",
        repeat:{ enabled:true, count:2, unit:"month"}
    }
];
sampleTasks.forEach(task => {
    app.addTask(task);
});

console.log("サンプルタスクを追加しました。");