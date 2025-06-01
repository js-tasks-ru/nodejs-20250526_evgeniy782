import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

const FIRST_TASK_ID = '1';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  private findTaskById (id: string): Task {
    return this.tasks.find((item) => {
      if(item.id === String(id)) {
        return item;
      } 
    });
  }

  private getNewIdTask (): string {
    if(this.tasks.length) {
      this.tasks.sort((a, b) => Number(a.id) - Number(b.id));

      const lastTaskInList = this.tasks[this.tasks.length - 1].id;
      const newId = Number(lastTaskInList) + 1;

      return String(newId);
    }

    return FIRST_TASK_ID;
  }

  checkExistTaskById (id: string) {
    const findTask = this.getTaskById(id);
    
    if(findTask === undefined) {
      throw new NotFoundException();
    }
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.findTaskById(id);
  }

  createTask(task: Task): Task {
    const id = this.getNewIdTask();

    const newTask = {
      id,
      ...task,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, update: Task): Task {
      const indexCurrentTask = this.tasks.findIndex((item) => item.id === id);
      
      const currenTask = {
        ...this.tasks[indexCurrentTask],
        ...update,
      };

      this.tasks[indexCurrentTask] = currenTask;

      return this.tasks[indexCurrentTask];
  }

  deleteTask(id: string): Task {
    const deletedTask = this.findTaskById(id);

    this.tasks = this.tasks.filter((item) => item.id !== id);

    return deletedTask;
  }
}
