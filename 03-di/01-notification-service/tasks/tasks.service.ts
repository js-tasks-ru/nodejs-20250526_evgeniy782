import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
      private readonly notificationsService: NotificationsService,
      private readonly userService: UsersService
  ) {}

  private getUser(id: number) {
    return this.userService.getUserById(id);
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    const { email } = this.getUser(assignedTo);
    this.notificationsService.sendEmail(email, "Новая задача", `Вы назначены ответственным за задачу: "${title}"`);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    Object.assign(task, updateTaskDto);

    const { title, status, assignedTo } = task;

    const user = this.getUser(assignedTo);
    this.notificationsService.sendSMS(user.phone, `Статус задачи "${title}" обновлён на "${status}"`);

    return task;
  }
}
