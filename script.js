

// Run when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Initialize tasks array from Local Storage (array of strings)
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Save the current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a DOM element for a task and wire up its Remove button
    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove handler: remove from DOM and from tasks array, then save
        removeBtn.addEventListener("click", function () {
            li.remove();

            // Remove first matching occurrence from tasks array
            const idx = tasks.indexOf(taskText);
            if (idx > -1) {
                tasks.splice(idx, 1);
                saveTasks();
            }
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * Add a task.
     * If taskText is omitted, read from the input field.
     * If save === true, push to tasks array and persist to Local Storage.
     * When loading from storage call addTask(text, false) to avoid duplication.
     */
    function addTask(taskText = null, save = true) {
        // If no argument provided, take text from input
        if (taskText === null) {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        if (taskText === "") return; // don't add empty tasks

        // Create DOM element for the task
        createTaskElement(taskText);

        // If this call should persist (i.e., a user-added task), update array + storage
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input after adding from input
        if (taskInput.value) taskInput.value = "";
    }

    // Load tasks from the tasks array into the DOM (do not re-save while loading)
    function loadTasks() {
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Wire the Add button
    addButton.addEventListener("click", function (e) {
        e.preventDefault();
        addTask(); // reads from input and saves
    });

    // Load saved tasks into the DOM on startup
    loadTasks();
});
