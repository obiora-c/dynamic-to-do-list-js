

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage on page load
  loadTasks();

  // Add task when button is clicked
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText, true);
      taskInput.value = '';
    } else {
      alert("Please enter a task.");
    }
  });

  // Add task when Enter key is pressed
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText, true);
        taskInput.value = '';
      } else {
        alert("Please enter a task.");
      }
    }
  });

  // Function to add a task to the DOM (and optionally to Local Storage)
  function addTask(taskText, save = true) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Remove task from DOM and Local Storage
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      removeTaskFromStorage(taskText);
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

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