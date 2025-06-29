import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Название задачи должно быть длиннее 3 символов' })
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}