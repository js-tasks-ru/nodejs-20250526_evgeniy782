import { PipeTransform, BadRequestException } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    if(isNaN(Number(value))) {
      throw new BadRequestException(`"${value}" не является числом`)
    }
    return Number(value);
  }
}
