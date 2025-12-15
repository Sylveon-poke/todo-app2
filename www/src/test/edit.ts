const edit = document.getElementById("todo-edit-form") as HTMLFormElement;
edit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(edit);
    const title = formData.get("title") as string;
    const description = formData.get("content") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const isRepeat = formData.get("repeatEnabled") as string;
    const repeaCount = formData.get("repeatCount") as string;
    const repeatUnit = formData.get("repeatUnit") as string;

    console.log("タイトル:", title);
    console.log("説明:", description);
    console.log("期限:", dueDate);
    console.log("繰り返し:", isRepeat === "on" ? "有効" : "無効");
    console.log("繰り返し回数:", repeaCount);
    console.log("繰り返し単位:", repeatUnit);
    console.log("優先度:", priority);
    console.log("フォームが送信されました");
});