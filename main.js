// JS for the To-Do List

// Declaring variables
const taskStorage = [];
// const finishedStorage = [];
const taskInfo = document.querySelector("#taskInfo");
const taskTextInput = document.querySelector("#taskTextInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskBox = document.querySelector("ul");
const finishedTask = document.querySelector("#finishedTask");
const remainingTask = document.querySelector("#remainingTask");
const warning = document.querySelector("#warning");
const fantasy = document.querySelector("#fantasy");
const modern = document.querySelector("#modern");

let taskId = 1;

addTaskBtn.addEventListener("click", function () {
    // Alert if input is empty
    if (taskTextInput.value === "") {
        warning.style.animation = "fadeIn 0.5s ease forwards";
        warning.innerHTML = "You have to type something";
        return;
    } else {
        warning.innerHTML = "";
    }

    // Declaring a variable for the user input
    const newTask = taskTextInput.value;

    // Object managing tasks
    const taskObject = { id: taskId++, text: newTask, completed: false };

    // Create the li
    const createLi = document.createElement("li");
    createLi.classList.add("liList");
    taskBox.appendChild(createLi);

    // Create the span for the text input
    const createSpan = document.createElement("span");
    createSpan.innerHTML = taskObject.text;
    createSpan.classList.add("spanList")
    createLi.appendChild(createSpan);

    // Push taskObject to taskStorage
    taskStorage.push(taskObject);
    taskTextInput.value = "";


    // Span click event for marking tasks
    createLi.addEventListener("click", function () {
        taskObject.completed = !taskObject.completed;

        // Move task between taskStorage and finishedStorage
        if (taskObject.completed) {
            createSpan.classList.add("markCompl");

        } else {
            createSpan.classList.remove("markCompl");
        }
        taskCount();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "x";
    delBtn.classList.add("delBtn");
    createLi.appendChild(delBtn);

    // Delete button event listener
    delBtn.addEventListener("click", function () {
        createLi.style.animation = "fadeOut 0.5s ease forwards";

        setTimeout(function () {
            const indexOne = taskStorage.indexOf(taskObject);
            if (indexOne > -1) {
                taskStorage.splice(indexOne, 1);
                createLi.remove();
                taskCount();
            }
        }, 500);

    });
    taskCount();
});

// Task count function
function taskCount() {
    const finishedTasksCount = taskStorage.filter(task => task.completed).length;
    const remainingTaskCount = taskStorage.filter(task => !task.completed).length;

    finishedTask.textContent = `Finished Tasks: ${finishedTasksCount}`;
    remainingTask.textContent = `Remaining Tasks: ${remainingTaskCount}`;
}
