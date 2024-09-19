import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'My project',
    description: 'The name of the project',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'This is my project',
    description: 'The description of the project',
    required: true,
  })
  description: string;

  @ApiProperty()
  initialDate: Date;

  @ApiProperty()
  finalDate: Date;
}
