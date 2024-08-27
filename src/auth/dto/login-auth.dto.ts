import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
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
  })
  @IsNotEmpty()
  password: string;
}
