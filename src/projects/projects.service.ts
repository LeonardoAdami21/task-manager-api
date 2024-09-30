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
      if (initialDate > finalDate) {
        throw new BadRequestException(
          'Initial date must be less than final date',
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
          initialDate: dto.initialDate ? new Date(dto.initialDate) : new Date(),
          finalDate: dto.finalDate ? new Date(dto.finalDate) : null,
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

  async update(id: number, dto: CreateProjectDto) {
    try {
      const project = await this.projectsRepository.findById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return await this.projectsRepository.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number, userId: number) {
    try {
      const user = await this.projectsRepository.findUserProjectsById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const project = await this.projectsRepository.findById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      await this.projectsRepository.delete(id);
      return {
        message: 'Project deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
