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
const themesBtn = document.querySelector("#themesBtn");
const themeStylesheet = document.querySelector("#themeStylesheet");
const taskInputs = document.querySelector("#taskInputs");

let taskId = 1;

addTaskBtn.addEventListener("click", function () {
    // Alert if input is empty
    if (taskTextInput.value === "") {
        warning.innerHTML = "Input must not be empty";

        //Only solution I could find to fix the empty input animation text
        warning.classList.add("warningAnimation");

        warning.addEventListener("animationend", function(){
            warning.classList.remove("warningAnimation");
        }, {once: true});

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
    createSpan.classList.add("spanList");
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
    delBtn.innerHTML = "🗑️";
    delBtn.classList.add("delBtn");
    createLi.appendChild(delBtn);

    // Delete button event listener
    delBtn.addEventListener("click", function () {
            const indexOne = taskStorage.indexOf(taskObject);
            if (indexOne > -1) {
                taskStorage.splice(indexOne, 1);
                createLi.remove();
                taskCount();
            }
        });

    });
    taskCount();


// Task count function
function taskCount() {
    const finishedTasksCount = taskStorage.filter(task => task.completed).length;
    const remainingTaskCount = taskStorage.filter(task => !task.completed).length;

    finishedTask.textContent = `${finishedTasksCount} completed`;

    // remainingTask.textContent = `Remaining Tasks: ${remainingTaskCount}`;
}


//SCRAPPED FROM MY ORIGINAL TODO LIST WILL CONTINUE IN THE FUTURE
// themesBtn.addEventListener("click", function(){
    
//     if (themesBtn.textContent === "Fantasy"){
//         themesBtn.textContent = "Modern";
//         themeStylesheet.href = "main2.css";
//         console.log("Switched to Fantasy theme");        
//     } else if (themesBtn.textContent == "Modern"){
//         themesBtn.textContent = "Fantasy";
//         themeStylesheet.href = "main.css";
//         console.log("Switched to Modern theme");
//     }
// })