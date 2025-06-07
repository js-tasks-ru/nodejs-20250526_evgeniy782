import { Controller, Get, Query,  UsePipes, ValidationPipe  } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus, SortBy } from "./task.model";
import { QueryDto } from './task.dto';

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() queryParams: QueryDto
  ) {
    const { status, page, limit, sortBy } = queryParams;

    return this.tasksService.getFilteredTasks(
      status,
      page,
      limit,
      sortBy
    )
  }
}
