// src/view.js
import { escapeHTML } from "./utils.js";

export const view = {
  onAdd: null,
  onToggle: null,
  onDelete: null,
  onFilter: null,

  render(tasks, filter) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const filtered = tasks.filter(task => {
      if (filter === "active") return !task.done;
      if (filter === "done") return task.done;
      return true;
    });

    filtered.forEach(task => {
      const li = document.createElement("li");
      li.className = task.done ? "done" : "";

      // ✅ Checkbox for done/active
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => {
        if (view.onToggle) view.onToggle(task.id);
      });

      // Task title
      const span = document.createElement("span");
      span.innerHTML = escapeHTML(task.title);
      span.style.marginLeft = "10px"; // spacing from checkbox

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "delete-btn";
      delBtn.addEventListener("click", () => {
        if (view.onDelete) view.onDelete(task.id);
      });

      li.append(checkbox, span, delBtn);
      list.appendChild(li);
    });

    document.getElementById("taskCount").textContent = `${filtered.length} task(s)`;
  },

  setActiveFilter(filter) {
    document.querySelectorAll(".filters button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });
  },

  bindHandlers(onAdd, onToggle, onDelete, onFilter) {
    this.onAdd = onAdd;
    this.onToggle = onToggle;
    this.onDelete = onDelete;
    this.onFilter = onFilter;

    document.getElementById("addTaskBtn").addEventListener("click", onAdd);
    document.getElementById("taskInput").addEventListener("keypress", e => {
      if (e.key === "Enter") onAdd();
    });

    document.querySelectorAll(".filters button").forEach(btn => {
      btn.addEventListener("click", () => onFilter(btn.dataset.filter));
    });
  }
};
