import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
  @ApiProperty({
    type: String,
    description: 'Title of the task',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Description of the task',
    example: 'Milk, eggs, bread',
  })
  description: string;
}
