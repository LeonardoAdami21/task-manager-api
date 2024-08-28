import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    example: 'Limpar',
    description: 'Nome da tarefa',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'Limpar o quarto',
    description: 'Descrição da tarefa',
  })
  description: string;

}
