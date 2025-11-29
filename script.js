


// Run when the DOM has finished loading
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");



    // Load tasks from Local Storage on page load
    loadTasks();

    

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText !== "") {

            // Create <li>
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";   // ✔ No classList.add

            // Remove task when clicked
            removeBtn.onclick = function () {
                taskList.removeChild(li);
            };

            // Append remove button to li
            li.appendChild(removeBtn);

            // Append li to task list
            taskList.appendChild(li);

            // Clear input field
            taskInput.value = "";
        }
        else {
            alert("cannot be empty");
        }

        if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }       
    }

    // ---- EVENT LISTENERS ----

    // 1. Add Task button click
    addButton.addEventListener('click', addTask);

    // 2. Add Task when pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });


    // Load and display all tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }


});
