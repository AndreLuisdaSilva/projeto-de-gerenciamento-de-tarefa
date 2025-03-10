import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, UserSelect } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: User) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        // Código de erro do Prisma para violação de unicidade (e-mail duplicado)
        throw new ConflictException('E-mail já está em uso.');
      }
      throw new InternalServerErrorException('Erro ao criar usuário.');
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true, // Inclua a propriedade password
        } as UserSelect,
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar usuários.');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuário.');
    }
  }

  async update(id: number, data: Partial<User>) {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado para atualização.');
      }
      throw new InternalServerErrorException('Erro ao atualizar usuário.');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado para exclusão.');
      }
      throw new InternalServerErrorException('Erro ao excluir usuário.');
    }
  }
}
