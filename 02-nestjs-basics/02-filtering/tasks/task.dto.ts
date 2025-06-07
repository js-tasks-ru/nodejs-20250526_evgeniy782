import {IsInt, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus, SortBy } from './task.model';

export class QueryDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsOptional()
    @IsInt()
    @IsNumber()
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @IsNumber()
    @Type(() => Number)
    limit: number = 5;

    @IsOptional()
    @IsEnum(SortBy)
    sortBy: SortBy;
}