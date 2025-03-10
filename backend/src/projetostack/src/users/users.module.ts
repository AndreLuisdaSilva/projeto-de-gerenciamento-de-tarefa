import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module'; // Importe o PrismaModule aqui

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
