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

  @ApiProperty({
    example: '01/01/2022',
    type: Date,
    description: 'The initial date of the project',
    required: true,
  })
  initialDate: Date;

  @ApiProperty({
    example: '01/01/2022',
    type: Date,
    description: 'The final date of the project',
    required: true,
  })
  finalDate: Date;
}
