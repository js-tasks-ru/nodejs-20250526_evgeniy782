import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus, SortBy } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  private sortedTasksList (listTasks: Task[], sortBy: SortBy): Task[] {
      return listTasks.sort((taskA, taskB) => {
          if (taskA[sortBy] > taskB[sortBy]) {
            return 1;
          }
          if (taskA[sortBy] < taskB[sortBy]) {
            return -1;
          }
          return 0;
        })
  }

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: SortBy,
  ): Task[] {
      let newListTasks = [...this.tasks];

      if(Object.values(TaskStatus).includes(status)) {
        newListTasks = newListTasks.filter((task) => task.status === status);

        if(!newListTasks.length) {
          throw new NotFoundException();
        }
      }

      if(page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        newListTasks = newListTasks.slice(startIndex, endIndex);
      }

      if(sortBy) {
        this.sortedTasksList(newListTasks, sortBy)
      }

      return newListTasks;
  }
}
