export class Task {
  constructor(title, done = false, id = null) {
    if (!title.trim()) throw new Error("Task title cannot be empty");
    this.id = id || crypto.randomUUID();
    this.title = title.trim();
    this.done = done;
  }

  toggle() {
    this.done = !this.done;
  }
}
