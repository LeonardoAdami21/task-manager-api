import { Inject, NotFoundException } from '@nestjs/common';
import { PrismaClient, Tasks, userEnumRole } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { MarkedTaskDto } from '../dto/marked-task.dto';
import { TaskRepositoryInterface } from './task.repository.interface';

export class TaskRepository implements TaskRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  async create(dto: CreateTaskDto, userId: number) {
    return await this.dbClient.tasks.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAllUserTasks(userId: number) {
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
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: number): Promise<Tasks> {
    return await this.dbClient.tasks.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateTaskDto) {
    return await this.dbClient.tasks.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async markedAsFinished(id: number, dto: MarkedTaskDto) {
    const task = await this.dbClient.tasks.findUnique({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    return await this.dbClient.tasks.update({
      where: { id: task.id },
      data: { status: dto.status },
    });
  }
  async remove(id: number) {
    return await this.dbClient.tasks.delete({ where: { id } });
  }
}
