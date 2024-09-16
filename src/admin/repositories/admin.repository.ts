import { Inject } from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { AdminRepositoryInterface } from './admin.repository.interface';
import { RegisterAdminDto } from '../dto/register-admin.dto';

export class AdminRepository implements AdminRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  async create(dto: RegisterAdminDto): Promise<Users> {
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
