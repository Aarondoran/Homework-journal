document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const dueDateInput = document.getElementById("dueDate");
    const addBtn = document.getElementById("addBtn");

    // Function to create and add a new assignment item
    function addAssignmentItem(title, dueDate) {
        const listItem = document.createElement("li");
        listItem.className = "homework-item";
        listItem.innerHTML = `<div>${title} (Due: ${dueDate})</div>`;
        const createdDate = new Date().toDateString();
        let box = document.getElementById(createdDate);
        if (!box) {
            box = document.createElement("div");
            box.className = "assignment-box";
            box.id = createdDate;
            const heading = document.createElement("h3");
            heading.innerText = `Date Created: ${createdDate}`;
            box.appendChild(heading);
            document.getElementById("viewPage").appendChild(box);
        }
        box.appendChild(listItem);
    }

    addBtn.addEventListener("click", function () {
        const title = titleInput.value;
        const dueDate = dueDateInput.value;

        if (title && dueDate) {
            addAssignmentItem(title, dueDate);

            titleInput.value = "";
            dueDateInput.value = "";
        }
    });
});
