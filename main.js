// JS for the To-Do List

// Declaring variables
const taskStorage = [];
const finishedStorage = [];
const taskInfo = document.querySelector("#taskInfo");
const taskTextInput = document.querySelector("#taskTextInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskBox = document.querySelector("ul");
const finishedTask = document.querySelector("#finishedTask");
const remainingTask = document.querySelector("#remainingTask");
const warning = document.querySelector("#warning");

let taskId = 1;

addTaskBtn.addEventListener("click", function () {
    // Alert if input is empty
    if (taskTextInput.value === "") {
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
    createLi.appendChild(createSpan);

    // Push taskObject to taskStorage
    taskStorage.push(taskObject);
    taskTextInput.value = "";
    console.log(taskStorage);

    // Span click event for marking tasks
    createSpan.addEventListener("click", function () {
        taskObject.completed = !taskObject.completed;

        // Move task between taskStorage and finishedStorage
        if (taskObject.completed) {
            createSpan.classList.add("markCompl");
            const indexTwo = taskStorage.indexOf(taskObject);

            if (indexTwo > -1) {
                finishedStorage.push(taskObject);
                taskStorage.splice(indexTwo, 1);
                console.log(finishedStorage);
                console.log(taskStorage);
            }
        } else {
            createSpan.classList.remove("markCompl");
            const indexOne = finishedStorage.indexOf(taskObject);

            if (indexOne > -1) {
                taskStorage.push(taskObject);
                finishedStorage.splice(indexOne, 1);
                console.log(finishedStorage);
                console.log(taskStorage);
            }
        }
        taskCount();
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "&#128465;";
    delBtn.classList.add("delBtn");
    createLi.appendChild(delBtn);

    // Delete button event listener
    delBtn.addEventListener("click", function () {
        if (taskObject.completed) {
            // Find and remove from finishedStorage
            const indexTwo = finishedStorage.indexOf(taskObject);
            if (indexTwo > -1) {
                finishedStorage.splice(indexTwo, 1);
            }
        } else {
            // Find and remove from taskStorage
            const indexOne = taskStorage.indexOf(taskObject);
            if (indexOne > -1) {
                taskStorage.splice(indexOne, 1);
            }
        }
        createLi.remove();  
        taskCount();        
    });

    taskCount();
});

// Task count function
function taskCount() {
    finishedTask.textContent = `Finished Tasks: ${finishedStorage.length}`;
    remainingTask.textContent = `Remaining Tasks: ${taskStorage.length}`;
}
