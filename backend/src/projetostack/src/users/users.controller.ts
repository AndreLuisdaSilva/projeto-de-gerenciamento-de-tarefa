import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Param, 
  NotFoundException, 
  ConflictException, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Define explicitamente o status de sucesso
  async create(@Body() data: User) {
    try {
      return await this.usersService.create(data);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Este e-mail já está cadastrado.');
      }
      throw error; // Garante que outras exceções também sejam tratadas
    }
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }
}
