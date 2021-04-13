import { Task, TaskStatus } from '../models/task';

// Task State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class TaskState extends State<Task> {
  private tasks: Task[] = [];
  private static instance: TaskState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TaskState();
    return this.instance;
  }

  addTask(title: string, description: string) {
    const newTask = new Task(
      Math.random().toString(),
      title,
      description,
      TaskStatus.Active
    );
    this.tasks.push(newTask);
    this.updateListeners();
  }

  moveTask(taskId: string, newStatus: TaskStatus) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.tasks.slice());
    }
  }
}

export const taskState = TaskState.getInstance();
