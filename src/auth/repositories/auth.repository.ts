import { Inject } from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { PrismaClient } from '@prisma/client';

export class AuthRepository {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  async create(dto: RegisterAuthDto) {
    return await this.dbClient.users.create({
      data: {
        ...dto,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.dbClient.users.findFirst({
      where: { email: email },
    });
  }

  async findById(id: number) {
    return await this.dbClient.users.findUnique({ where: { id } });
  }
}
