// src/app.js
import { Task } from "./Task.js";
import { store } from "./store.js";
import { view } from "./view.js";

let tasks = store.load();
let currentFilter = "all";

// Add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  const newTask = new Task(title);
  tasks.push(newTask);
  store.save(tasks);
  input.value = "";
  render();
}

// Toggle task done/active
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.toggle();
    store.save(tasks);
    render();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  store.save(tasks);
  render();
}

// Filter tasks (All / Active / Done)
function filterTasks(filter) {
  currentFilter = filter;
  view.setActiveFilter(filter);
  render();
}

// Render tasks
function render() {
  view.render(tasks, currentFilter);
}

// Bind UI handlers
view.bindHandlers(addTask, toggleTask, deleteTask, filterTasks);
render();
