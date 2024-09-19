import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsRepositoryInterface } from './repositories/projects.repository.interface';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('projects__repository')
    private readonly projectsRepository: ProjectsRepositoryInterface,
  ) {}

  async create(dto: CreateProjectDto, userId: number) {
    try {
      const { name, description, initialDate, finalDate } = dto;
      const startDate = new Date(initialDate.toLocaleDateString());
      const endDate = new Date(finalDate.toLocaleDateString());
      if (!name || !description || !startDate || !endDate) {
        throw new BadRequestException('Missing required fields');
      }
      if (startDate > endDate) {
        throw new BadRequestException(
          'Initial date cannot be greater than final date',
        );
      }

      const user = await this.projectsRepository.findUserProjectsById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const project = await this.projectsRepository.create(
        {
          name,
          description,
          initialDate: startDate,
          finalDate: endDate,
        },
        user.id,
      );
      return project;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const projects = await this.projectsRepository.findAll();
      return projects;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: number) {
    try {
      const project = await this.projectsRepository.findById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserProjectsById(userId: number) {
    try {
      const user = await this.projectsRepository.findUserProjectsById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, dto: CreateProjectDto, userId: number) {
    try {
      const user = await this.projectsRepository.findUserProjectsById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const project = await this.projectsRepository.findById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return await this.projectsRepository.update(id, dto, user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number, userId: number) {
    try {
      const user = await this.projectsRepository.findUserProjectsById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const project = await this.projectsRepository.findById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return await this.projectsRepository.delete(id, user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
