import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    type: String,
    example: 'Henrique',
    description: 'Nome do usuário',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'w5Jwz@example.com',
    description: 'Email do usuário',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: '123456',
    description: 'Senha do usuário',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
