const STORAGE_KEY = "modular-task-manager";

export const store = {
  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },
};
