import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async create(task: CreateTaskDto) {
    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    if (Number.isNaN(id)) {
      throw new BadRequestException(`Параметр запроса не является числом`);
    }

    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    return task;
  }

  async update(id: number, task: UpdateTaskDto) {
    await this.findOne(id);

    await this.taskRepository.update(id, task);
    const updatedTask = await this.findOne(id);
    return updatedTask;
  }

  async remove(id: number): Promise<object> {
    const task = await this.findOne(id);
    await this.taskRepository.delete(task);
    return { message: "Task deleted successfully" };
  }
}
