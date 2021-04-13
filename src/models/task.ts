export enum TaskStatus {
  Active,
  Finished
}

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TaskStatus
  ) {}
}
