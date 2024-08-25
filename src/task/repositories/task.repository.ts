import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export class TaskRepository {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  async create(dto: CreateTaskDto, userId: number) {
    return await this.dbClient.tasks.create({
      data: {
        ...dto,
        userId,
      },
    });
  }


  async findAll(userId: number) {
    return await this.dbClient.tasks.findMany({
      where: {
        userId,
      },
    });
  }
  async findUserById(userId: number) {
    const user = await this.dbClient.users.findFirst({
      where: {
        id: userId,
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }

  async findById(id: number) {
    return await this.dbClient.tasks.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateTaskDto) {
    return await this.dbClient.tasks.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return await this.dbClient.tasks.delete({ where: { id } });
  }
}
