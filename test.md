:::mermaid
sequenceDiagram
    actor U as User
    participant M as Main(main.ts)
    participant V as View(visible.ts)
    participant UC as Usecase(usecase.ts)
    participant R as LocalStorageRepo(localStorage.ts)

    U->>M: アプリを開く
    M->>UC: init()
    UC->>R: load()
    R-->>UC: TasksMap
    UC-->>V: 初期タスクリスト
    V->>U: タスク一覧を表示

    U->>V: 「+」ボタンをクリック
    V->>UC: createTask()
    UC->>R: save()
    R-->>UC: OK
    UC-->>V: 更新されたタスクリスト
    V->>U: 再描画

    U->>V: タスクの「完了」クリック
    V->>UC: toggleDone(taskId)
    UC->>R: save()
    UC-->>V: 更新されたタスクリスト
    V->>U: 並び替え・絞り込み済み一覧を表示

:::