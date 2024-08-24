import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({
    type: String,
    example: 'Henrique',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'w5Jwz@example.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: 'Senha do usuário',
  })
  password: string;
}
