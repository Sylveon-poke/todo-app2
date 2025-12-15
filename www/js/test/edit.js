const edit = document.getElementById("todo-edit-form");
edit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(edit);
    const title = formData.get("title");
    const description = formData.get("content");
    const dueDate = formData.get("dueDate");
    const priority = formData.get("priority");
    const isRepeat = formData.get("repeatEnabled");
    const repeaCount = formData.get("repeatCount");
    const repeatUnit = formData.get("repeatUnit");
    console.log("タイトル:", title);
    console.log("説明:", description);
    console.log("期限:", dueDate);
    console.log("繰り返し:", isRepeat === "on" ? "有効" : "無効");
    console.log("繰り返し回数:", repeaCount);
    console.log("繰り返し単位:", repeatUnit);
    console.log("優先度:", priority);
    console.log("フォームが送信されました");
});
export {};
//# sourceMappingURL=edit.js.map