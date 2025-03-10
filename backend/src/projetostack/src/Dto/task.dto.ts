import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    description: 'Id of the task',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'Title of the task',
    example: 'My first task',
  })
  title: string;

  @ApiProperty({
    description: 'Status of the task',
    example: true,
  })
  status: boolean;
}
