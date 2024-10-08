import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsRepositoryInterface } from './projects.repository.interface';
import { CreateProjectDto } from '../dto/create-project.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProjectsRepository implements ProjectsRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  async create(dto: CreateProjectDto, userId: number) {
    const { name, description, initialDate, finalDate } = dto;
    const user = await this.dbClient.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.dbClient.projects.create({
      data: {
        name,
        description,
        initialDate,
        finalDate,
        userId: user.id,
      },
    });
  }

  async findAll() {
    return await this.dbClient.projects.findMany({});
  }

  async findUserProjectsById(userId: number) {
    const user = await this.dbClient.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findById(id: number) {
    const project = await this.dbClient.projects.findUnique({
      where: {
        id,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: number, dto: CreateProjectDto) {
    const { name, description, initialDate, finalDate } = dto;
    const project = await this.dbClient.projects.findUnique({
      where: {
        id: id,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return await this.dbClient.projects.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        initialDate,
        finalDate,
      },
    });
  }

  async delete(id: number) {
    const project = await this.dbClient.projects.findUnique({
      where: {
        id,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return await this.dbClient.projects.delete({
      where: {
        id,
      },
    });
  }
}
