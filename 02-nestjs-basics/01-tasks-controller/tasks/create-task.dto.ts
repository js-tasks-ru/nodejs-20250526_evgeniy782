import { IsString, Contains, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from './task.model';

export class TaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}