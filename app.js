document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");
    const dueDateInput = document.getElementById("dueDate");
    const addBtn = document.getElementById("addBtn");
    const homeworkList = document.getElementById("homeworkList");

    // Load saved homework from local storage
    const savedHomework = JSON.parse(localStorage.getItem("homework")) || [];

    // Function to create and add a new homework item
    function addHomeworkItem(title, dueDate, index) {
        const listItem = document.createElement("li");
        listItem.className = "homework-item";
        listItem.innerHTML = `<div>${title} - Due Date: ${dueDate}</div><button class="delete-button" data-index="${index}">Delete</button>`;
        homeworkList.appendChild(listItem);
    }

    // Function to delete a homework item
    function deleteHomeworkItem(index) {
        const item = savedHomework.splice(index, 1)[0];
        localStorage.setItem("homework", JSON.stringify(savedHomework));
        updateHomeworkList();
    }

    // Function to update the homework list
    function updateHomeworkList() {
        while (homeworkList.firstChild) {
            homeworkList.removeChild(homeworkList.firstChild);
        }

        savedHomework.forEach((item, index) => {
            addHomeworkItem(item.title, item.dueDate, index);
        });
    }

    // Load existing homework items from local storage
    updateHomeworkList();

    addBtn.addEventListener("click", function () {
        const title = titleInput.value;
        const dueDate = dueDateInput.value;

        if (title && dueDate) {
            const item = { title, dueDate };
            savedHomework.push(item);
            localStorage.setItem("homework", JSON.stringify(savedHomework));

            addHomeworkItem(title, dueDate, savedHomework.length - 1);

            titleInput.value = "";
            dueDateInput.value = "";
        }
    });

    // Add a click event to the delete buttons
    homeworkList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-button")) {
            const index = event.target.getAttribute("data-index");
            deleteHomeworkItem(index);
        }
    });
});
