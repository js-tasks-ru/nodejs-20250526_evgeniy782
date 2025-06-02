export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum SortBy {
  TITLE = "title",
  DESCRIPTION = "description",
  STATUS = "status",
}
