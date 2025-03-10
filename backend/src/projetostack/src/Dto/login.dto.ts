import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'br@br.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  password: string;
}