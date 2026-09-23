let tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const errorMessage = document.getElementById("errorMessage");
const taskCounter = document.getElementById("taskCounter");
const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const clearAllBtn = document.getElementById("clearAllBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme");
  
  if (currentTheme === "dark") {
    document.body.removeAttribute("data-theme");
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("taskmate_theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("taskmate_theme", "dark");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("taskmate_theme");
  if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggleBtn.textContent = "☀️";
  }
}

themeToggleBtn.addEventListener("click", toggleTheme);

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please enter a task (cannot be empty).";
    return;
  }

  // Clear existing error message
  errorMessage.textContent = "";

  // Create new task object
  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  // Update array state
  tasks.push(newTask);

  // Clear input box
  taskInput.value = "";

  // Re-render UI
  renderTasks();
}

// Add task via button click
addBtn.addEventListener("click", addTask);

// Add task via 'Enter' keypress inside text input
taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 5. Toggle Task & Delete Task Functions

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

// 6. Update Live Counter
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskCounter.textContent = `${total} tasks total, ${completed} completed`;
}

// 7. Primary Render Function
function renderTasks() {
  // Clear container DOM element
  taskList.innerHTML = "";

  // Build filtered array based on active filter state
  let filteredTasks = tasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  }

  // Empty State Toggle & List Building
  if (filteredTasks.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";

    // Loop through filtered array to create task list items
    filteredTasks.forEach(task => {
      const li = document.createElement("li");

      if (task.completed) {
        li.classList.add("completed");
      }

      // Task text node
      const span = document.createElement("span");
      span.textContent = task.text;
      li.appendChild(span);

      // Actions button group
      const btnGroup = document.createElement("div");

      // Complete toggle button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.classList.add("btn-complete");
      completeBtn.addEventListener("click", function() {
        toggleTask(task.id);
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("btn-delete");
      deleteBtn.addEventListener("click", function() {
        deleteTask(task.id);
      });

      btnGroup.appendChild(completeBtn);
      btnGroup.appendChild(deleteBtn);
      li.appendChild(btnGroup);

      taskList.appendChild(li);
    });
  }

  // Synchronize live counter
  updateCounter();
}

// 8. Filter Buttons Event Handling
function setFilter(filterType, clickedBtn) {
  currentFilter = filterType;

  // Remove active highlight from all filter buttons
  filterAll.classList.remove("active-filter");
  filterActive.classList.remove("active-filter");
  filterCompleted.classList.remove("active-filter");

  // Highlight active filter button
  clickedBtn.classList.add("active-filter");

  renderTasks();
}

filterAll.addEventListener("click", function() {
  setFilter("all", filterAll);
});

filterActive.addEventListener("click", function() {
  setFilter("active", filterActive);
});

filterCompleted.addEventListener("click", function() {
  setFilter("completed", filterCompleted);
});

// 9. Clear All Tasks Handling
clearAllBtn.addEventListener("click", function() {
  if (tasks.length === 0) return;

  const confirmed = confirm("Are you sure you want to delete all tasks?");
  if (confirmed) {
    tasks = [];
    renderTasks();
  }
});

// 10. Initial Run
initTheme();
renderTasks();