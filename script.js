// Run when the DOM has finished loading
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

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
        removeBtn.className = "remove-btn";

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
    
    }

    // ---- EVENT LISTENERS ----

    // 1. Add Task button click
    addButton.addEventListener('click', addTask);

    // 2. Enter key inside taskInput
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

// 3. DOMContentLoaded (outside the main function) should invoke addTask
document.addEventListener('DOMContentLoaded', function () {
    addTask(); // As instructed
});





