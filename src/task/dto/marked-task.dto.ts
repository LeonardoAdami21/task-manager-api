import { ApiProperty } from "@nestjs/swagger";

export class MarkedTaskDto {
    @ApiProperty({
        type: Boolean,
        description: 'Is the task finished?',
        example: true
    })
    isFinished: boolean;
}