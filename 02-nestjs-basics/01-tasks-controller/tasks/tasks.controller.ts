import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { TaskDto } from './create-task.dto';

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    this.tasksService.checkExistTaskById(id);

    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: TaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: TaskDto) {
    this.tasksService.checkExistTaskById(id);

    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    this.tasksService.checkExistTaskById(id);

    return this.tasksService.deleteTask(id);
  }
}
