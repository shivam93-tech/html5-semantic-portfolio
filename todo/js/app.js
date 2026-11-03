
(() => {
  "use strict";
  const STORAGE_KEY = "focuslist.tasks.v1";
  const THEME_KEY = "focuslist.theme";
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#task-list");
  const empty = document.querySelector("#empty-state");
  const count = document.querySelector("#task-count");
  const filters = document.querySelector(".filters");
  const clearButton = document.querySelector("#clear-completed");
  const themeButton = document.querySelector("#theme-toggle");
  let tasks = loadTasks();
  let currentFilter = "all";
  let editingId = null;

  function loadTasks() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(t => t && typeof t.id === "string" && typeof t.text === "string" && typeof t.completed === "boolean") : [];
    } catch { return []; }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
  function visibleTasks() {
    if (currentFilter === "active") return tasks.filter(t => !t.completed);
    if (currentFilter === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }
  function render() {
    list.replaceChildren();
    const shown = visibleTasks();
    empty.hidden = shown.length !== 0;
    count.textContent = `${tasks.filter(t => !t.completed).length} active · ${tasks.length} total`;
    clearButton.hidden = !tasks.some(t => t.completed);
    for (const task of shown) {
      const li = document.createElement("li");
      li.className = `task${task.completed ? " done" : ""}`;
      li.dataset.id = task.id;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox"; checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark "${task.text}" ${task.completed ? "active" : "completed"}`);
      const label = document.createElement("span");
      label.className = "task-text"; label.textContent = task.text;
      const actions = document.createElement("div"); actions.className = "actions";
      const edit = document.createElement("button"); edit.className = "icon-btn"; edit.type = "button"; edit.dataset.action = "edit"; edit.textContent = "Edit"; edit.setAttribute("aria-label", `Edit ${task.text}`);
      const remove = document.createElement("button"); remove.className = "icon-btn"; remove.type = "button"; remove.dataset.action = "delete"; remove.textContent = "Delete"; remove.setAttribute("aria-label", `Delete ${task.text}`);
      actions.append(edit, remove); li.append(checkbox, label, actions); list.append(li);
    }
    filters.querySelectorAll("button").forEach(btn => btn.setAttribute("aria-pressed", String(btn.dataset.filter === currentFilter)));
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    if (editingId) {
      const task = tasks.find(t => t.id === editingId);
      if (task) task.text = text;
      editingId = null;
      form.querySelector("button[type=submit]").textContent = "Add task";
    } else {
      tasks.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, text, completed: false, createdAt: Date.now() });
    }
    input.value = ""; save(); render(); input.focus();
  });
  list.addEventListener("change", event => {
    if (event.target.matches('input[type="checkbox"]')) {
      const task = tasks.find(t => t.id === event.target.closest(".task").dataset.id);
      if (task) { task.completed = event.target.checked; save(); render(); }
    }
  });
  list.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const li = button.closest(".task");
    const task = tasks.find(t => t.id === li.dataset.id);
    if (!task) return;
    if (button.dataset.action === "delete") {
      tasks = tasks.filter(t => t.id !== task.id);
      if (editingId === task.id) { editingId = null; input.value = ""; form.querySelector("button[type=submit]").textContent = "Add task"; }
      save(); render();
    } else if (button.dataset.action === "edit") {
      editingId = task.id; input.value = task.text;
      form.querySelector("button[type=submit]").textContent = "Save task"; input.focus();
    }
  });
  filters.addEventListener("click", event => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    currentFilter = button.dataset.filter; render();
  });
  clearButton.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.completed); save(); render();
  });
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === "dark" ? "☀ Light mode" : "☾ Dark mode";
    themeButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
    localStorage.setItem(THEME_KEY, theme);
  }
  themeButton.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  setTheme(localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  render();
})();
