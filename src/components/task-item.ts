import { Draggable } from '../models/drag-drop.js';
import { Task } from '../models/task.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';

// TaskItem Class
export class TaskItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private task: Task;

  constructor(hostId: string, task: Task) {
    super('single-task', hostId, false, task.id);
    this.task = task;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.task.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.task.title;
    this.element.querySelector('p')!.textContent = this.task.description;
  }
}
