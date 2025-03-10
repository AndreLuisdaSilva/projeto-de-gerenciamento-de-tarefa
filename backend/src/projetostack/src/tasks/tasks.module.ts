import { Module } from '@nestjs/common';
import { TaskService } from './task.service'; 
import { TasksController } from './tasks.controller'; 
import { PrismaModule } from '../../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  providers: [TaskService], 
  controllers: [TasksController], 
})
export class TasksModule {}
