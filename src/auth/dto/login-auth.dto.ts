import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
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
