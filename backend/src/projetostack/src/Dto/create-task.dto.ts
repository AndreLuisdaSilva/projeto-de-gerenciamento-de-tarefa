import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @ApiProperty({ description: 'Status of the task', default: false })
  status: boolean;
}
