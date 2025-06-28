import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsBoolean()
    isCompleted: boolean;
}
