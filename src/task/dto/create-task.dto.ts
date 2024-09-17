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

  @ApiProperty({
    type: String,
    example : 'low',
    description: 'Prioridade da tarefa',
  })
  priority: string;

  @ApiProperty({
    type: String,
    example: 'todo',
    description: 'Status da tarefa',
  })
  status: string;
}
