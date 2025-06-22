import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: CreateTaskDto) {
    return await this.tasksService.create(task);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.tasksService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: number, @Body() task: UpdateTaskDto) {
    return await this.tasksService.update(id, task);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return await this.tasksService.remove(id);
  }
}
