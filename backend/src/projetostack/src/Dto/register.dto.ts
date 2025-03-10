import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'john_doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'password123',
  })
  password: string;
}