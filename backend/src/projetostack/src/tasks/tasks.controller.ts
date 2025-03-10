import { Body, Controller, Get, Post, Param, Delete, Patch, Put, Req, UnauthorizedException, UseGuards  } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../Dto/create-task.dto';
import { TaskDto } from '../Dto/task.dto';
import { UpdateTaskDto } from '../Dto/update-task.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { UserRequest } from '../request.interface'; 
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [TaskDto] })
  async findAll(@Req() req: UserRequest) {
      const user = req.user;

      if (!user || !user.userId) {
          throw new UnauthorizedException('User ID not provided');
      }

    return this.taskService.findAll(user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: TaskDto })
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: UserRequest) {
    const user = req.user;  

    if (!user || !user.userId) {
      throw new UnauthorizedException('User ID not provided');
    }

    return this.taskService.create(createTaskDto, user.userId);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID', required: true })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  async delete(@Param('id') id: number) {
    return this.taskService.delete(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID', required: true })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: TaskDto })
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID', required: true })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: TaskDto })
  async updatePut(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }
}
