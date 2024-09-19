import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({ example: 'My project', description: 'Name of the project' })
  name: string;

  @ApiProperty({
    example: 'My project description',
    description: 'Description of the project',
  })
  description: string;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Initial date of the project',
  })
  initialDate: Date;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Final date of the project',
  })
  finalDate: Date;
}
