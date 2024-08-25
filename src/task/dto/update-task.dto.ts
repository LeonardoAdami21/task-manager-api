import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty({
        type: Boolean,
        example: true,
        description: 'Define se a tarefa foi concluída',
    })
    isFinished: boolean
}
