import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Status of the task',
    required: false,
  })
  status?: boolean;

  @ApiProperty({
    description: 'Indicates if the task is completed',
    required: false,
  })
  completed?: boolean;
}
