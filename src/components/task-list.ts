import { DragTarget } from '../models/drag-drop.js';
import { Task, TaskStatus } from '../models/task.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';
import { taskState } from '../state/task-state.js';
import { TaskItem } from './task-item.js';

// TaskList Class
export class TaskList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedTasks: Task[];

  constructor(private type: 'active' | 'finished') {
    super('task-list', 'app', false, `${type}-tasks`);
    this.assignedTasks = [];

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const taskId = event.dataTransfer!.getData('text/plain');
    taskState.moveTask(
      taskId,
      this.type === 'active' ? TaskStatus.Active : TaskStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    taskState.addListener((tasks: Task[]) => {
      const relevantTasks = tasks.filter(task => {
        if (this.type === 'active') {
          return task.status === TaskStatus.Active;
        }
        return task.status === TaskStatus.Finished;
      });
      this.assignedTasks = relevantTasks;
      this.renderTasks();
    });
  }

  renderContent() {
    const listId = `${this.type}-tasks-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' TASKS';
  }

  private renderTasks() {
    const listEl = document.getElementById(
      `${this.type}-tasks-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const taskItem of this.assignedTasks) {
      new TaskItem(this.element.querySelector('ul')!.id, taskItem);
    }
  }
}
