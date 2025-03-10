import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../Dto/create-task.dto';
import { UpdateTaskDto } from '../Dto/update-task.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  
  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

 
  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        completed: false,  
        status: createTaskDto.status,  
        userId,  
      },
    });
  }

  
  async findById(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
    }

    return task;
  }

 
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findById(id);

   
    const updatedData = {
      title: updateTaskDto.title ?? task.title,
     
      status: updateTaskDto.status !== undefined ? updateTaskDto.status : task.status,
     
      completed: updateTaskDto.completed !== undefined ? updateTaskDto.completed : task.completed,
    };

    return this.prisma.task.update({
      where: { id },
      data: updatedData,
    });
  }

 
  async delete(id: number) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Tarefa com ID ${id} não encontrada.`);
      }

      
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw new Error("Erro ao deletar tarefa");
    }
  }
}
