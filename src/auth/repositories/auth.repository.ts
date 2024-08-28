import { Inject } from '@nestjs/common';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { PrismaClient, Users } from '@prisma/client';
import { AuthRepositoryInterface } from './auth.repository.interface';

export class AuthRepository implements AuthRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  async create(dto: RegisterAuthDto): Promise<Users> {
    return await this.dbClient.users.create({
      data: {
        ...dto,
      },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.dbClient.users.findFirst({
      where: { email },
    });
  }

  async findById(id: number): Promise<Users> {
    return await this.dbClient.users.findUnique({ where: { id } });
  }
}
