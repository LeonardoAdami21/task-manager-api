import { ApiProperty } from '@nestjs/swagger';

export class MarkedTaskDto {
  @ApiProperty({
    type: String,
    description: 'Is the task is done?',
    example: 'done',
  })
  status: string;
}
